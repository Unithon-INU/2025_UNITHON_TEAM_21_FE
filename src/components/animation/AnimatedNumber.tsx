import React, {useRef, useEffect, useState} from 'react';
import {Text, Animated} from 'react-native';

/**
 * @param {object} props
 * @param {number} props.value - 최종적으로 표시될 숫자
 * @param {number} [props.duration=1500] - 애니메이션 지속 시간 (ms)
 * @param {string} [props.className] - Text 컴포넌트에 적용할 Tailwind CSS 클래스
 * @param {boolean} [props.formatNumber=true] - 숫자에 콤마(,)를 적용할지 여부
 */
interface AnimatedNumberProps {
    value: number;
    duration?: number;
    className?: string;
    formatNumber?: boolean;
}
export default function AnimatedNumber({value, duration = 3000, className, formatNumber = true}: AnimatedNumberProps) {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
            toValue: value,
            duration: duration,
            useNativeDriver: false,
        }).start();

        const listener = animatedValue.addListener(({value: currentAnimatedValue}) => {
            setDisplayValue(Math.floor(currentAnimatedValue));
        });

        return () => {
            animatedValue.removeListener(listener);
        };
    }, [value, duration, animatedValue]);

    const formattedValue = formatNumber ? displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : displayValue.toString();

    return <Text className={className}>{formattedValue}</Text>;
}
