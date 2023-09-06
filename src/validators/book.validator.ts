import { body } from "express-validator";

const idValidator = body('_id').notEmpty().withMessage('Must contains an _id');

const titleValidator = body('title').isString().withMessage('Must be a string')
  .isLength({ min: 3, max: 15}).withMessage('Must be between 3 and 15 letter').trim();

const priceValidator = body('price').isFloat({ min: 0.00}).withMessage('Must be a float with minimum value has 0.00').trim();

const descriptionValidator = body('description').notEmpty().withMessage('Must not be empty')
    .isString().withMessage('Must be a string').isLength({ min: 10, max: 60}).withMessage('Must be between 3 and 15 letter')
    .trim();

const authorValidator = body('author').notEmpty().withMessage('Must not be empty').isString().withMessage('Must be a string')
    .not().matches(/\d/).withMessage('Must not contain numbers').trim()

export { authorValidator, descriptionValidator, idValidator, priceValidator, titleValidator };

