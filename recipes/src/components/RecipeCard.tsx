import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Tag } from 'antd';
import { IRecipe } from '../interfaces/recipe';
import { ClockCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;

interface RecipeCardProps {
    recipe: IRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`);
    };

    const levelColor =
        recipe.level === 'easy'
            ? 'green'
            : recipe.level === 'medium'
                ? 'gold'
                : 'red';

    return (
        <Card
            hoverable
            onClick={handleClick}
            style={{ margin: '16px 0', width: '240px', position: 'relative' }}
            cover={<img alt={recipe.title} height={200} src={recipe.picture} />}
        >
            <Tag
                color={levelColor}
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    fontSize: '12px',
                    padding: '4px 8px'
                }}
            >
                {recipe.level.toUpperCase()}
            </Tag>
            <Meta
                title={recipe.title}
                description={<p><ClockCircleOutlined /> {recipe.cooking_time} мин </p>}
            />
        </Card>
    );
};

export default RecipeCard;
