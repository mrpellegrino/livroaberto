import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from '../repositories/book.repository';
import { BookChunkResponseDto } from '../dtos/book-chunk-response.dto';

@Injectable()
export class ListBookChunksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(bookId: string, limit = 20): Promise<BookChunkResponseDto[]> {
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new NotFoundException('Livro nao encontrado.');
    }

    const chunks = await this.bookRepository.listChunksByBookId(bookId, limit);
    return chunks.map((chunk) => ({
      id: chunk.id,
      chunkIndex: chunk.chunkIndex,
      content: chunk.content,
      sourceId: chunk.sourceId,
    }));
  }
}
