import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dtos/create-book.dto';
import { BookRepository } from '../repositories/book.repository';
import { BookResponseDto } from '../dtos/book-response.dto';

@Injectable()
export class CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(input: CreateBookDto): Promise<BookResponseDto> {
    return this.bookRepository.create({
      title: input.title,
      author: input.author,
    });
  }
}
