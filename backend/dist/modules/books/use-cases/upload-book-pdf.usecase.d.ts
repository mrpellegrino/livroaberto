import { BookRepository } from '../repositories/book.repository';
interface UploadResult {
    sourceId: string;
    chunks: number;
}
export declare class UploadBookPdfUseCase {
    private readonly bookRepository;
    private readonly storageRoot;
    constructor(bookRepository: BookRepository);
    execute(bookId: string, file: {
        originalname: string;
        mimetype: string;
        buffer: Buffer;
    }): Promise<UploadResult>;
    private normalizeText;
    private chunkText;
}
export {};
