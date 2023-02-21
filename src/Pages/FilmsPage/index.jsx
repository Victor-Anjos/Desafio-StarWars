import React from "react";
import { useState, useEffect } from "react";
import List from "../../Components/List";
import TitlePage from "../../Components/TitlePage";
import Button from "../../Components/Button";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const FilmsPage = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => response.json())
      .then((data) => {
        const allFilms = data.results.map((film) => ({
          title: film.title,
          episode_id: film.episode_id,
          director: film.director,
          producer: film.producer,
          release_date: film.release_date,
          image: `https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`,
        }));
        setFilms(allFilms);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="bg-black min-h-screen h-auto">
        <Button />
        <div className="container mx-auto p-8 uppercase">
          <TitlePage text={"Filmes"} />
          <List
            list={films}
            link={"filmes"}
            className="relative shadow-lg hover:shadow-xl p-9 border-solid"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FilmsPage;
