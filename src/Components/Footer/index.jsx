import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#09090b] border-t border-zinc-800 py-10 flex flex-col items-center justify-center gap-4">
      <img src="/img/logo.png" alt="Star Wars" width="90px" className="opacity-40" />
      <p className="font-orbitron text-zinc-600 text-[10px] tracking-[0.4em] uppercase">
        Todos os direitos reservados a Star Wars
      </p>
      <p className="font-orbitron text-zinc-400 text-[9px] tracking-[0.3em] uppercase">
        Desenvolvido por Victor César — {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
