import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { Permissions } from '../../../../common/authorization/permissions.decorator';
import { CreateBookDto } from '../../dtos/create-book.dto';
import { BookResponseDto } from '../../dtos/book-response.dto';
import { CreateBookUseCase } from '../../use-cases/create-book.usecase';
import { ListBooksUseCase } from '../../use-cases/list-books.usecase';
import { UploadBookPdfUseCase } from '../../use-cases/upload-book-pdf.usecase';
import { ListBookChunksUseCase } from '../../use-cases/list-book-chunks.usecase';
import { BookChunkResponseDto } from '../../dtos/book-chunk-response.dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly listBooksUseCase: ListBooksUseCase,
    private readonly uploadBookPdfUseCase: UploadBookPdfUseCase,
    private readonly listBookChunksUseCase: ListBookChunksUseCase,
  ) {}

  @Post()
  @Permissions({ resource: 'books', action: 'create' })
  create(@Body() body: CreateBookDto): Promise<BookResponseDto> {
    return this.createBookUseCase.execute(body);
  }

  @Get()
  @Permissions({ resource: 'books', action: 'read' })
  list(): Promise<BookResponseDto[]> {
    return this.listBooksUseCase.execute();
  }

  @Post(':id/upload-pdf')
  @Permissions({ resource: 'books', action: 'update' })
  @UseInterceptors(FileInterceptor('file'))
  uploadPdf(
    @Param('id') bookId: string,
    @UploadedFile() file: any,
  ): Promise<{ sourceId: string; chunks: number }> {
    return this.uploadBookPdfUseCase.execute(bookId, file);
  }

  @Get(':id/chunks')
  @Permissions({ resource: 'books', action: 'read' })
  listChunks(
    @Param('id') bookId: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<BookChunkResponseDto[]> {
    return this.listBookChunksUseCase.execute(bookId, limit ?? 20);
  }
}
