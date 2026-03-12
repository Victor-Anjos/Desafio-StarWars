import React from "react";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 pt-6 pb-2">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-orbitron text-[11px] tracking-widest uppercase text-zinc-400 hover:text-[#FFE81F] border border-zinc-700 hover:border-[#FFE81F]/60 rounded-full px-6 py-2.5 transition-all duration-200"
      >
        ← Voltar
      </button>
    </div>
  );
};

export default Button;
