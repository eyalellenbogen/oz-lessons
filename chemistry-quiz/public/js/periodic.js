import { h, rich } from './dom.js';
import { CATEGORIES, ELEMENTS } from './data.js';

const STATES = [
  { key: 'gas', label: 'Gas' },
  { key: 'liquid', label: 'Liquid' },
  { key: 'solid', label: 'Solid' },
  { key: 'unknown', label: 'Unknown (man-made)' },
];

const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));
const STATE_LABEL = Object.fromEntries(STATES.map((s) => [s.key, s.label]));

export function renderPeriodic(initialMode) {
  let mode = initialMode;
  let highlight = null;
  let selected = null;

  const grid = h('div', { class: 'ptable', role: 'group', 'aria-label': 'Periodic table' });
  const legend = h('div', { class: 'plegend' });
  const detail = h('div', { class: 'pdetail' });
  const toggle = h('div', { class: 'seg', role: 'group', 'aria-label': 'Color by' });

  const keyOf = (el) => (mode === 'category' ? el.category : el.state);

  function paint() {
    grid.replaceChildren(
      ...ELEMENTS.map((el) =>
        h(
          'button',
          {
            type: 'button',
            class: `pel ${mode === 'category' ? 'cat' : 'st'}-${keyOf(el)}${
              highlight && highlight !== keyOf(el) ? ' dim' : ''
            }${selected === el ? ' selected' : ''}`,
            style: `grid-column:${el.col};grid-row:${el.row}`,
            title: el.name,
            'aria-label': `${el.name}, atomic number ${el.z}`,
            onClick: () => {
              selected = el;
              paint();
            },
          },
          h('small', {}, el.z),
          h('b', {}, el.symbol),
        ),
      ),
      h('div', { class: 'pmark cat-lanthanide', style: 'grid-column:3;grid-row:6' }, '57-71'),
      h('div', { class: 'pmark cat-actinide', style: 'grid-column:3;grid-row:7' }, '89-103'),
    );

    const entries = mode === 'category' ? CATEGORIES : STATES;
    legend.replaceChildren(
      ...entries.map((entry) =>
        h(
          'button',
          {
            type: 'button',
            class: `lkey${highlight === entry.key ? ' on' : ''}`,
            'aria-pressed': String(highlight === entry.key),
            onClick: () => {
              highlight = highlight === entry.key ? null : entry.key;
              paint();
            },
          },
          h('span', { class: `swatch ${mode === 'category' ? 'cat' : 'st'}-${entry.key}` }),
          entry.label,
        ),
      ),
    );

    toggle.replaceChildren(
      ...[
        ['category', 'Family'],
        ['state', 'State at room temp'],
      ].map(([key, label]) =>
        h(
          'button',
          {
            type: 'button',
            class: mode === key ? 'on' : '',
            'aria-pressed': String(mode === key),
            onClick: () => {
              mode = key;
              highlight = null;
              paint();
            },
          },
          label,
        ),
      ),
    );

    detail.replaceChildren(
      selected
        ? h(
            'div',
            {},
            h('strong', { class: 'dname' }, `${selected.name} (${selected.symbol})`),
            ` Atomic number ${selected.z}. `,
            `${CATEGORY_LABEL[selected.category]}. `,
            `${STATE_LABEL[selected.state]} at room temperature.`,
          )
        : h('span', { class: 'muted' }, rich('Tap an element to see its details.')),
    );
  }

  paint();
  return h('div', { class: 'periodic' }, toggle, h('div', { class: 'pscroll' }, grid), legend, detail);
}
