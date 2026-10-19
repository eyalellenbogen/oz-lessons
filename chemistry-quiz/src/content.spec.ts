import { EquationsService } from './equations/equations.service';
import { TOPICS } from './content';
import { ContentService } from './content/content.service';
import { QuizService } from './quiz/quiz.service';
import { api } from '../public/js/api';

const equations = new EquationsService();
const questions = TOPICS.flatMap((t) => t.questions);
const content = new ContentService();
const quiz = new QuizService(content, equations);

describe('EquationsService', () => {
  it('counts atoms with parentheses', () => {
    expect(equations.countAtoms('Pb(NO3)2')).toEqual({ Pb: 1, N: 2, O: 6 });
    expect(equations.countAtoms('Ca(OH)2')).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(equations.countAtoms('C2H5OH')).toEqual({ C: 2, H: 6, O: 1 });
  });

  it('rejects malformed formulas', () => {
    for (const formula of ['', 'H2(O', 'H2)O', 'h2o', '2H', 'H2 O', 'H2+', '()', 'H()2', 'H0', 'H02', '(OH)0', 'H9007199254740992', '(H999999999)999999999']) {
      expect(() => equations.countAtoms(formula)).toThrow('Invalid formula');
    }
    expect(equations.countAtoms('Ca((OH)2)2')).toEqual({ Ca: 1, O: 4, H: 4 });
  });

  it('rejects invalid equation sides and coefficients', () => {
    for (const side of [[], Array(6).fill('H2'), [''], ['H2 O'], [null]]) {
      expect(() => equations.analyze(side as string[], ['H2'], [1, 1])).toThrow();
      expect(() => equations.analyze(['H2'], side as string[], [1, 1])).toThrow();
    }
    for (const coefficients of [[], [1], [0, 1], [-1, 1], [1.5, 1], [100, 1], [NaN, 1], [Infinity, 1], ['1', 1], null]) {
      expect(() => equations.analyze(['H2'], ['H2'], coefficients as number[])).toThrow();
    }
    expect(() => equations.analyze(['H()'], ['H'], [1, 1])).toThrow('Invalid formula');
  });

  it('detects balanced and unbalanced equations', () => {
    expect(equations.analyze(['H2', 'O2'], ['H2O'], [2, 1, 2])).toMatchObject({ balanced: true, lowestTerms: true });
    expect(equations.analyze(['H2', 'O2'], ['H2O'], [1, 1, 1]).balanced).toBe(false);
    expect(equations.analyze(['H2', 'O2'], ['H2O'], [4, 2, 4])).toMatchObject({ balanced: true, lowestTerms: false });
  });
});

describe('local quiz domain', () => {
  it('builds unique public questions evenly across selected topics', () => {
    const result = quiz.buildQuiz('matter,atoms,matter', 6);
    expect(result).toHaveLength(6);
    expect(new Set(result.map((question) => question.id)).size).toBe(6);
    expect(result.filter((question) => question.topic === 'matter')).toHaveLength(3);
    expect(result.filter((question) => question.topic === 'atoms')).toHaveLength(3);
    for (const question of quiz.buildQuiz(undefined, 60)) {
      expect(question).not.toHaveProperty('answer');
      expect(question).not.toHaveProperty('solution');
      expect(question).not.toHaveProperty('explanation');
    }
    for (const topic of TOPICS) {
      expect(quiz.buildQuiz(topic.meta.id, 60)).toHaveLength(Math.min(60, topic.questions.length));
    }
  });

  it('rejects invalid quiz inputs', () => {
    for (const count of [0, -1, 1.5, 61, NaN, Infinity]) {
      expect(() => quiz.buildQuiz(undefined, count)).toThrow('Question count');
    }
    for (const topics of ['', 'unknown', 'matter,', 'matter,,atoms', 'matter atoms']) {
      expect(() => quiz.buildQuiz(topics)).toThrow();
    }
    expect(() => quiz.check({ questionId: 'missing', answer: 0 })).toThrow('Unknown question');
    expect(() => content.getLesson('missing')).toThrow('Unknown topic');
  });

  it('checks every stored answer including all balancing solutions', () => {
    for (const question of questions) {
      const answer = question.type === 'equation' ? question.solution : question.answer;
      expect(quiz.check({ questionId: question.id, answer })).toMatchObject({
        correct: true,
        correctAnswer: answer,
        explanation: question.explanation,
      });
      if (question.type === 'equation') {
        expect(quiz.check({ questionId: question.id, answer: question.solution.map((value) => value * 2) })).toMatchObject({
          correct: false,
          analysis: { balanced: true, lowestTerms: false },
        });
      }
    }
  });

  it('rejects answers of the wrong shape and reports incorrect choices', () => {
    for (const question of questions) {
      const invalidAnswers = question.type === 'choice'
        ? [null, '0', [], -1, 0.5, question.options.length]
        : question.type === 'multi'
          ? [null, 0, ['0'], [-1], [0.5], [question.options.length]]
          : [null, 0, [], ['1'], question.solution.map(() => 0), question.solution.map(() => 100)];
      for (const answer of invalidAnswers) {
        expect(() => quiz.check({ questionId: question.id, answer })).toThrow('Answer does not match');
      }
      if (question.type === 'choice') {
        expect(quiz.check({ questionId: question.id, answer: (question.answer + 1) % question.options.length }).correct).toBe(false);
      }
      if (question.type === 'multi') {
        expect(quiz.check({ questionId: question.id, answer: [] }).correct).toBe(false);
        expect(quiz.check({ questionId: question.id, answer: [...question.answer].reverse() }).correct).toBe(true);
      }
    }
  });
});

describe('local API facade', () => {
  it('serves lessons, quizzes, checks and analysis without network access', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network must not be used'));
    try {
      const topics = await api.topics();
      expect(topics.map((topic) => topic.id)).toEqual(content.allTopicIds());
      const lesson = await api.lesson(topics[0].id);
      expect(lesson).toEqual(content.getLesson(topics[0].id));
      lesson.slides.length = 0;
      expect((await api.lesson(topics[0].id)).slides.length).toBeGreaterThan(0);
      expect(await api.quiz(['atoms'], 3)).toHaveLength(3);
      expect(await api.quiz([], 4)).toHaveLength(4);
      for (const question of questions) {
        const answer = question.type === 'equation' ? question.solution : question.answer;
        const result = await api.check(question.id, answer);
        expect(result.correct).toBe(true);
        if (Array.isArray(result.correctAnswer)) result.correctAnswer.length = 0;
        expect((await api.check(question.id, answer)).correctAnswer).toEqual(answer);
      }
      expect(await api.analyze({ reactants: ['H2', 'O2'], products: ['H2O'] }, [2, 1, 2])).toMatchObject({ balanced: true, lowestTerms: true });
      await expect(api.lesson('unknown')).rejects.toThrow('Unknown topic');
      await expect(api.quiz(['unknown'], 3)).rejects.toThrow('Unknown topic');
      await expect(api.quiz([], 0)).rejects.toThrow('Question count');
      await expect(api.check('unknown', 0)).rejects.toThrow('Unknown question');
      await expect(api.analyze({ reactants: ['H0'], products: ['H'] }, [1, 1])).rejects.toThrow('Invalid formula');
      expect(fetchSpy).not.toHaveBeenCalled();
    } finally {
      fetchSpy.mockRestore();
    }
  });
});

describe('quiz content', () => {
  it('has unique question ids', () => {
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
  });

  it('has a balanced, lowest-terms solution for every equation question', () => {
    for (const q of questions) {
      if (q.type !== 'equation') continue;
      const result = equations.analyze(q.equation.reactants, q.equation.products, q.solution);
      expect({ id: q.id, ...result }).toMatchObject({ id: q.id, balanced: true, lowestTerms: true });
    }
  });

  it('has valid answer indices', () => {
    for (const q of questions) {
      if (q.type === 'choice') expect(q.options[q.answer]).toBeDefined();
      if (q.type === 'multi') q.answer.forEach((i) => expect(q.options[i]).toBeDefined());
    }
  });
});
