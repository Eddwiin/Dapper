import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt';
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

    async postSignIn(req: Request, res: Response) {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) return returnErrorsStatus(res, errors);

        const { email, password: passwordFromBody } = req.body;
        const userFound: IUser = await this.authService.getUserByEmail(email);


        if (!userFound) return res.status(401).send('Invalid email or password');
        
        const isPasswordMatch = await bcryptCompare(passwordFromBody, userFound.password);
        
        if (!isPasswordMatch) return res.status(401).send('Invalid email or password');
        
        const userResToReturn: Omit<IUser, 'password'> =  {
            _id: userFound._id,
            firstName: userFound.firstName,
            lastName: userFound.lastName,
            email: userFound.email
        }
        
        return res.status(200).send(userResToReturn);
    }
}