import React from "react";
import { useNavigate } from "react-router-dom";

const List = ({ list, link }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {list.map((obj, index) => (
          <div
            key={obj.name}
            className="bg-zinc-900 rounded-lg shadow-lg transform ease-in duration-200 hover:scale-105"
          >
            <img
              src={obj.image}
              alt={obj.name}
              className="w-full rounded-t-lg"
            />
            <div className="px-4 py-3">
              <h3 className="text-lg font-medium text-white">
                {obj.name || obj.title}
              </h3>
              <button
                onClick={() => navigate(`/detalhes-${link}/${index + 1}`)}
                className="mt-2 bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
