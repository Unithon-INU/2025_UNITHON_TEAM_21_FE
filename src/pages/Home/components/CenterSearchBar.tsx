import {View, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function SearchBar() {
    const navigation = useNavigation() as any;

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('centerSearchScreen')}>
            <View className="bg-[#EAEAEA] rounded-xl px-3 py-3 flex flex-row items-center">
                <Ionicons name="search-outline" size={20} color="#9A9A9A" />
                <Text className="text-base text-[#9A9A9A]" style={{color: '#9A9A9A'}}>
                    찾는 지역센터가 있으신가요?
                </Text>
            </View>
        </TouchableOpacity>
    );
}
