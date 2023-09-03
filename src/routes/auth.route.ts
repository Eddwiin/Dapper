import { Router } from "express";

const authRouter = Router();

authRouter.get('/', (req, res, next) => {
    res.send('<h1>Hello from auth</h1>');
})

export default authRouter;