import { TOPICS } from './index';
import { Lesson, Question, TopicId, TopicMeta } from './types';

export interface TopicSummary extends TopicMeta {
  slideCount: number;
  questionCount: number;
}

export class ContentService {
  private readonly questionsById = new Map<string, Question>(
    TOPICS.flatMap((t) => t.questions).map((q) => [q.id, q]),
  );

  listTopics(): TopicSummary[] {
    return TOPICS.map((t) => ({
      ...t.meta,
      slideCount: t.lesson.slides.length,
      questionCount: t.questions.length,
    }));
  }

  hasTopic(id: string): id is TopicId {
    return TOPICS.some((t) => t.meta.id === id);
  }

  getLesson(id: string): Lesson {
    const topic = TOPICS.find((t) => t.meta.id === id);
    if (!topic) throw new Error(`Unknown topic: ${id}`);
    return topic.lesson;
  }

  getQuestionsFor(ids: TopicId[]): Question[][] {
    return ids.map((id) => TOPICS.find((t) => t.meta.id === id)!.questions);
  }

  allTopicIds(): TopicId[] {
    return TOPICS.map((t) => t.meta.id);
  }

  getQuestion(id: string): Question | undefined {
    return this.questionsById.get(id);
  }
}
