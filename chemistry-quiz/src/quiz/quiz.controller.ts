import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { CheckAnswerDto, QuizQueryDto } from './dto/quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quiz: QuizService) {}

  @Get()
  build(@Query() query: QuizQueryDto) {
    return this.quiz.buildQuiz(query.topics, query.count);
  }

  @Post('check')
  @HttpCode(200)
  check(@Body() dto: CheckAnswerDto) {
    return this.quiz.check(dto);
  }
}
