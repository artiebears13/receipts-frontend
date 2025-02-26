import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from "./pages/RecipePage.tsx";
import CreateRecipe from "./pages/CreateRecipe.tsx";

const App: React.FC = () => {
    return (
        <Router basename="/recipes-app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipe/:id" element={<RecipePage />} />
                <Route path="/create" element={<CreateRecipe />} />
            </Routes>
        </Router>
    );
};

export default App;
