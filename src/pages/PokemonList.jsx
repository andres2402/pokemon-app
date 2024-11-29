import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { fetchPokemonList } from "../services/api";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchPokemonList(currentPage)
      .then(setPokemons)
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-initial ml-4 mb-8 text-gray-800">
        Pokédex
      </h1>
      <SearchBar onSearch={setSearchQuery} />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredPokemons.map((pokemon, index) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
          {filteredPokemons.length === 0 && (
            <p className="text-center text-gray-600 mt-8">
              No Pokémon found. Try a different search.
            </p>
          )}
        </>
      )}
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

export default PokemonList;
