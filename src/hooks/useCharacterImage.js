import { useState, useEffect } from "react";

const AKABAB_URL =
  "https://raw.githubusercontent.com/akabab/starwars-api/0.2.1/api/all.json";

let cache = null;
let fetchPromise = null;

function fetchAllCharacters() {
  if (cache) return Promise.resolve(cache);
  if (!fetchPromise) {
    fetchPromise = fetch(AKABAB_URL)
      .then((r) => r.json())
      .then((data) => {
        cache = data;
        return data;
      })
      .catch(() => {
        fetchPromise = null;
        return [];
      });
  }
  return fetchPromise;
}

export function useCharacterImage(name) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(!!name);

  useEffect(() => {
    if (!name) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchAllCharacters().then((characters) => {
      const match = characters.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      setImageUrl(match?.image ?? null);
      setLoading(false);
    });
  }, [name]);

  return { imageUrl, loading };
}
