import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ShowMoreButton({href}: {href?: string}) {
    const navigation = useNavigation() as any;
    return (
        <TouchableOpacity className="flex-row items-center" onPress={() => navigation.navigate(href)}>
            <Text className="text-xs font-semibold text-main-color">더보기</Text>
            <MaterialIcons name="keyboard-arrow-right" color={'#FFB257'} />
        </TouchableOpacity>
    );
}
