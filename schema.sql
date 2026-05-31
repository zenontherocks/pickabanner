CREATE TABLE IF NOT EXISTS banners (
  id             TEXT PRIMARY KEY,
  character      TEXT NOT NULL,
  location_input TEXT NOT NULL,
  lat            REAL NOT NULL,
  lng            REAL NOT NULL,
  note           TEXT NOT NULL DEFAULT '',
  created_at     TEXT NOT NULL
);
