import express from 'express';
import  QuestionsController from '../controllers'
import { validation, validateAnswerInput } from '../utils/validationRules';
import QuestionValidation from '../middlewares/QuestionMiddleWare';

const router = express.Router();

// POST
router.post('/question', validation, QuestionValidation.validateInput, QuestionsController.createQuestion)
router.post('/question/validate-answer/:id', validateAnswerInput, QuestionValidation.validateInput, QuestionsController.validateAnswer);

// GET
router.get('/questions', QuestionsController.getAllQuestions)
 
export {
  router
}