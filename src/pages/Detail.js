// src/pages/Detail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import PokemonDetail from '../components/PokemonDetail';

const Detail = () => {
    const { name } = useParams();
    return (
        <div className="p-4">
            <PokemonDetail name={name} />
        </div>
    );
};

export default Detail;
