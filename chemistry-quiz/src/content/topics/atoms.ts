import { QuestionBuilder } from '../builder';
import { Topic } from '../types';

const q = new QuestionBuilder('atoms');
const CHARGES = ['Positively charged', 'Negatively charged', 'Neutral'];

q.choice(
  'If the number of protons is GREATER than the number of electrons, the atom is...',
  CHARGES,
  'Positively charged',
  'More positive protons than negative electrons gives an overall positive charge.',
  { shuffle: false },
)
  .choice(
    'If the number of protons is LESS than the number of electrons, the atom is...',
    CHARGES,
    'Negatively charged',
    'More negative electrons than positive protons gives an overall negative charge.',
    { shuffle: false },
  )
  .choice(
    'If the number of protons EQUALS the number of electrons, the atom is...',
    CHARGES,
    'Neutral',
    'The positive and negative charges cancel out.',
    { shuffle: false },
  )
  .choice(
    'Which particle has a positive charge?',
    ['Proton', 'Neutron', 'Electron'],
    'Proton',
    'Protons are positive (+1).',
  )
  .choice(
    'Which particle has a negative charge?',
    ['Proton', 'Neutron', 'Electron'],
    'Electron',
    'Electrons are negative (-1).',
  )
  .choice(
    'Which particle has no charge?',
    ['Proton', 'Neutron', 'Electron'],
    'Neutron',
    'Neutrons are neutral (0).',
  )
  .multi(
    'Select ALL the particles found in the nucleus.',
    ['Protons', 'Neutrons', 'Electrons'],
    ['Protons', 'Neutrons'],
    'Electrons travel around the outside of the nucleus in rings.',
  )
  .choice(
    'Which particle has almost no mass?',
    ['Proton', 'Neutron', 'Electron'],
    'Electron',
    'An electron is about 1,800 times lighter than a proton or neutron.',
  )
  .choice(
    'Where are the electrons found?',
    ['In the nucleus', 'In rings around the nucleus', 'Inside the protons'],
    'In rings around the nucleus',
    'The nucleus holds protons and neutrons. Electrons orbit in rings (shells).',
  )
  .choice(
    'As you add protons, what happens to the element?',
    ['It stays the same', 'It becomes a different element', 'It becomes a compound'],
    'It becomes a different element',
    'Hydrogen has 1 proton, helium 2, lithium 3... the proton count IS the element.',
  )
  .choice(
    'What determines which element an atom is?',
    ['Number of protons', 'Number of neutrons', 'Number of electrons'],
    'Number of protons',
    'The atomic number (number of protons) names the element.',
  )
  .choice(
    'How many electrons fit in the FIRST ring around the nucleus?',
    ['1', '2', '8', '18'],
    '2',
    'The first ring holds 2.',
    { shuffle: false },
  )
  .choice(
    'How many electrons fit in the SECOND ring around the nucleus?',
    ['2', '4', '8', '18'],
    '8',
    'The second ring holds 8.',
    { shuffle: false },
  )
  .choice(
    'Which element has 1 electron on its outermost ring?',
    ['Hydrogen', 'Helium', 'Carbon', 'Oxygen'],
    'Hydrogen',
    'Hydrogen has 1 electron total, so its outer ring has 1.',
  )
  .choice(
    'Which element has 2 electrons on its outermost ring?',
    ['Hydrogen', 'Helium', 'Carbon', 'Fluorine'],
    'Helium',
    'Helium has 2 electrons, which fills its first ring.',
  )
  .choice(
    'Which element has 6 electrons on its outermost ring?',
    ['Lithium', 'Carbon', 'Oxygen', 'Neon'],
    'Oxygen',
    'Oxygen has 8 electrons: 2 in the first ring and 6 in the second.',
  )
  .choice(
    'Which element has 7 electrons on its outermost ring?',
    ['Oxygen', 'Fluorine', 'Neon', 'Sodium'],
    'Fluorine',
    'Fluorine has 9 electrons: 2 in the first ring and 7 in the second.',
  )
  .choice(
    'How many electrons are on the outermost ring of carbon (6 electrons total)?',
    ['2', '4', '6', '8'],
    '4',
    '2 fill the first ring, leaving 4 for the second.',
    { shuffle: false },
  )
  .choice(
    'Changing what changes the element shown on the periodic table?',
    ['Number of protons', 'Number of neutrons', 'Number of electrons'],
    'Number of protons',
    'Only a change in protons turns one element into another.',
  )
  .multi(
    'Select ALL the things that change when you add or remove a PROTON.',
    ['Element', 'Charge', 'Mass'],
    ['Element', 'Charge', 'Mass'],
    'A proton changes the element, adds +1 charge and adds 1 to the mass.',
  )
  .multi(
    'Select ALL the things that change when you add or remove a NEUTRON.',
    ['Element', 'Charge', 'Mass'],
    ['Mass'],
    'Neutrons have no charge and do not name the element. They only change the mass.',
  )
  .multi(
    'Select ALL the things that change when you add or remove an ELECTRON.',
    ['Element', 'Charge', 'Mass'],
    ['Charge'],
    'Electrons change the charge. Their mass is so tiny we ignore it.',
  )
  .choice(
    'An atom has 8 protons, 8 neutrons and 10 electrons. What is its charge?',
    ['0', '+2', '-2', '+8'],
    '-2',
    '8 positive and 10 negative leaves 2 extra negatives.',
  )
  .choice(
    'An atom has 17 protons and 18 neutrons. What is its mass number?',
    ['17', '18', '35', '1'],
    '35',
    'Mass number = protons + neutrons = 17 + 18.',
  )
  .choice(
    'Which element has 11 protons?',
    ['Neon', 'Sodium', 'Magnesium', 'Fluorine'],
    'Sodium',
    'Sodium is element number 11.',
  );

export const atoms: Topic = {
  meta: {
    id: 'atoms',
    code: 'LS.8.1.2',
    title: 'Atomic Structure',
    summary: 'Protons, neutrons, electrons, charge, mass and the rings around the nucleus.',
  },
  lesson: {
    slides: [
      {
        title: 'Three particles inside every atom',
        points: [
          'Protons and neutrons are packed together in the center, called the **nucleus**.',
          'Electrons zip around the nucleus in **rings** (shells).',
          'Protons and neutrons weigh about the same. An electron is about 1,800 times lighter, so its mass is nearly zero.',
        ],
        visual: {
          type: 'table',
          headers: ['Particle', 'Charge', 'Location', 'Mass'],
          rows: [
            ['Proton', '+1 (positive)', 'In the nucleus', '1 amu'],
            ['Neutron', '0 (neutral)', 'In the nucleus', '1 amu'],
            ['Electron', '-1 (negative)', 'In rings around the nucleus', 'almost 0'],
          ],
        },
        tip: 'Protons are Positive, Neutrons are Neutral, and Electrons are the negative ones.',
      },
      {
        title: 'Build an atom',
        points: [
          'Use the buttons to add or remove particles and watch what changes.',
          'Changing **protons** changes the element.',
          'Changing **neutrons** only changes the mass.',
          'Changing **electrons** only changes the charge.',
        ],
        visual: { type: 'bohr' },
        tip: 'Try this: build carbon (6 protons), then keep adding protons and watch the name change.',
      },
      {
        title: 'Charge, mass and the outer ring',
        points: [
          'Protons = electrons: **neutral**. More protons: **positive**. More electrons: **negative**.',
          '**Atomic number** = number of protons. It names the element.',
          '**Mass number** = protons + neutrons.',
          'The first ring holds **2** electrons. The second ring holds **8**.',
        ],
        visual: {
          type: 'table',
          headers: ['Element', 'Protons', 'Electrons', 'Electrons on outer ring'],
          rows: [
            ['Hydrogen', '1', '1', '1'],
            ['Helium', '2', '2', '2'],
            ['Carbon', '6', '6', '4'],
            ['Oxygen', '8', '8', '6'],
            ['Fluorine', '9', '9', '7'],
            ['Neon', '10', '10', '8'],
          ],
        },
      },
    ],
  },
  questions: q.questions,
};
