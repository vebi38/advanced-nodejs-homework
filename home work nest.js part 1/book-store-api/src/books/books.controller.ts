
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

@Controller('api/books')
export class BooksController {
  private books: Book[] = [
    { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  ];

  @Get()
  getAllBooks(@Query('author') author?: string): Book[] {
    if (author) {
      return this.books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }
    return this.books;
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Book {
    const book = this.books.find(book => book.id === +id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBook(@Body() bookData: Omit<Book, 'id'>): Book {
    const newBook: Book = {
      id: this.books.length ? this.books[this.books.length - 1].id + 1 : 1,
      ...bookData,
    };
    this.books.push(newBook);
    return newBook;
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() updateData: Partial<Book>): Book {
    const index = this.books.findIndex(book => book.id === +id);
    if (index === -1) {
      throw new NotFoundException('Book not found');
    }
    this.books[index] = { ...this.books[index], ...updateData };
    return this.books[index];
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteBook(@Param('id') id: string): void {
    const index = this.books.findIndex(book => book.id === +id);
    if (index === -1) {
      throw new NotFoundException('Book not found');
    }
    this.books.splice(index, 1);
  }
}
