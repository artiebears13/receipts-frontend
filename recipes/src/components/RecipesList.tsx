import React from 'react';
import { IRecipe } from '../interfaces/recipe';
import RecipeCard from './RecipeCard';

interface RecipesListProps {
    recipes: IRecipe[];
}

const flexStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    FlexWrap: 'wrap',
    gap: '16px',
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
    console.log({recipes});
    return (
        <div style={flexStyle}>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipesList;
