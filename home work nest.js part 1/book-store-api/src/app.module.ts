import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, BooksController],
  providers: [AppService],
})
export class AppModule {}


