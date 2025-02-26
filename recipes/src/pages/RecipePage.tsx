// src/pages/RecipeDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
    <div style={{ padding: '16px' }}>
        <h1>Детали рецепта {id}</h1>
        <p>Здесь будет отображаться подробная информация о рецепте.</p>
    </div>
);
};

export default RecipeDetails;
