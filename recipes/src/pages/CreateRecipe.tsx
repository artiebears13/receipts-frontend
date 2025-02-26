import React, {useState} from 'react';
import { Form, Input, InputNumber, Button, Select, Space, Divider, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { recipeStore } from '../stores/RecipeStore';
import {IRecipe} from "../interfaces/recipe.ts";
import {useNavigate} from "react-router-dom";

const { Option } = Select;



const CreateRecipe: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm<IRecipe>();
    const [timeVisibleMap, setTimeVisibleMap] = useState<{ [key: string]: boolean }>({});


    const onFinish = async (values: IRecipe) => {
        try {
            await recipeStore.addRecipe(values);
            message.success('Рецепт успешно добавлен!');
            form.resetFields();
            navigate(`/`);

        } catch (error) {
            message.error('Ошибка при добавлении рецепта');
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Добавить рецепт</h1>
            <Form form={form} layout="vertical" onFinish={onFinish}>
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
                        <Option value="breakfast">Завтрак</Option>
                        <Option value="lunch">Обед</Option>
                        <Option value="dinner">Ужин</Option>
                        <Option value="snack">Перекус</Option>
                    </Select>
                </Form.Item>

                <Divider>Ингредиенты</Divider>
                <Form.List name="ingredients">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 5 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        rules={[{ required: true, message: 'Введите название' }]}
                                    >
                                        <Input placeholder="Название" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        rules={[{ required: true, message: 'Введите количество' }]}
                                    >
                                        <InputNumber placeholder="Количество" min={0} />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'unit']}
                                        rules={[{ required: true, message: 'Введите единицу измерения' }]}
                                    >
                                        <Input placeholder="Единица" />
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

                <Divider>Этапы приготовления</Divider>
                <Form.List name="steps">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'description']}
                                        rules={[{ required: true, message: 'Введите шаг приготовления' }]}
                                    >
                                        <Input placeholder="Шаг приготовления" />
                                    </Form.Item>
                                    {timeVisibleMap[key] ? (
                                        <>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'time']}
                                            >
                                                <InputNumber placeholder="Время (мин)" min={0} />
                                            </Form.Item> минут

                                        </>
                                    ) : (
                                        <Button
                                            type="link"
                                            onClick={() => setTimeVisibleMap((prev) => ({ ...prev, [key]: true }))}
                                        >
                                            Добавить время
                                        </Button>
                                    )}
                                    <MinusCircleOutlined
                                        onClick={() => {
                                            remove(name);
                                            setTimeVisibleMap((prev) => {
                                                const newMap = { ...prev };
                                                delete newMap[key];
                                                return newMap;
                                            });
                                        }}
                                    />
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
