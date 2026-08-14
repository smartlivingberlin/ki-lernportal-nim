/**
 * Teilbare Lektions-URLs: `?lesson=l8` oder `#lesson-l8` öffnen die Lektion
 * beim Laden. Kein Server, kein Reload — nur lokale History-Aktualisierung.
 */
const LESSON_QUERY_PARAM = "lesson";
const LESSON_HASH_PATTERN = /^#lesson-(.+)$/;

/** Liest eine gewünschte Lektions-ID aus Query (`?lesson=`) oder Hash (`#lesson-lX`). */
export function readLessonIdFromLocation(location: {
  search: string;
  hash: string;
}): string | null {
  const params = new URLSearchParams(location.search);
  const fromQuery = params.get(LESSON_QUERY_PARAM);
  if (fromQuery) return fromQuery;

  const hashMatch = LESSON_HASH_PATTERN.exec(location.hash);
  return hashMatch ? hashMatch[1] : null;
}

/** Baut die neue Pfad+Query-URL mit `?lesson=` — bestehende Parameter bleiben erhalten. */
export function buildLessonShareUrl(
  location: { pathname: string; search: string },
  lessonId: string,
): string {
  const params = new URLSearchParams(location.search);
  params.set(LESSON_QUERY_PARAM, lessonId);
  const query = params.toString();
  return `${location.pathname}${query ? `?${query}` : ""}`;
}

/** Absolute Teil-URL für Zwischenablage (Origin + `?lesson=`). */
export function buildAbsoluteLessonShareUrl(
  location: { origin: string; pathname: string; search: string },
  lessonId: string,
): string {
  return `${location.origin}${buildLessonShareUrl(location, lessonId)}`;
}

/** Aktualisiert die Adressleiste ohne Reload (history.replaceState). */
export function updateLessonUrl(lessonId: string): void {
  if (typeof window === "undefined" || typeof history === "undefined") return;
  const nextUrl = buildLessonShareUrl(window.location, lessonId);
  history.replaceState(null, "", nextUrl);
}
