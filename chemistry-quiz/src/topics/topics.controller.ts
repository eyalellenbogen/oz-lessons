import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from '../content/content.service';

@Controller('topics')
export class TopicsController {
  constructor(private readonly content: ContentService) {}

  @Get()
  list() {
    return this.content.listTopics();
  }

  @Get(':id/lesson')
  lesson(@Param('id') id: string) {
    return this.content.getLesson(id);
  }
}
