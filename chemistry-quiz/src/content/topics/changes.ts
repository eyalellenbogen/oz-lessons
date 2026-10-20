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

q.classify('Classify the PROPERTY described: **{item}**', OPTIONS, [
  ['Aluminum can be rolled into thin foil', P, 'Malleability changes shape without changing identity.'],
  ['Copper can be drawn into wire', P, 'Ductility is a physical property.'],
  ['Glass allows light to pass through', P, 'Transparency is observed without a reaction.'],
  ['A rubber band stretches', P, 'Elasticity does not require a new substance.'],
  ['A diamond scratches glass', P, 'Hardness is physical.'],
  ['Honey flows more slowly than water', P, 'Viscosity describes flow.'],
  ['A crystal has a cubic shape', P, 'Shape is physical.'],
  ['A sample occupies 25 milliliters', P, 'Volume is measured without changing identity.'],
  ['A metal melts at 660 degrees C', P, 'Melting point is physical.'],
  ['A liquid boils at 78 degrees C', P, 'Boiling point is physical.'],
  ['A powder is insoluble in water', P, 'Solubility is physical.'],
  ['A material conducts heat well', P, 'Heat conduction does not create a substance.'],
  ['A solid is brittle', P, 'Brittleness describes how it breaks.'],
  ['A mineral leaves a white streak', P, 'Streak color is physical.'],
  ['A liquid is colorless', P, 'Color is observed without a reaction.'],
  ['A solid has a rough texture', P, 'Texture is physical.'],
  ['A sample has a mass of 12 grams', P, 'Mass is measured without a reaction.'],
  ['Ice is less dense than liquid water', P, 'Density is physical.'],
  ['A polished silver surface reflects light', P, 'Reflectivity is physical.'],
  ['A magnet attracts a steel nail', P, 'Magnetism does not change chemical identity.'],
  ['Magnesium can burn in oxygen', C, 'Flammability describes a reaction.'],
  ['Iron is capable of rusting in moist air', C, 'Rusting produces iron compounds.'],
  ['Hydrogen can react with oxygen to form water', C, 'Reactivity describes formation of a new substance.'],
  ['Limestone reacts with acid to release gas', C, 'The acid forms new substances.'],
  ['Silver can react with sulfur compounds and tarnish', C, 'Tarnishing changes chemical identity.'],
  ['A fuel can release energy when burned', C, 'Combustion is a chemical reaction.'],
  ['Bleach can chemically remove a stain', C, 'Bleach reacts with stain molecules.'],
  ['A metal resists corrosion', C, 'Corrosion resistance describes resistance to reaction.'],
  ['A substance decomposes chemically when strongly heated', C, 'Decomposition creates different substances.'],
  ['A powder reacts with vinegar to form carbon dioxide', C, 'New gas is produced by a reaction.'],
  ['Copper can react to form a green patina', C, 'Patina contains new copper compounds.'],
  ['Potassium reacts vigorously with water', C, 'Water and potassium form new substances.'],
  ['A gas does not support combustion', C, 'Supporting a combustion reaction is chemical behavior.'],
  ['An acid can neutralize a base', C, 'Neutralization produces new substances.'],
  ['A substance can react with oxygen without a flame', C, 'Oxidation is a chemical reaction even without a flame.'],
])
  .classify('Classify the CHANGE described: **{item}**', OPTIONS, [
    ['Tearing aluminum foil into strips', P, 'Only size and shape change.'],
    ['Sharpening a pencil', P, 'Material is removed without forming a new substance.'],
    ['Grinding coffee beans', P, 'Grinding reduces particle size.'],
    ['Steam condensing on a bathroom mirror', P, 'Water remains water.'],
    ['Dry ice turning directly into carbon dioxide gas', P, 'Sublimation changes state, not identity.'],
    ['Frost forming directly from water vapor', P, 'Deposition changes state.'],
    ['Stretching copper into a wire', P, 'Only the shape changes.'],
    ['Bending a paper clip without breaking it', P, 'The metal remains the same substance.'],
    ['Breaking a glass cup', P, 'The pieces are still glass.'],
    ['Melting candle wax without burning it', P, 'Wax changes from solid to liquid.'],
    ['Dissolving a salt crystal in water', P, 'No new substance is formed in this classroom classification.'],
    ['Separating gravel with a screen', P, 'Separation does not change chemical identities.'],
    ['Mixing dry sand with dry sugar', P, 'The two solids remain unchanged.'],
    ['Inflating a balloon with air', P, 'Air changes location and volume.'],
    ['Compressing air in a sealed syringe', P, 'Only the gas volume changes.'],
    ['Freezing melted candle wax', P, 'Liquid wax becomes solid wax.'],
    ['Cutting a sheet of paper into squares', P, 'The paper changes shape.'],
    ['Evaporating water to leave salt crystals behind', P, 'The water and salt retain their identities.'],
    ['A cut banana turning brown through reaction with air', C, 'Oxidation produces new substances.'],
    ['An egg white becoming firm during cooking', C, 'Heat changes protein structures.'],
    ['A candle flame burning wax vapor', C, 'Wax reacts with oxygen.'],
    ['A steel gate forming rust', C, 'Iron compounds form.'],
    ['Grape juice fermenting', C, 'Microorganisms produce new substances.'],
    ['A green leaf making glucose during photosynthesis', C, 'Carbon dioxide and water become new substances.'],
    ['Hydrogen peroxide decomposing into water and oxygen', C, 'One compound becomes different substances.'],
    ['An antacid neutralizing stomach acid', C, 'Neutralization changes the substances.'],
    ['Two clear solutions reacting to form an insoluble solid', C, 'A new solid precipitate forms.'],
    ['A glow stick producing light after its chemicals mix', C, 'A chemical reaction releases light.'],
    ['A match head igniting', C, 'Combustion creates new substances.'],
    ['A copper roof developing a green patina', C, 'Copper reacts to make new compounds.'],
    ['Bread dough browning as it bakes', C, 'New substances form during browning.'],
    ['A car engine burning gasoline', C, 'Fuel reacts with oxygen.'],
    ['A battery producing electricity through reactions', C, 'Chemical reactants are converted into products.'],
    ['Yeast producing carbon dioxide in bread dough', C, 'Fermentation forms a new gas.'],
    ['Milk forming curds after acid is added', C, 'Acid changes the milk proteins.'],
    ['Sulfur and iron reacting on heating to form iron sulfide', C, 'A new compound forms.'],
  ])
  .trueFalse('Bubbles in boiling water alone prove a chemical reaction occurred.', false, 'Boiling makes water vapor, not a new substance.')
  .trueFalse('A color change is always enough by itself to prove a chemical reaction.', false, 'Mixing colored liquids can also change the appearance without a reaction.')
  .trueFalse('A physical change can involve a change in energy.', true, 'Melting absorbs heat while the substance remains the same.')
  .trueFalse('Every chemical reaction must produce a visible flame.', false, 'Rusting and many other reactions occur without flames.')
  .trueFalse('A new insoluble solid forming when solutions react is called a precipitate.', true, 'Precipitate formation is evidence of a chemical reaction.')
  .trueFalse('A change that is difficult to reverse must be chemical.', false, 'Breaking glass is physical even though restoring the cup is difficult.')
  .trueFalse('Cutting a metal into smaller pieces changes its chemical identity.', false, 'Size changes, but the metal stays the same substance.')
  .trueFalse('Chemical properties describe the ability to form different substances.', true, 'They describe how a material reacts.')
  .trueFalse('Boiling point can help identify a pure substance without changing its chemical identity.', true, 'Boiling point is a physical property.')
  .trueFalse('Rust has the same chemical identity as the iron it formed from.', false, 'Rust contains new iron compounds formed by reaction.');

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
