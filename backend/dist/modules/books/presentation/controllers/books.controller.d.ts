import { CreateBookDto } from '../../dtos/create-book.dto';
import { BookResponseDto } from '../../dtos/book-response.dto';
import { CreateBookUseCase } from '../../use-cases/create-book.usecase';
import { ListBooksUseCase } from '../../use-cases/list-books.usecase';
import { UploadBookPdfUseCase } from '../../use-cases/upload-book-pdf.usecase';
import { ListBookChunksUseCase } from '../../use-cases/list-book-chunks.usecase';
import { BookChunkResponseDto } from '../../dtos/book-chunk-response.dto';
export declare class BooksController {
    private readonly createBookUseCase;
    private readonly listBooksUseCase;
    private readonly uploadBookPdfUseCase;
    private readonly listBookChunksUseCase;
    constructor(createBookUseCase: CreateBookUseCase, listBooksUseCase: ListBooksUseCase, uploadBookPdfUseCase: UploadBookPdfUseCase, listBookChunksUseCase: ListBookChunksUseCase);
    create(body: CreateBookDto): Promise<BookResponseDto>;
    list(): Promise<BookResponseDto[]>;
    uploadPdf(bookId: string, file: any): Promise<{
        sourceId: string;
        chunks: number;
    }>;
    listChunks(bookId: string, limit?: number): Promise<BookChunkResponseDto[]>;
}
