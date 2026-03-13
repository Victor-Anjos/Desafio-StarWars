// Pôsteres estáticos via TMDB CDN (gratuito, sem API key)
const TMDB = "https://image.tmdb.org/t/p/w500";

const FILM_POSTERS = {
  "A New Hope":               `${TMDB}/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg`,
  "The Empire Strikes Back":  `${TMDB}/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg`,
  "Return of the Jedi":       `${TMDB}/mDCBQNhR6R0PVFucJl0P4jDLmJz.jpg`,
  "The Phantom Menace":       `${TMDB}/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg`,
  "Attack of the Clones":     `${TMDB}/oIforiJMHAlnh4DbKVQnaLNjjSP.jpg`,
  "Revenge of the Sith":      `${TMDB}/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg`,
  "The Force Awakens":        `${TMDB}/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg`,
};

export function getFilmPoster(title) {
  return FILM_POSTERS[title] ?? null;
}
