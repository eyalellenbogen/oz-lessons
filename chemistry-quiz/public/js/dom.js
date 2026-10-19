const SVG_NS = 'http://www.w3.org/2000/svg';

function append(el, children) {
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
}

/** Tiny DOM builder. Text is always inserted as text nodes, never as HTML. */
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props ?? {})) {
    if (value == null || value === false) continue;
    if (key === 'class') el.className = value;
    else if (key === 'style') el.style.cssText = value;
    else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), value);
    else el.setAttribute(key, value === true ? '' : value);
  }
  append(el, children);
  return el;
}

export function svg(tag, attrs = {}, ...children) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  append(el, children);
  return el;
}

/** Digits that follow a letter or ")" become subscripts: Pb(NO3)2 */
export function formula(text) {
  const out = h('span', { class: 'formula' });
  const re = /([A-Za-z)])(\d+)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    out.append(text.slice(last, m.index) + m[1]);
    out.append(h('sub', {}, m[2]));
    last = re.lastIndex;
  }
  out.append(text.slice(last));
  return out;
}

/** Supports **bold** and [[chemical formulas]]. */
export function rich(text) {
  const frag = document.createDocumentFragment();
  const re = /\*\*(.+?)\*\*|\[\[(.+?)\]\]/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) frag.append(text.slice(last, m.index));
    frag.append(m[1] !== undefined ? h('strong', {}, rich(m[1])) : formula(m[2]));
    last = re.lastIndex;
  }
  if (last < text.length) frag.append(text.slice(last));
  return frag;
}
