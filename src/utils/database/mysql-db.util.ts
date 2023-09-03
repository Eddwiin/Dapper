import { Sequelize } from "sequelize";

export class MysqlDB {
    private static instance: Sequelize | null = null;

    static getInstance() {
        if(this.instance === null) {
            this.instance = new Sequelize('dapper', 'root', 'azerty123', {
                dialect: 'mysql',
                host: 'localhost'
            })

            this.instance.sync().then()
        }

        return this.instance;
    }

}