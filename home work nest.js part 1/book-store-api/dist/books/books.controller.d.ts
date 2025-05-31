interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
}
export declare class BooksController {
    private books;
    getAllBooks(author?: string): Book[];
    getBookById(id: string): Book;
    createBook(bookData: Omit<Book, 'id'>): Book;
    updateBook(id: string, updateData: Partial<Book>): Book;
    deleteBook(id: string): void;
}
export {};
