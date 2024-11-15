import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import Card from './PokemonDetail';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 20;

  useEffect(() => {
    fetchPokemons();
  }, [offset, filterType]);

  const fetchPokemons = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
      if (filterType) {
        url = `https://pokeapi.co/api/v2/type/${filterType}`;
      }
      const response = await axios.get(url);
      const results = response.data.results || response.data.pokemon.map((p) => p.pokemon);
      setPokemons((prev) => (offset === 0 ? results : [...prev, ...results]));
    } catch (err) {
      setError('Failed to load Pokémon data');
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleFilter = (type) => {
    setFilterType(type);
    setOffset(0);
    setPokemons([]);
  };

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.includes(search)
  );

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center ">Pokédex Explorer</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={handleSearch}
        className="mt-4 w-full px-4 py-2 border rounded"
      />
      <div className="flex space-x-2 my-4">
        {['fire', 'water', 'grass', 'electric'].map((type) => (
          <button
            key={type}
            onClick={() => handleFilter(type)}
            className="px-4 py-2 bg-slate-500 text-white rounded"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={loadMore} className="mt-4 w-full bg-slate-500 text-white py-2 rounded">
        Load More
      </button>
    </div>
  );
};

export default Pokedex;
