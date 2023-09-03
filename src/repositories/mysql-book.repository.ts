import BookModel from "../models/mysql/book.model";

export class MysqlBookRepository {
    getAll() {
        return BookModel.findAll();    
    }
}