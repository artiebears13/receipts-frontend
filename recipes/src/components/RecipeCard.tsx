// src/components/RecipeCard.tsx
import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Card } from 'antd';
import { IRecipe } from '../interfaces/recipe';
import {ClockCircleOutlined} from "@ant-design/icons";


const { Meta } = Card;

interface RecipeCardProps {
    recipe: IRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`);
    };

    return (
        <Card
            hoverable
            onClick={handleClick}
            style={{ margin: '16px 0', width: '240px' }}
            cover={<img alt={recipe.title} src={recipe.picture}/>}
        >
            <Meta
                title={recipe.title}
                description={<p><ClockCircleOutlined /> {recipe.cookingTime} мин </p>}
            />
            
        </Card>
    );
};

export default RecipeCard;
