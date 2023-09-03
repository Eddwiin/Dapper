import { DOUBLE, INTEGER, STRING } from "sequelize";
import { Database } from "../../utils/database/database.util";


const BookModel = Database.getInstance().define('book', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    title: {
        type: STRING,
        allowNull: false
    },

    price: {
        type: DOUBLE,
        allowNull: false
    },

    description: {
        type: STRING,
        allowNull: false
    },

    author: {
        type: STRING,
        allowNull: false
    }
})

export default BookModel;