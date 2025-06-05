import {Text, View} from 'react-native';

export default function EmptyComponents({category}: {category: string}) {
    return (
        <View className="flex justify-center h-60">
            <Text className="text-xl text-center text-font-gray">
                <Text className="text-main-color">{category}</Text>를 찾지못했어요.
            </Text>
            <Text className="text-xl text-center text-font-gray">다른 봉사활동을 확인해주세요!</Text>
        </View>
    );
}
