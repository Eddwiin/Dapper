import { MysqlDB } from "./mysql-db.util";

export class Database {
    static getInstance() {
        return MysqlDB.getInstance();
    }
}