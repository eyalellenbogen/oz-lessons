import { Module } from '@nestjs/common';
import { ContentModule } from '../content/content.module';
import { EquationsModule } from '../equations/equations.module';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [ContentModule, EquationsModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
