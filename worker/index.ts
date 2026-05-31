export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

function corsHeaders(origin: string | null): Record<string, string> {
  const devOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
  if (origin && devOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }
  return {};
}

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extra },
  });
}

async function getBanners(env: Env, cors: Record<string, string>) {
  const { results } = await env.DB.prepare(
    `SELECT id, character, location_input, lat, lng, note, created_at
     FROM banners ORDER BY created_at DESC`
  ).all();

  const banners = (results as Record<string, unknown>[]).map((r) => ({
    id: r.id,
    character: r.character,
    locationInput: r.location_input,
    lat: r.lat,
    lng: r.lng,
    note: r.note,
    createdAt: r.created_at,
  }));

  return json(banners, 200, cors);
}

async function postBanner(request: Request, env: Env, cors: Record<string, string>) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400, cors);
  }

  if (typeof body !== 'object' || body === null) {
    return json({ error: 'Body must be an object' }, 400, cors);
  }

  const { character, locationInput, lat, lng, note } = body as Record<string, unknown>;

  if (typeof character !== 'string' || character.trim() === '') {
    return json({ error: 'character is required' }, 400, cors);
  }
  if (typeof locationInput !== 'string' || locationInput.trim() === '') {
    return json({ error: 'locationInput is required' }, 400, cors);
  }
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return json({ error: 'lat and lng must be numbers' }, 400, cors);
  }
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return json({ error: 'lat/lng out of range' }, 400, cors);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const noteStr = typeof note === 'string' ? note.slice(0, 128) : '';

  await env.DB.prepare(
    `INSERT INTO banners (id, character, location_input, lat, lng, note, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(id, character.trim(), locationInput.trim(), lat, lng, noteStr, createdAt)
    .run();

  return json(
    {
      id,
      character: character.trim(),
      locationInput: locationInput.trim(),
      lat,
      lng,
      note: noteStr,
      createdAt,
    },
    201,
    cors
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === '/api/banners') {
      if (request.method === 'GET') return getBanners(env, cors);
      if (request.method === 'POST') return postBanner(request, env, cors);
      return json({ error: 'Method not allowed' }, 405, cors);
    }

    return env.ASSETS.fetch(request);
  },
};
