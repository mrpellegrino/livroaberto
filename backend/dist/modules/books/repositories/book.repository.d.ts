import { Book, BookChunk, BookSource, Prisma } from '@prisma/client';
import { PrismaService } from '../../../common/database/prisma.service';
export declare class BookRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.BookCreateInput): Promise<Book>;
    list(): Promise<Book[]>;
    findById(id: string): Promise<Book | null>;
    createSource(data: Prisma.BookSourceUncheckedCreateInput): Promise<BookSource>;
    updateSource(sourceId: string, data: Prisma.BookSourceUpdateInput): Promise<BookSource>;
    replaceChunksForSource(sourceId: string, bookId: string, chunks: string[]): Promise<void>;
    listChunksByBookId(bookId: string, limit?: number): Promise<BookChunk[]>;
}
