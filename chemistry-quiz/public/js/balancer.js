import { api } from './api.js';
import { formula, h } from './dom.js';

export function renderBalancer(equations) {
  let current = 0;
  let coefficients = [];
  let requestId = 0;

  const picker = h('div', { class: 'presets' });
  const equationEl = h('div', { class: 'balancer-eq' });
  const status = h('div', { class: 'bstatus', role: 'status' });
  const counts = h('div', { class: 'bcounts' });

  const species = (eq) => [...eq.reactants, ...eq.products];

  function select(index) {
    current = index;
    coefficients = species(equations[index]).map(() => 1);
    refresh();
  }

  function bump(slot, delta) {
    coefficients[slot] = Math.min(20, Math.max(1, coefficients[slot] + delta));
    refresh();
  }

  function term(eq, slot, name) {
    return h(
      'span',
      { class: 'bterm' },
      h('span', { class: 'bstep' },
        h('button', { type: 'button', 'aria-label': `More ${name}`, onClick: () => bump(slot, 1) }, '+'),
        h('b', { class: 'bcoef' }, coefficients[slot]),
        h('button', { type: 'button', 'aria-label': `Less ${name}`, onClick: () => bump(slot, -1) }, '-'),
      ),
      formula(name),
    );
  }

  function drawEquation() {
    const eq = equations[current];
    const parts = [];
    eq.reactants.forEach((name, i) => {
      if (i) parts.push(h('span', { class: 'bop' }, '+'));
      parts.push(term(eq, i, name));
    });
    parts.push(h('span', { class: 'bop' }, '→'));
    eq.products.forEach((name, i) => {
      if (i) parts.push(h('span', { class: 'bop' }, '+'));
      parts.push(term(eq, eq.reactants.length + i, name));
    });
    equationEl.replaceChildren(...parts);
    picker.replaceChildren(
      h('span', { class: 'muted' }, 'Try:'),
      ...equations.map((e, i) =>
        h(
          'button',
          { type: 'button', class: `chip${i === current ? ' on' : ''}`, onClick: () => select(i) },
          ...[...e.reactants.flatMap((f, k) => [k ? ' + ' : '', formula(f)]), ' → ', ...e.products.flatMap((f, k) => [k ? ' + ' : '', formula(f)])],
        ),
      ),
    );
  }

  async function refresh() {
    drawEquation();
    const id = ++requestId;
    try {
      const result = await api.analyze(equations[current], coefficients);
      if (id !== requestId) return;

      const max = Math.max(...result.elements.flatMap((el) => [result.left[el] ?? 0, result.right[el] ?? 0]));
      counts.replaceChildren(
        h('div', { class: 'bhead' }, h('span', {}, 'Atom'), h('span', {}, 'Reactants'), h('span', {}, 'Products'), h('span', {})),
        ...result.elements.map((el) => {
          const l = result.left[el] ?? 0;
          const r = result.right[el] ?? 0;
          const ok = l === r;
          const bar = (n) => h('span', { class: `bar${ok ? ' ok' : ''}` }, h('i', { style: `width:${(n / max) * 100}%` }), h('em', {}, n));
          return h('div', { class: `brow${ok ? ' ok' : ' bad'}` }, h('b', {}, el), bar(l), bar(r), h('span', { class: 'mark' }, ok ? 'match' : 'differ'));
        }),
      );

      status.className = `bstatus ${result.balanced ? 'good' : 'warn'}`;
      status.textContent = !result.balanced
        ? 'Not balanced yet. Change a coefficient until every atom matches.'
        : result.lowestTerms
          ? 'Balanced! Every atom matches, using the smallest whole numbers.'
          : 'Balanced, but you can divide every coefficient by the same number to get smaller ones.';
    } catch {
      status.className = 'bstatus warn';
      status.textContent = 'Could not count atoms for this equation.';
    }
  }

  const root = h('div', { class: 'balancer' }, picker, equationEl, status, counts);
  select(0);
  return root;
}
