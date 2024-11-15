
import React, { useState } from 'react';

const Navbar = ({ toggleTheme }) => {
    return (
        <nav className="flex justify-between items-center p-4 shadow-md bg-gray-800 text-white">
            <h1 className="text-2xl">Pokédex</h1>
        </nav>
    );
};

export default Navbar;
