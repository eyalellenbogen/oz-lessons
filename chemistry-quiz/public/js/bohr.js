import { h, svg } from './dom.js';
import { ELEMENTS } from './data.js';

const RING_CAPACITY = [2, 8, 8, 18];
const RING_RADIUS = [58, 90, 122, 154];
const SIZE = 340;
const CENTER = SIZE / 2;

const LIMITS = { p: [1, 20], n: [0, 24], e: [0, 30] };
const PRESETS = [
  ['Hydrogen', 1, 0, 1],
  ['Helium', 2, 2, 2],
  ['Carbon', 6, 6, 6],
  ['Oxygen', 8, 8, 8],
  ['Neon', 10, 10, 10],
  ['Sodium', 11, 12, 11],
];

function ringsFor(electrons) {
  const rings = [];
  let left = electrons;
  for (const capacity of RING_CAPACITY) {
    if (left <= 0) break;
    const here = Math.min(left, capacity);
    rings.push(here);
    left -= here;
  }
  return rings;
}

function chargeText(charge) {
  if (charge === 0) return '0 (neutral)';
  return charge > 0 ? `+${charge}` : `-${Math.abs(charge)}`;
}

export function renderBohr() {
  const state = { p: 6, n: 6, e: 6 };
  const stage = h('div', { class: 'bohr-stage' });
  const info = h('dl', { class: 'bohr-info' });
  const counters = {};

  function drawAtom() {
    const root = svg('svg', { viewBox: `0 0 ${SIZE} ${SIZE}`, class: 'bohr-svg', role: 'img', 'aria-label': 'Atom model' });
    const rings = ringsFor(state.e);

    rings.forEach((count, ringIndex) => {
      const radius = RING_RADIUS[ringIndex];
      root.append(svg('circle', { cx: CENTER, cy: CENTER, r: radius, class: 'ring' }));
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 - Math.PI / 2 + ringIndex * 0.35;
        root.append(
          svg('circle', {
            cx: (CENTER + radius * Math.cos(a)).toFixed(1),
            cy: (CENTER + radius * Math.sin(a)).toFixed(1),
            r: 5.5,
            class: 'electron',
          }),
        );
      }
    });

    const total = state.p + state.n;
    for (let i = 0; i < total; i++) {
      const isProton = Math.floor(((i + 1) * state.p) / total) > Math.floor((i * state.p) / total);
      const a = i * 2.39996;
      const r = 4.9 * Math.sqrt(i + 0.5);
      root.append(
        svg('circle', {
          cx: (CENTER + r * Math.cos(a)).toFixed(1),
          cy: (CENTER + r * Math.sin(a)).toFixed(1),
          r: 4.6,
          class: isProton ? 'proton' : 'neutron',
        }),
      );
    }
    return root;
  }

  function row(label, value) {
    return [h('dt', {}, label), h('dd', {}, value)];
  }

  function update() {
    const element = ELEMENTS[state.p - 1];
    const charge = state.p - state.e;
    const rings = ringsFor(state.e);
    const kind =
      charge === 0
        ? 'Neutral atom'
        : charge > 0
          ? `Positive ion (${charge} electron${charge > 1 ? 's' : ''} fewer than protons)`
          : `Negative ion (${-charge} electron${charge < -1 ? 's' : ''} more than protons)`;

    stage.replaceChildren(drawAtom());
    info.replaceChildren(
      ...row('Element', `${element.name} (${element.symbol})`),
      ...row('Atomic number (protons)', state.p),
      ...row('Mass number (protons + neutrons)', state.p + state.n),
      ...row('Charge', chargeText(charge)),
      ...row('Type', kind),
      ...row('Electrons in rings', rings.length ? rings.join(', ') : 'none'),
      ...row('Outer ring electrons', rings.length ? rings[rings.length - 1] : 0),
    );
    for (const key of Object.keys(counters)) counters[key].textContent = state[key];
  }

  function stepper(key, label, className) {
    const [min, max] = LIMITS[key];
    const bump = (delta) => {
      state[key] = Math.min(max, Math.max(min, state[key] + delta));
      update();
    };
    counters[key] = h('output', { class: 'count', 'aria-live': 'polite' });
    return h(
      'div',
      { class: 'stepper' },
      h('span', { class: `dot ${className}` }),
      h('span', { class: 'slabel' }, label),
      h('button', { type: 'button', 'aria-label': `Fewer ${label.toLowerCase()}`, onClick: () => bump(-1) }, '-'),
      counters[key],
      h('button', { type: 'button', 'aria-label': `More ${label.toLowerCase()}`, onClick: () => bump(1) }, '+'),
    );
  }

  const presets = h(
    'div',
    { class: 'presets' },
    h('span', { class: 'muted' }, 'Quick builds:'),
    ...PRESETS.map(([name, p, n, e]) =>
      h(
        'button',
        {
          type: 'button',
          class: 'chip',
          onClick: () => {
            Object.assign(state, { p, n, e });
            update();
          },
        },
        name,
      ),
    ),
  );

  const legend = h(
    'div',
    { class: 'blegend' },
    h('span', {}, h('i', { class: 'dot proton' }), ' Proton (+)'),
    h('span', {}, h('i', { class: 'dot neutron' }), ' Neutron (0)'),
    h('span', {}, h('i', { class: 'dot electron' }), ' Electron (-)'),
  );

  const root = h(
    'div',
    { class: 'bohr' },
    h(
      'div',
      { class: 'bohr-left' },
      stage,
      legend,
    ),
    h(
      'div',
      { class: 'bohr-right' },
      stepper('p', 'Protons', 'proton'),
      stepper('n', 'Neutrons', 'neutron'),
      stepper('e', 'Electrons', 'electron'),
      presets,
      info,
    ),
  );
  update();
  return root;
}
