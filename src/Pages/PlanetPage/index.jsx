import React from "react";
import { useState, useEffect } from "react";
import List from "../../Components/List";
import TitlePage from "../../Components/TitlePage";
import Button from "../../Components/Button";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const PlanetPage = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then((response) => response.json())
      .then((data) => {
        const pageCount = Math.ceil(data.count / data.results.length);
        const promises = [];
        for (let i = 1; i <= pageCount; i++) {
          promises.push(fetch(`https://swapi.dev/api/planets/?page=${i}`));
        }
        Promise.all(promises)
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((data) => {
            const allPlanets = data.flatMap((page) =>
              page.results.map((planet) => ({
                name: planet.name,
                diameter: planet.diameter,
                rotation_period: planet.rotation_period,
                orbital_period: planet.orbital_period,
                gravity: planet.gravity,
                population: planet.population,
                climate: planet.climate,
                terrain: planet.terrain,
                surface_water: planet.surface_water,
                residents: planet.residents,
                films: planet.films,
                created: planet.created,
                edited: planet.edited,
                url: planet.url,
                image: `https://starwars-visualguide.com/assets/img/planets/${
                  planet.url.match(/(\d+)\/$/)[1]
                }.jpg`,
              }))
            );
            setPlanets(allPlanets);
          });
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="bg-black min-h-screen h-auto">
        <Button />
        <div className="container mx-auto p-8 uppercase">
          <TitlePage text={"Planetas"} />
          <List
            list={planets}
            link={"planetas"}
            className="relative shadow-lg hover:shadow-xl p-9 border-solid"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlanetPage;
