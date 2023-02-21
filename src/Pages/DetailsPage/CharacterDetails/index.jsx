import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header";
import Button from "../../../Components/Button";

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setCharacter({
          id: id,
          name: data.name,
          image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
          birthYear: data.birth_year,
          species: data.species[0],
          height: data.height,
          mass: data.mass,
          gender: data.gender,
          hairColor: data.hair_color,
          skinColor: data.skin_color,
          eyeColor: data.eye_color,
          homeworld: data.homeworld,
          films: data.films,
          vehicles: data.vehicles,
          starships: data.starships,
        });
      });
  }, [id]);

  if (!character) {
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
            onClick={() =>
              navigate(`/detalhes-personagens/${parseInt(id) - 1}`)
            }
            disabled={id === "1"}
          >
            {"<-"} Anterior
          </button>
          <button
            className="text-white rounded-full px-6 py-3 bg-blue-800 pointer ml-5 uppercase"
            onClick={() =>
              navigate(`/detalhes-personagens/${parseInt(id) + 1}`)
            }
            disabled={id === "83"}
          >
            Próximo {"->"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
          <div>
            <img
              src={character.image}
              alt={character.name}
              className="object-cover w-full h-full rounded"
            />
          </div>

          <div className="bg-stone-900 rounded-md h-auto p-5 border-b-4 border-yellow-500">
            <div className="p-4 text-white">
              <h2 className="text-5xl font-bold mb-4 text-yellow-400 border-b-2 pb-4 border-yellow-400">
                {character.name}
              </h2>
              <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                Informações:
              </h3>

              <div>
                <p className="text-xl mb-2">
                  <span className="font-bold">Birth Year: </span>{" "}
                  {character.birthYear}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Species: </span>{" "}
                  {character.species ? character.species : "n/a"}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Height: </span> {character.height}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Mass: </span> {character.mass}
                </p>
              </div>
              <div>
                <p className="text-xl mb-2">
                  <span className="font-bold">Gender:</span> {character.gender}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Hair Color: </span>
                  {character.hairColor}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Skin Color: </span>
                  {character.skinColor}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Eyes Color: </span>
                  {character.eyeColor}
                </p>
                <p className="text-xl mb-5">
                  <span className="font-bold">HomeWorld: </span>
                  {character.homeworld}
                </p>

                {character.films && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Filmes relacionados:
                    </h3>
                    {character.films.map((film, index) => (
                      <p key={index} className="text-xl mb-2">
                        {film}
                      </p>
                    ))}
                  </div>
                )}

                {character.starships && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Naves e Veiculos relacionados:
                    </h3>
                    {character.starships.map((starships, index) => (
                      <p key={index} className="text-xl mb-2">
                        {starships}
                      </p>
                    ))}
                    {character.vehicles.map((starships, index) => (
                      <p key={index} className="text-xl mb-2">
                        {starships}
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

export default CharacterDetails;
