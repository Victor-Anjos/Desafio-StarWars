/**
 * Fetch que verifica response.ok antes de fazer .json().
 * Lança erro com o status HTTP se a resposta não for 2xx,
 * evitando o "Unexpected token '<'" quando a API retorna HTML de erro.
 */
export const safeFetch = (url, opts) =>
  fetch(url, opts).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
    return res.json();
  });

/**
 * Versão para buscar um item relacionado pelo URL.
 * Retorna null em caso de erro (404, rede, etc.) sem quebrar o Promise.all.
 */
export const safeFetchRelated = (url, getter) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) return null;
      return res.json().then(getter).catch(() => null);
    })
    .catch(() => null);
