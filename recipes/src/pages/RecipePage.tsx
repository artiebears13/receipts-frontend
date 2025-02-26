import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Typography, Image, Divider } from 'antd';
import IngredientsTable from '../components/IngredientsTable';
import SwipeableStep from '../components/SwipeableStep';
import { observer } from 'mobx-react-lite';
import { recipeStore } from '../stores/RecipeStore';

const { Content } = Layout;
const { Title, Text } = Typography;

const RecipeDetails: React.FC = observer(() => {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (recipeStore.recipes.length === 0) {
            recipeStore.fetchRecipes();
        }
    }, [recipeStore]);

    const recipe = recipeStore.recipes.find((r) => r.id === id);

    const [doneSteps, setDoneSteps] = useState<boolean[]>(
        recipe ? new Array(recipe.steps.length).fill(false) : []
    );

    useEffect(() => {
        if (recipe) {
            setDoneSteps(new Array(recipe.steps.length).fill(false));
        }
    }, [recipe]);

    const toggleStep = (index: number) => {
        const newDoneSteps = [...doneSteps];
        newDoneSteps[index] = !newDoneSteps[index];
        setDoneSteps(newDoneSteps);
    };

    if (!recipe) {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ padding: '24px' }}>
                    <Title>Рецепт не найден</Title>
                </Content>
            </Layout>
        );
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '24px' }}>
                {recipe.picture && (
                    <Image
                        src={recipe.picture}
                        alt={recipe.title}
                        preview={false}
                        style={{ width: '100%', marginBottom: '24px', borderRadius: '8px' }}
                    />
                )}

                <Title level={2}>{recipe.title}</Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                    Уровень: {recipe.level}
                </Text>

                <Divider />

                {recipe.description && (
                    <Text style={{ fontSize: '16px' }}>{recipe.description}</Text>
                )}

                <Divider />

                <Text strong style={{ fontSize: '16px' }}>
                    Время готовки:
                </Text>{' '}
                <Text style={{ fontSize: '16px' }}>{recipe.cooking_time} минут</Text>
                <br />
                <Text strong style={{ fontSize: '16px' }}>
                    Категории:
                </Text>{' '}
                <Text style={{ fontSize: '16px' }}>{recipe.categories.join(', ')}</Text>
                {recipe.time_type && (
                    <>
                        <br />
                        <Text strong style={{ fontSize: '16px' }}>
                            Тип времени:
                        </Text>{' '}
                        <Text style={{ fontSize: '16px' }}>
                            {recipe.time_type === 'fast' ? 'Быстрое' : 'Долгое'}
                        </Text>
                    </>
                )}

                <Divider />

                <Title level={4}>Ингредиенты</Title>
                <IngredientsTable ingredients={recipe.ingredients} />

                <Divider />

                <Title level={4}>Этапы приготовления</Title>
                {recipe.steps.map((step, index) => (
                    <SwipeableStep
                        key={index}
                        index={index}
                        step={step}
                        done={doneSteps[index]}
                        onToggle={toggleStep}
                    />
                ))}
            </Content>
        </Layout>
    );
});

export default RecipeDetails;
