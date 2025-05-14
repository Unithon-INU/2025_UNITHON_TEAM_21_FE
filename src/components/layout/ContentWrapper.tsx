import {ScrollView, Text, View} from 'react-native';

export function RowWrapper({title, children}: {title: string; children: React.ReactNode}) {
    return (
        <View className="flex flex-col gap-3 py-3">
            <Text className="text-xl font-semibold text-font-black">{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex flex-row gap-3">{children}</View>
            </ScrollView>
        </View>
    );
}

export function ColWrapper({title, children}: {title: string; children: React.ReactNode}) {
    return (
        <View className="flex flex-col gap-3 py-3">
            <Text className="text-xl font-semibold text-font-black">{title}</Text>
            <View className="flex flex-col gap-3">{children}</View>
        </View>
    );
}
