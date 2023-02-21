import React, { useState, useEffect } from "react";
import List from "../../Components/List";
import TitlePage from "../../Components/TitlePage";
import Button from "../../Components/Button";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const VehiclePage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/vehicles/")
      .then((response) => response.json())
      .then((data) => {
        const pageCount = Math.ceil(data.count / data.results.length);
        const promises = [];
        for (let i = 1; i <= pageCount; i++) {
          promises.push(fetch(`https://swapi.dev/api/vehicles/?page=${i}`));
        }
        Promise.all(promises)
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((data) => {
            const allVehicles = data.flatMap((page) =>
              page.results.map((vehicle) => ({
                name: vehicle.name,
                model: vehicle.model,
                manufacturer: vehicle.manufacturer,
                cost_in_credits: vehicle.cost_in_credits,
                length: vehicle.length,
                max_atmosphering_speed: vehicle.max_atmosphering_speed,
                crew: vehicle.crew,
                passengers: vehicle.passengers,
                cargo_capacity: vehicle.cargo_capacity,
                consumables: vehicle.consumables,
                vehicle_class: vehicle.vehicle_class,
                pilots: vehicle.pilots,
                films: vehicle.films,
                created: vehicle.created,
                edited: vehicle.edited,
                url: vehicle.url,
                image: `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.match(
                  /\d+/
                )}.jpg`,
              }))
            );
            setVehicles(allVehicles);
          });
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="bg-black min-h-screen h-auto">
        <Button />
        <div className="container mx-auto p-8 uppercase">
          <TitlePage text={"Veículos"} />
          <List
            list={vehicles}
            link={"veiculos"}
            className="relative shadow-lg hover:shadow-xl p-9 border-solid"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VehiclePage;
