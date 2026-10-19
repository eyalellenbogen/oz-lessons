import { Module } from '@nestjs/common';
import { ContentModule } from './content/content.module';
import { EquationsModule } from './equations/equations.module';
import { QuizModule } from './quiz/quiz.module';
import { TopicsModule } from './topics/topics.module';

@Module({ imports: [ContentModule, EquationsModule, QuizModule, TopicsModule] })
export class AppModule {}
