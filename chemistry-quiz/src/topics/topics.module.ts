import { Module } from '@nestjs/common';
import { ContentModule } from '../content/content.module';
import { TopicsController } from './topics.controller';

@Module({ imports: [ContentModule], controllers: [TopicsController] })
export class TopicsModule {}
