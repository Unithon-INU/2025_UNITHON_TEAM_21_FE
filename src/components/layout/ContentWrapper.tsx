import {useNavigation} from '@react-navigation/native';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ShowMoreButton({href, param}: {href?: string; param?: Record<string, any>}) {
    const navigation = useNavigation() as any;
    return (
        <TouchableOpacity className="flex-row items-center" onPress={() => navigation.navigate(href, param)}>
            <Text className="text-xs font-semibold text-main-color">더보기</Text>
            <MaterialIcons name="keyboard-arrow-right" color={'#FFB257'} />
        </TouchableOpacity>
    );
}

interface WrapperProps {
    title?: string;
    children: React.ReactNode;
    href?: string;
    param?: Record<string, any>;
}
export function RowWrapper({title, children, href, param}: WrapperProps) {
    return (
        <View className="flex flex-col gap-3 py-3">
            {href ? (
                <View className="flex flex-row justify-between items-center">
                    <Text className="text-xl font-semibold text-font-black">{title}</Text>
                    <ShowMoreButton href={href} param={param} />
                </View>
            ) : (
                <Text className="text-xl font-semibold text-font-black">{title}</Text>
            )}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex flex-row gap-3">{children}</View>
            </ScrollView>
        </View>
    );
}

export function ColWrapper({title, children, href, param}: WrapperProps) {
    return (
        <View className="flex flex-col gap-3 py-3">
            {href ? (
                <View className="flex flex-row justify-between items-center">
                    <Text className="text-xl font-semibold text-font-black">{title}</Text>
                    <ShowMoreButton href={href} param={param} />
                </View>
            ) : (
                <Text className="text-xl font-semibold text-font-black">{title}</Text>
            )}
            <View className="flex flex-col gap-3">{children}</View>
        </View>
    );
}
