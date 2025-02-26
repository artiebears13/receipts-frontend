import { makeAutoObservable, runInAction } from 'mobx';
import { IRecipe } from '../interfaces/recipe';
import { getRecipes, createRecipe } from '../api/recipesApi';

class RecipeStore {
    recipes: IRecipe[] = [];
    loading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchRecipes(page = 1, pageSize = 100) {
        this.loading = true;
        try {
            const data = await getRecipes(page, pageSize);
            console.log({data});
            runInAction(() => {
                this.recipes = data;
                this.error = null;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || 'Ошибка загрузки рецептов';
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async addRecipe(recipeData: Partial<IRecipe>) {
        try {
            const newRecipe = await createRecipe(recipeData);
            runInAction(() => {
                this.recipes.push(newRecipe);
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || 'Ошибка при добавлении рецепта';
            });
        }
    }
}

export const recipeStore = new RecipeStore();
