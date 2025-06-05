import HeaderBackButton from '@/components/button/HeaderBackButton';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default function IDLogin() {
    return (
        <View className="flex flex-col h-full gap-12 px-5">
            <HeaderBackButton />
            <View className="flex items-center justify-center">
                <Image className="h-20 w-52" source={require('@/assets/logo.png')} />
                <Text className="text-2xl font-semibold tracking-[-2px]">나눔의 일상을 만나다</Text>
            </View>

            <View className="flex gap-3 px-5">
                <TextInput
                    placeholder="아이디를 입력하세요"
                    className="px-3 py-4 border border-gray-300 rounded-md"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="비밀번호를 입력하세요"
                    className="px-3 py-4 border border-gray-300 rounded-md"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TouchableOpacity className="flex items-center justify-center py-4 rounded-lg bg-main-color">
                    <Text className="text-base font-semibold text-white">로그인</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
