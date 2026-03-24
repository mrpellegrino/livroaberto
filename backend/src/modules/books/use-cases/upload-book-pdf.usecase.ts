import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ExtractionStatus } from '@prisma/client';
import type { Express } from 'express';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import pdfParse from 'pdf-parse';
import { BookRepository } from '../repositories/book.repository';

interface UploadResult {
  sourceId: string;
  chunks: number;
}

@Injectable()
export class UploadBookPdfUseCase {
  private readonly storageRoot = join(process.cwd(), 'storage', 'books');

  constructor(private readonly bookRepository: BookRepository) {}

  async execute(bookId: string, file: { originalname: string; mimetype: string; buffer: Buffer }): Promise<UploadResult> {
    if (!file) {
      throw new BadRequestException('Arquivo PDF e obrigatorio.');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Somente PDF e aceito neste endpoint.');
    }

    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new NotFoundException('Livro nao encontrado.');
    }

    const extension = extname(file.originalname) || '.pdf';
    const safeFileName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    const bookFolder = join(this.storageRoot, bookId);
    await mkdir(bookFolder, { recursive: true });

    const filePath = join(bookFolder, safeFileName.endsWith(extension) ? safeFileName : `${safeFileName}${extension}`);
    await writeFile(filePath, file.buffer);

    const source = await this.bookRepository.createSource({
      bookId,
      originalFileName: file.originalname,
      mimeType: file.mimetype,
      filePath,
      extractionStatus: ExtractionStatus.PENDING,
    });

    try {
      const raw = await readFile(filePath);
      const parsed = await pdfParse(raw);
      const normalizedText = this.normalizeText(parsed.text || '');

      if (!normalizedText) {
        throw new BadRequestException('Nao foi possivel extrair texto do PDF. Verifique se ele nao e escaneado.');
      }

      const chunks = this.chunkText(normalizedText, 1200, 200);
      const textPath = join(bookFolder, `${source.id}.txt`);
      await writeFile(textPath, normalizedText, 'utf8');
      await this.bookRepository.updateSource(source.id, { textPath });
      await this.bookRepository.replaceChunksForSource(source.id, bookId, chunks);

      return { sourceId: source.id, chunks: chunks.length };
    } catch (error) {
      await this.bookRepository.updateSource(source.id, {
        extractionStatus: ExtractionStatus.FAILED,
      });

      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao processar PDF.');
    }
  }

  private normalizeText(text: string): string {
    return text.replace(/\r/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  private chunkText(text: string, chunkSize: number, overlap: number): string[] {
    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      const slice = text.slice(start, end).trim();
      if (slice.length > 0) {
        chunks.push(slice);
      }
      if (end === text.length) {
        break;
      }
      start = Math.max(end - overlap, start + 1);
    }

    return chunks;
  }
}
