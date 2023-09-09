import { Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { ROUTE_PATH } from "../utils/route-path.util";
import { emailExistValidator, emailValidator, firstNameValidator, lastNameValidator, passwordRegexValidator, passwordValidator } from "../validators/auth.validator";

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
    ROUTE_PATH.AUTH.SIGNUP, 
    [
        firstNameValidator,
        lastNameValidator,
        emailValidator,
        emailExistValidator,
        passwordRegexValidator
    ],
    (req: Request, res: Response) => authController.postSignUp(req, res)
);

authRouter.post(
    ROUTE_PATH.AUTH.SIGNIN,
    [
        emailValidator,
        passwordValidator
    ],
    (req: Request, res: Response) => authController.postSignIn(req, res)
);

authRouter.get(ROUTE_PATH.AUTH.LOGOUT, (req: Request, res: Response) => authController.getLogout(req, res))

export default authRouter;