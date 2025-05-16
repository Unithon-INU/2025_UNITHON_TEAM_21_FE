import {Text, TouchableOpacity} from 'react-native';

export default function KakoLogin() {
    return (
        <TouchableOpacity className="py-3 bg-gray-200 rounded-xl">
            <Text className="text-base font-bold text-center text-black">Login with Kakao</Text>
        </TouchableOpacity>
    );
}
