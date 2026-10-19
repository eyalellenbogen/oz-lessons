import { QuestionBuilder } from '../builder';
import { Topic } from '../types';

const C = 'Chemical';
const P = 'Physical';
const OPTIONS = [P, C];

const q = new QuestionBuilder('changes');

q.classify('Is this a physical or chemical PROPERTY?\n\n**{item}**', OPTIONS, [
  ['Blue color', P, 'You can see it without changing the substance.'],
  ['Melting point', P],
  ['Density', P],
  ['Reacts with water', C, 'Reacting means turning into something new.'],
  ['Flammability (burns)', C, 'Burning makes new substances.'],
  ['Hardness', P],
  ['Solubility (dissolves)', P, 'Dissolving does not make a new substance.'],
  ['Boiling point', P],
  ['Reacts with acid', C],
  ['Luster (how shiny it is)', P],
  ['Combusts or catches fire', C],
  ['Has an odor', P, 'Your nose can tell without changing the substance.'],
  ['Tastes sour', P],
  ['Reacts with air', C],
  ['Oxygen is odorless and colorless', P],
  ['Copper turns green when exposed to the environment', C, 'It is reacting to form a new substance.'],
  ['The piece of metal is magnetic', P],
  ['The density of water is 1.0 g per cubic centimeter', P],
  ['Diamonds are a very hard substance', P],
  ['The tree is 8 meters high', P],
  ['Sodium reacts very easily with other elements', C],
  ['Copper conducts electricity', P],
  ['Water is a liquid', P],
  ['The mass of the NaCl sample is 30 grams', P],
  ['Gold is nonflammable', C, 'Flammability (or lack of it) describes how a substance reacts with fire.'],
  ['Alka-Seltzer tablets react with water to produce gas', C],
  ['The color of the ball is red', P],
  ['Iron reacts with oxygen and forms rust', C],
  ['The boiling point of water is 100 degrees C', P],
  ['Baking soda reacts with vinegar', C],
  ['The gas is flammable', C],
  ['Oxygen is a gas', P],
  ['Argon is not very reactive', C, 'How reactive something is is a chemical property.'],
  ['Nitrogen is a colorless gas', P],
  ['The silver spoons tarnished and turned dark', C],
  ["A student's shirt suddenly bursts into flames", C],
  ['Silver necklaces tarnish and turn green', C],
])
  .classify('Is this a physical or chemical CHANGE?\n\n**{item}**', OPTIONS, [
    ['NaCl (table salt) dissolves in water', P, 'You can evaporate the water and get the salt back.'],
    ['Milk sours', C, 'New substances with a new smell and taste.'],
    ['Silver tarnishes', C],
    ['Sugar dissolves in water', P],
    ['An apple is cut', P, 'Only the shape changes.'],
    ['Wood rots', C],
    ['Heat changes water to steam', P, 'Still water, just a different state.'],
    ['Pancakes cook', C],
    ['Baking soda reacts with vinegar', C, 'Gas bubbles show a new substance forming.'],
    ['Grass grows', C, 'The plant makes new substances (photosynthesis).'],
    ['Iron rusts', C],
    ['A tire is inflated', P],
    ['Alcohol evaporates', P],
    ['Food is digested', C],
    ['Ice melts', P],
    ['Paper towels absorb water', P],
    ['An ice cube is placed in the sun, becomes a puddle, and later the puddle is gone', P, 'Melting then evaporating. It is water the whole time.'],
    ['Two chemicals are mixed together and a gas is produced', C, 'A gas appearing is a sign of a new substance.'],
    ['A bicycle changes color as it rusts', C],
    ['A solid is crushed to a powder', P],
    ['Two substances are mixed and light is produced', C],
    ['A piece of ice melts and reacts with sodium', C, 'Melting is physical, but reacting with sodium makes new substances.'],
    ['Mixing salt and pepper', P, 'Nothing new forms. You could pick them apart.'],
    ['Chocolate syrup is dissolved in milk', P],
    ['A marshmallow is toasted over a campfire', C, 'Browning and burning make new substances.'],
    ['A marshmallow is cut in half', P],
    ['Crushing rocks', P],
    ['Condensation', P],
    ['Baking a cake', C],
    ['Water freezes to produce ice', P],
    ['A piece of magnesium ribbon is placed into hydrochloric acid and bubbling is observed', C],
  ])
  .trueFalse(
    'Changing the size and shapes of pieces of wood would be a chemical change.',
    false,
    'Cutting or shaping wood only changes how it looks. It is a physical change.',
  )
  .trueFalse(
    'In a physical change, the makeup of matter is changed.',
    false,
    'In a physical change the substance stays the same. Only a chemical change changes the makeup.',
  )
  .trueFalse('Evaporation occurs when liquid water changes into a gas.', true, 'Liquid to gas is evaporation.')
  .trueFalse('Evaporation is a physical change.', true, 'It is still water, just a different state.')
  .trueFalse('Burning wood is a physical change.', false, 'Burning makes ash, smoke and gases. It is chemical.')
  .trueFalse(
    'Combining hydrogen and oxygen to make water is a physical change.',
    false,
    'New substances are made, so it is chemical.',
  )
  .trueFalse('Breaking up concrete is a physical change.', true, 'Smaller pieces, same stuff.')
  .trueFalse('When ice cream melts, a chemical change occurs.', false, 'Melting is physical.')
  .trueFalse(
    'Acid rain damaging a marble statue is a physical change.',
    false,
    'The acid reacts with the marble to make new substances. It is chemical.',
  )
  .choice(
    'Which kind of property can be easily observed with your five senses?',
    OPTIONS,
    P,
    'Color, odor, texture and shape are physical properties.',
    { shuffle: false },
  )
  .choice(
    'Which kind of property usually describes how a substance reacts?',
    OPTIONS,
    C,
    'Reactivity, flammability and rusting are chemical properties.',
    { shuffle: false },
  )
  .choice(
    'Which kind of property is NOT as easy to observe?',
    OPTIONS,
    C,
    'You have to see how a substance reacts to find out.',
    { shuffle: false },
  )
  .choice(
    'Which of these is NOT a sign of a chemical change?',
    ['Gas bubbles form', 'A color change', 'Light or heat is given off', 'The shape changes'],
    'The shape changes',
    'Shape change is physical. Gas, color change, light/heat, and a new solid forming are signs of a chemical change.',
  );

export const changes: Topic = {
  meta: {
    id: 'changes',
    code: 'LS.8.1.4',
    title: 'Physical and Chemical Changes',
    summary: 'Physical vs chemical properties and changes, and the signs of a reaction.',
  },
  lesson: {
    slides: [
      {
        title: 'Physical vs chemical properties',
        points: [
          'A **property** describes a substance.',
          'You can observe a **physical** property without changing what the substance is.',
          'A **chemical** property describes how a substance reacts or turns into something new.',
        ],
        visual: {
          type: 'table',
          headers: ['Type', 'How to spot it', 'Examples'],
          rows: [
            [
              'Physical',
              'Use your senses or a measuring tool',
              'Color, odor, melting point, boiling point, density, hardness, luster, solubility, magnetic',
            ],
            [
              'Chemical',
              'Ask: can it react?',
              'Flammability, reacts with water, reacts with acid, reacts with air, rusts, tarnishes',
            ],
          ],
        },
        tip: 'Physical = look, measure, feel. Chemical = "what happens if I react it?"',
      },
      {
        title: 'Physical vs chemical changes',
        points: [
          'In a **physical change** the makeup of the matter stays the same. Only the size, shape or state changes.',
          'In a **chemical change** atoms are rearranged to make **new substances**.',
          'Dissolving sugar or salt is physical. Evaporate the water and you get them back.',
        ],
        visual: {
          type: 'cards',
          cards: [
            {
              title: 'Physical change',
              text: 'Cutting, crushing, melting, freezing, evaporating, condensing, dissolving, mixing.',
            },
            {
              title: 'Chemical change',
              text: 'Burning, rusting, tarnishing, rotting, cooking, digesting, baking soda + vinegar, photosynthesis.',
            },
          ],
        },
      },
      {
        title: 'Signs of a chemical change',
        points: [
          'Look for evidence that a NEW substance formed.',
          'Careful: boiling water makes bubbles too, but that is just liquid becoming gas, which is physical.',
        ],
        visual: {
          type: 'cards',
          cards: [
            { title: 'Gas bubbles', text: 'Fizzing from two things mixed (like baking soda and vinegar).' },
            { title: 'Color change', text: 'Rust on a bike, silver tarnishing.' },
            { title: 'Light or heat', text: 'Fire, glow sticks, a match burning.' },
            { title: 'New solid forms', text: 'A solid appears when two liquids mix.' },
            { title: 'New odor', text: 'Milk souring, food rotting.' },
          ],
        },
        tip: 'Ask: could I easily get the original stuff back? If yes, it is probably physical.',
      },
    ],
  },
  questions: q.questions,
};
