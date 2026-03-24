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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const permissions_decorator_1 = require("../../../../common/authorization/permissions.decorator");
const create_book_dto_1 = require("../../dtos/create-book.dto");
const create_book_usecase_1 = require("../../use-cases/create-book.usecase");
const list_books_usecase_1 = require("../../use-cases/list-books.usecase");
const upload_book_pdf_usecase_1 = require("../../use-cases/upload-book-pdf.usecase");
const list_book_chunks_usecase_1 = require("../../use-cases/list-book-chunks.usecase");
let BooksController = class BooksController {
    createBookUseCase;
    listBooksUseCase;
    uploadBookPdfUseCase;
    listBookChunksUseCase;
    constructor(createBookUseCase, listBooksUseCase, uploadBookPdfUseCase, listBookChunksUseCase) {
        this.createBookUseCase = createBookUseCase;
        this.listBooksUseCase = listBooksUseCase;
        this.uploadBookPdfUseCase = uploadBookPdfUseCase;
        this.listBookChunksUseCase = listBookChunksUseCase;
    }
    create(body) {
        return this.createBookUseCase.execute(body);
    }
    list() {
        return this.listBooksUseCase.execute();
    }
    uploadPdf(bookId, file) {
        return this.uploadBookPdfUseCase.execute(bookId, file);
    }
    listChunks(bookId, limit) {
        return this.listBookChunksUseCase.execute(bookId, limit ?? 20);
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)({ resource: 'books', action: 'create' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)({ resource: 'books', action: 'read' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(':id/upload-pdf'),
    (0, permissions_decorator_1.Permissions)({ resource: 'books', action: 'update' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "uploadPdf", null);
__decorate([
    (0, common_1.Get)(':id/chunks'),
    (0, permissions_decorator_1.Permissions)({ resource: 'books', action: 'read' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "listChunks", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [create_book_usecase_1.CreateBookUseCase,
        list_books_usecase_1.ListBooksUseCase,
        upload_book_pdf_usecase_1.UploadBookPdfUseCase,
        list_book_chunks_usecase_1.ListBookChunksUseCase])
], BooksController);
//# sourceMappingURL=books.controller.js.map