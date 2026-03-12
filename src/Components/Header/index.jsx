import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/planetas",    label: "Planetas"    },
  { to: "/especies",    label: "Espécies"    },
  { to: "/veiculos",    label: "Veículos"    },
  { to: "/naves",       label: "Naves"       },
  { to: "/filmes",      label: "Filmes"      },
  { to: "/personagens", label: "Personagens" },
];

const Logo = ({ onClick }) => (
  <NavLink to="/" onClick={onClick} className="group flex flex-col items-center gap-1 select-none">
    <div className="flex items-center gap-3 w-full justify-center">
      <span
        className="flex-1 max-w-[60px] h-px transition-all duration-300 group-hover:max-w-[80px]"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,232,31,0.5))" }}
      />
      <span className="text-[9px] font-orbitron tracking-[0.5em] uppercase text-zinc-500 group-hover:text-[#FFE81F]/70 transition-colors duration-300">
        A long time ago
      </span>
      <span
        className="flex-1 max-w-[60px] h-px transition-all duration-300 group-hover:max-w-[80px]"
        style={{ background: "linear-gradient(to left, transparent, rgba(255,232,31,0.5))" }}
      />
    </div>
    <span
      className="font-orbitron font-black tracking-[0.35em] uppercase text-2xl md:text-3xl transition-colors duration-300"
      style={{ color: "#FFE81F", textShadow: "0 0 30px rgba(255,232,31,0.25), 0 0 60px rgba(255,232,31,0.08)" }}
    >
      Star Wars
    </span>
    <span className="font-orbitron text-[9px] tracking-[0.6em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
      Galaxy Explorer
    </span>
  </NavLink>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#09090b] border-b border-zinc-800/80">
      {/* Desktop */}
      <div className="hidden md:flex flex-col items-center max-w-7xl mx-auto px-6 pt-4 pb-3 gap-4">
        <Logo />
        <nav>
          <ul className="flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `font-orbitron text-[11px] tracking-widest uppercase font-bold transition-all duration-200 relative pb-1 ${
                      isActive ? "text-[#FFE81F]" : "text-zinc-500 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-px rounded-full" style={{ background: "#FFE81F" }} />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between px-5 py-4">
        <Logo onClick={() => setMenuOpen(false)} />
        <button
          className="text-zinc-400 hover:text-white p-2 flex-shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#09090b]">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-orbitron text-xs tracking-widest uppercase font-bold transition-colors duration-200 ${isActive ? "text-[#FFE81F]" : "text-zinc-400"}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
