import { BookRepository } from '../repositories/book.repository';
import { BookChunkResponseDto } from '../dtos/book-chunk-response.dto';
export declare class ListBookChunksUseCase {
    private readonly bookRepository;
    constructor(bookRepository: BookRepository);
    execute(bookId: string, limit?: number): Promise<BookChunkResponseDto[]>;
}
