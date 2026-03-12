import React from "react";

const WookieImage = ({ name, type, className = "", style = {} }) => {
  return (
    <div
      className={`bg-[#111113] flex items-center justify-center ${className}`}
      style={style}
    >
      <img
        src="/img/logo.png"
        alt="Star Wars"
        className="w-2/3 max-w-[180px] opacity-20"
      />
    </div>
  );
};

export default WookieImage;
