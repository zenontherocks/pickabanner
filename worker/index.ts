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
    `SELECT id, character, location_input, lat, lng, note, created_at, direction
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
    direction: r.direction ?? 'horizontal',
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

  const { character, locationInput, lat, lng, note, direction } = body as Record<string, unknown>;

  const colorParts = typeof character === 'string' ? character.split(',').map(s => s.trim()) : [];
  if (colorParts.length === 0 || colorParts.length > 3 || !colorParts.every(c => /^#[0-9a-fA-F]{6}$/.test(c))) {
    return json({ error: 'character must be 1-3 comma-separated 6-digit hex colors' }, 400, cors);
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
  const directionStr = direction === 'vertical' ? 'vertical' : 'horizontal';

  await env.DB.prepare(
    `INSERT INTO banners (id, character, location_input, lat, lng, note, created_at, direction)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(id, colorParts.join(','), locationInput.trim(), lat, lng, noteStr, createdAt, directionStr)
    .run();

  return json(
    {
      id,
      character: colorParts.join(','),
      locationInput: locationInput.trim(),
      lat,
      lng,
      note: noteStr,
      createdAt,
      direction: directionStr,
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
