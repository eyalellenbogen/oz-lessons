import { QuestionBuilder } from '../builder';
import { Topic } from '../types';

const q = new QuestionBuilder('periodic');

/** [description, options, correct, why] */
const circle: [string, string[], string, string][] = [
  ['metal', ['Li', 'Si', 'S'], 'Li', 'Lithium is on the left side, which is where the metals are. Si is a metalloid and S is a nonmetal.'],
  ['element with the largest atomic mass', ['Na', 'Al', 'Ar'], 'Ar', 'Argon (about 40) is heavier than aluminum (27) and sodium (23).'],
  ['halogen', ['S', 'Cl', 'Ar'], 'Cl', 'Halogens are in group 17. Chlorine is one.'],
  ['element with the largest atomic number', ['Mg', 'S', 'K'], 'K', 'Potassium is 19. Sulfur is 16 and magnesium is 12.'],
  ['noble gas', ['O', 'F', 'Ne'], 'Ne', 'Noble gases are in group 18, the last column.'],
  ['alkali metal', ['Li', 'Be', 'B'], 'Li', 'Alkali metals are in group 1 (Li, Na, K...).'],
  ['nonmetal', ['H', 'Li', 'Na'], 'H', 'Hydrogen is a nonmetal even though it sits at the top left. Li and Na are alkali metals.'],
  ['alkaline earth metal', ['Ca', 'K', 'Si'], 'Ca', 'Alkaline earth metals are in group 2 (Be, Mg, Ca...).'],
  ['transition metal', ['Hg', 'K', 'Ca'], 'Hg', 'Transition metals fill the middle block. Mercury is one.'],
  ['metalloid', ['N', 'Al', 'Si'], 'Si', 'Metalloids sit on the staircase: B, Si, Ge, As, Sb, Te.'],
  ['gas at room temperature', ['B', 'C', 'N'], 'N', 'Nitrogen is a gas. Boron and carbon are solids.'],
  ['liquid at room temperature', ['Ca', 'Hg', 'H'], 'Hg', 'Mercury is one of only two liquid elements (the other is bromine).'],
  ['solid at room temperature', ['Mg', 'Cl', 'Kr'], 'Mg', 'Magnesium is a solid metal. Chlorine and krypton are gases.'],
];

for (const [desc, options, correct, why] of circle) {
  q.choice(`Which of these is a(n) **${desc}**?`, options, correct, why);
}

q.choice(
  'What is a column of the periodic table called?',
  ['A period', 'A group (family)', 'A series'],
  'A group (family)',
  'Columns are groups. Rows are periods.',
)
  .choice(
    'What is a row of the periodic table called?',
    ['A period', 'A group (family)', 'A series'],
    'A period',
    'Rows are periods. Columns are groups.',
  )
  .choice(
    'How are the elements arranged on the periodic table?',
    ['Alphabetically', 'By atomic number', 'By when they were discovered'],
    'By atomic number',
    'The number of protons goes up by one with each element.',
  )
  .choice(
    'Elements in the same group (column) tend to...',
    ['have similar properties', 'be the same color', 'have the same mass'],
    'have similar properties',
    'Same group, same number of outer electrons, similar behavior.',
  )
  .choice(
    'Which group is the noble gases?',
    ['Group 1', 'Group 2', 'Group 17', 'Group 18'],
    'Group 18',
    'The far right column. They are unreactive.',
    { shuffle: false },
  )
  .choice(
    'Which family is the MOST unreactive?',
    ['Alkali metals', 'Halogens', 'Noble gases', 'Alkaline earth metals'],
    'Noble gases',
    'Noble gases have full outer rings, so they rarely react.',
  )
  .choice(
    'Which group are the alkali metals in?',
    ['Group 1', 'Group 2', 'Group 17', 'Group 18'],
    'Group 1',
    'The first column (not counting hydrogen).',
    { shuffle: false },
  )
  .choice(
    'Which of these is a halogen?',
    ['Fluorine', 'Sodium', 'Neon', 'Carbon'],
    'Fluorine',
    'Halogens are group 17: F, Cl, Br, I.',
  )
  .choice(
    'Which side of the periodic table are most metals on?',
    ['Left and middle', 'Right', 'Only the top row'],
    'Left and middle',
    'Metals fill the left and middle. Nonmetals are on the right.',
  )
  .choice(
    'Where are the metalloids?',
    ['Along the staircase between metals and nonmetals', 'In the very first column', 'At the far right'],
    'Along the staircase between metals and nonmetals',
    'Metalloids have traits of both metals and nonmetals.',
  )
  .multi(
    'Select ALL the elements that are liquids at room temperature.',
    ['Mercury', 'Bromine', 'Iron', 'Chlorine', 'Gold'],
    ['Mercury', 'Bromine'],
    'Only mercury and bromine are liquids. Chlorine is a gas. Iron and gold are solids.',
  )
  .multi(
    'Select ALL the gases at room temperature.',
    ['Hydrogen', 'Oxygen', 'Mercury', 'Neon', 'Sodium'],
    ['Hydrogen', 'Oxygen', 'Neon'],
    'Mercury is a liquid and sodium is a solid.',
  );

q.classify('Which family contains **{item}**?',
  ['Alkali metals', 'Alkaline earth metals', 'Transition metals', 'Halogens', 'Noble gases'], [
    ['Sodium (Na)', 'Alkali metals', 'Sodium belongs to group 1.'],
    ['Potassium (K)', 'Alkali metals', 'Potassium belongs to group 1.'],
    ['Lithium (Li)', 'Alkali metals', 'Lithium belongs to group 1.'],
    ['Magnesium (Mg)', 'Alkaline earth metals', 'Magnesium belongs to group 2.'],
    ['Beryllium (Be)', 'Alkaline earth metals', 'Beryllium belongs to group 2.'],
    ['Calcium (Ca)', 'Alkaline earth metals', 'Calcium belongs to group 2.'],
    ['Iron (Fe)', 'Transition metals', 'Iron is in the middle block.'],
    ['Copper (Cu)', 'Transition metals', 'Copper is in the middle block.'],
    ['Silver (Ag)', 'Transition metals', 'Silver is in the middle block.'],
    ['Bromine (Br)', 'Halogens', 'Bromine belongs to group 17.'],
    ['Iodine (I)', 'Halogens', 'Iodine belongs to group 17.'],
    ['Chlorine (Cl)', 'Halogens', 'Chlorine belongs to group 17.'],
    ['Helium (He)', 'Noble gases', 'Helium belongs to group 18.'],
    ['Argon (Ar)', 'Noble gases', 'Argon belongs to group 18.'],
    ['Krypton (Kr)', 'Noble gases', 'Krypton belongs to group 18.'],
  ])
  .classify('Classify **{item}** as a metal, nonmetal or metalloid.', ['Metal', 'Nonmetal', 'Metalloid'], [
    ['Aluminum (Al)', 'Metal', 'Aluminum conducts electricity and is malleable.'],
    ['Zinc (Zn)', 'Metal', 'Zinc is a metal in the central part of the table.'],
    ['Phosphorus (P)', 'Nonmetal', 'Phosphorus lies on the nonmetal side of the staircase.'],
    ['Sulfur (S)', 'Nonmetal', 'Sulfur is a brittle nonmetal.'],
    ['Boron (B)', 'Metalloid', 'Boron sits along the staircase.'],
    ['Germanium (Ge)', 'Metalloid', 'Germanium has properties of both metals and nonmetals.'],
  ])
  .classify('What is the state of **{item}** at room temperature?', ['Solid', 'Liquid', 'Gas'], [
    ['Bromine (Br)', 'Liquid', 'Bromine is the only liquid nonmetal at room temperature.'],
    ['Copper (Cu)', 'Solid', 'Copper is solid at room temperature.'],
    ['Fluorine (F)', 'Gas', 'Fluorine is a gaseous halogen.'],
    ['Argon (Ar)', 'Gas', 'Argon is a noble gas.'],
  ]);

export const periodic: Topic = {
  meta: {
    id: 'periodic',
    code: 'LS.8.1.3',
    title: 'The Periodic Table',
    summary: 'Metals, nonmetals, metalloids, families and states at room temperature.',
  },
  lesson: {
    slides: [
      {
        title: 'The map of the elements',
        points: [
          'Elements are lined up by **atomic number** (number of protons).',
          'Rows are **periods**. Columns are **groups** (families).',
          'Elements in the same group act alike.',
          'Tap an element, or tap a color in the key to highlight a family.',
        ],
        visual: { type: 'periodic', mode: 'category' },
      },
      {
        title: 'Metals, nonmetals and metalloids',
        points: [
          'A staircase line runs from boron down to astatine and splits the table.',
          'Hydrogen is a nonmetal even though it sits at the top left.',
        ],
        visual: {
          type: 'table',
          headers: ['Type', 'Where', 'Traits', 'Examples'],
          rows: [
            ['Metals', 'Left and middle', 'Shiny, conduct heat and electricity, mostly solid', 'Li, Na, Fe, Hg'],
            ['Nonmetals', 'Right side (plus H)', 'Dull, poor conductors, gases or brittle solids', 'H, C, N, O, S'],
            ['Metalloids', 'On the staircase', 'A bit of both', 'B, Si, Ge, As, Sb, Te'],
          ],
        },
      },
      {
        title: 'Families to know',
        points: ['Same column, similar behavior. Learn these five.'],
        visual: {
          type: 'cards',
          cards: [
            { title: 'Alkali metals (group 1)', text: 'Li, Na, K. Soft, shiny, super reactive metals.' },
            { title: 'Alkaline earth metals (group 2)', text: 'Be, Mg, Ca. Reactive metals, a little less than group 1.' },
            { title: 'Transition metals (middle block)', text: 'Fe, Cu, Ag, Au, Hg. The familiar everyday metals.' },
            { title: 'Halogens (group 17)', text: 'F, Cl, Br, I. Very reactive nonmetals.' },
            { title: 'Noble gases (group 18)', text: 'He, Ne, Ar, Kr. Gases that almost never react.' },
          ],
        },
      },
      {
        title: 'State at room temperature',
        points: [
          'Only **11** elements are gases: hydrogen, nitrogen, oxygen, fluorine, chlorine and the noble gases.',
          'Only **two** are liquids: mercury (Hg) and bromine (Br).',
          'Almost everything else is a solid.',
        ],
        visual: { type: 'periodic', mode: 'state' },
      },
    ],
  },
  questions: q.questions,
};
