import { Injectable } from '@nestjs/common';
import {
  Book,
  BookChunk,
  BookSource,
  ExtractionStatus,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../../../common/database/prisma.service';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  list(): Promise<Book[]> {
    return this.prisma.book.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id } });
  }

  createSource(data: Prisma.BookSourceUncheckedCreateInput): Promise<BookSource> {
    return this.prisma.bookSource.create({ data });
  }

  updateSource(
    sourceId: string,
    data: Prisma.BookSourceUpdateInput,
  ): Promise<BookSource> {
    return this.prisma.bookSource.update({ where: { id: sourceId }, data });
  }

  async replaceChunksForSource(
    sourceId: string,
    bookId: string,
    chunks: string[],
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.bookChunk.deleteMany({ where: { sourceId } });
      if (chunks.length > 0) {
        await tx.bookChunk.createMany({
          data: chunks.map((content, index) => ({
            sourceId,
            bookId,
            chunkIndex: index,
            content,
          })),
        });
      }
      await tx.bookSource.update({
        where: { id: sourceId },
        data: { extractionStatus: ExtractionStatus.COMPLETED, extractedAt: new Date() },
      });
    });
  }

  listChunksByBookId(bookId: string, limit = 20): Promise<BookChunk[]> {
    return this.prisma.bookChunk.findMany({
      where: { bookId },
      orderBy: { chunkIndex: 'asc' },
      take: limit,
    });
  }
}
