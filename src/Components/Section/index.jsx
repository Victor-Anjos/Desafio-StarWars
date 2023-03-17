import React from "react";

const Section = () => {
  return (
    <section className="bg-black h-screen pb-8">
      <div className=" text-white p-12 text-center">
        <h2 className="text-6xl font-bold mb-4">
          Descubra o universo Star Wars!
        </h2>
        <p className="text-lg mb-2 text-xl text-white">
          Em uma galáxia muito, muito distante, existem muitas aventuras e
          batalhas épicas para serem descobertas.
        </p>
      </div>
      <div className="text-white mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5">
          <div className=" overflow-hidden shadow-lg border-b-4 border-white bg-zinc-900 rounded">
            <div className="p-4 shadow-lg ">
              <h2 className="text-lg font-bold mb-2 uppercase">Planetas</h2>
              <p className="text-gray-400">
                Explore os planetas da galáxia de Star Wars e descubra suas
                peculiaridades.
              </p>
            </div>
          </div>

          <div className=" overflow-hidden shadow-lg border-b-4 border-white bg-zinc-900 rounded">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 uppercase">Especies</h2>
              <p className="text-gray-400">
                Conheça as espécies que habitam a galáxia de Star Wars.
              </p>
            </div>
          </div>
          <div className=" overflow-hidden shadow-lg border-b-4 border-white bg-zinc-900 rounded">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 uppercase">Veiculos</h2>
              <p className="text-gray-400">
                Descubra os veículos usados pelos personagens da saga Star Wars.
              </p>
            </div>
          </div>
          <div className=" overflow-hidden shadow-lg border-b-4 border-white bg-zinc-900 rounded">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 uppercase">Naves</h2>
              <p className="text-gray-400">
                Explore as naves e espaçonaves usadas na saga Star Wars.
              </p>
            </div>
          </div>
          <div className=" overflow-hidden shadow-lg border-b-4 border-white bg-zinc-900 rounded">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 uppercase">Filmes</h2>
              <p className="text-gray-400">
                Saiba sobre todos os filmes da incrivel franquia de Star Wars.
              </p>
            </div>
          </div>
          <div className=" overflow-hidden shadow-lg border-b-4 border-white bg-zinc-900 rounded">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 uppercase">Personagens</h2>
              <p className="text-gray-400">
                Conheça agora todos os personagens icônicos da franquia Star
                Wars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
