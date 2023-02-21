import React from "react";
import { useState, useEffect } from "react";
import List from "../../Components/List";
import TitlePage from "../../Components/TitlePage";
import Button from "../../Components/Button";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const SpeciesPage = () => {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/species/")
      .then((response) => response.json())
      .then((data) => {
        const pageCount = Math.ceil(data.count / data.results.length);
        const promises = [];
        for (let i = 1; i <= pageCount; i++) {
          promises.push(fetch(`https://swapi.dev/api/species/?page=${i}`));
        }
        Promise.all(promises)
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((data) => {
            const allSpecies = data.flatMap((page) =>
              page.results.map((specie) => ({
                name: specie.name,
                classification: specie.classification,
                designation: specie.designation,
                average_height: specie.average_height,
                skin_colors: specie.skin_colors,
                hair_colors: specie.hair_colors,
                eye_colors: specie.eye_colors,
                average_lifespan: specie.average_lifespan,
                homeworld: specie.homeworld,
                language: specie.language,
                image: `https://starwars-visualguide.com/assets/img/species/${
                  specie.url.match(/(\d+)\/$/)[1]
                }.jpg`,
              }))
            );
            setSpecies(allSpecies);
          });
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="bg-black min-h-screen h-auto">
        <Button />
        <div className="container mx-auto p-8 uppercase">
          <TitlePage text={"Especies"} />
          <List
            list={species}
            link={"especies"}
            className="relative shadow-lg hover:shadow-xl p-9 border-solid"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpeciesPage;
