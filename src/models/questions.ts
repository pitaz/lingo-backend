import { QuizDTo } from "./dto/quizDTO";

export class Questions {
  private readonly question: string;
  private readonly id: string;
  private readonly options: string[];

  constructor(quizDto: QuizDTo) { 
    this.question = quizDto.question,
    this.id = quizDto.id
    this.options = quizDto.options
  }
}