import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity} from 'react-native';

export default function ShowMoreButton({href}: {href?: string}) {
    const navigation = useNavigation() as any;
    return (
        <TouchableOpacity onPress={() => navigation.navigate(href)}>
            <Text className="text-xs font-semibold text-main-color">더보기 &gt;</Text>
        </TouchableOpacity>
    );
}
