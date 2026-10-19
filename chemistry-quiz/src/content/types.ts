export type TopicId = 'matter' | 'atoms' | 'periodic' | 'changes' | 'equations';

/** Each molecule is a string of atom letters: 'b' = black atom, 'w' = white atom. */
export interface ParticleSpec {
  molecules: { atoms: string; count: number }[];
}

export interface EquationDef {
  reactants: string[];
  products: string[];
}

export type Visual =
  | { type: 'tree' }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'cards'; cards: { title: string; formula?: string; text: string }[] }
  | { type: 'particles'; spec: ParticleSpec }
  | { type: 'gallery'; items: { label: string; spec: ParticleSpec }[] }
  | { type: 'bohr' }
  | { type: 'periodic'; mode: 'category' | 'state' }
  | { type: 'balancer'; equations: EquationDef[] }
  | { type: 'energy' };

export interface Slide {
  title: string;
  points: string[];
  visual?: Visual;
  tip?: string;
}

export interface Lesson {
  slides: Slide[];
}

export interface TopicMeta {
  id: TopicId;
  code: string;
  title: string;
  summary: string;
}

interface BaseQuestion {
  id: string;
  topic: TopicId;
  prompt: string;
  explanation: string;
  visual?: Visual;
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'choice';
  options: string[];
  answer: number;
  shuffleOptions: boolean;
}

export interface MultiQuestion extends BaseQuestion {
  type: 'multi';
  options: string[];
  answer: number[];
}

export interface EquationQuestion extends BaseQuestion {
  type: 'equation';
  equation: EquationDef;
  solution: number[];
}

export type Question = ChoiceQuestion | MultiQuestion | EquationQuestion;

export type PublicQuestion =
  | Omit<ChoiceQuestion, 'answer' | 'explanation'>
  | Omit<MultiQuestion, 'answer' | 'explanation'>
  | Omit<EquationQuestion, 'solution' | 'explanation'>;

export interface Topic {
  meta: TopicMeta;
  lesson: Lesson;
  questions: Question[];
}

export function toPublic(q: Question): PublicQuestion {
  switch (q.type) {
    case 'choice': {
      const { answer, explanation, ...pub } = q;
      return pub;
    }
    case 'multi': {
      const { answer, explanation, ...pub } = q;
      return pub;
    }
    case 'equation': {
      const { solution, explanation, ...pub } = q;
      return pub;
    }
  }
}
