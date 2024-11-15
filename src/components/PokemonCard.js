
import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  const id = pokemon.url.split('/').filter(Boolean).pop();

  return (
    <div className="border rounded-lg p-4 text-center shadow">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={pokemon.name}
        className="w-20 h-20 mx-auto"
      />
      <h3 className="text-lg font-bold capitalize mt-2 bg-slate-500 text-zinc-100 px-2 rounded">{pokemon.name}</h3>
      {/* Using Link for proper navigation */}
      <Link to={`/pokemon/${id}`} className="text-green-500 mt-2 block ">View Details</Link>
    </div>
  );
};

export default PokemonCard;
