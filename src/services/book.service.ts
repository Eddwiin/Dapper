import { IBook } from "../interfaces/book.interface";
import { BookRepository } from "../repositories/book.repository";

export class BookService {
    // repository = new MysqlBookRepository();
    repository = new BookRepository();

    getAll() {
        return this.repository.getAll();
    }

    getById(id: string) {
        return this.repository.getById(id);
    }

    update(book: IBook) {
        return this.repository.update(book)
    }

    save(book: Omit<IBook, 'id'>) {
        return this.repository.save(book);
    }

    delete(id: string) {
        return this.repository.delete(id);
    }
}