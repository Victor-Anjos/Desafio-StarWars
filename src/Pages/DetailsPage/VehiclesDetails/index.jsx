import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header";

const VehiclesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/vehicles/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setVehicles({
          id: id,
          name: data.name,
          image: `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`,
          model: data.model,
          manufacturer: data.manufacturer,
          cost_in_credits: data.cost_in_credits,
          length: data.length,
          max_atmosphering_speed: data.max_atmosphering_speed,
          crew: data.crew,
          passengers: data.passengers,
          cargo_capacity: data.cargo_capacity,
          consumables: data.consumables,
          vehicle_class: data.vehicle_class,
          pilots: data.pilots,
          films: data.films,
        });
      });
  }, [id]);

  if (!vehicles) {
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
            onClick={() => navigate(`/detalhes-veiculos/${parseInt(id) - 1}`)}
            disabled={id === "1"}
          >
            {"<-"} Anterior
          </button>
          <button
            className="text-white rounded-full px-6 py-3 bg-blue-800 pointer ml-5 uppercase"
            onClick={() => navigate(`/detalhes-veiculos/${parseInt(id) + 1}`)}
            disabled={id === "83"}
          >
            Próximo {"->"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
          <div>
            <img
              src={vehicles.image}
              alt={vehicles.name}
              className="object-cover w-full h-full rounded"
            />
          </div>

          <div className="bg-stone-900 rounded-md h-auto p-5 border-b-4 border-yellow-500">
            <div className="p-4 text-white">
              <h2 className="text-5xl font-bold mb-4 text-yellow-400 border-b-2 pb-4 border-yellow-400">
                {vehicles.name}
              </h2>
              <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                Informações:
              </h3>

              <div>
                <p className="text-xl mb-2">
                  <span className="font-bold">Model: </span> {vehicles.model}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Manufacturer: </span>{" "}
                  {vehicles.manufacturer}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Cost in credits: </span>{" "}
                  {vehicles.cost_in_credits}
                </p>
              </div>
              <div>
                <p className="text-xl mb-2">
                  <span className="font-bold">Length:</span> {vehicles.length}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Max atmosphering speed: </span>
                  {vehicles.max_atmosphering_speed}
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Crew: </span>
                  {vehicles.crew}
                </p>

                <p className="text-xl mb-2">
                  <span className="font-bold">Passengers: </span>{" "}
                  {vehicles.passengers ? vehicles.passengers : "n/a"}
                </p>

                <p className="text-xl mb-2">
                  <span className="font-bold">Cargo capacity: </span>
                  {vehicles.cargo_capacity}
                </p>

                <p className="text-xl mb-2">
                  <span className="font-bold">Consumables: </span>
                  {vehicles.consumables}
                </p>

                <p className="text-xl mb-2">
                  <span className="font-bold">Starship class: </span>
                  {vehicles.vehicle_class}
                </p>

                <p className="text-xl mb-2">
                  <span className="font-bold">Pilots: </span>{" "}
                  {vehicles.pilots ? vehicles.pilots : "n/a"}
                </p>

                {vehicles.films && (
                  <div>
                    <h3 className="text-bold text-3xl mt-5 mb-5 uppercase font-bold text-gray-400">
                      Filmes relacionados:
                    </h3>
                    {vehicles.films.map((film, index) => (
                      <p key={index} className="text-xl mb-2">
                        {film}
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

export default VehiclesDetails;
