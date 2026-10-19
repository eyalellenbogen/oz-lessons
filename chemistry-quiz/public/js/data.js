const NAMES =
  'H:Hydrogen,He:Helium,Li:Lithium,Be:Beryllium,B:Boron,C:Carbon,N:Nitrogen,O:Oxygen,F:Fluorine,Ne:Neon,' +
  'Na:Sodium,Mg:Magnesium,Al:Aluminum,Si:Silicon,P:Phosphorus,S:Sulfur,Cl:Chlorine,Ar:Argon,K:Potassium,Ca:Calcium,' +
  'Sc:Scandium,Ti:Titanium,V:Vanadium,Cr:Chromium,Mn:Manganese,Fe:Iron,Co:Cobalt,Ni:Nickel,Cu:Copper,Zn:Zinc,' +
  'Ga:Gallium,Ge:Germanium,As:Arsenic,Se:Selenium,Br:Bromine,Kr:Krypton,Rb:Rubidium,Sr:Strontium,Y:Yttrium,' +
  'Zr:Zirconium,Nb:Niobium,Mo:Molybdenum,Tc:Technetium,Ru:Ruthenium,Rh:Rhodium,Pd:Palladium,Ag:Silver,Cd:Cadmium,' +
  'In:Indium,Sn:Tin,Sb:Antimony,Te:Tellurium,I:Iodine,Xe:Xenon,Cs:Cesium,Ba:Barium,La:Lanthanum,Ce:Cerium,' +
  'Pr:Praseodymium,Nd:Neodymium,Pm:Promethium,Sm:Samarium,Eu:Europium,Gd:Gadolinium,Tb:Terbium,Dy:Dysprosium,' +
  'Ho:Holmium,Er:Erbium,Tm:Thulium,Yb:Ytterbium,Lu:Lutetium,Hf:Hafnium,Ta:Tantalum,W:Tungsten,Re:Rhenium,' +
  'Os:Osmium,Ir:Iridium,Pt:Platinum,Au:Gold,Hg:Mercury,Tl:Thallium,Pb:Lead,Bi:Bismuth,Po:Polonium,At:Astatine,' +
  'Rn:Radon,Fr:Francium,Ra:Radium,Ac:Actinium,Th:Thorium,Pa:Protactinium,U:Uranium,Np:Neptunium,Pu:Plutonium,' +
  'Am:Americium,Cm:Curium,Bk:Berkelium,Cf:Californium,Es:Einsteinium,Fm:Fermium,Md:Mendelevium,No:Nobelium,' +
  'Lr:Lawrencium,Rf:Rutherfordium,Db:Dubnium,Sg:Seaborgium,Bh:Bohrium,Hs:Hassium,Mt:Meitnerium,Ds:Darmstadtium,' +
  'Rg:Roentgenium,Cn:Copernicium,Nh:Nihonium,Fl:Flerovium,Mc:Moscovium,Lv:Livermorium,Ts:Tennessine,Og:Oganesson';

const inSet = (z, list) => list.includes(z);

export const CATEGORIES = [
  { key: 'alkali', label: 'Alkali metals' },
  { key: 'alkaline', label: 'Alkaline earth metals' },
  { key: 'transition', label: 'Transition metals' },
  { key: 'post', label: 'Other metals' },
  { key: 'lanthanide', label: 'Lanthanides' },
  { key: 'actinide', label: 'Actinides' },
  { key: 'metalloid', label: 'Metalloids' },
  { key: 'nonmetal', label: 'Nonmetals' },
  { key: 'halogen', label: 'Halogens' },
  { key: 'noble', label: 'Noble gases' },
];

function categoryOf(z) {
  if (inSet(z, [3, 11, 19, 37, 55, 87])) return 'alkali';
  if (inSet(z, [4, 12, 20, 38, 56, 88])) return 'alkaline';
  if (inSet(z, [9, 17, 35, 53, 85, 117])) return 'halogen';
  if (inSet(z, [2, 10, 18, 36, 54, 86, 118])) return 'noble';
  if (inSet(z, [5, 14, 32, 33, 51, 52])) return 'metalloid';
  if (inSet(z, [1, 6, 7, 8, 15, 16, 34])) return 'nonmetal';
  if (z >= 57 && z <= 71) return 'lanthanide';
  if (z >= 89 && z <= 103) return 'actinide';
  if ((z >= 21 && z <= 30) || (z >= 39 && z <= 48) || (z >= 72 && z <= 80) || (z >= 104 && z <= 112)) return 'transition';
  return 'post';
}

function stateOf(z) {
  if (inSet(z, [1, 2, 7, 8, 9, 10, 17, 18, 36, 54, 86])) return 'gas';
  if (inSet(z, [35, 80])) return 'liquid';
  if (z >= 104) return 'unknown';
  return 'solid';
}

/** [column, row] on a grid where rows 9 and 10 hold the lanthanides and actinides. */
function position(z) {
  if (z === 1) return [1, 1];
  if (z === 2) return [18, 1];
  if (z <= 4) return [z - 2, 2];
  if (z <= 10) return [z + 8, 2];
  if (z <= 12) return [z - 10, 3];
  if (z <= 18) return [z, 3];
  if (z <= 36) return [z - 18, 4];
  if (z <= 54) return [z - 36, 5];
  if (z <= 56) return [z - 54, 6];
  if (z <= 71) return [z - 54, 9];
  if (z <= 86) return [z - 68, 6];
  if (z <= 88) return [z - 86, 7];
  if (z <= 103) return [z - 86, 10];
  return [z - 100, 7];
}

export const ELEMENTS = NAMES.split(',').map((pair, i) => {
  const [symbol, name] = pair.split(':');
  const z = i + 1;
  const [col, row] = position(z);
  return { z, symbol, name, category: categoryOf(z), state: stateOf(z), col, row };
});
