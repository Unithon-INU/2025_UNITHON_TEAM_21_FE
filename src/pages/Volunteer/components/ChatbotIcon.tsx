import {useNavigation} from '@react-navigation/native';
import {Image, TouchableOpacity} from 'react-native';

export default function ChatbotIcon() {
    const navigation = useNavigation() as any;
    return (
        <TouchableOpacity className="absolute right-4 bottom-4" onPress={() => navigation.navigate('chatbot', {id: '0'})}>
            <Image className="w-[90px] h-[90px] p-2 bg-white border border-main-gray rounded-full rounded-br-none" source={require('@/assets/chatbot.png')} />
        </TouchableOpacity>
    );
}
