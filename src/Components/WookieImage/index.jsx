import React, { useState } from "react";
import { useCharacterImage } from "../../hooks/useCharacterImage";
import { getFilmPoster } from "../../utils/filmPosters";

const Skeleton = ({ className, style }) => (
  <div className={`skeleton ${className}`} style={style} />
);

const Placeholder = ({ className, style }) => (
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

const WookieImage = ({ name, type, className = "", style = {} }) => {
  const isCharacter = type === "character";
  const isFilm = type === "film";

  const { imageUrl: characterImage, loading } = useCharacterImage(
    isCharacter ? name : null
  );
  const filmImage = isFilm ? getFilmPoster(name) : null;

  const [imgError, setImgError] = useState(false);

  const resolvedUrl = isCharacter ? characterImage : filmImage;

  if (isCharacter && loading) {
    return <Skeleton className={className} style={style} />;
  }

  if (resolvedUrl && !imgError) {
    return (
      <img
        src={resolvedUrl}
        alt={name}
        className={className}
        style={style}
        onError={() => setImgError(true)}
      />
    );
  }

  return <Placeholder className={className} style={style} />;
};

export default WookieImage;
