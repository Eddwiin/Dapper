import { NextFunction, Request, Response } from "express";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.isLoggedIn) return res.status(401).send('Not logged !') ;  
    
    next()
}

export default isAuth;