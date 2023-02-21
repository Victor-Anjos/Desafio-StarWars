import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header";

const FilmsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [films, setFilms] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setFilms({
          id: id,
          name: data.title,
          image: `https://starwars-visualguide.com/assets/img/films/${id}.jpg`,
          episode_id: data.episode_id,
          opening_crawl: data.opening_crawl,
          director: data.director,
          producer: data.producer,
          release_date: data.release_date,
          characters: data.characters,
          planets: data.planets,
          starships: data.starships,
          vehicles: data.vehicles,
          species: data.species,
        });
      });
  }, [id]);

  if (!films) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="bg-black">
        <Button onClick={() => navigate("/")} />

        <div className="flex justify-between mt-8 ml-10 mr-10">
          <button
            className="text-white rounded-full px-6 py-3 bg-blue-800 pointer uppercase"
            onClick={() => navigate(`/detalhes-filmes/${parseInt(id) - 1}`)}
            disabled={id === "1"}
          >
            {"<-"} Anterior
          </button>
          <button
            className="text-white rounded-full px-6 py-3 bg-blue-800 pointer ml-5 uppercase"
            onClick={() => navigate(`/detalhes-filmes/${parseInt(id) + 1}`)}
            disabled={id === "37"}
          >
            Proximo {"->"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
          <div>
            <img
              src={films.image}
              alt={films.title}
              className="object-cover w-full h-full rounded"
            />
          </div>

          <div className="bg-stone-900 rounded-md h-auto p-5 border-b-4 border-yellow-500">
            <div className="p-4 text-white">
              <h2 className="text-5xl font-bold mb-4 text-yellow-400 border-b-2 pb-4 border-yellow-400">
                {films.title}
              </h2>
              <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                Informações:
              </h3>

              <div>
                <p className="text-xl mb-2">
                  <span className="font-bold">Classification: </span>{" "}
                  {films.episode_id}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Designation: </span>{" "}
                  {films.opening_crawl}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Average Height: </span>{" "}
                  {films.director} cm
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Average Lifespan: </span>{" "}
                  {films.producer} years
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Language: </span>
                  {films.release_date}
                </p>

                {films.characters && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Characters:
                    </h3>
                    {films.characters.map((characters, index) => (
                      <p key={index} className="text-xl mb-2">
                        {characters}
                      </p>
                    ))}
                  </div>
                )}

                {films.planets && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Planetas relacionados:
                    </h3>
                    {films.planets.map((planets, index) => (
                      <p key={index} className="text-xl mb-2">
                        {planets}
                      </p>
                    ))}
                  </div>
                )}

                {films.starships && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Naves e Veiculos relacionados:
                    </h3>
                    {films.starships.map((starships, index) => (
                      <p key={index} className="text-xl mb-2">
                        {starships}
                      </p>
                    ))}
                    {films.vehicles.map((starships, index) => (
                      <p key={index} className="text-xl mb-2">
                        {starships}
                      </p>
                    ))}
                  </div>
                )}

                {films.species && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Especies relacionadas:
                    </h3>
                    {films.species.map((species, index) => (
                      <p key={index} className="text-xl mb-2">
                        {species}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmsDetails;
