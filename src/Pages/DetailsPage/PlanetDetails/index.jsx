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

const PlanetDetails = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [validIds, setValidIds] = useState([]);

  useEffect(() => {
    fetch("https://swapi.info/api/planets/")
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
    setPlanet(null); setNotFound(false);
    safeFetch(`https://swapi.info/api/planets/${id}/`)
      .then(async (data) => {
        const [filmNames, residentNames] = await Promise.all([
          Promise.all((data.films || []).map((u) => safeFetchRelated(u, (d) => d.title))),
          Promise.all((data.residents || []).map((u) => safeFetchRelated(u, (d) => d.name))),
        ]);
        setPlanet({
          name: data.name,
          rotation: data.rotation_period !== "unknown" ? `${data.rotation_period}h` : "n/a",
          orbital: data.orbital_period !== "unknown" ? `${data.orbital_period} dias` : "n/a",
          diameter: data.diameter !== "unknown" ? `${data.diameter} km` : "n/a",
          climate: data.climate, gravity: data.gravity, terrain: data.terrain,
          surface: data.surface_water !== "unknown" ? `${data.surface_water}%` : "n/a",
          population: data.population !== "unknown" ? Number(data.population).toLocaleString() : "n/a",
          films: filmNames.filter(Boolean),
          residents: residentNames.filter(Boolean),
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
      <NavButtons prevId={prevId} nextId={nextId} base="/detalhes-planetas" label="Planetas" />
      {notFound ? <NotFound id={id} /> : !planet ? <Skeleton /> : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden px-6 pb-6">
          <div className="rounded-2xl overflow-hidden h-72 lg:h-full">
            <WookieImage name={planet.name} type="planet" className="w-full h-full object-cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-8 overflow-y-auto pb-12 lg:pb-8">
            <h1 className="font-orbitron text-3xl md:text-4xl font-black" style={{ color: "#FFE81F" }}>{planet.name}</h1>
            <div className="w-16 h-1 rounded-full mt-3 mb-7" style={{ background: "#FFE81F" }} />
            <h3 className="font-orbitron text-xs tracking-widest text-zinc-500 uppercase mb-5">Informações</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow label="Rotação" value={planet.rotation} />
              <InfoRow label="Período Orbital" value={planet.orbital} />
              <InfoRow label="Diâmetro" value={planet.diameter} />
              <InfoRow label="Clima" value={planet.climate} />
              <InfoRow label="Gravidade" value={planet.gravity} />
              <InfoRow label="Terreno" value={planet.terrain} />
              <InfoRow label="Água Superficial" value={planet.surface} />
              <InfoRow label="População" value={planet.population} />
            </div>
            <TagList title="Filmes" items={planet.films} />
            <TagList title="Residentes" items={planet.residents} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanetDetails;
