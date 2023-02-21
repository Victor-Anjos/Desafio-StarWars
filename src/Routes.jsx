import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./Pages/HomePage";

import PlanetPage from "./Pages/PlanetPage";

import SpeciesPage from "./Pages/SpeciesPage";

import VehiclesPage from "./Pages/VehiclesPage";

import StarshipsPage from "./Pages/StarshipsPage";

import FilmsPage from "./Pages/FilmsPage";

import CharactersPage from "./Pages/CharactersPage";

import CharacterDetails from "./Pages/DetailsPage/CharacterDetails";

import PlanetDetails from "./Pages/DetailsPage/PlanetDetails";

import SpeciesDetails from "./Pages/DetailsPage/SpeciesDetails";

import StarshipsDetails from "./Pages/DetailsPage/StarshipsDetails";

import VehiclesDetails from "./Pages/DetailsPage/VehiclesDetails";

import FilmsDetails from "./Pages/DetailsPage/FilmsDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/planetas",
    element: <PlanetPage />,
  },
  {
    path: "/especies",
    element: <SpeciesPage />,
  },
  {
    path: "/veiculos",
    element: <VehiclesPage />,
  },
  {
    path: "/naves",
    element: <StarshipsPage />,
  },
  {
    path: "/filmes",
    element: <FilmsPage />,
  },
  {
    path: "/personagens",
    element: <CharactersPage />,
  },
  {
    path: "/detalhes-personagens/:id",
    element: <CharacterDetails />,
  },
  {
    path: "/detalhes-planetas/:id",
    element: <PlanetDetails />,
  },
  {
    path: "/detalhes-especies/:id",
    element: <SpeciesDetails />,
  },
  {
    path: "/detalhes-naves/:id",
    element: <StarshipsDetails />,
  },
  {
    path: "/detalhes-veiculos/:id",
    element: <VehiclesDetails />,
  },
  {
    path: "/detalhes-filmes/:id",
    element: <FilmsDetails />,
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
