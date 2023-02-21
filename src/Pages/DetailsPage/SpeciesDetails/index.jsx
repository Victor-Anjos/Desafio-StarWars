import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header";

const SpeciesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/species/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setSpecies({
          id: id,
          name: data.name,
          image: `https://starwars-visualguide.com/assets/img/species/${id}.jpg`,
          classification: data.classification,
          designation: data.designation,
          averageHeight: data.average_height,
          averageLifespan: data.average_lifespan,
          language: data.language,
          skin: data.skin_colors,
          eyes: data.eye_colors,
          hair: data.hair_colors,
          homeworld: data.homeworld,
          films: data.films,
          people: data.people,
        });
      });
  }, [id]);

  if (!species) {
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
            onClick={() => navigate(`/detalhes-especies/${parseInt(id) - 1}`)}
            disabled={id === "1"}
          >
            {"<-"} Anterior
          </button>
          <button
            className="text-white rounded-full px-6 py-3 bg-blue-800 pointer ml-5 uppercase"
            onClick={() => navigate(`/detalhes-especies/${parseInt(id) + 1}`)}
            disabled={id === "37"}
          >
            Proximo {"->"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
          <div>
            <img
              src={species.image}
              alt={species.name}
              className="object-cover w-full h-full rounded"
            />
          </div>

          <div className="bg-stone-900 rounded-md h-auto p-5 border-b-4 border-yellow-500">
            <div className="p-4 text-white">
              <h2 className="text-5xl font-bold mb-4 text-yellow-400 border-b-2 pb-4 border-yellow-400">
                {species.name}
              </h2>
              <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                Informações
              </h3>

              <div>
                <p className="text-xl mb-2">
                  <span className="font-bold">Classification: </span>{" "}
                  {species.classification}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Designation: </span>{" "}
                  {species.designation}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Average Height: </span>{" "}
                  {species.averageHeight} cm
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Average Lifespan: </span>{" "}
                  {species.averageLifespan} years
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Language: </span>
                  {species.language}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Skin Color: </span>
                  {species.skin}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Hair Color: </span>
                  {species.hair}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Eye Color: </span>
                  {species.eyes}
                </p>

                {species.films && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Filmes relacionados:
                    </h3>
                    {species.films.map((film, index) => (
                      <p key={index} className="text-xl mb-2">
                        {film}
                      </p>
                    ))}
                  </div>
                )}

                {species.people && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Personagens relacionados:
                    </h3>
                    {species.films.map((people, index) => (
                      <p key={index} className="text-xl mb-2">
                        {people}
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

export default SpeciesDetails;
