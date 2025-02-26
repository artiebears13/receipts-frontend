import React from 'react';
import { Form, Input, InputNumber, Button, Select, Space, Divider, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface CreateRecipeFormValues {
    title: string;
    level: 'easy' | 'medium' | 'hard';
    description?: string;
    cooking_time: number;
    time_type?: 'fast' | 'slow';
    categories: string[];
    ingredients: Array<{ name: string; unit: string; value: number }>;
    steps: string[];
    picture?: string;
}

const CreateRecipe: React.FC = () => {
    const [form] = Form.useForm<CreateRecipeFormValues>();

    const onFinish = async (values: CreateRecipeFormValues) => {
        console.log('Form values:', values);
        try {
            const response = await fetch('/api/recipes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                message.success('Рецепт успешно добавлен!');
                form.resetFields();
            } else {
                message.error('Ошибка при добавлении рецепта');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Ошибка при добавлении рецепта');
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
    <h1>Добавить рецепт</h1>
    <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Основные поля */}
        <Form.Item
    name="title"
    label="Название"
    rules={[{ required: true, message: 'Введите название рецепта' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item
    name="level"
    label="Уровень"
    rules={[{ required: true, message: 'Выберите уровень' }]}
    >
    <Select placeholder="Выберите уровень">
    <Option value="easy">Easy</Option>
        <Option value="medium">Medium</Option>
        <Option value="hard">Hard</Option>
        </Select>
        </Form.Item>

        <Form.Item name="description" label="Описание">
    <Input.TextArea rows={4} />
    </Form.Item>

    <Form.Item
    name="cooking_time"
    label="Время готовки (минут)"
    rules={[{ required: true, message: 'Введите время готовки' }]}
    >
    <InputNumber min={1} style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item name="time_type" label="Тип времени">
    <Select placeholder="Выберите тип времени">
    <Option value="fast">Fast</Option>
        <Option value="slow">Slow</Option>
        </Select>
        </Form.Item>

        <Form.Item
    name="categories"
    label="Категории"
    rules={[{ required: true, message: 'Выберите хотя бы одну категорию' }]}
    >
    <Select mode="multiple" placeholder="Выберите категории">
    <Option value="breakfast">Breakfast</Option>
        <Option value="lunch">Lunch</Option>
        <Option value="dinner">Dinner</Option>
        <Option value="snack">Snack</Option>
        </Select>
        </Form.Item>

    {/* Ингредиенты */}
    <Divider>Ингредиенты</Divider>
    <Form.List name="ingredients">
        {(fields, { add, remove }) => (
        <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
        <Form.Item
            {...restField}
    name={[name, 'name']}
    fieldKey={[fieldKey, 'name']}
    rules={[{ required: true, message: 'Введите название' }]}
    >
    <Input placeholder="Название" />
        </Form.Item>
        <Form.Item
    {...restField}
    name={[name, 'unit']}
    fieldKey={[fieldKey, 'unit']}
    rules={[{ required: true, message: 'Введите единицу измерения' }]}
    >
    <Input placeholder="Единица" />
        </Form.Item>
        <Form.Item
    {...restField}
    name={[name, 'value']}
    fieldKey={[fieldKey, 'value']}
    rules={[{ required: true, message: 'Введите количество' }]}
    >
    <InputNumber placeholder="Количество" min={0} />
    </Form.Item>
    <MinusCircleOutlined onClick={() => remove(name)} />
    </Space>
))}
    <Form.Item>
        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
    Добавить ингредиент
    </Button>
    </Form.Item>
    </>
)}
    </Form.List>

    {/* Этапы приготовления */}
    <Divider>Этапы приготовления</Divider>
    <Form.List name="steps">
        {(fields, { add, remove }) => (
        <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
        <Form.Item
            {...restField}
    name={name}
    fieldKey={fieldKey}
    rules={[{ required: true, message: 'Введите шаг приготовления' }]}
    >
    <Input placeholder="Шаг приготовления" />
        </Form.Item>
        <MinusCircleOutlined onClick={() => remove(name)} />
    </Space>
))}
    <Form.Item>
        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
    Добавить шаг
    </Button>
    </Form.Item>
    </>
)}
    </Form.List>

    {/* Ссылка на изображение */}
    <Form.Item name="picture" label="Ссылка на изображение">
    <Input placeholder="URL картинки" />
    </Form.Item>

    <Form.Item>
    <Button type="primary" htmlType="submit">
        Сохранить рецепт
    </Button>
    </Form.Item>
    </Form>
    </div>
);
};

export default CreateRecipe;
