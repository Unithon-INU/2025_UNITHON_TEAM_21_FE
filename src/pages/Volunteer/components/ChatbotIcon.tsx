import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BounceAnimation from '@/components/animation/BounceAnimation';

export default function ChatbotIcon() {
    const navigation = useNavigation() as any;
    return (
        <TouchableOpacity className="absolute right-4 bottom-4" onPress={() => navigation.navigate('chatbot', {id: '0'})}>
            <BounceAnimation>
                <Image
                    className="w-[80px] h-[80px] p-2 bg-white border border-main-gray rounded-full rounded-br-none"
                    source={require('@/assets/chatbot.png')}
                />
            </BounceAnimation>
        </TouchableOpacity>
    );
}
