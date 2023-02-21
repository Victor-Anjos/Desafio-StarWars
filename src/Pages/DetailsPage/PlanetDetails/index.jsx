import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header";

const PlanetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setPlanet({
          id: id,
          name: data.name,
          image: `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`,
          rotation: data.rotation_period,
          orbital: data.orbital_period,
          diameter: data.diameter,
          climate: data.climate,
          gravity: data.gravity,
          terrain: data.terrain,
          surface: data.surface_water,
          population: data.population,
          residents: data.residents,
          films: data.films,
        });
      });
  }, [id]);

  if (!planet) {
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
            onClick={() => navigate(`/detalhes-planetas/${parseInt(id) - 1}`)}
            disabled={id === "1"}
          >
            {"<-"} Anterior
          </button>
          <button
            className="text-white rounded-full px-6 py-3 bg-blue-800 pointer ml-5 uppercase"
            onClick={() => navigate(`/detalhes-planetas/${parseInt(id) + 1}`)}
            disabled={id === "83"}
          >
            Próximo {"->"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
          <div>
            <img
              src={planet.image}
              alt={planet.name}
              className="object-cover w-full h-full rounded"
            />
          </div>

          <div className="bg-stone-900 rounded-md h-auto p-5 border-b-4 border-yellow-500">
            <div className="p-4 text-white">
              <h2 className="text-5xl font-bold mb-4 text-yellow-400 border-b-2 pb-4 border-yellow-400">
                {planet.name}
              </h2>
              <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                Informações:
              </h3>

              <div>
                <p className="text-xl mb-2">
                  <span className="font-bold">Rotation Period: </span>{" "}
                  {planet.rotation}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Orbital Period: </span>{" "}
                  {planet.orbital ? planet.orbital : "n/a"}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Diameter: </span>{" "}
                  {planet.diameter}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Climate: </span> {planet.climate}
                </p>
              </div>
              <div>
                <p className="text-xl mb-2">
                  <span className="font-bold">Gravity:</span> {planet.gravity}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Terrain: </span>
                  {planet.terrain}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Surface Water: </span>
                  {planet.surface}
                </p>
                <p className="text-xl mb-5">
                  <span className="font-bold">Population: </span>
                  {planet.population}
                </p>

                {planet.films && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Filmes relacionados:
                    </h3>
                    {planet.films.map((film, index) => (
                      <p key={index} className="text-xl mb-2">
                        {film}
                      </p>
                    ))}
                  </div>
                )}

                {planet.residents && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Residentes
                    </h3>
                    {planet.residents.map((residents, index) => (
                      <p key={index} className="text-xl mb-2">
                        {residents}
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

export default PlanetDetails;
