import React from "react";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="ease-in duration-300 text-white border-2 rounded-full px-7 py-3 font-bold  hover:bg-white hover:text-black ml-12 mt-12"
        onClick={() => navigate("/")}
      >
        {"<- Voltar"}
      </button>
    </div>
  );
};

export default Button;
