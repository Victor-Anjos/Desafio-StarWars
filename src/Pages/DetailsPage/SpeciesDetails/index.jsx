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

const SpeciesDetails = () => {
  const { id } = useParams();
  const [species, setSpecies] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [validIds, setValidIds] = useState([]);

  useEffect(() => {
    fetch("https://swapi.info/api/species/")
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
    setSpecies(null); setNotFound(false);
    safeFetch(`https://swapi.info/api/species/${id}/`)
      .then(async (data) => {
        const [filmNames, peopleNames, homeworldName] = await Promise.all([
          Promise.all((data.films || []).map((u) => safeFetchRelated(u, (d) => d.title))),
          Promise.all((data.people || []).map((u) => safeFetchRelated(u, (d) => d.name))),
          data.homeworld ? safeFetchRelated(data.homeworld, (d) => d.name) : null,
        ]);
        setSpecies({
          name: data.name, classification: data.classification,
          designation: data.designation,
          averageHeight: data.average_height !== "unknown" ? `${data.average_height} cm` : "n/a",
          averageLifespan: data.average_lifespan !== "unknown" ? `${data.average_lifespan} anos` : "n/a",
          language: data.language, homeworld: homeworldName || "n/a",
          skin: data.skin_colors, hair: data.hair_colors, eyes: data.eye_colors,
          films: filmNames.filter(Boolean), people: peopleNames.filter(Boolean),
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
      <NavButtons prevId={prevId} nextId={nextId} base="/detalhes-especies" label="Espécies" />
      {notFound ? <NotFound id={id} /> : !species ? <Skeleton /> : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden px-6 pb-6">
          <div className="rounded-2xl overflow-hidden h-72 lg:h-full">
            <WookieImage name={species.name} type="species" className="w-full h-full object-cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-8 overflow-y-auto pb-12 lg:pb-8">
            <h1 className="font-orbitron text-3xl md:text-4xl font-black" style={{ color: "#FFE81F" }}>{species.name}</h1>
            <div className="w-16 h-1 rounded-full mt-3 mb-7" style={{ background: "#FFE81F" }} />
            <h3 className="font-orbitron text-xs tracking-widest text-zinc-500 uppercase mb-5">Informações</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow label="Classificação" value={species.classification} />
              <InfoRow label="Designação" value={species.designation} />
              <InfoRow label="Altura Média" value={species.averageHeight} />
              <InfoRow label="Vida Média" value={species.averageLifespan} />
              <InfoRow label="Idioma" value={species.language} />
              <InfoRow label="Planeta Natal" value={species.homeworld} />
              <InfoRow label="Cores de Pele" value={species.skin} />
              <InfoRow label="Cores de Cabelo" value={species.hair} />
              <InfoRow label="Cores de Olhos" value={species.eyes} />
            </div>
            <TagList title="Filmes" items={species.films} />
            <TagList title="Personagens" items={species.people} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeciesDetails;
