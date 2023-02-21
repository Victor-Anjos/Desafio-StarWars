import React from "react";

const TitlePage = (props) => {
  return (
    <div>
      <h1 className="font-bold text-6xl flex item-center justify-center p-3 text-white  mb-5 overflow-hidden shadow-lg border-b-4 border-blue-900">
        {props.text}
      </h1>
    </div>
  );
};

export default TitlePage;
