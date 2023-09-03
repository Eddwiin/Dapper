import { Router } from "express";
import BookController from "../controllers/book.controller";

const bookRouter = Router();
const bookController = new BookController();

bookRouter.get('/', bookController.getBooks)

export default bookRouter;