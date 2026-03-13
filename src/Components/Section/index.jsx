import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGlobe, FaDna, FaRocket, FaFilm, FaUserAstronaut } from "react-icons/fa";
import { GiTank } from "react-icons/gi";

const categories = [
  {
    label: "Planetas",
    route: "/planetas",
    desc: "Explore os planetas da galáxia, de Tatooine a Coruscant.",
    Icon: FaGlobe,
  },
  {
    label: "Espécies",
    route: "/especies",
    desc: "Conheça as espécies que habitam a galáxia.",
    Icon: FaDna,
  },
  {
    label: "Veículos",
    route: "/veiculos",
    desc: "Descubra os veículos usados pelos personagens da saga.",
    Icon: GiTank,
  },
  {
    label: "Naves",
    route: "/naves",
    desc: "Explore as espaçonaves icônicas que cruzam a galáxia.",
    Icon: FaRocket,
  },
  {
    label: "Filmes",
    route: "/filmes",
    desc: "Todos os filmes da incrível franquia Star Wars.",
    Icon: FaFilm,
  },
  {
    label: "Personagens",
    route: "/personagens",
    desc: "Conheça os personagens icônicos da franquia.",
    Icon: FaUserAstronaut,
  },
];

const Section = () => {
  const navigate = useNavigate();

  return (
    <section className="stars-bg relative bg-[#09090b] overflow-hidden">
      {/* Nebula glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,232,31,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Hero */}
      <div className="relative z-10 text-center pt-20 pb-16 px-6">
        <p className="font-orbitron text-[#FFE81F] text-xs tracking-[0.6em] uppercase mb-6 fade-in-up-d1">
          Em uma galáxia muito, muito distante...
        </p>
        <h1 className="font-orbitron font-black text-white text-5xl md:text-7xl leading-tight mb-6 fade-in-up-d2">
          Descubra o{" "}
          <span style={{ color: "#FFE81F" }}>Universo</span>
          <br />
          Star Wars
        </h1>
        <p className="text-zinc-400 text-lg max-w-md mx-auto mb-14 fade-in-up-d3">
          Personagens, planetas, naves, veículos, espécies e filmes de toda a
          saga reunidos em um só lugar.
        </p>
      </div>

      {/* Category cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(({ label, route, desc, Icon }) => (
            <button
              key={route}
              onClick={() => navigate(route)}
              className="card-sw group text-left bg-[#111113] border border-zinc-800 rounded-2xl p-7 transition-all duration-300 hover:bg-zinc-900 cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                style={{
                  background: "rgba(255, 232, 31, 0.08)",
                  border: "1px solid rgba(255, 232, 31, 0.15)",
                }}
              >
                <Icon
                  size={24}
                  className="transition-colors duration-300 group-hover:text-[#FFE81F]"
                  style={{ color: "#a1a1aa" }}
                />
              </div>
              <h2 className="font-orbitron text-white font-bold text-base mb-2 group-hover:text-[#FFE81F] transition-colors duration-200">
                {label}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              <div className="mt-5 flex items-center gap-2 text-[#FFE81F] font-orbitron text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explorar <span className="text-base">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;
