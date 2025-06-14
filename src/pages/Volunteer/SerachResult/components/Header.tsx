import {useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header({text}: {text: string}) {
    const navigation = useNavigation() as any;

    return (
        <View className="flex flex-row items-center px-3 py-1 mb-4 border-b-2 border-main-color">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 py-2.5 ml-2" onPress={() => navigation.navigate('searchScreen')}>
                <Text className="text-base">{text}</Text>
            </TouchableOpacity>
            <Ionicons name="search-outline" size={20} color="#9A9A9A" />
        </View>
    );
}
