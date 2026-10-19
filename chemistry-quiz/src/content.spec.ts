import { EquationsService } from './equations/equations.service';
import { TOPICS } from './content';

const equations = new EquationsService();
const questions = TOPICS.flatMap((t) => t.questions);

describe('EquationsService', () => {
  it('counts atoms with parentheses', () => {
    expect(equations.countAtoms('Pb(NO3)2')).toEqual({ Pb: 1, N: 2, O: 6 });
    expect(equations.countAtoms('Ca(OH)2')).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(equations.countAtoms('C2H5OH')).toEqual({ C: 2, H: 6, O: 1 });
  });

  it('rejects malformed formulas', () => {
    expect(() => equations.countAtoms('H2(O')).toThrow();
    expect(() => equations.countAtoms('h2o')).toThrow();
    expect(() => equations.countAtoms('2H')).toThrow();
  });

  it('detects balanced and unbalanced equations', () => {
    expect(equations.analyze(['H2', 'O2'], ['H2O'], [2, 1, 2])).toMatchObject({ balanced: true, lowestTerms: true });
    expect(equations.analyze(['H2', 'O2'], ['H2O'], [1, 1, 1]).balanced).toBe(false);
    expect(equations.analyze(['H2', 'O2'], ['H2O'], [4, 2, 4])).toMatchObject({ balanced: true, lowestTerms: false });
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
