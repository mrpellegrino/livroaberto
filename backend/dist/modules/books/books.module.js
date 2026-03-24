"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksModule = void 0;
const common_1 = require("@nestjs/common");
const books_controller_1 = require("./presentation/controllers/books.controller");
const book_repository_1 = require("./repositories/book.repository");
const create_book_usecase_1 = require("./use-cases/create-book.usecase");
const list_books_usecase_1 = require("./use-cases/list-books.usecase");
const upload_book_pdf_usecase_1 = require("./use-cases/upload-book-pdf.usecase");
const list_book_chunks_usecase_1 = require("./use-cases/list-book-chunks.usecase");
let BooksModule = class BooksModule {
};
exports.BooksModule = BooksModule;
exports.BooksModule = BooksModule = __decorate([
    (0, common_1.Module)({
        controllers: [books_controller_1.BooksController],
        providers: [
            book_repository_1.BookRepository,
            create_book_usecase_1.CreateBookUseCase,
            list_books_usecase_1.ListBooksUseCase,
            upload_book_pdf_usecase_1.UploadBookPdfUseCase,
            list_book_chunks_usecase_1.ListBookChunksUseCase,
        ],
    })
], BooksModule);
//# sourceMappingURL=books.module.js.map