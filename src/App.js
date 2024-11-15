// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import PokemonDetail from './components/PokemonDetail';
import './App.css';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

const App = () => {
    return (
        // Wrap the app with QueryClientProvider and Router
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="App">
                    {/* Define the Routes for different pages */}
                    <Routes>
                        <Route path="/" element={<Pokedex />} />
                        <Route path="/pokemon/:name" element={<PokemonDetail />} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
