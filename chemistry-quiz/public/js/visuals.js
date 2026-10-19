import { h, rich, svg } from './dom.js';
import { renderBalancer } from './balancer.js';
import { renderBohr } from './bohr.js';
import { renderParticles } from './particles.js';
import { renderPeriodic } from './periodic.js';

function tree() {
  const node = (title, text, cls = '') => h('div', { class: `tnode ${cls}` }, h('strong', {}, title), text && h('span', {}, rich(text)));
  return h(
    'div',
    { class: 'tree' },
    node('Matter', 'Anything with mass that takes up space', 'root'),
    h(
      'div',
      { class: 'tbranches' },
      h(
        'div',
        { class: 'tbranch' },
        node('Pure substance', 'ONE kind of matter. Cannot be separated physically.', 'pure'),
        h(
          'div',
          { class: 'tleaves' },
          node('Element', 'One kind of atom. Gold, oxygen, carbon.', 'pure'),
          node('Compound', 'Different atoms chemically bonded. [[H2O]], [[CO2]], salt.', 'pure'),
        ),
      ),
      h(
        'div',
        { class: 'tbranch' },
        node('Mixture', 'TWO or more substances, physically combined. Each keeps its identity.', 'mix'),
        h(
          'div',
          { class: 'tleaves' },
          node('Homogeneous', 'Same throughout. Salt water, air.', 'mix'),
          node('Heterogeneous', 'You can see the parts. Trail mix, soil.', 'mix'),
        ),
      ),
    ),
  );
}

function table({ headers, rows }) {
  return h(
    'div',
    { class: 'tablewrap' },
    h(
      'table',
      { class: 'ctable' },
      h('thead', {}, h('tr', {}, ...headers.map((t) => h('th', {}, rich(t))))),
      h('tbody', {}, ...rows.map((r) => h('tr', {}, ...r.map((c, i) => (i === 0 ? h('th', { scope: 'row' }, rich(c)) : h('td', {}, rich(c))))))),
    ),
  );
}

function cards({ cards: items }) {
  return h(
    'div',
    { class: 'cards' },
    ...items.map((c) =>
      h('div', { class: 'card' }, h('strong', {}, rich(c.title)), c.formula && h('div', { class: 'cformula' }, rich(c.formula)), h('p', {}, rich(c.text))),
    ),
  );
}

function gallery({ items }) {
  return h(
    'div',
    { class: 'gallery' },
    ...items.map((item) => h('figure', {}, renderParticles(item.spec, { width: 260, height: 150 }), h('figcaption', {}, rich(item.label)))),
  );
}

function energy() {
  const panel = (kind) => {
    const exo = kind === 'exo';
    const top = 50;
    const bottom = 130;
    const from = exo ? top : bottom;
    const to = exo ? bottom : top;
    const id = `arrow-${kind}`;
    return h(
      'figure',
      { class: `energy ${kind}` },
      svg(
        'svg',
        { viewBox: '0 0 280 190', role: 'img', 'aria-label': exo ? 'Exothermic energy diagram' : 'Endothermic energy diagram' },
        svg('defs', {}, svg('marker', { id, viewBox: '0 0 10 10', refX: 5, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' }, svg('path', { d: 'M0,0 L10,5 L0,10 z', class: 'earrow' }))),
        svg('line', { x1: 24, y1: 10, x2: 24, y2: 170, class: 'eaxis' }),
        svg('line', { x1: 24, y1: 170, x2: 270, y2: 170, class: 'eaxis' }),
        svg('text', { x: 10, y: 95, class: 'etext', transform: 'rotate(-90 10 95)', 'text-anchor': 'middle' }, 'Energy'),
        svg('path', { d: `M34,${from} H100 C125,${from} 125,${to} 150,${to} H260`, class: 'ecurve' }),
        svg('text', { x: 67, y: from + (exo ? -8 : 18), class: 'etext', 'text-anchor': 'middle' }, 'Reactants'),
        svg('text', { x: 205, y: to + (exo ? 18 : -8), class: 'etext', 'text-anchor': 'middle' }, 'Products'),
        svg('line', { x1: 127, y1: from + (exo ? 6 : -6), x2: 127, y2: to + (exo ? -6 : 6), class: 'earrowline', 'marker-end': `url(#${id})` }),
      ),
      h('figcaption', {}, h('strong', {}, exo ? 'Exothermic' : 'Endothermic'), exo ? ' energy is released (heat out)' : ' energy is absorbed (heat in)'),
    );
  };
  return h('div', { class: 'gallery energies' }, panel('exo'), panel('endo'));
}

export function renderVisual(visual) {
  switch (visual.type) {
    case 'tree':
      return tree();
    case 'table':
      return table(visual);
    case 'cards':
      return cards(visual);
    case 'particles':
      return h('div', { class: 'single-particles' }, renderParticles(visual.spec));
    case 'gallery':
      return gallery(visual);
    case 'bohr':
      return renderBohr();
    case 'periodic':
      return renderPeriodic(visual.mode);
    case 'balancer':
      return renderBalancer(visual.equations);
    case 'energy':
      return energy();
    default:
      return null;
  }
}
