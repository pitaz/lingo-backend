import { body } from 'express-validator';
export const validation = [
  body('question')
  .notEmpty()
  .withMessage('Question must be a non-empty string'),

body('options')
  .isArray()
  .notEmpty()
  .withMessage('Options must be a non-empty array')
  .custom((options: string[]) => {
    if (options?.length < 2) {
      throw new Error('There should be at least two options');
    }
    return true;
  })
  .custom((options: string[]) => {
    const uniqueOptions = [...new Set(options)]; // Remove duplicate options
    if (options?.length !== uniqueOptions?.length) {
      throw new Error('Options must be unique');
    }
    return true;
  }),
  body('answer')
  .notEmpty()
  .withMessage('Answer must be a non-empty string')
]

export const validateAnswerInput = [
  body('answer')
  .notEmpty()
  .withMessage('Answer must be a non-empty string')
]