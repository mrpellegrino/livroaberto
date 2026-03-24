import { CreateBookDto } from '../dtos/create-book.dto';
import { BookRepository } from '../repositories/book.repository';
import { BookResponseDto } from '../dtos/book-response.dto';
export declare class CreateBookUseCase {
    private readonly bookRepository;
    constructor(bookRepository: BookRepository);
    execute(input: CreateBookDto): Promise<BookResponseDto>;
}
