import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PokemonDetail = () => {
  const { name } = useParams(); 
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
      } catch (err) {
        setError('Failed to load Pokémon details');
      }
      setLoading(false);
    };
    fetchPokemon();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!pokemon) return <p>No details found</p>;

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="mb-4 bg-slate-500 text-white px-4 py-2 rounded">
        Go Back
      </button>
      <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
      <img
        src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
        alt={pokemon.name}
        className="w-64 h-64 mx-auto shadow rounded"
      />
      <div className="mt-4">
        <h2 className="text-xl font-bold">Stats:</h2>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name.toUpperCase()}: {stat.base_stat}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mt-4">Types:</h2>
        <ul>
          {pokemon.types.map((type) => (
            <li key={type.type.name} className="capitalize">
              {type.type.name}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mt-4">Abilities:</h2>
        <ul>
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name} className="capitalize">
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
