import {ActivityIndicator, View} from 'react-native';

export default function Loading() {
    return (
        <View className="flex items-center justify-center h-full">
            <ActivityIndicator className="text-main-color" size="large" />
        </View>
    );
}
