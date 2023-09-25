import { type Response, type Request, type NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
/**
* @description ArticlesValidation class
*/
class QuestionValidation {
  /**
   * @description - validate question creation
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Returned object
   */
  static async validateInput(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }

}

export default QuestionValidation;