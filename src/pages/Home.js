// src/pages/Home.js
import React, { useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { useFetchPokemonList } from '../hooks/useFetchPokemon';

const Home = () => {
    const [offset, setOffset] = useState(0);
    const { data, fetchNextPage, hasNextPage } = useFetchPokemonList(offset);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {data?.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
            {hasNextPage && (
                <button onClick={() => setOffset((prev) => prev + 20)} className="col-span-full bg-blue-500 text-white p-2 rounded">
                    Load More
                </button>
            )}
        </div>
    );
};

export default Home;
