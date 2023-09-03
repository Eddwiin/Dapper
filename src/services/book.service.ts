import { MysqlBookRepository } from "../repositories/mysql-book.repository";

export class BookService {

    getAll() {
        return new MysqlBookRepository().getAll().then(books => {
            return books;
        })
    }
}