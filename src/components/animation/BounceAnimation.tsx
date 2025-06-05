import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export default function BounceAnimation({children}: {children: React.ReactNode}) {
    const bounceAnim = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: -10,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [bounceAnim]);
    return <Animated.View style={{transform: [{translateY: bounceAnim}]}}>{children}</Animated.View>;
}
