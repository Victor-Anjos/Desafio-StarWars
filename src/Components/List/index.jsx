import React from "react";
import { useNavigate } from "react-router-dom";
import WookieImage from "../WookieImage";

const LINK_TYPE = {
  personagens: "character",
  planetas:    "planet",
  filmes:      "film",
  especies:    "species",
  naves:       "starship",
  veiculos:    "vehicle",
};

const ListSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-[#111113] border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="skeleton w-full" style={{ aspectRatio: "3/4" }} />
        <div className="p-4 space-y-3">
          <div className="skeleton h-4 rounded w-3/4" />
          <div className="skeleton h-9 rounded w-full" />
        </div>
      </div>
    ))}
  </div>
);

const List = ({ list, link }) => {
  const navigate = useNavigate();
  const imgType = LINK_TYPE[link] ?? "default";

  if (!list || list.length === 0) return <ListSkeleton />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {list.map((obj, index) => {
        const displayName = obj.name || obj.title;
        return (
          <div
            key={displayName || index}
            className="card-sw group bg-[#111113] border border-zinc-800 rounded-2xl overflow-hidden"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <WookieImage
                name={displayName}
                type={imgType}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-4">
              <h3 className="font-orbitron text-xs font-bold text-white mb-3 leading-snug tracking-wide truncate">
                {displayName}
              </h3>
              <button
                onClick={() => navigate(`/detalhes-${link}/${index + 1}`)}
                className="w-full bg-[#FFE81F] hover:bg-yellow-300 active:bg-yellow-400 text-black font-orbitron font-bold text-[10px] py-2.5 px-4 rounded-lg tracking-widest uppercase transition-colors duration-200"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
