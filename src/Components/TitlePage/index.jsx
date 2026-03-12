import React from "react";

const TitlePage = ({ text }) => {
  return (
    <div className="text-center mb-10">
      <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white tracking-wider uppercase">
        {text}
      </h1>
      <div
        className="w-20 h-1 mx-auto mt-4 rounded-full"
        style={{ background: "#FFE81F" }}
      />
    </div>
  );
};

export default TitlePage;
