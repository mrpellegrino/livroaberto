import { Injectable } from '@nestjs/common';
import { BookResponseDto } from '../dtos/book-response.dto';
import { BookRepository } from '../repositories/book.repository';

@Injectable()
export class ListBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  execute(): Promise<BookResponseDto[]> {
    return this.bookRepository.list();
  }
}
