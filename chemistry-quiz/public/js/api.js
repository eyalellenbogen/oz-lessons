import { ContentService } from '../../src/content/content.service';
import { EquationsService } from '../../src/equations/equations.service';
import { QuizService } from '../../src/quiz/quiz.service';

const content = new ContentService();
const equations = new EquationsService();
const quiz = new QuizService(content, equations);

export const api = {
  topics: async () => structuredClone(content.listTopics()),
  lesson: async (id) => structuredClone(content.getLesson(id)),
  quiz: async (topicIds, count) => structuredClone(quiz.buildQuiz(topicIds.length ? topicIds.join(',') : undefined, count)),
  check: async (questionId, answer) => structuredClone(quiz.check({ questionId, answer })),
  analyze: async (equation, coefficients) => equations.analyze(equation.reactants, equation.products, coefficients),
};
