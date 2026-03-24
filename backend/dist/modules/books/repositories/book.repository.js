"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../common/database/prisma.service");
let BookRepository = class BookRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.book.create({ data });
    }
    list() {
        return this.prisma.book.findMany({ orderBy: { createdAt: 'desc' } });
    }
    findById(id) {
        return this.prisma.book.findUnique({ where: { id } });
    }
    createSource(data) {
        return this.prisma.bookSource.create({ data });
    }
    updateSource(sourceId, data) {
        return this.prisma.bookSource.update({ where: { id: sourceId }, data });
    }
    async replaceChunksForSource(sourceId, bookId, chunks) {
        await this.prisma.$transaction(async (tx) => {
            await tx.bookChunk.deleteMany({ where: { sourceId } });
            if (chunks.length > 0) {
                await tx.bookChunk.createMany({
                    data: chunks.map((content, index) => ({
                        sourceId,
                        bookId,
                        chunkIndex: index,
                        content,
                    })),
                });
            }
            await tx.bookSource.update({
                where: { id: sourceId },
                data: { extractionStatus: client_1.ExtractionStatus.COMPLETED, extractedAt: new Date() },
            });
        });
    }
    listChunksByBookId(bookId, limit = 20) {
        return this.prisma.bookChunk.findMany({
            where: { bookId },
            orderBy: { chunkIndex: 'asc' },
            take: limit,
        });
    }
};
exports.BookRepository = BookRepository;
exports.BookRepository = BookRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookRepository);
//# sourceMappingURL=book.repository.js.map