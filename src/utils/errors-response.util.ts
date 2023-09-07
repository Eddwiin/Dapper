import { Response } from "express"
import { Result, ValidationError } from "express-validator"

export const returnErrorsStatus = (res: Response, errors: Result<ValidationError>) => {
    return res.status(422).send({
        errors: errors.array()
    })
}
