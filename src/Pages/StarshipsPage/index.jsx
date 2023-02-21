import React, { useState, useEffect } from "react";
import List from "../../Components/List";
import TitlePage from "../../Components/TitlePage";
import Button from "../../Components/Button";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const StarshipsPage = () => {
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then((response) => response.json())
      .then((data) => {
        const pageCount = Math.ceil(data.count / data.results.length);
        const promises = [];
        for (let i = 1; i <= pageCount; i++) {
          promises.push(fetch(`https://swapi.dev/api/starships/?page=${i}`));
        }
        Promise.all(promises)
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((data) => {
            const allShips = data.flatMap((page) =>
              page.results.map((ship) => ({
                name: ship.name,
                model: ship.model,
                manufacturer: ship.manufacturer,
                cost_in_credits: ship.cost_in_credits,
                length: ship.length,
                max_atmosphering_speed: ship.max_atmosphering_speed,
                crew: ship.crew,
                passengers: ship.passengers,
                cargo_capacity: ship.cargo_capacity,
                consumables: ship.consumables,
                hyperdrive_rating: ship.hyperdrive_rating,
                MGLT: ship.MGLT,
                starship_class: ship.starship_class,
                pilots: ship.pilots,
                films: ship.films,
                created: ship.created,
                edited: ship.edited,
                url: ship.url,
                image: `https://starwars-visualguide.com/assets/img/starships/${
                  ship.url.match(/(\d+)\/$/)[1]
                }.jpg`,
              }))
            );
            setStarships(allShips);
          });
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="bg-black min-h-screen h-auto">
        <Button />
        <div className="container mx-auto p-8 uppercase">
          <TitlePage text={"Naves"} />
          <List
            list={starships}
            link={"naves"}
            className="relative shadow-lg hover:shadow-xl p-9 border-solid"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StarshipsPage;
