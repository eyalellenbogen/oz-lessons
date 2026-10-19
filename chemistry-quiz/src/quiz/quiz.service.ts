import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { shuffle } from '../common/shuffle';
import { ContentService } from '../content/content.service';
import { PublicQuestion, Question, TopicId, toPublic } from '../content/types';
import { EquationAnalysis, EquationsService } from '../equations/equations.service';
import { CheckAnswerDto } from './dto/quiz.dto';

export interface CheckResult {
  correct: boolean;
  explanation: string;
  /** Option index for choice, option indices for multi, coefficients for equation. */
  correctAnswer: number | number[];
  analysis?: EquationAnalysis;
}

@Injectable()
export class QuizService {
  constructor(
    private readonly content: ContentService,
    private readonly equations: EquationsService,
  ) {}

  /** Draws questions evenly across the chosen topics, then shuffles them. */
  buildQuiz(topicsParam: string | undefined, count = 10): PublicQuestion[] {
    const requested = topicsParam ? [...new Set(topicsParam.split(','))] : this.content.allTopicIds();
    const unknown = requested.find((id) => !this.content.hasTopic(id));
    if (unknown) throw new BadRequestException(`Unknown topic: ${unknown}`);

    const pools = this.content.getQuestionsFor(requested as TopicId[]).map((p) => shuffle(p));
    const picked: Question[] = [];
    while (picked.length < count && pools.some((p) => p.length > 0)) {
      for (const pool of pools) {
        const next = pool.shift();
        if (next && picked.length < count) picked.push(next);
      }
    }
    return shuffle(picked).map(toPublic);
  }

  check(dto: CheckAnswerDto): CheckResult {
    const q = this.content.getQuestion(dto.questionId);
    if (!q) throw new NotFoundException(`Unknown question: ${dto.questionId}`);
    const bad = () => new BadRequestException('Answer does not match the question type.');

    switch (q.type) {
      case 'choice': {
        const a = dto.answer;
        if (typeof a !== 'number' || !Number.isInteger(a) || a < 0 || a >= q.options.length) throw bad();
        return { correct: a === q.answer, explanation: q.explanation, correctAnswer: q.answer };
      }
      case 'multi': {
        const a = dto.answer;
        if (!Array.isArray(a) || !a.every((i) => Number.isInteger(i) && i >= 0 && i < q.options.length)) throw bad();
        const chosen = new Set<number>(a);
        const correct = chosen.size === q.answer.length && q.answer.every((i) => chosen.has(i));
        return { correct, explanation: q.explanation, correctAnswer: q.answer };
      }
      case 'equation': {
        const a = dto.answer;
        const slots = q.equation.reactants.length + q.equation.products.length;
        if (!Array.isArray(a) || a.length !== slots || !a.every((n) => Number.isInteger(n) && n >= 1 && n <= 99)) {
          throw bad();
        }
        const analysis = this.equations.analyze(q.equation.reactants, q.equation.products, a);
        return {
          correct: analysis.balanced && analysis.lowestTerms,
          explanation: q.explanation,
          correctAnswer: q.solution,
          analysis,
        };
      }
    }
  }
}
