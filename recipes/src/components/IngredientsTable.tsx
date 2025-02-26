import React from 'react';
import { Table } from 'antd';
import { IRecipe, Proportion } from '../interfaces/recipe';

interface IngredientsTableProps {
    ingredients: IRecipe['ingredients'];
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients }) => {
    const columns = [
        {
            title: 'Ингредиент',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Количество',
            dataIndex: 'value',
            key: 'value',
            render: (value: number | Proportion) =>
                typeof value === 'number' ? value : `${value.numerator}/${value.denominator}`
        },
        {
            title: 'Единица',
            dataIndex: 'unit',
            key: 'unit'
        }
    ];

    const data = ingredients.map((ingredient, index) => ({
        key: index,
        ...ingredient
    }));

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ x: true }}
        />
    );
};

export default IngredientsTable;
