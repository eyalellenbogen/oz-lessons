async function request(path, options) {
  const res = await fetch(path, options);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

const post = (path, body) =>
  request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

export const api = {
  topics: () => request('/api/topics'),
  lesson: (id) => request(`/api/topics/${encodeURIComponent(id)}/lesson`),
  quiz: (topicIds, count) => {
    const params = new URLSearchParams({ count: String(count) });
    if (topicIds.length) params.set('topics', topicIds.join(','));
    return request(`/api/quiz?${params}`);
  },
  check: (questionId, answer) => post('/api/quiz/check', { questionId, answer }),
  analyze: (equation, coefficients) => post('/api/equations/analyze', { ...equation, coefficients }),
};
