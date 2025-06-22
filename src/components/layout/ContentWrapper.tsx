import {ScrollView, Text, View} from 'react-native';
import ShowMoreButton from '../button/ShowMoreButton';

interface WrapperProps {
    title: string;
    children: React.ReactNode;
    href?: string;
}
export function RowWrapper({title, children, href}: WrapperProps) {
    const childrenArray = Array.isArray(children) ? children : [children];
    const [first, ...rest] = childrenArray;

    return (
        <View className="flex flex-col gap-3 py-3">
            {href ? (
                <View className="flex flex-row items-center justify-between">
                    <Text className="text-xl font-semibold text-font-black">{title}</Text>
                    <ShowMoreButton href={href} />
                </View>
            ) : (
                <Text className="text-xl font-semibold text-font-black">{title}</Text>
            )}

            {first}

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex flex-row gap-3">{rest}</View>
            </ScrollView>
        </View>
    );
}

export function ColWrapper({title, children, href}: WrapperProps) {
    return (
        <View className="flex flex-col gap-3 py-3">
            {href ? (
                <View className="flex flex-row items-center justify-between">
                    <Text className="text-xl font-semibold text-font-black">{title}</Text>
                    <ShowMoreButton href={href} />
                </View>
            ) : (
                <Text className="text-xl font-semibold text-font-black">{title}</Text>
            )}
            <View className="flex flex-col gap-3">{children}</View>
        </View>
    );
}
