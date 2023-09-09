import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt';
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IUser } from "../interfaces/user.interface";
import { AuthService } from "../services/auth.service";
import { returnErrorsStatus } from "../utils/errors-response.util";

type RequestBody = Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password'>;
// type RequestSession = typeof session.Session & Partial<session.SessionData> & { isLoggedIn: boolean };

export class AuthController {
    private authService = new AuthService();

    async postSignUp(req: Request,res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return returnErrorsStatus(res, errors);

        const { firstName, lastName, email, password } = req.body as RequestBody;
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

        const { email, password: passwordFromBody } = req.body as RequestBody;
        const userFound: IUser = await this.authService.getUserByEmail(email);

        if (!userFound) return res.status(401).send('Invalid email or password');
        
        const isPasswordMatch = await bcryptCompare(passwordFromBody, userFound.password);

        if (!isPasswordMatch) return res.status(401).send('Invalid email or password');

        req.session.isLoggedIn = true;
        req.session.user = userFound;
        req.session.save();
        
        const userResToReturn: Omit<IUser, 'password'> =  {
            _id: userFound._id,
            firstName: userFound.firstName,
            lastName: userFound.lastName,
            email: userFound.email
        }

        // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
        return res.status(200).send(userResToReturn);
    }

    async postLogout(req: Request, res: Response) {
        req.session.destroy(err => {
            return (err) 
                ? res.status(500).send(err) 
                : res.send('Session is destroyed') 
        });
    }
}