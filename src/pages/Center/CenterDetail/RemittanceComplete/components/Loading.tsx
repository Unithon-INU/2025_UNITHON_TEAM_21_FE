import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

export default function Loading({name, value}: {name: string; value: string}) {
    return (
        <View className="flex flex-col h-full gap-3 px-5">
            <View className="flex flex-col items-center justify-center flex-1 gap-1 pb-20">
                <ActivityIndicator size={60} className="pb-6 text-main-color" />
                <Text className="text-3xl font-semibold text-font-black">
                    <Text className="text-3xl font-semibold text-main-color">{name}</Text>
                    으로
                </Text>
                <Text className="text-3xl font-semibold text-font-black">{Number(value).toLocaleString()}원을</Text>
                <Text className="text-3xl font-semibold text-font-black">기부할게요</Text>
                <TouchableOpacity className="px-3 py-2 mt-4 rounded-lg">
                    <Text className="text-font-black"> </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
