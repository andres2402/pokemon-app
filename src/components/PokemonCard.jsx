import React from "react";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  const pokemonId = pokemon.url.split("/")[6];

  return (
    <div
      onClick={handleClick}
      className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
    >
      <div className="relative w-full pb-[100%] bg-white bg-opacity-50">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          alt={pokemon.name}
          className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-4 bg-white">
        <h2 className="text-lg font-bold text-gray-800 capitalize mb-1 truncate">
          {pokemon.name.replace(/-/g, " ")}
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-500">
            #{pokemonId.padStart(3, "0")}
          </p>
          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
            Ver detalles
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
