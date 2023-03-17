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
              href=""
              onClick={() => {
                navigate("/planetas");
              }}
              className="hover:text-gray-300"
            >
              Planetas
            </a>
          </li>
          <li className="m-3">
            <a
              href=""
              onClick={() => {
                navigate("/especies");
              }}
              className="hover:text-gray-300"
            >
              Especies
            </a>
          </li>
          <li className="m-3">
            <a
              href=""
              onClick={() => {
                navigate("/veiculos");
              }}
              className="hover:text-gray-300"
            >
              Veiculos
            </a>
          </li>
          <li className="m-3">
            <a
              href=""
              onClick={() => {
                navigate("/naves");
              }}
              className="hover:text-gray-300"
            >
              Naves
            </a>
          </li>
          <li className="m-3">
            <a
              href=""
              onClick={() => {
                navigate("/filmes");
              }}
              className="hover:text-gray-300"
            >
              Filmes
            </a>
          </li>
          <li className="m-3">
            <a
              href=""
              onClick={() => {
                navigate("/personagens");
              }}
              className="hover:text-gray-300"
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
