export type Category = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type Level = 'easy' | 'medium' | 'hard';
export type TimeType = 'fast' | 'slow';
export type Proportion = {
    numerator: number;
    denominator: number;
};
export type RecipeStep = {
    description: string;
    time?: number;
}
export type Ingredient = {
    name: string;
    unit: string;
    value: number | Proportion;
};

export interface IRecipe {
    id: string;
    title: string;
    level: Level;
    description?: string;
    ingredients: Ingredient[];
    steps: RecipeStep[];
    cooking_time: number;   // minutes
    categories: Category[];
    time_type?: TimeType;
    picture: string;
}
