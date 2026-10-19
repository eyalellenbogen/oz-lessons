import { EquationDef, Question, TopicId, Visual } from './types';

/** [label, correct option, optional extra explanation] */
export type ClassifyItem = [label: string, correct: string, why?: string];

/** Builds questions for one topic. Correct answers are given by label so index mistakes cannot happen. */
export class QuestionBuilder {
  readonly questions: Question[] = [];

  constructor(private readonly topic: TopicId) {}

  private base(prompt: string, explanation: string, visual?: Visual) {
    return {
      id: `${this.topic}-${String(this.questions.length + 1).padStart(3, '0')}`,
      topic: this.topic,
      prompt,
      explanation,
      ...(visual ? { visual } : {}),
    };
  }

  choice(
    prompt: string,
    options: string[],
    correct: string,
    explanation: string,
    opts: { visual?: Visual; shuffle?: boolean } = {},
  ): this {
    const answer = options.indexOf(correct);
    if (answer < 0) throw new Error(`"${correct}" is not an option of: ${prompt}`);
    this.questions.push({
      ...this.base(prompt, explanation, opts.visual),
      type: 'choice',
      options,
      answer,
      shuffleOptions: opts.shuffle ?? true,
    });
    return this;
  }

  trueFalse(prompt: string, correct: boolean, explanation: string): this {
    return this.choice(prompt, ['True', 'False'], correct ? 'True' : 'False', explanation, { shuffle: false });
  }

  multi(prompt: string, options: string[], correct: string[], explanation: string): this {
    const answer = correct.map((label) => {
      const i = options.indexOf(label);
      if (i < 0) throw new Error(`"${label}" is not an option of: ${prompt}`);
      return i;
    });
    this.questions.push({ ...this.base(prompt, explanation), type: 'multi', options, answer });
    return this;
  }

  equation(reactants: string[], products: string[], solution: number[], explanation?: string): this {
    const equation = { reactants, products };
    this.questions.push({
      ...this.base(
        'Balance the equation by typing a whole-number coefficient in each blank.',
        explanation ?? 'Count each kind of atom on both sides and change one coefficient at a time. Use the smallest whole numbers.',
      ),
      type: 'equation',
      equation,
      solution,
    });
    return this;
  }

  /** One single-choice question per item; `{item}` in the template is replaced by the label. */
  classify(template: string, options: string[], items: ClassifyItem[], shuffle = false): this {
    for (const [label, correct, why] of items) {
      this.choice(
        template.replace('{item}', label),
        options,
        correct,
        `**${label}** → **${correct}**.${why ? ' ' + why : ''}`,
        { shuffle },
      );
    }
    return this;
  }
}
