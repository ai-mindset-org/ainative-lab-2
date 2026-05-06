// Netlify Function: OpenRouter proxy
// Lets participants without their own API key use the «ask the graph» / «прогнать через модель» buttons
// via OPENROUTER_API_KEY set in Netlify env (server-side).
//
// Mirrors the AIN02 Compass /api/rationale pattern.
//
// Endpoint: POST /api/openrouter
// Body: { messages: [...], model?: "anthropic/claude-haiku-4.5", max_tokens?: 1000 }
// Response (success): { ok: true, content: "...", model: "...", usage: {...} }
// Response (error):   { ok: false, error: "no_server_key" | "auth_failed" | "rate_limited" | "..." }

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

const DEFAULT_MODEL = 'anthropic/claude-haiku-4.5';
const DEFAULT_MAX_TOKENS = 1000;
const MAX_TOKENS_CAP = 4000;
const REFERER = 'https://ainative-lab-2.netlify.app';
const TITLE = 'ainative-lab-2 (server proxy)';

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: CORS_HEADERS
  });
}

export default async (request) => {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return jsonResponse({ ok: false, error: 'no_server_key' }, 503);
  }

  // parse body
  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
  }

  const messages = Array.isArray(payload && payload.messages) ? payload.messages : null;
  if (!messages || messages.length === 0) {
    return jsonResponse({ ok: false, error: 'messages_required' }, 400);
  }

  const model = (typeof payload.model === 'string' && payload.model.trim())
    ? payload.model.trim()
    : DEFAULT_MODEL;

  let maxTokens = Number.isFinite(payload.max_tokens) ? payload.max_tokens : DEFAULT_MAX_TOKENS;
  if (maxTokens < 1) maxTokens = DEFAULT_MAX_TOKENS;
  if (maxTokens > MAX_TOKENS_CAP) maxTokens = MAX_TOKENS_CAP;

  // forward
  let upstream;
  try {
    upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/json',
        'HTTP-Referer': REFERER,
        'X-Title': TITLE
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: maxTokens
      })
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: 'network_error: ' + (err && err.message ? err.message : String(err))
    }, 502);
  }

  let data = null;
  try {
    data = await upstream.json();
  } catch (e) {
    // OpenRouter returned non-JSON (rare)
    return jsonResponse({ ok: false, error: 'upstream_invalid_json', status: upstream.status }, 502);
  }

  if (upstream.status === 401) {
    return jsonResponse({ ok: false, error: 'auth_failed' }, 401);
  }
  if (upstream.status === 429) {
    return jsonResponse({ ok: false, error: 'rate_limited' }, 429);
  }
  if (upstream.status === 402) {
    return jsonResponse({ ok: false, error: 'no_credits' }, 402);
  }
  if (upstream.status >= 400) {
    const msg = (data && data.error && data.error.message) || ('upstream_' + upstream.status);
    return jsonResponse({ ok: false, error: msg }, upstream.status);
  }

  // extract response text
  let content = '';
  try {
    content = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
  } catch (e) {
    content = '';
  }

  return jsonResponse({
    ok: true,
    content: content,
    model: (data && data.model) || model,
    usage: (data && data.usage) || null
  }, 200);
};

export const config = { path: '/api/openrouter' };
