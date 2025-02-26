import React, { useState } from 'react';
import { Button, Select, Space, Input, Grid } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Category } from '../interfaces/recipe';

const { Option } = Select;
const { useBreakpoint } = Grid;

const RecipesHeader: React.FC = () => {
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const [levelFilter, setLevelFilter] = useState<string | undefined>(undefined);
    const [categoryFilter, setCategoryFilter] = useState<Category | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleAddClick = () => {
        navigate('/create');
    };

    return (
        <div style={{ marginBottom: 16, width: '100%' }}>
            <Space
                direction={screens.xs ? 'vertical' : 'horizontal'}
                size="middle"
                style={{ width: '100%', justifyContent: 'space-between' }}
            >
                <Space
                    direction={screens.xs ? 'vertical' : 'horizontal'}
                    size="small"
                    style={{ width: screens.xs ? '100%' : 'auto' }}
                >
                    <Select
                        placeholder="Фильтр по уровню"
                        style={{ width: screens.xs ? '100%' : 150 }}
                        allowClear
                        value={levelFilter}
                        onChange={(value) => setLevelFilter(value)}
                    >
                        <Option value="easy">Easy</Option>
                        <Option value="medium">Medium</Option>
                        <Option value="hard">Hard</Option>
                    </Select>
                    <Select
                        placeholder="Фильтр по категории"
                        style={{ width: screens.xs ? '100%' : 150 }}
                        allowClear
                        value={categoryFilter}
                        onChange={(value) => setCategoryFilter(value)}
                    >
                        <Option value="breakfast">Breakfast</Option>
                        <Option value="lunch">Lunch</Option>
                        <Option value="dinner">Dinner</Option>
                        <Option value="snack">Snack</Option>
                    </Select>
                    <Input
                        placeholder="Поиск..."
                        style={{ width: screens.xs ? '100%' : 200 }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
                    Добавить рецепт
                </Button>
            </Space>
        </div>
    );
};

export default RecipesHeader;
