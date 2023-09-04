import { IBook } from "../interfaces/book.interface";
import { MysqlBookRepository } from "../repositories/mysql-book.repository";

export class BookService {
    repository = new MysqlBookRepository();

    getAll() {
        return this.repository.getAll().then(books => {
            return books;
        })
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