import { QuestionBuilder } from '../builder';
import { Topic } from '../types';

const SYNTH = 'Synthesis';
const DECOMP = 'Decomposition';
const COMBUST = 'Combustion';
const TYPES = [SYNTH, DECOMP, COMBUST];
const ENDO = 'Endothermic';
const EXO = 'Exothermic';

const q = new QuestionBuilder('equations');

q.choice(
  'What happens in a SYNTHESIS reaction?',
  [
    'Two or more reactants combine to make one product',
    'One reactant breaks into two or more products',
    'A fuel burns in oxygen',
  ],
  'Two or more reactants combine to make one product',
  'Synthesis: A + B → AB.',
)
  .choice(
    'What happens in a DECOMPOSITION reaction?',
    [
      'Two or more reactants combine to make one product',
      'One reactant breaks into two or more products',
      'A fuel burns in oxygen',
    ],
    'One reactant breaks into two or more products',
    'Decomposition: AB → A + B.',
  )
  .choice(
    'What are the products of a combustion reaction?',
    ['Carbon dioxide and water', 'Hydrogen and oxygen', 'Carbon and water', 'Only carbon dioxide'],
    'Carbon dioxide and water',
    'A fuel burning in oxygen always gives [[CO2]] and [[H2O]] (plus heat and light).',
  )
  .choice(
    'What does a combustion reaction need as a reactant, besides the fuel?',
    ['Oxygen ([[O2]])', 'Nitrogen ([[N2]])', 'Water ([[H2O]])', 'Carbon dioxide ([[CO2]])'],
    'Oxygen ([[O2]])',
    'Combustion means burning in oxygen.',
  )
  .multi(
    'Which two elements are in every fuel in these combustion reactions: [[C2H4]], [[C2H5OH]], [[CH3OH]], [[C2H2]]?',
    ['Carbon', 'Hydrogen', 'Nitrogen', 'Sulfur'],
    ['Carbon', 'Hydrogen'],
    'Each fuel has carbon and hydrogen. That is why the products are [[CO2]] and [[H2O]].',
  )
  .trueFalse(
    'In a chemical reaction, atoms are created or destroyed.',
    false,
    'Atoms are only rearranged. This is the law of conservation of mass, and it is why we balance equations.',
  )
  .trueFalse(
    'When balancing, you may change the small subscript numbers in a formula.',
    false,
    'Changing a subscript changes the substance. Only change the big coefficients in front.',
  )
  .choice(
    'What does the 2 in front of [[H2O]] (written 2 [[H2O]]) tell you?',
    ['There are 2 water molecules', 'Each water molecule has 2 oxygens', 'The water has a +2 charge'],
    'There are 2 water molecules',
    'A coefficient (big number in front) counts molecules. A subscript counts atoms in one molecule.',
  )
  .choice(
    'How many hydrogen atoms are in 2 [[H2O]]?',
    ['2', '3', '4', '6'],
    '4',
    '2 molecules × 2 hydrogens each = 4.',
    { shuffle: false },
  )
  .choice(
    'What type of reaction is [[C]] + [[O2]] → [[CO]]?',
    TYPES,
    SYNTH,
    'Two reactants combine into one product.',
    { shuffle: false },
  )
  .choice(
    'What type of reaction is [[N2]] + [[O2]] → [[N2O5]]?',
    TYPES,
    SYNTH,
    'Two reactants combine into one product.',
    { shuffle: false },
  )
  .choice(
    'What type of reaction is [[H2]] + [[O2]] → [[H2O]]?',
    TYPES,
    SYNTH,
    'Two reactants combine into one product.',
    { shuffle: false },
  )
  .choice(
    'What type of reaction is [[PCl3]] → [[P]] + [[Cl2]]?',
    TYPES,
    DECOMP,
    'One reactant splits into two products.',
    { shuffle: false },
  )
  .choice(
    'What type of reaction is [[H2O2]] → [[H2O]] + [[O2]]?',
    TYPES,
    DECOMP,
    'One reactant splits into two products.',
    { shuffle: false },
  )
  .choice(
    'What type of reaction is [[CH3OH]] → [[CO]] + [[H2]]?',
    TYPES,
    DECOMP,
    'One reactant splits into two products.',
    { shuffle: false },
  )
  .choice(
    'What type of reaction is [[C2H4]] + [[O2]] → [[CO2]] + [[H2O]]?',
    TYPES,
    COMBUST,
    'A fuel plus oxygen gives carbon dioxide and water.',
    { shuffle: false },
  )
  .choice(
    'What type of reaction is [[C2H5OH]] + [[O2]] → [[CO2]] + [[H2O]]?',
    TYPES,
    COMBUST,
    'A fuel plus oxygen gives carbon dioxide and water.',
    { shuffle: false },
  )
  // Synthesis
  .equation(['C', 'O2'], ['CO'], [2, 1, 2])
  .equation(['N2', 'O2'], ['N2O5'], [2, 5, 2])
  .equation(['P', 'O2'], ['P2O5'], [4, 5, 2])
  .equation(['C2H2', 'H2'], ['C2H6'], [1, 2, 1])
  // Decomposition
  .equation(['CH3OH'], ['CO', 'H2'], [1, 1, 2])
  .equation(['NO2'], ['NO', 'O2'], [2, 2, 1])
  .equation(['PCl3'], ['P', 'Cl2'], [2, 2, 3])
  .equation(['H2O2'], ['H2O', 'O2'], [2, 2, 1])
  // Combustion
  .equation(['C2H4', 'O2'], ['CO2', 'H2O'], [1, 3, 2, 2])
  .equation(['C2H5OH', 'O2'], ['CO2', 'H2O'], [1, 3, 2, 3])
  .equation(['CH3OH', 'O2'], ['CO2', 'H2O'], [2, 3, 2, 4])
  .equation(['C2H2', 'O2'], ['CO2', 'H2O'], [2, 5, 4, 2])
  // Level 1
  .equation(['SO3'], ['SO2', 'O2'], [2, 2, 1])
  .equation(['HCl'], ['H2', 'Cl2'], [2, 1, 1])
  .equation(['P4', 'F2'], ['PF3'], [1, 6, 4])
  .equation(['H2', 'F2'], ['HF'], [1, 1, 2])
  .equation(['H2', 'O2'], ['H2O'], [2, 1, 2])
  // Level 2
  .equation(['C2H6', 'Cl2'], ['C2H5Cl', 'HCl'], [1, 1, 1, 1])
  .equation(['C', 'H2O'], ['CH4', 'CO2'], [2, 2, 1, 1])
  .equation(['OF2', 'H2O'], ['O2', 'HF'], [1, 1, 1, 2])
  .equation(['SO2', 'H2'], ['S', 'H2O'], [1, 2, 1, 2])
  .equation(['CS2', 'O2'], ['CO2', 'SO2'], [1, 3, 1, 2])
  // Final challenge
  .equation(['NaNO3', 'PbO'], ['Pb(NO3)2', 'Na2O'], [2, 1, 1, 1])
  .equation(['Ca3P2', 'H2O'], ['Ca(OH)2', 'PH3'], [1, 6, 3, 2])
  .equation(['Fe2O3', 'CO'], ['Fe', 'CO2'], [1, 3, 2, 3])
  .equation(['NH3', 'O2'], ['NO2', 'H2O'], [4, 7, 4, 6])
  .equation(['FeS', 'O2'], ['Fe2O3', 'SO2'], [4, 7, 2, 4])
  .equation(['C3H6O2', 'O2'], ['CO2', 'H2O'], [2, 7, 6, 6])
  .choice(
    'What does EXOTHERMIC mean?',
    ['Energy is released (heat goes out)', 'Energy is absorbed (heat goes in)', 'No energy changes'],
    'Energy is released (heat goes out)',
    'Exo = exit. The surroundings get warmer.',
  )
  .choice(
    'What does ENDOTHERMIC mean?',
    ['Energy is released (heat goes out)', 'Energy is absorbed (heat goes in)', 'No energy changes'],
    'Energy is absorbed (heat goes in)',
    'Endo = enter. The surroundings get colder.',
  )
  .classify(
    'Is this endothermic or exothermic?\n\n**{item}**',
    [ENDO, EXO],
    [
      ['When two chemicals mix, their temperature rises', EXO, 'Temperature rising means heat is released.'],
      ['Plants take in light energy for photosynthesis', ENDO, 'Energy is absorbed.'],
      ['A solid burns brightly and releases heat, light and sound', EXO],
      ['When two chemicals are mixed, their temperature drops', ENDO, 'Temperature dropping means heat is absorbed.'],
      ['Two chemicals only react if you heat them continually', ENDO, 'It needs a constant supply of energy.'],
      ['An ice cube melts', ENDO, 'Ice absorbs heat to melt.'],
      ['An egg is cooked in a frying pan', ENDO, 'The egg absorbs heat.'],
      ['A match is burned', EXO],
      ['Our digestive system breaks down food for us to use as energy', EXO, 'Energy is released from the food.'],
      ['Morning dew forms on grass', EXO, 'Condensing releases heat.'],
      ['Dynamite explodes', EXO],
      ['An ice cube tray is placed in the freezer', EXO, 'Water releases heat as it freezes.'],
      ['A puddle of water evaporates', ENDO, 'Evaporating absorbs heat.'],
      ['Frost is converted to water vapor', ENDO, 'Changing to a gas absorbs heat.'],
    ],
  );

export const equations: Topic = {
  meta: {
    id: 'equations',
    code: 'LS.8.1.5',
    title: 'Chemical Equations and Energy',
    summary: 'Balancing equations, reaction types, and endothermic vs exothermic.',
  },
  lesson: {
    slides: [
      {
        title: 'Why we balance equations',
        points: [
          'An equation shows **reactants** (what you start with) turning into **products** (what you end with).',
          'Atoms are never created or destroyed. Both sides need the SAME number of each atom. This is the **law of conservation of mass**.',
          'A **subscript** (small number) is part of the formula. NEVER change it.',
          'A **coefficient** (big number in front) counts molecules. This is what you change.',
          'Try it: use + and - to change coefficients and watch the atom counts.',
        ],
        visual: {
          type: 'balancer',
          equations: [
            { reactants: ['H2', 'O2'], products: ['H2O'] },
            { reactants: ['N2', 'H2'], products: ['NH3'] },
            { reactants: ['CH4', 'O2'], products: ['CO2', 'H2O'] },
          ],
        },
      },
      {
        title: 'Balancing steps',
        points: [
          '**1.** Count each kind of atom on both sides.',
          '**2.** Start with an element that appears in only one place on each side. Save O and H (and lone elements like [[O2]]) for last.',
          '**3.** Change ONE coefficient at a time, then recount.',
          '**4.** Finish with the smallest whole numbers. If every coefficient is even, divide them all by 2.',
        ],
        visual: {
          type: 'balancer',
          equations: [
            { reactants: ['P', 'O2'], products: ['P2O5'] },
            { reactants: ['C2H5OH', 'O2'], products: ['CO2', 'H2O'] },
            { reactants: ['Fe2O3', 'CO'], products: ['Fe', 'CO2'] },
            { reactants: ['Ca3P2', 'H2O'], products: ['Ca(OH)2', 'PH3'] },
          ],
        },
      },
      {
        title: 'Three reaction types',
        points: ['Spot the pattern and you can name the reaction.'],
        visual: {
          type: 'cards',
          cards: [
            {
              title: 'Synthesis',
              formula: '[[H2]] + [[O2]] → [[H2O]]',
              text: 'Two or more reactants combine into ONE product. A + B → AB.',
            },
            {
              title: 'Decomposition',
              formula: '[[H2O2]] → [[H2O]] + [[O2]]',
              text: 'ONE reactant breaks into two or more products. AB → A + B.',
            },
            {
              title: 'Combustion',
              formula: '[[CH3OH]] + [[O2]] → [[CO2]] + [[H2O]]',
              text: 'A fuel (with carbon and hydrogen) burns in oxygen. The products are ALWAYS carbon dioxide and water.',
            },
          ],
        },
      },
      {
        title: 'Energy: endothermic vs exothermic',
        points: [
          '**Exothermic**: energy is released and the surroundings warm up. Burning, a match, dynamite, dew forming, freezing, digestion.',
          '**Endothermic**: energy is absorbed and the surroundings cool down. Photosynthesis, melting, evaporating, cooking an egg, anything that needs constant heating.',
        ],
        visual: { type: 'energy' },
        tip: 'Exo = EXit (heat leaves). Endo = ENter (heat goes in).',
      },
    ],
  },
  questions: q.questions,
};
