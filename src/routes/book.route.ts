import { Request, Response, Router } from "express";
import BookController from "../controllers/book.controller";
import { ROUTE_PATH } from "../utils/route-path.util";
import { authorValidator, descriptionValidator, idValidator, priceValidator, titleValidator } from "../validators/book.validator";

const bookRouter = Router();
const bookController = new BookController();

bookRouter.get(ROUTE_PATH.BOOK.ALL, (req, res) => bookController.getAll(req, res));

bookRouter.get(ROUTE_PATH.BOOK.GETBYID,(req, res) => bookController.getBookById(req, res));

bookRouter.post(
    ROUTE_PATH.BOOK.SAVE,
    [
        titleValidator,
        priceValidator,
        descriptionValidator,
        authorValidator
    ],
    (req: Request, res: Response) => bookController.save(req, res));

bookRouter.put(
    ROUTE_PATH.BOOK.UPDATE, 
    [
        idValidator,
        titleValidator,
        priceValidator,
        descriptionValidator,
        authorValidator
    ],
    (req: Request, res: Response) => bookController.update(req, res));

bookRouter.delete(ROUTE_PATH.BOOK.DELETE, (req, res) => bookController.delete(req, res));

export default bookRouter;
