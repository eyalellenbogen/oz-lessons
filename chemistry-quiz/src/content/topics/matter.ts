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

q.classify('Is **{item}** an element, compound or mixture?', [ELEMENT, COMPOUND, MIXTURE], [
  ['Pure copper wire', ELEMENT, 'Copper contains only copper atoms.'],
  ['Pure helium in a sealed tube', ELEMENT, 'Helium contains one kind of atom.'],
  ['Pure aluminum foil', ELEMENT, 'Aluminum is one element.'],
  ['Pure neon in a sign tube', ELEMENT, 'Neon is on the periodic table.'],
  ['Pure silicon crystal', ELEMENT, 'Silicon contains one kind of atom.'],
  ['Pure magnesium ribbon', ELEMENT, 'Magnesium is an element.'],
  ['Pure ammonia (NH3)', COMPOUND, 'Nitrogen and hydrogen are chemically bonded.'],
  ['Pure calcium carbonate (CaCO3)', COMPOUND, 'Calcium, carbon and oxygen are bonded in a fixed ratio.'],
  ['Pure methane (CH4)', COMPOUND, 'Carbon and hydrogen are bonded.'],
  ['Pure magnesium oxide (MgO)', COMPOUND, 'Magnesium and oxygen are bonded.'],
  ['Pure hydrogen peroxide (H2O2)', COMPOUND, 'Hydrogen and oxygen form one compound.'],
  ['Pure sodium bicarbonate (NaHCO3)', COMPOUND, 'This is one compound with a fixed formula.'],
  ['Pure glucose (C6H12O6)', COMPOUND, 'Glucose contains bonded carbon, hydrogen and oxygen.'],
  ['Brass made from copper and zinc', MIXTURE, 'An alloy combines substances physically.'],
  ['Ocean water containing dissolved salts', MIXTURE, 'Water and several salts are mixed.'],
  ['Concrete containing cement, sand and gravel', MIXTURE, 'Several materials are physically combined.'],
  ['Lemonade made from water, sugar and lemon juice', MIXTURE, 'Several substances are mixed.'],
  ['Helium and oxygen mixed in a tank', MIXTURE, 'Two elements are mixed without bonding.'],
  ['Carbon dioxide mixed with nitrogen', MIXTURE, 'A compound and an element are mixed.'],
  ['Sand stirred into salt water', MIXTURE, 'Sand, salt and water retain their identities.'],
])
  .classify('Is this mixture homogeneous or heterogeneous: **{item}**?', [HOM, HET], [
    ['Clear sugar water with all sugar dissolved', HOM, 'The composition is uniform throughout.'],
    ['Filtered black coffee with no grounds', HOM, 'The dissolved substances are evenly distributed.'],
    ['A uniform mixture of helium and neon gases', HOM, 'The gases are evenly mixed.'],
    ['A clear solution of copper sulfate in water', HOM, 'The dissolved compound is evenly distributed.'],
    ['Salt dissolved completely in warm water', HOM, 'There are no separate salt grains.'],
    ['A uniform copper-zinc brass sample', HOM, 'The alloy has a uniform composition.'],
    ['Clear apple juice with no pulp', HOM, 'Dissolved substances are evenly mixed.'],
    ['A uniform mixture of ethanol and water', HOM, 'The liquids mix into one phase.'],
    ['A clear sports drink with no sediment', HOM, 'Its dissolved ingredients are evenly distributed.'],
    ['A uniform mixture of nitrogen and argon', HOM, 'The gases mix evenly.'],
    ['Oil floating on water', HET, 'There are two visible layers.'],
    ['Orange juice with pulp', HET, 'Pulp is a separate visible component.'],
    ['Sand suspended in water', HET, 'Sand particles remain separate from the water.'],
    ['Granite with visible mineral crystals', HET, 'Different minerals form distinct regions.'],
    ['Cereal in milk', HET, 'The cereal and milk remain distinct.'],
    ['A pizza with vegetable toppings', HET, 'Different ingredients are visible.'],
    ['A mixture of iron filings and sulfur powder', HET, 'The solids remain separate particles.'],
    ['Muddy river water', HET, 'Suspended soil makes the composition nonuniform.'],
    ['A bowl of rice and beans', HET, 'The two components are visibly distinct.'],
    ['Water containing undissolved excess salt crystals', HET, 'The solid crystals form a separate phase.'],
  ])
  .classify('Which method best completes this separation: **{item}**?',
    ['Filtration', 'Evaporation', 'Magnet', 'Sieving', 'Distillation'], [
      ['Remove coffee grounds from brewed coffee', 'Filtration', 'A filter traps insoluble grounds.'],
      ['Collect chalk powder suspended in water', 'Filtration', 'Insoluble chalk stays on the filter.'],
      ['Remove tea leaves from tea using a fine filter', 'Filtration', 'The leaves are trapped while the liquid passes.'],
      ['Recover dissolved salt when collecting the water is unnecessary', 'Evaporation', 'Water leaves as vapor and salt remains.'],
      ['Recover copper sulfate crystals from its water solution', 'Evaporation', 'Removing water leaves the dissolved solid.'],
      ['Obtain sea salt from seawater in a shallow pond', 'Evaporation', 'The water evaporates and salt remains.'],
      ['Pull iron nails out of dry sawdust', 'Magnet', 'Iron is attracted to a magnet; sawdust is not.'],
      ['Collect steel paper clips from plastic beads', 'Magnet', 'Ordinary steel paper clips are magnetic.'],
      ['Separate iron filings from powdered sulfur before any reaction', 'Magnet', 'The unreacted iron retains its magnetism.'],
      ['Separate large pebbles from fine dry soil', 'Sieving', 'A screen separates particles by size.'],
      ['Remove large bran flakes from fine flour', 'Sieving', 'The fine flour passes through the mesh.'],
      ['Separate large beads from small beads using a mesh', 'Sieving', 'Only the smaller beads fit through the holes.'],
      ['Collect pure liquid water from salt water by boiling and condensing', 'Distillation', 'Water vapor is cooled and collected; salt stays behind.'],
      ['Recover liquid water from a sugar solution using a condenser', 'Distillation', 'Vaporized water condenses into a separate container.'],
      ['Separate water from dissolved nonvolatile dye and collect the water', 'Distillation', 'The dye stays behind while water vapor is condensed.'],
    ])
  .trueFalse('Two samples of the same pure compound have the same ratio of elements.', true, 'A compound has a fixed composition.')
  .trueFalse('Adding more water to a salt solution changes the formula of the salt.', false, 'Dilution changes the mixture ratio, not the identity of the salt.')
  .trueFalse('Oxygen gas (O2) is a compound because its molecules contain two atoms.', false, 'Both atoms are oxygen, so it is an element.')
  .trueFalse('A clear liquid must be a pure substance.', false, 'A homogeneous mixture, such as salt water, can also be clear.')
  .trueFalse('All mixtures contain substances in a fixed ratio.', false, 'Mixture proportions can vary.')
  .trueFalse('Filtering salt water through ordinary filter paper removes dissolved salt.', false, 'Dissolved salt passes through ordinary filter paper.')
  .trueFalse('Water molecules contain hydrogen and oxygen atoms chemically bonded together.', true, 'Water is a compound, not a mixture of the gases.')
  .trueFalse('Mixing two elements always produces a compound.', false, 'They may simply form a mixture without a chemical reaction.');

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
