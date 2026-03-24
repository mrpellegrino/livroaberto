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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadBookPdfUseCase = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const book_repository_1 = require("../repositories/book.repository");
let UploadBookPdfUseCase = class UploadBookPdfUseCase {
    bookRepository;
    storageRoot = (0, node_path_1.join)(process.cwd(), 'storage', 'books');
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async execute(bookId, file) {
        if (!file) {
            throw new common_1.BadRequestException('Arquivo PDF e obrigatorio.');
        }
        if (file.mimetype !== 'application/pdf') {
            throw new common_1.BadRequestException('Somente PDF e aceito neste endpoint.');
        }
        const book = await this.bookRepository.findById(bookId);
        if (!book) {
            throw new common_1.NotFoundException('Livro nao encontrado.');
        }
        const extension = (0, node_path_1.extname)(file.originalname) || '.pdf';
        const safeFileName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        const bookFolder = (0, node_path_1.join)(this.storageRoot, bookId);
        await (0, promises_1.mkdir)(bookFolder, { recursive: true });
        const filePath = (0, node_path_1.join)(bookFolder, safeFileName.endsWith(extension) ? safeFileName : `${safeFileName}${extension}`);
        await (0, promises_1.writeFile)(filePath, file.buffer);
        const source = await this.bookRepository.createSource({
            bookId,
            originalFileName: file.originalname,
            mimeType: file.mimetype,
            filePath,
            extractionStatus: client_1.ExtractionStatus.PENDING,
        });
        try {
            const raw = await (0, promises_1.readFile)(filePath);
            const parsed = await (0, pdf_parse_1.default)(raw);
            const normalizedText = this.normalizeText(parsed.text || '');
            if (!normalizedText) {
                throw new common_1.BadRequestException('Nao foi possivel extrair texto do PDF. Verifique se ele nao e escaneado.');
            }
            const chunks = this.chunkText(normalizedText, 1200, 200);
            const textPath = (0, node_path_1.join)(bookFolder, `${source.id}.txt`);
            await (0, promises_1.writeFile)(textPath, normalizedText, 'utf8');
            await this.bookRepository.updateSource(source.id, { textPath });
            await this.bookRepository.replaceChunksForSource(source.id, bookId, chunks);
            return { sourceId: source.id, chunks: chunks.length };
        }
        catch (error) {
            await this.bookRepository.updateSource(source.id, {
                extractionStatus: client_1.ExtractionStatus.FAILED,
            });
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Falha ao processar PDF.');
        }
    }
    normalizeText(text) {
        return text.replace(/\r/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    }
    chunkText(text, chunkSize, overlap) {
        const chunks = [];
        let start = 0;
        while (start < text.length) {
            const end = Math.min(start + chunkSize, text.length);
            const slice = text.slice(start, end).trim();
            if (slice.length > 0) {
                chunks.push(slice);
            }
            if (end === text.length) {
                break;
            }
            start = Math.max(end - overlap, start + 1);
        }
        return chunks;
    }
};
exports.UploadBookPdfUseCase = UploadBookPdfUseCase;
exports.UploadBookPdfUseCase = UploadBookPdfUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [book_repository_1.BookRepository])
], UploadBookPdfUseCase);
//# sourceMappingURL=upload-book-pdf.usecase.js.map