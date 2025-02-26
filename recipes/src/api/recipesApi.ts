import { IRecipe } from '../interfaces/recipe';

// const API_BASE_URL = "http://localhost:8000"; // можно задать в .env
const API_BASE_URL = "https://api.artiebears.com"; // можно задать в .env

/**
 * Получение списка рецептов с поддержкой пагинации.
 * @param page Номер страницы (по умолчанию 1)
 * @param pageSize Количество элементов на странице (по умолчанию 10)
 * @returns Объект с данными рецептов и общим числом записей
 */
export const getRecipes = async (page = 1, pageSize = 10): Promise<IRecipe[]> => {
    const response = await fetch(`${API_BASE_URL}/api/recipes/?page=${page}&page_size=${pageSize}`);
    if (!response.ok) {
        throw new Error('Не удалось загрузить список рецептов');
    }
    return response.json();
};

/**
 * Получение деталей рецепта по id.
 * @param id Идентификатор рецепта
 * @returns Рецепт
 */
export const getRecipeById = async (id: string): Promise<IRecipe> => {
    const response = await fetch(`${API_BASE_URL}/api/recipes/${id}/`);
    if (!response.ok) {
        throw new Error('Не удалось загрузить рецепт');
    }
    return response.json();
};

/**
 * Создание нового рецепта.
 * @param data Данные рецепта (см. IRecipe, некоторые поля могут быть опциональными)
 * @returns Созданный рецепт
 */
export const createRecipe = async (data: Partial<IRecipe>): Promise<IRecipe> => {
    const response = await fetch(`${API_BASE_URL}/api/recipes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Не удалось создать рецепт');
    }
    return response.json();
};
