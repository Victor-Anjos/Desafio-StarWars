import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-100">
      <div className=" bg-black p-5 flex items-center justify-center ">
        <a href="" onClick={() => navigate("/")}>
          <img src="/img/logo.png" alt="" width="160px" />
        </a>
      </div>
      <div className="bg-black p-2">
        <ul className="flex items-center justify-center text-white uppercase font-bold responsivel">
          <li className="m-2">
            <a
              onClick={() => {
                navigate("/planetas");
              }}
              className="hover:text-gray-300"
              href=""
            >
              Planetas
            </a>
          </li>
          <li className="m-3">
            <a
              onClick={() => {
                navigate("/especies");
              }}
              className="hover:text-gray-300"
              href=""
            >
              Especies
            </a>
          </li>
          <li className="m-3">
            <a
              onClick={() => {
                navigate("/veiculos");
              }}
              className="hover:text-gray-300"
              href=""
            >
              Veiculos
            </a>
          </li>
          <li className="m-3">
            <a
              onClick={() => {
                navigate("/naves");
              }}
              className="hover:text-gray-300"
              href=""
            >
              Naves
            </a>
          </li>
          <li className="m-3">
            <a
              onClick={() => {
                navigate("/filmes");
              }}
              className="hover:text-gray-300"
              href=""
            >
              Filmes
            </a>
          </li>
          <li className="m-3">
            <a
              onClick={() => {
                navigate("/personagens");
              }}
              className="hover:text-gray-300"
              href=""
            >
              Personagens
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
