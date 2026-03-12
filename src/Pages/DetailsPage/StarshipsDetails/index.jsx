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

const StarshipsDetails = () => {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [validIds, setValidIds] = useState([]);

  useEffect(() => {
    fetch("https://swapi.info/api/starships/")
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
    setStarship(null); setNotFound(false);
    safeFetch(`https://swapi.info/api/starships/${id}/`)
      .then(async (data) => {
        const [filmNames, pilotNames] = await Promise.all([
          Promise.all((data.films || []).map((u) => safeFetchRelated(u, (d) => d.title))),
          Promise.all((data.pilots || []).map((u) => safeFetchRelated(u, (d) => d.name))),
        ]);
        setStarship({
          name: data.name, model: data.model, manufacturer: data.manufacturer,
          cost: data.cost_in_credits !== "unknown" ? `${Number(data.cost_in_credits).toLocaleString()} créditos` : "n/a",
          length: data.length !== "unknown" ? `${data.length} m` : "n/a",
          maxSpeed: data.max_atmosphering_speed, crew: data.crew, passengers: data.passengers,
          cargoCapacity: data.cargo_capacity !== "unknown" ? `${Number(data.cargo_capacity).toLocaleString()} kg` : "n/a",
          consumables: data.consumables, hyperdriveRating: data.hyperdrive_rating,
          mglt: data.MGLT, starshipClass: data.starship_class,
          films: filmNames.filter(Boolean), pilots: pilotNames.filter(Boolean),
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
      <NavButtons prevId={prevId} nextId={nextId} base="/detalhes-naves" label="Naves" />
      {notFound ? <NotFound id={id} /> : !starship ? <Skeleton /> : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden px-6 pb-6">
          <div className="rounded-2xl overflow-hidden h-72 lg:h-full">
            <WookieImage name={starship.name} type="starship" className="w-full h-full object-cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="bg-[#111113] border border-zinc-800 rounded-2xl p-8 overflow-y-auto pb-12 lg:pb-8">
            <h1 className="font-orbitron text-3xl md:text-4xl font-black" style={{ color: "#FFE81F" }}>{starship.name}</h1>
            <div className="w-16 h-1 rounded-full mt-3 mb-7" style={{ background: "#FFE81F" }} />
            <h3 className="font-orbitron text-xs tracking-widest text-zinc-500 uppercase mb-5">Informações</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow label="Modelo" value={starship.model} />
              <InfoRow label="Fabricante" value={starship.manufacturer} />
              <InfoRow label="Custo" value={starship.cost} />
              <InfoRow label="Comprimento" value={starship.length} />
              <InfoRow label="Vel. Máxima" value={starship.maxSpeed} />
              <InfoRow label="Tripulação" value={starship.crew} />
              <InfoRow label="Passageiros" value={starship.passengers} />
              <InfoRow label="Carga" value={starship.cargoCapacity} />
              <InfoRow label="Consumíveis" value={starship.consumables} />
              <InfoRow label="Hyperdrive" value={starship.hyperdriveRating} />
              <InfoRow label="MGLT" value={starship.mglt} />
              <InfoRow label="Classe" value={starship.starshipClass} />
            </div>
            <TagList title="Filmes" items={starship.films} />
            <TagList title="Pilotos" items={starship.pilots} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StarshipsDetails;
