import { checkSchema,validationResult } from "express-validator";

export const clientUpdateSchema = checkSchema({
  name: {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
    errorMessage: 'Name must be a valid string',
  },
  email: {
    in: ['body'],
    optional: true,
    isEmail: true,
    normalizeEmail: true,
    errorMessage: 'Must be a valid email',
  },
  job: {
    in: ['body'],
    optional: true,
    errorMessage: 'Must be a valid job',
  },
});

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
