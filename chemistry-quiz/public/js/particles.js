import { svg } from './dom.js';

const R = 8;

function hash(text) {
  let hsh = 2166136261;
  for (let i = 0; i < text.length; i++) hsh = Math.imul(hsh ^ text.charCodeAt(i), 16777619);
  return hsh >>> 0;
}

/** Deterministic PRNG so a given diagram always looks the same. */
function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function offsets(count) {
  if (count === 1) return [[0, 0]];
  if (count === 2) return [[-0.85 * R, 0], [0.85 * R, 0]];
  if (count === 3) {
    return [90, 210, 330].map((deg) => [R * Math.cos((deg * Math.PI) / 180), -R * Math.sin((deg * Math.PI) / 180)]);
  }
  if (count === 4) return [[-0.85 * R, -0.85 * R], [0.85 * R, -0.85 * R], [0.85 * R, 0.85 * R], [-0.85 * R, 0.85 * R]];
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return [1.4 * R * Math.cos(a), 1.4 * R * Math.sin(a)];
  });
}

/** Draws black ('b') and white ('w') atoms. Atoms in one string are bonded into one molecule. */
export function renderParticles(spec, { width = 320, height = 180 } = {}) {
  const rng = mulberry32(hash(JSON.stringify(spec)));
  const molecules = spec.molecules.flatMap((m) => Array.from({ length: m.count }, () => m.atoms));
  for (let i = molecules.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [molecules[i], molecules[j]] = [molecules[j], molecules[i]];
  }

  const n = molecules.length;
  const cols = Math.max(1, Math.round(Math.sqrt((n * width) / height)));
  const rows = Math.ceil(n / cols);
  const cw = width / cols;
  const ch = height / rows;

  const root = svg('svg', {
    viewBox: `0 0 ${width} ${height}`,
    class: 'particles',
    role: 'img',
    'aria-label': 'Particle diagram of atoms and molecules',
  });
  root.append(svg('rect', { class: 'particle-box', x: 1, y: 1, width: width - 2, height: height - 2, rx: 8 }));

  molecules.forEach((atoms, i) => {
    const layout = offsets(atoms.length);
    const reach = R + Math.max(...layout.map(([x, y]) => Math.hypot(x, y)));
    const jitterX = Math.max(0, cw / 2 - reach - 3);
    const jitterY = Math.max(0, ch / 2 - reach - 3);
    const cx = ((i % cols) + 0.5) * cw + (rng() * 2 - 1) * jitterX;
    const cy = (Math.floor(i / cols) + 0.5) * ch + (rng() * 2 - 1) * jitterY;
    const angle = rng() * Math.PI * 2;
    const [cos, sin] = [Math.cos(angle), Math.sin(angle)];

    const group = svg('g');
    layout.forEach(([dx, dy], k) => {
      group.append(
        svg('circle', {
          cx: (cx + dx * cos - dy * sin).toFixed(1),
          cy: (cy + dx * sin + dy * cos).toFixed(1),
          r: R,
          class: atoms[k] === 'b' ? 'atom-black' : 'atom-white',
        }),
      );
    });
    root.append(group);
  });

  return root;
}
