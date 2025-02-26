import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { Typography } from 'antd';
import {RecipeStep} from "../interfaces/recipe.ts";
import Timer from "./Timer.tsx";

const { Text } = Typography;

interface SwipeableStepProps {
    index: number;
    step: RecipeStep;
    done: boolean;
    onToggle: (index: number) => void;
}

const SwipeableStep: React.FC<SwipeableStepProps> = ({ index, step, done, onToggle }) => {
    const handlers = useSwipeable({
        onSwipedRight: () => onToggle(index),
        onSwipedLeft: () => onToggle(index),
        delta: 50
    });
    console.log({step});
    const clickHandler = () => {
        onToggle(index);
    }

    return (
        <div
            {...handlers}
            style={{
                padding: '12px',
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                marginBottom: '12px',
                backgroundColor: done ? '#d9f7be' : '#fff',
                userSelect: 'none',
                transition: 'background-color 0.3s ease'
            }}
            onClick={clickHandler}
        >
            <Text delete={done} style={{ fontSize: '16px' }}>
                {index + 1}. {step.description}
            </Text>
            {step.time !== undefined && (
                <div style={{ marginLeft: '8px' }}>
                    <Timer minutes={step.time} />
                </div>
            )}
        </div>
    );
};

export default SwipeableStep;
