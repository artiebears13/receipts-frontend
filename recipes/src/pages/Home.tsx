import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Alert } from 'antd';
import RecipesList from '../components/RecipesList';
import RecipesHeader from '../components/RecipesHeader';
import { recipeStore } from '../stores/RecipeStore';
// import { IRecipe } from '../interfaces/recipe';

const Home: React.FC = observer(() => {
    // const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);

    useEffect(() => {
        Notification.requestPermission();

        if (recipeStore.recipes.length === 0) {
            recipeStore.fetchRecipes();
        }
    }, []);


    const recipesToShow = recipeStore.recipes;

    if (recipeStore.loading) {
        return <Spin tip="Загрузка рецептов..." />;
    }

    if (recipeStore.error) {
        return <Alert message={recipeStore.error} type="error" />;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h1>Рецепты</h1>
            <RecipesHeader />
            <RecipesList recipes={recipesToShow} />
        </div>
    );
});

export default Home;
