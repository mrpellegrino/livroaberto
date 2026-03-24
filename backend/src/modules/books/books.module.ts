import { Module } from '@nestjs/common';
import { BooksController } from './presentation/controllers/books.controller';
import { BookRepository } from './repositories/book.repository';
import { CreateBookUseCase } from './use-cases/create-book.usecase';
import { ListBooksUseCase } from './use-cases/list-books.usecase';
import { UploadBookPdfUseCase } from './use-cases/upload-book-pdf.usecase';
import { ListBookChunksUseCase } from './use-cases/list-book-chunks.usecase';

@Module({
  controllers: [BooksController],
  providers: [
    BookRepository,
    CreateBookUseCase,
    ListBooksUseCase,
    UploadBookPdfUseCase,
    ListBookChunksUseCase,
  ],
})
export class BooksModule {}
