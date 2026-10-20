import { api } from './api.js';
import { formula, h, rich } from './dom.js';
import { renderVisual } from './visuals.js';
import { createElement, Atom, FlaskConical, ArrowUpRight, Layers, Grid2X2, Sparkles, BookOpen, Shuffle, ArrowRight, Trophy, Sun, Moon } from 'lucide';

const app = document.getElementById('app');
const crumb = document.getElementById('crumb');
const PROGRESS_KEY = 'matterquest.progress.v1';
const COUNT_KEY = 'matterquest.count.v1';
const THEME_KEY = 'matterquest.theme.v1';

const icon = (definition) => createElement(definition, { class: 'ui-icon', 'aria-hidden': 'true', focusable: 'false' });
const topicIcons = { matter: Layers, atoms: Atom, periodic: Grid2X2, changes: Sparkles, equations: FlaskConical };

/** Bumped on every navigation so late async results from a previous screen are ignored. */
let navigation = 0;

// ---------- small helpers ----------

const store = {
  read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private mode: progress just will not persist */
    }
  },
};

const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
  const dark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-checked', String(dark));
  themeToggle.title = `Switch to ${dark ? 'light' : 'dark'} mode`;
  themeToggle.dataset.tooltip = themeToggle.title;
  themeToggle.replaceChildren(icon(dark ? Sun : Moon));
}

setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  store.write(THEME_KEY, theme);
});

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function show(...nodes) {
  app.replaceChildren(...nodes);
  window.scrollTo(0, 0);
}

function setCrumb(text) {
  crumb.textContent = text;
}

function equationText(eq, coefficients) {
  const term = (f, i) => `${coefficients[i] === 1 ? '' : `${coefficients[i]} `}[[${f}]]`;
  const left = eq.reactants.map((f, i) => term(f, i));
  const right = eq.products.map((f, i) => term(f, eq.reactants.length + i));
  return `${left.join(' + ')} → ${right.join(' + ')}`;
}

function showError(message) {
  show(
    h(
      'section',
      { class: 'panel' },
      h('h1', {}, 'Something went wrong'),
      h('p', {}, message),
      h('button', { type: 'button', class: 'btn primary', onClick: showHome }, 'Back to start'),
    ),
  );
}

// ---------- home ----------

async function showHome() {
  const mine = ++navigation;
  setCrumb('');
  show(h('p', { class: 'muted center' }, 'Loading...'));

  let topics;
  try {
    topics = await api.topics();
  } catch {
    if (mine === navigation) showError('Could not load the topics. Please reload the page.');
    return;
  }
  if (mine !== navigation) return;

  const progress = store.read(PROGRESS_KEY, {});
  let count = store.read(COUNT_KEY, 10);

  const countSelect = h(
    'select',
    {
      id: 'count',
      onChange: (e) => {
        count = Number(e.target.value);
        store.write(COUNT_KEY, count);
      },
    },
    ...[5, 10, 15, 20, 30, 50].map((n) => h('option', { value: n, selected: n === count }, `${n} questions`)),
  );

  const allIds = topics.map((t) => t.id);
  const learnThenQuiz = (ids) => lessonFlow(ids, topics, () => startQuiz(ids, topics, count));
  const quizOnly = (ids) => startQuiz(ids, topics, count);
  const scores = topics.map((topic) => progress[topic.id]?.best).filter((score) => score != null);
  const mastered = scores.filter((score) => score >= 80).length;
  const totalQuestions = topics.reduce((total, topic) => total + topic.questionCount, 0);

  show(
    h(
      'section',
      { class: 'dashboard-heading' },
      h('div', {},
        h('p', { class: 'eyebrow' }, 'Grade 8 / Chemistry'),
        h('h1', {}, 'Your chemistry lab'),
        h('p', { class: 'dashboard-subtitle' }, 'Small discoveries. Real progress.'),
      ),
      h('label', { class: 'count-pick', for: 'count' }, 'Questions per quiz', countSelect),
    ),
    h(
      'dl', { class: 'study-stats' },
      h('div', {}, h('dt', {}, 'Topics mastered'), h('dd', {}, `${mastered}`, h('span', {}, ` / ${topics.length}`))),
      h('div', {}, h('dt', {}, 'Question bank'), h('dd', {}, String(totalQuestions), h('span', {}, ' questions'))),
      h('div', {}, h('dt', {}, 'Personal best'), h('dd', {}, scores.length ? `${Math.max(...scores)}%` : 'Not yet', icon(Trophy))),
    ),
    h('div', { class: 'dashboard-grid' },
      h('section', { class: 'study-path', 'aria-labelledby': 'path-title' },
        h('div', { class: 'section-heading' }, h('h2', { id: 'path-title' }, 'Your study path'), h('span', { class: 'muted' }, `${topics.length} topics`)),
        h('div', { class: 'topics' }, ...topics.map((topic, index) => {
          const best = progress[topic.id]?.best;
          return h('article', { class: `topic-row topic-${topic.id}` },
            h('div', { class: 'topic-symbol' }, icon(topicIcons[topic.id])),
            h('div', { class: 'topic-info' },
              h('span', { class: 'topic-code' }, `0${index + 1} / ${topic.code}`),
              h('h3', {}, topic.title),
              h('p', {}, topic.summary),
              h('div', { class: 'topic-meta' }, h('span', {}, `${topic.slideCount} slides`), h('span', {}, `${topic.questionCount} questions`)),
            ),
            h('div', { class: 'topic-progress' },
              h('span', { class: best != null && best >= 80 ? 'progress-score mastered' : 'progress-score' }, best == null ? 'Not started' : `${best}% best`),
              h('progress', { max: 100, value: best ?? 0, 'aria-label': `${topic.title} best score` }),
            ),
            h('div', { class: 'actions' },
              h('button', { type: 'button', class: 'btn lesson-link', onClick: () => learnThenQuiz([topic.id]) }, icon(BookOpen), 'Learn'),
              h('button', { type: 'button', class: 'btn quiz-link', onClick: () => quizOnly([topic.id]), 'aria-label': `Quiz only: ${topic.title}`, title: `Quiz only: ${topic.title}` }, 'Quiz', icon(ArrowUpRight)),
            ),
          );
        })),
      ),
      h('aside', { class: 'practice-lab', 'aria-labelledby': 'practice-title' },
        h('div', { class: 'lab-image' },
          h('img', { src: new URL('../images/chemistry-lab.jpg', import.meta.url).href, alt: 'A pipette transferring purple solution into a laboratory sample tray', width: 800, height: 600 }),
          h('span', { class: 'image-label' }, icon(FlaskConical), 'The practice lab'),
        ),
        h('div', { class: 'practice-content' },
          h('p', { class: 'eyebrow' }, 'All five topics'),
          h('h2', { id: 'practice-title' }, 'A little bit of everything.'),
          h('div', { class: 'practice-tags' }, h('span', {}, 'Mixed practice'), h('span', {}, `${totalQuestions} questions`)),
          h('button', { type: 'button', class: 'btn primary', onClick: () => quizOnly(allIds) }, icon(Shuffle), 'Start mixed quiz', icon(ArrowRight)),
          h('button', { type: 'button', class: 'btn full-study', onClick: () => learnThenQuiz(allIds) }, icon(BookOpen), 'Full study session'),
        ),
        h('div', { class: 'mastery-summary' },
          icon(Trophy),
          h('div', {}, h('strong', {}, mastered === topics.length ? 'All topics mastered' : `${topics.length - mastered} topics to master`), h('p', {}, 'Mastery milestone: 80% best score')),
        ),
      ),
    ),
    h('footer', { class: 'dashboard-footer' }, h('span', {}, 'Stay curious.'), h('span', {}, 'Matter Quest / Grade 8 Science')),
  );
}

// ---------- lessons ----------

async function lessonFlow(topicIds, topics, onDone) {
  const mine = ++navigation;
  show(h('p', { class: 'muted center' }, 'Loading lesson...'));

  let lessons;
  try {
    lessons = await Promise.all(topicIds.map((id) => api.lesson(id)));
  } catch {
    if (mine === navigation) showError('Could not load the lesson.');
    return;
  }
  if (mine !== navigation) return;

  let t = 0;
  let s = 0;

  function draw() {
    const topic = topics.find((x) => x.id === topicIds[t]);
    const slides = lessons[t].slides;
    const slide = slides[s];
    const lastSlide = s === slides.length - 1;
    const lastTopic = t === topicIds.length - 1;
    const nextLabel = !lastSlide ? 'Next' : lastTopic ? 'Start the quiz' : 'Next topic';

    setCrumb(`${topic.code} ${topic.title}`);
    show(
      h(
        'section',
        { class: 'lesson' },
        h('div', { class: 'dots', 'aria-hidden': 'true' }, ...slides.map((_, i) => h('span', { class: `dotp${i === s ? ' on' : i < s ? ' done' : ''}` }))),
        h('p', { class: 'eyebrow' }, `Lesson slide ${s + 1} of ${slides.length}`),
        h('h1', { tabindex: '-1', id: 'slide-title' }, slide.title),
        h('ul', { class: 'points' }, ...slide.points.map((p) => h('li', {}, rich(p)))),
        slide.visual && h('div', { class: 'visual' }, renderVisual(slide.visual)),
        slide.tip && h('aside', { class: 'tip' }, h('strong', {}, 'Memory trick: '), rich(slide.tip)),
        h(
          'nav',
          { class: 'nav' },
          h(
            'button',
            {
              type: 'button',
              class: 'btn',
              disabled: t === 0 && s === 0,
              onClick: () => {
                if (s > 0) s--;
                else {
                  t--;
                  s = lessons[t].slides.length - 1;
                }
                draw();
              },
            },
            'Back',
          ),
          h('button', { type: 'button', class: 'btn ghost', onClick: onDone }, 'Skip to quiz'),
          h(
            'button',
            {
              type: 'button',
              class: 'btn primary',
              onClick: () => {
                if (!lastSlide) s++;
                else if (!lastTopic) {
                  t++;
                  s = 0;
                } else return onDone();
                draw();
              },
            },
            nextLabel,
          ),
        ),
      ),
    );
    document.getElementById('slide-title')?.focus({ preventScroll: true });
  }

  draw();
}

// ---------- quiz ----------

async function startQuiz(topicIds, topics, count) {
  const mine = ++navigation;
  show(h('p', { class: 'muted center' }, 'Building your quiz...'));

  let questions;
  try {
    questions = await api.quiz(topicIds.length === topics.length ? [] : topicIds, count);
  } catch {
    if (mine === navigation) showError('Could not load the quiz.');
    return;
  }
  if (mine !== navigation) return;

  runQuiz(questions, { topicIds, topics, count, saveProgress: true });
}

/** Returns a controller for the answer inputs of one question. */
function buildInput(q) {
  const listeners = [];
  const changed = () => listeners.forEach((fn) => fn());

  if (q.type === 'equation') {
    const { reactants, products } = q.equation;
    const inputs = [];
    const parts = [];
    [...reactants, ...products].forEach((name, i) => {
      if (i === reactants.length) parts.push(h('span', { class: 'bop' }, '→'));
      else if (i > 0) parts.push(h('span', { class: 'bop' }, '+'));
      const input = h('input', {
        type: 'number',
        min: 1,
        max: 99,
        inputmode: 'numeric',
        class: 'coef',
        'aria-label': `Coefficient for ${name}`,
        onInput: changed,
      });
      inputs.push(input);
      parts.push(h('span', { class: 'eqterm' }, input, formula(name)));
    });
    return {
      el: h('div', { class: 'equation-input' }, ...parts),
      onChange: (fn) => listeners.push(fn),
      value() {
        const values = inputs.map((i) => Number.parseInt(i.value, 10));
        return values.every((v) => Number.isInteger(v) && v >= 1 && v <= 99) ? values : null;
      },
      reveal(response) {
        inputs.forEach((i) => {
          i.disabled = true;
          i.classList.add(response.correct ? 'correct' : 'wrong');
        });
      },
    };
  }

  const multi = q.type === 'multi';
  const order = q.options.map((text, index) => ({ text, index }));
  const entries = (multi ? order : q.shuffleOptions ? shuffle(order) : order).map((o) => ({
    ...o,
    input: h('input', { type: multi ? 'checkbox' : 'radio', name: 'answer', value: o.index, onChange: changed }),
  }));
  const labels = entries.map((o) => (o.label = h('label', { class: 'option' }, o.input, h('span', {}, rich(o.text)))));

  return {
    el: h('fieldset', { class: 'options' }, h('legend', { class: 'sr-only' }, multi ? 'Select all that apply' : 'Choose one'), ...labels),
    onChange: (fn) => listeners.push(fn),
    value() {
      const picked = entries.filter((o) => o.input.checked).map((o) => o.index);
      if (!picked.length) return null;
      return multi ? picked : picked[0];
    },
    reveal(response) {
      const correct = new Set([].concat(response.correctAnswer));
      entries.forEach((o) => {
        o.input.disabled = true;
        const chosen = o.input.checked;
        const right = correct.has(o.index);
        if (right && chosen) o.label.classList.add('correct');
        else if (chosen) o.label.classList.add('wrong');
        else if (right && multi) o.label.classList.add('missed');
      });
    },
  };
}

function correctAnswerText(q, correctAnswer) {
  if (q.type === 'choice') return q.options[correctAnswer];
  if (q.type === 'multi') return correctAnswer.map((i) => q.options[i]).join(', ');
  return equationText(q.equation, correctAnswer);
}

function feedback(q, response) {
  const lines = [];
  if (q.type === 'equation' && !response.correct) {
    const a = response.analysis;
    if (!a.balanced) {
      const off = a.elements.filter((el) => (a.left[el] ?? 0) !== (a.right[el] ?? 0));
      lines.push(h('p', {}, `Atoms that do not match: ${off.map((el) => `${el} (${a.left[el] ?? 0} vs ${a.right[el] ?? 0})`).join(', ')}.`));
    } else {
      lines.push(h('p', {}, 'That is balanced, but use the smallest whole numbers (divide everything by the same number).'));
    }
  }
  if (!response.correct) {
    lines.push(h('p', {}, h('strong', {}, 'Answer: '), rich(correctAnswerText(q, response.correctAnswer))));
  }
  lines.push(h('p', {}, rich(response.explanation)));

  return h(
    'div',
    { class: `feedback ${response.correct ? 'good' : 'bad'}`, role: 'status' },
    h('strong', { class: 'verdict' }, response.correct ? 'Correct!' : 'Not quite.'),
    ...lines,
  );
}

function runQuiz(questions, ctx) {
  const mine = ++navigation;
  const results = [];
  let index = 0;

  function draw() {
    if (mine !== navigation) return;
    const q = questions[index];
    const input = buildInput(q);
    const slot = h('div', { class: 'feedback-slot' });

    const checkBtn = h('button', { type: 'button', class: 'btn primary', disabled: true }, 'Check');
    const nextBtn = h('button', { type: 'button', class: 'btn primary', hidden: true }, index === questions.length - 1 ? 'See results' : 'Next question');
    input.onChange(() => {
      checkBtn.disabled = input.value() === null;
    });

    checkBtn.addEventListener('click', async () => {
      const answer = input.value();
      if (answer === null) return;
      checkBtn.disabled = true;
      try {
        const response = await api.check(q.id, answer);
        if (mine !== navigation) return;
        results.push({ q, response });
        input.reveal(response);
        slot.replaceChildren(feedback(q, response));
        checkBtn.hidden = true;
        nextBtn.hidden = false;
        nextBtn.focus();
        updateScore();
      } catch {
        checkBtn.disabled = false;
        slot.replaceChildren(h('div', { class: 'feedback bad' }, 'Could not check that answer. Try again.'));
      }
    });
    nextBtn.addEventListener('click', () => {
      index++;
      if (index < questions.length) draw();
      else finish();
    });

    const scoreEl = h('span', { class: 'score' });
    const updateScore = () => {
      scoreEl.textContent = `${results.filter((r) => r.response.correct).length} correct`;
    };
    updateScore();

    setCrumb(ctx.label ?? 'Quiz');
    show(
      h(
        'section',
        { class: 'quiz' },
        h(
          'div',
          { class: 'qhead' },
          h('span', {}, `Question ${index + 1} of ${questions.length}`),
          scoreEl,
        ),
        h('progress', { max: questions.length, value: index, 'aria-label': 'Quiz progress' }),
        h('h1', { class: 'prompt', tabindex: '-1', id: 'prompt' }, rich(q.prompt)),
        q.visual && h('div', { class: 'visual' }, renderVisual(q.visual)),
        q.type === 'multi' && h('p', { class: 'hint' }, 'Select all that apply.'),
        input.el,
        slot,
        h('div', { class: 'nav' }, checkBtn, nextBtn),
      ),
    );
    document.getElementById('prompt')?.focus({ preventScroll: true });
  }

  function finish() {
    if (mine !== navigation) return;
    const correct = results.filter((r) => r.response.correct).length;
    const pct = Math.round((correct / results.length) * 100);
    const missed = results.filter((r) => !r.response.correct);

    if (ctx.saveProgress) saveProgress(results);

    const verdict =
      pct >= 90 ? 'Outstanding!' : pct >= 70 ? 'Nice work!' : pct >= 50 ? 'Getting there.' : 'Keep practicing, you will get it.';

    const byTopic = new Map();
    for (const r of results) {
      const row = byTopic.get(r.q.topic) ?? { right: 0, total: 0 };
      row.total++;
      if (r.response.correct) row.right++;
      byTopic.set(r.q.topic, row);
    }
    const title = (id) => ctx.topics.find((t) => t.id === id)?.title ?? id;

    setCrumb('Results');
    show(
      h(
        'section',
        { class: 'results' },
        h('p', { class: 'eyebrow' }, 'Quiz complete'),
        h('h1', {}, verdict),
        h('div', { class: 'bigscore' }, h('strong', {}, `${correct} / ${results.length}`), h('span', {}, `${pct}%`)),
        byTopic.size > 1 &&
          h(
            'ul',
            { class: 'bytopic' },
            ...[...byTopic].map(([id, row]) => h('li', {}, h('span', {}, title(id)), h('strong', {}, `${row.right} / ${row.total}`))),
          ),
        h(
          'div',
          { class: 'nav' },
          missed.length > 0 &&
            h(
              'button',
              {
                type: 'button',
                class: 'btn primary',
                onClick: () => runQuiz(shuffle(missed.map((r) => r.q)), { ...ctx, saveProgress: false, label: 'Retry missed' }),
              },
              `Retry the ${missed.length} I missed`,
            ),
          h('button', { type: 'button', class: missed.length ? 'btn' : 'btn primary', onClick: () => startQuiz(ctx.topicIds, ctx.topics, ctx.count) }, 'New quiz'),
          h(
            'button',
            { type: 'button', class: 'btn', onClick: () => lessonFlow(ctx.topicIds, ctx.topics, () => startQuiz(ctx.topicIds, ctx.topics, ctx.count)) },
            'Review the lesson',
          ),
          h('button', { type: 'button', class: 'btn ghost', onClick: showHome }, 'Home'),
        ),
        missed.length > 0 &&
          h(
            'div',
            { class: 'review' },
            h('h2', {}, 'Review what you missed'),
            ...missed.map(({ q, response }) =>
              h(
                'article',
                { class: 'review-item' },
                h('p', { class: 'rprompt' }, rich(q.prompt)),
                h('p', {}, h('strong', {}, 'Answer: '), rich(correctAnswerText(q, response.correctAnswer))),
                h('p', { class: 'muted' }, rich(response.explanation)),
              ),
            ),
          ),
      ),
    );
  }

  draw();
}

function saveProgress(results) {
  const stats = new Map();
  for (const { q, response } of results) {
    const row = stats.get(q.topic) ?? { right: 0, total: 0 };
    row.total++;
    if (response.correct) row.right++;
    stats.set(q.topic, row);
  }
  const progress = store.read(PROGRESS_KEY, {});
  for (const [id, { right, total }] of stats) {
    if (total < 3) continue;
    const pct = Math.round((right / total) * 100);
    progress[id] = { best: Math.max(progress[id]?.best ?? 0, pct), last: pct };
  }
  store.write(PROGRESS_KEY, progress);
}

document.getElementById('home-btn').replaceChildren(icon(Atom), h('span', {}, 'Matter Quest'));
document.getElementById('home-btn').addEventListener('click', showHome);
showHome();
