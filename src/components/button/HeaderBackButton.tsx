import {useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export default function HeaderBackButton({children, px = false, className = ''}: {children?: React.ReactNode; px?: boolean; className?: string}) {
    const navigation = useNavigation() as any;
    return (
        <View className={`flex-row items-center justify-between py-4 ${className} ${px ? 'px-4' : 'px-0'}`}>
            <View className="flex-row items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
                <Text className="flex-1 text-xl font-bold text-font-black" numberOfLines={1}>
                    {children}
                </Text>
            </View>
        </View>
    );
}
