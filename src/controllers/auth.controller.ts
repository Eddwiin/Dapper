import { hash as bcryptHash } from 'bcrypt';
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IUser } from "../interfaces/user.interface";
import { AuthService } from "../services/auth.service";
import { returnErrorsStatus } from "../utils/errors-response.util";
export class AuthController {
    private authService = new AuthService();

    async postSignUp(req: Request,res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return returnErrorsStatus(res, errors);

        const { firstName, lastName, email, password } = req.body;
        const hashPassword = await bcryptHash(password, 12);

        const userToAdd: Omit<IUser, '_id'> = {
            firstName,
            lastName,
            email,
            password: hashPassword
        }

        return this.authService.saveUser(userToAdd)
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send(err))
    }
}