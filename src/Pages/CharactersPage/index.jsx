import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TitlePage from "../../Components/TitlePage";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import List from "../../Components/List";
import Footer from "../../Components/Footer";

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((response) => response.json())
      .then((data) => {
        const pageCount = Math.ceil(data.count / data.results.length);
        const promises = [];
        for (let i = 1; i <= pageCount; i++) {
          promises.push(fetch(`https://swapi.dev/api/people/?page=${i}`));
        }
        Promise.all(promises)
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((data) => {
            const allCharacters = data
              .flatMap((page) => page.results)
              .map((character) => ({
                name: character.name,
                species: character.species[1],
                image: `https://starwars-visualguide.com/assets/img/characters/${
                  character.url.match(/(\d+)\/$/)[1]
                }.jpg`,
              }));
            setCharacters(allCharacters);
          })
          .catch((error) => {
            console.error("Erro ao buscar personagens: ", error);
            navigate("/error");
          });
      })
      .catch((error) => {
        console.error("Erro ao buscar personagens: ", error);
        navigate("/error");
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="bg-black min-h-screen h-auto">
        <Button />
        <div className="container mx-auto p-8 uppercase">
          <TitlePage text={"Personagens"} />
          <List
            list={characters}
            link={"personagens"}
            className="relative shadow-lg hover:shadow-xl p-9 border-solid"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CharactersPage;
