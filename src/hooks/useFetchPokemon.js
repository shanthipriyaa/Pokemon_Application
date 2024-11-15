// src/hooks/useFetchPokemon.js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPokemonList = async ({ queryKey }) => {
    const [_, offset] = queryKey;
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    return res.data.results;
};

export const useFetchPokemonList = (offset) => {
    return useQuery(['pokemonList', offset], fetchPokemonList, { keepPreviousData: true });
};

const fetchPokemonDetail = async (name) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return res.data;
};

export const useFetchPokemonDetail = (name) => {
    return useQuery(['pokemonDetail', name], () => fetchPokemonDetail(name));
};
