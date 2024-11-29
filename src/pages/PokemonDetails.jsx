import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonDetails } from "../services/api";
import { Loader2 } from "lucide-react";

const PokemonDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemonDetails(name);
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchData();
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-medium">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Pokémon not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Back
      </button>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {pokemon.types.map((type) => type.type.name).join(" / ")}
            </div>
            <h1 className="mt-1 text-4xl font-bold text-gray-900 capitalize">
              {pokemon.name}
            </h1>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-700">Abilities</h2>
              <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
                {pokemon.abilities.map((ability, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg px-3 py-2 text-center"
                  >
                    <div className="text-sm font-medium text-gray-600 capitalize">
                      {ability.ability.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-700">Stats</h2>
              <div className="mt-2 grid grid-cols-3 gap-4">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-gray-500 capitalize">
                      {stat.stat.name}
                    </div>
                    <div className="mt-1 text-xl font-semibold text-gray-900">
                      {stat.base_stat}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
