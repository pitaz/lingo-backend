import { type Request, type Response } from "express";
import { db } from "../config/db";
import { Questions } from "../models/questions";

/**
 * @description Question Controller class
 */
class QuestionsController {
  /**
   * @description - create question
   * @param { object } req
   * @param { object } res
   * @returns { object } Returned object
   */
  static async createQuestion(
    req: Request,
    res: Response
  ): Promise<{ res: Response<any, Record<string, any>> }> {
    try {
      const data = req.body;

      const question = await db.collection("questions").doc().set(data);

      const payload = {
        question,
        message: "Question successfully created",
      };

      return {
        res: res.status(201).json(payload),
      };
    } catch (error) {
      return {
        res: res.status(500).json({
          message: `Something went wrong, please try again.... ${error}`,
        }),
      };
    }
  }

  /**
   * @description - validate answer
   * @param { object } req
   * @param { object } res
   * @returns { object } Returned object
   */
  static async validateAnswer(
    req: Request,
    res: Response
  ): Promise<{ res: Response<any, Record<string, any>> }> {
    try {
      const questionId = req.params.id;
      const { answer } = req.body;

      const question = await db.collection("questions").doc(questionId);
      const data = await question.get();

      if (!data.exists) {
        return {
          res: res.status(404).json({ message: "question does not exist" }),
        };
      }
      let isCorrect;
      if (answer === data.data().answer) {
        isCorrect = true
      } else {
        isCorrect = false
      }

      return {
        res: res.status(201).json({
          isCorrect,
          data: data.data()
        }),
      };
    } catch (error) {
      return {
        res: res.status(500).json({
          message: `Something went wrong, please try again.... ${error}`,
        }),
      };
    }
  }

  /**
   * @description - get questions
   * @param { object } req
   * @param { object } res
   * @returns { object } Returned object
   */
  static async getAllQuestions(
    req: Request,
    res: Response
  ): Promise<{ res: Response<any, Record<string, any>> }> {
    try {
      const questions = await db.collection("questions");
      const data = await questions.get();
      const questionsArray: Questions[] = [];
      if (data.empty) {
        return {
          res: res.status(404).json({
            message: "No question found!",
          }),
        };
      } else {
        data.forEach((doc) => {
          const { id } = doc;
          const options = doc.data().options;
          const question = doc.data().question;

          const questionData = new Questions({
            id,
            question,
            options,
          });
          questionsArray.push(questionData);
        });
        return {
          res: res.status(200).json({
            data: questionsArray,
          }),
        };
      }
    } catch (error) {
      return {
        res: res.status(500).json({
          message: `Something went wrong, please try again.... ${error.message}`,
        }),
      };
    }
  }
}

export default QuestionsController;
