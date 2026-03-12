import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../Components/Header";
import WookieImage from "../../../Components/WookieImage";
import { safeFetch, safeFetchRelated } from "../../../utils/safeFetch";

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-zinc-500 text-xs font-orbitron tracking-widest uppercase">{label}</span>
    <span className="text-white text-base font-semibold">{value || "n/a"}</span>
  </div>
);

const TagList = ({ title, items }) => {
  if (!items?.length) return null;
  return (
    <div className="mt-5">
      <h3 className="font-orbitron text-xs tracking-widest text-zinc-500 uppercase mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => item && <span key={i} className="sw-tag">{item}</span>)}
      </div>
    </div>
  );
};

const NavButtons = ({ prevId, nextId, base, label }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-6 py-3 flex-shrink-0">
      <button
        disabled={!prevId}
        onClick={() => prevId && navigate(`${base}/${prevId}`)}
        className="font-orbitron text-[10px] tracking-widest uppercase text-zinc-400 hover:text-[#FFE81F] disabled:opacity-30 disabled:cursor-not-allowed border border-zinc-700 hover:border-[#FFE81F]/50 rounded-full px-5 py-2 transition-all duration-200"
      >
        ← Anterior
      </button>
      <span className="font-orbitron text-zinc-600 text-[10px] tracking-widest uppercase">{label}</span>
      <button
        disabled={!nextId}
        onClick={() => nextId && navigate(`${base}/${nextId}`)}
        className="font-orbitron text-[10px] tracking-widest uppercase text-zinc-400 hover:text-[#FFE81F] disabled:opacity-30 disabled:cursor-not-allowed border border-zinc-700 hover:border-[#FFE81F]/50 rounded-full px-5 py-2 transition-all duration-200"
      >
        Próximo →
      </button>
    </div>
  );
};

const NotFound = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4">
      <span className="font-orbitron text-zinc-600 text-xs tracking-widest uppercase">ID #{id} não encontrado</span>
      <button onClick={() => navigate(-1)} className="font-orbitron text-[10px] tracking-widest uppercase text-zinc-400 hover:text-[#FFE81F] border border-zinc-700 hover:border-[#FFE81F]/50 rounded-full px-6 py-2.5 transition-all duration-200">← Voltar</button>
    </div>
  );
};

const Skeleton = () => (
  <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden p-6">
    <div className="skeleton rounded-2xl h-64 lg:h-full" />
    <div className="space-y-4 p-8"><div className="skeleton h-10 rounded w-3/4" /><div className="skeleton h-4 rounded w-full mt-6" /></div>
  </div>
);

const FilmsDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [validIds, setValidIds] = useState([]);

  useEffect(() => {
    fetch("https://swapi.info/api/films/")
      .then((r) => r.json())
      .then((data) => {
        const ids = data
          .map((item) => item.url.match(/(\d+)\/?$/)?.[1])
          .filter(Boolean)
          .map(Number)
          .sort((a, b) => a - b)
          .map(String);
        setValidIds(ids);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setFilm(null); setNotFound(false);
    safeFetch(`https://swapi.info/api/films/${id}/`)
      .then(async (data) => {
        const [characterNames, planetNames, starshipNames, vehicleNames, speciesNames] =
          await Promise.all([
            Promise.all((data.characters || []).map((u) => safeFetchRelated(u, (d) => d.name))),
            Promise.all((data.planets || []).map((u) => safeFetchRelated(u, (d) => d.name))),
            Promise.all((data.starships || []).map((u) => safeFetchRelated(u, (d) => d.name))),
            Promise.all((data.vehicles || []).map((u) => safeFetchRelated(u, (d) => d.name))),
            Promise.all((data.species || []).map((u) => safeFetchRelated(u, (d) => d.name))),
          ]);
        setFilm({
          title: data.title, episodeId: data.episode_id,
          openingCrawl: data.opening_crawl, director: data.director,
          producer: data.producer, releaseDate: data.release_date,
          characters: characterNames.filter(Boolean), planets: planetNames.filter(Boolean),
          starships: starshipNames.filter(Boolean), vehicles: vehicleNames.filter(Boolean),
          species: speciesNames.filter(Boolean),
        });
      })
      .catch(() => setNotFound(true));
  }, [id]);

  const currentIndex = validIds.indexOf(id);
  const prevId = currentIndex > 0 ? validIds[currentIndex - 1] : null;
  const nextId = currentIndex !== -1 && currentIndex < validIds.length - 1 ? validIds[currentIndex + 1] : null;

  return (
    <div className="bg-[#09090b] flex flex-col lg:h-screen lg:overflow-hidden">
      <Header />
      <NavButtons prevId={prevId} nextId={nextId} base="/detalhes-filmes" label="Filmes" />
      {notFound ? <NotFound id={id} /> : !film ? <Skeleton /> : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden px-6 pb-6">
          <div className="rounded-2xl overflow-hidden h-72 lg:h-full">
            <WookieImage name={film.title} type="film" className="w-full h-full object-cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-8 overflow-y-auto pb-12 lg:pb-8">
            <h1 className="font-orbitron text-3xl md:text-4xl font-black" style={{ color: "#FFE81F" }}>{film.title}</h1>
            <div className="w-16 h-1 rounded-full mt-3 mb-7" style={{ background: "#FFE81F" }} />
            <h3 className="font-orbitron text-xs tracking-widest text-zinc-500 uppercase mb-5">Informações</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow label="Episódio" value={`Episode ${film.episodeId}`} />
              <InfoRow label="Diretor" value={film.director} />
              <InfoRow label="Produtor" value={film.producer} />
              <InfoRow label="Lançamento" value={film.releaseDate} />
            </div>
            {film.openingCrawl && (
              <div className="mt-5">
                <h3 className="font-orbitron text-xs tracking-widest text-zinc-500 uppercase mb-2">Abertura</h3>
                <p className="text-zinc-300 text-sm leading-relaxed italic border-l-2 border-[#FFE81F]/40 pl-4">{film.openingCrawl}</p>
              </div>
            )}
            <TagList title="Personagens" items={film.characters} />
            <TagList title="Planetas" items={film.planets} />
            <TagList title="Naves" items={film.starships} />
            <TagList title="Veículos" items={film.vehicles} />
            <TagList title="Espécies" items={film.species} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmsDetails;
