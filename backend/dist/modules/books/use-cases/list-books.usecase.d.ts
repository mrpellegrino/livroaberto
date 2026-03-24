import { BookResponseDto } from '../dtos/book-response.dto';
import { BookRepository } from '../repositories/book.repository';
export declare class ListBooksUseCase {
    private readonly bookRepository;
    constructor(bookRepository: BookRepository);
    execute(): Promise<BookResponseDto[]>;
}
