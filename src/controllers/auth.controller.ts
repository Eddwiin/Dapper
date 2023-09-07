import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthService } from "../services/auth.service";
import { returnErrorsStatus } from "../utils/errors-response.util";

export class AuthController {
    private authService = new AuthService();

    postSignUp(req: Request,res: Response) {
        const errors = validationResult(req);

        if (errors.array().length > 0) return returnErrorsStatus(res, errors);

        return this.authService.saveUser(req.body)
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send(err))
    }
}