import React, {useState, useEffect, useRef} from 'react';
import { Button, Space, Typography } from 'antd';

const { Text } = Typography;

interface TimerProps {
    minutes: number;
}

const Timer: React.FC<TimerProps> = ({ minutes }) => {
    // Время в секундах
    const [timeLeft, setTimeLeft] = useState(minutes * 60);
    const [running, setRunning] = useState(false);
    // @ts-ignore
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [notificationShown, setNotificationShown] = useState(false);

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        // @ts-ignore
                        clearInterval(intervalRef.current as NodeJS.Timeout);
                        setRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (!running && intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [running]);

    useEffect(() => {
        if (notificationShown) return
        if (timeLeft === 0){
            if (Notification.permission === 'granted'){
                new Notification(
                    "готово",
                    {body: "Таймер истек"}
                )
                setNotificationShown(true);
            }
        }

    }, [timeLeft, notificationShown]);

    const toggleTimer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        setRunning(prev => !prev);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <Space style={{
            padding: '4px 8px',
            border: '1px solid #e8e8e8',
            borderRadius: '4px',
            width: '150px',
            display: 'flex',
            justifyContent: "space-between"
        }}>
            <Text strong style={{ fontSize: '16px' }}>
                {formatTime(timeLeft)}
            </Text>
            <Button type="primary" size="small" onClick={toggleTimer}>
                {running ? 'Stop' : 'Start'}
            </Button>
        </Space>
    );
};

export default Timer;
