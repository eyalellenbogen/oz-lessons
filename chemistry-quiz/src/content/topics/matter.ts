import { QuestionBuilder } from '../builder';
import { ParticleSpec, Topic } from '../types';

const P = (...parts: [string, number][]): ParticleSpec => ({
  molecules: parts.map(([atoms, count]) => ({ atoms, count })),
});

const ELEMENT = 'Element';
const COMPOUND = 'Compound';
const MIX_E = 'Mixture of elements';
const MIX_C = 'Mixture of compounds';
const MIX_EC = 'Mixture of elements and compounds';
const PARTICLE_OPTIONS = [ELEMENT, COMPOUND, MIX_E, MIX_C, MIX_EC];

const particleCases: [ParticleSpec, string, string][] = [
  [P(['b', 14]), ELEMENT, 'Every piece is the same single atom, so there is only one kind of matter: an element.'],
  [P(['ww', 8]), ELEMENT, 'Every piece is a pair of the SAME atom. Atoms of one kind only means an element.'],
  [P(['bb', 7]), ELEMENT, 'Every piece is a pair of the SAME atom. Atoms of one kind only means an element.'],
  [P(['w', 15]), ELEMENT, 'Only one kind of atom is present: an element.'],
  [P(['bww', 6]), COMPOUND, 'Every piece is identical and has different atoms bonded together: a compound.'],
  [P(['bw', 9]), COMPOUND, 'Every piece is identical and has two different atoms bonded: a compound.'],
  [P(['bbw', 6]), COMPOUND, 'Every piece is identical and made of different atoms bonded together: a compound.'],
  [P(['bwww', 5]), COMPOUND, 'One kind of molecule, made of different atoms: a compound.'],
  [P(['b', 7], ['w', 7]), MIX_E, 'Two kinds of single atoms, none bonded to each other: a mixture of elements.'],
  [P(['bb', 4], ['ww', 5]), MIX_E, 'Two different pairs, each made of one kind of atom: a mixture of elements.'],
  [P(['b', 6], ['ww', 5]), MIX_E, 'Both kinds of pieces are made of just one kind of atom: a mixture of elements.'],
  [P(['bw', 5], ['bww', 4]), MIX_C, 'Two different kinds of molecules, and both have different atoms bonded: a mixture of compounds.'],
  [P(['bbw', 4], ['bw', 4]), MIX_C, 'Two different compounds mixed together: a mixture of compounds.'],
  [P(['bww', 4], ['bwww', 4]), MIX_C, 'Two different compounds mixed together: a mixture of compounds.'],
  [P(['bw', 5], ['w', 5]), MIX_EC, 'The bonded pieces are a compound and the lone white atoms are an element: a mixture of both.'],
  [P(['bww', 4], ['bb', 4]), MIX_EC, 'A compound (bww) mixed with an element (bb pairs).'],
  [P(['bw', 4], ['b', 3], ['w', 3]), MIX_EC, 'A compound (bw) plus two lone elements (b and w).'],
];

const PURE = 'Pure substance';
const MIXTURE = 'Mixture';
const HET = 'Heterogeneous';
const HOM = 'Homogeneous';

const q = new QuestionBuilder('matter');

for (const [spec, correct, why] of particleCases) {
  q.choice('Classify this particle diagram.', PARTICLE_OPTIONS, correct, why, {
    visual: { type: 'particles', spec },
    shuffle: false,
  });
}

q.choice(
  'A mixture ___ a chemical combining of substances.',
  ['is', 'is not'],
  'is not',
  'Mixtures are only physically combined. Nothing is chemically bonded.',
  { shuffle: false },
)
  .choice(
    'What happens to the elements in a compound?',
    [
      'They keep their identities and properties',
      'They lose their identities and the compound has a new set of properties',
    ],
    'They lose their identities and the compound has a new set of properties',
    'Sodium (a metal) and chlorine (a poison gas) bond to form salt, which is totally different from both.',
  )
  .choice(
    'In a compound, the atoms are ___ combined.',
    ['chemically', 'physically'],
    'chemically',
    'Compounds are held together by chemical bonds.',
    { shuffle: false },
  )
  .choice(
    'The smallest identifiable unit of an element is a(n) ___.',
    ['atom', 'molecule'],
    'atom',
    'A molecule is atoms bonded together. A single atom is the smallest unit of an element.',
  )
  .choice(
    'A compound is made up of two or more ___ which are chemically bonded.',
    ['elements', 'mixtures'],
    'elements',
    'Compounds are built from elements bonded together.',
  )
  .trueFalse(
    'A mixture can only be made up of a combination of elements.',
    false,
    'A mixture can contain elements, compounds, or both.',
  )
  .choice(
    'In a mixture, the substances ___ their identities.',
    ['lose', 'keep'],
    'keep',
    'Nothing is bonded, so each substance stays what it was.',
  )
  .choice(
    'The substances in a mixture ___ be separated by a simple physical process.',
    ['can', 'cannot'],
    'can',
    'Filtering, evaporating, sieving and using a magnet are all physical processes.',
  )
  .choice(
    'The elements in a compound ___ be separated by a simple physical process because the elements are ___.',
    [
      'can, physically combined',
      'cannot, chemically bonded',
      'can, chemically bonded',
      'cannot, physically combined',
    ],
    'cannot, chemically bonded',
    'You need a chemical change to break bonds.',
  )
  .trueFalse(
    'An element can be broken down into a simpler substance.',
    false,
    'An element is already the simplest kind of matter (one kind of atom).',
  )
  .multi(
    'Select ALL the elements in this list.',
    ['Silver', 'Water', 'Oxygen', 'Air', 'Carbon Dioxide', 'Hydrogen', 'Gold', 'Sulfur', 'Wood'],
    ['Silver', 'Oxygen', 'Hydrogen', 'Gold', 'Sulfur'],
    'Water and carbon dioxide are compounds. Air and wood are mixtures.',
  )
  .multi(
    'Select ALL the elements in this list.',
    ['Alcohol', 'Carbon', 'Sugar', 'Magnesium', 'Chromium', 'Nitrogen', 'Salt', 'Nickel', 'Vitamin'],
    ['Carbon', 'Magnesium', 'Chromium', 'Nitrogen', 'Nickel'],
    'Alcohol, sugar, salt and vitamins are compounds. If it is on the periodic table, it is an element.',
  )
  .choice(
    'How would you separate and collect the sugar from a glass of sugar water?',
    ['Filter it through paper', 'Evaporate the water', 'Use a magnet', 'Sift it through a screen'],
    'Evaporate the water',
    'Dissolved sugar passes right through a filter. When the water evaporates, the sugar is left behind.',
  )
  .choice(
    'How would you separate sand and water?',
    ['Filtration', 'Evaporation', 'Use a magnet', 'Sieving'],
    'Filtration',
    'The water passes through the filter paper and the sand stays on it.',
  )
  .choice(
    'How would you separate sand and gravel?',
    ['Filtration', 'Evaporation', 'Use a magnet', 'Sieving with a screen'],
    'Sieving with a screen',
    'Small sand grains fall through the holes and the larger gravel stays on top.',
  )
  .choice(
    'How would you separate iron filings from sand?',
    ['Filtration', 'Evaporation', 'Use a magnet', 'Sieving with a screen'],
    'Use a magnet',
    'Only the iron is attracted to the magnet.',
  )
  .classify(
    'Is **{item}** a pure substance or a mixture?',
    [PURE, MIXTURE],
    [
      ['Air (nitrogen, oxygen and argon)', MIXTURE, 'Several substances are physically mixed.'],
      ['Sugar ([[C12H22O11]])', PURE, 'It has a chemical formula, so it is a compound.'],
      ['Gold', PURE, 'An element.'],
      ['Bronze', MIXTURE, 'An alloy: copper and tin mixed together.'],
      ['Carbon dioxide', PURE, 'A compound.'],
      ['Salt (NaCl)', PURE, 'A compound.'],
      ['Chlorine', PURE, 'An element.'],
      ['Water ([[H2O]])', PURE, 'A compound.'],
      ['Oxygen', PURE, 'An element.'],
      ['Salt water', MIXTURE, 'Salt dissolved in water. Both keep their identities.'],
      ['Octane ([[C8H18]])', PURE, 'It has a chemical formula, so it is a compound.'],
      ['Mercury', PURE, 'An element.'],
      ['Alcohol ([[C2H5OH]])', PURE, 'It has a chemical formula, so it is a compound.'],
      ['Gasoline', MIXTURE, 'A blend of many different compounds.'],
      ['Vitamin A ([[C20H30O]])', PURE, 'It has a chemical formula, so it is a compound.'],
    ],
  )
  .classify(
    'Is **{item}** heterogeneous or homogeneous?',
    [HET, HOM],
    [
      ['Air', HOM, 'The gases are evenly mixed.'],
      ['Trail mix', HET, 'You can see and pick out the different parts.'],
      ['Salt water', HOM, 'It looks the same throughout.'],
      ['A metal alloy', HOM, 'The metals are blended evenly.'],
      ['Sweet tea', HOM, 'It looks the same throughout.'],
      ['Energy drink', HOM, 'It looks the same throughout.'],
      ['Soil', HET, 'You can see sand, rocks and bits of plants.'],
      ['Vinegar', HOM, 'It looks the same throughout.'],
      ['Kool-Aid', HOM, 'The powder is dissolved evenly.'],
      ['Spice mix', HET, 'You can see the different spices.'],
      ['Fruit salad', HET, 'You can see the different fruits.'],
      ['A bowl of M&Ms', HET, 'You can see the different colors.'],
      ['A box of Legos', HET, 'Different pieces, clearly visible.'],
      ['Sprinkles', HET, 'Different colors and shapes you can see.'],
      ['Soup', HET, 'You can see noodles, vegetables and broth.'],
    ],
  );

export const matter: Topic = {
  meta: {
    id: 'matter',
    code: 'LS.8.1.1',
    title: 'Classification of Matter',
    summary: 'Elements, compounds, mixtures, particle diagrams and separating mixtures.',
  },
  lesson: {
    slides: [
      {
        title: 'Everything is matter',
        points: [
          '**Matter** is anything that has mass and takes up space.',
          'Scientists sort matter by asking one question: is it ONE kind of stuff, or SEVERAL kinds mixed together?',
          'Follow the tree to see how the sorting works.',
        ],
        visual: { type: 'tree' },
      },
      {
        title: 'Elements and compounds',
        points: [
          'An **atom** is the smallest identifiable unit of an element.',
          'An **element** has just one kind of atom. It cannot be broken down into anything simpler. Examples: gold, oxygen, carbon.',
          'A **compound** is two or more elements **chemically bonded**, like [[H2O]] or [[CO2]].',
          'In a compound the elements lose their identities. Sodium is a metal and chlorine is a poison gas, but together (NaCl) they make table salt!',
        ],
        visual: {
          type: 'gallery',
          items: [
            { label: '**Element**: one kind of atom', spec: P(['b', 10]) },
            { label: '**Element**: atoms can pair up, like [[O2]]', spec: P(['ww', 6]) },
            { label: '**Compound**: different atoms bonded', spec: P(['bww', 5]) },
          ],
        },
        tip: 'A compound can only be broken apart by a chemical change, not by a simple physical process.',
      },
      {
        title: 'Mixtures',
        points: [
          'A **mixture** is two or more substances that are only **physically** combined. Nothing is bonded.',
          'Each substance in a mixture **keeps its identity**.',
          'Mixtures can be separated by simple physical processes.',
          'A mixture can hold elements, compounds, or both.',
        ],
        visual: {
          type: 'cards',
          cards: [
            {
              title: 'Homogeneous',
              text: 'Looks the same all the way through. Examples: salt water, air, vinegar, metal alloys.',
            },
            {
              title: 'Heterogeneous',
              text: 'You can see different parts. Examples: trail mix, soil, fruit salad, a bowl of M&Ms.',
            },
          ],
        },
        tip: 'Homogeneous = the SAME throughout. Heterogeneous = DIFFERENT parts you can see.',
      },
      {
        title: 'How to read a particle diagram',
        points: [
          '**Step 1.** Are all the pieces identical? One kind of piece means a pure substance. More than one kind means a mixture.',
          '**Step 2.** Look inside a piece. Only one color of atom means an element. Different colors stuck together means a compound.',
          '**Step 3.** For a mixture, say what is mixed: elements, compounds, or both.',
        ],
        visual: {
          type: 'gallery',
          items: [
            { label: '**Element**', spec: P(['b', 10]) },
            { label: '**Compound**', spec: P(['bw', 7]) },
            { label: '**Mixture of elements**', spec: P(['b', 5], ['ww', 4]) },
            { label: '**Mixture of compounds**', spec: P(['bw', 4], ['bww', 3]) },
            { label: '**Mixture of elements and compounds**', spec: P(['bw', 4], ['w', 4]) },
          ],
        },
      },
      {
        title: 'Separating mixtures',
        points: [
          'Pick a method that uses a physical difference between the substances.',
          'Dissolved sugar slips through a filter, so to collect it you must evaporate the water.',
        ],
        visual: {
          type: 'table',
          headers: ['Mixture', 'Method', 'Why it works'],
          rows: [
            ['Sand + water', 'Filtration', 'Water passes through the filter, sand stays behind.'],
            ['Sugar or salt dissolved in water', 'Evaporation', 'The water becomes a gas and leaves the solid behind.'],
            ['Sand + gravel', 'Sieving (screen)', 'Small grains fall through, big pieces stay.'],
            ['Iron filings + sand', 'Magnet', 'Only the iron is attracted.'],
          ],
        },
      },
    ],
  },
  questions: q.questions,
};
