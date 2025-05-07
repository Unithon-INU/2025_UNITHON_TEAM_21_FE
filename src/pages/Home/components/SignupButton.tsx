import {Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function SignupButton() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity className="px-3 py-1 rounded-xl bg-main-color" onPress={() => navigation.navigate('signup' as never)}>
            <Text className="text-base font-bold text-white">회원가입</Text>
        </TouchableOpacity>
    );
}
