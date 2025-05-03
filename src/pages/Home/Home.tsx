import {TouchableOpacity, Image, Text, View} from 'react-native';
import Layout from '../Layout';
export default function Home() {
    return (
        <Layout>
            <View className="flex flex-row items-center justify-between">
                <Image source={require('@/assets/logo.png')} style={{width: 120, height: 46}} />
                <TouchableOpacity className="px-3 py-1 rounded-xl bg-main-color ">
                    <Text className="text-base font-bold text-white">회원가입</Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-col gap-3 py-3">
                <Text className="text-xl font-semibold text-font-black">인천지역아동센터</Text>
                <View className="flex flex-row">
                    <View className="flex flex-col gap-1 px-2 py-3 bg-main-color rounded-2xl">
                        <Text className="text-base font-semibold text-white">검단지역아동센터</Text>
                        <Text className="text-xs font-semibold text-white">인천 서구 검단로501번길 69</Text>
                        <Text className="text-xs font-semibold text-white">#꿈나무 #쉼터</Text>
                        <Text className="text-xs font-semibold text-white">083)722-1234-5679</Text>
                    </View>
                </View>
            </View>
            <View className="flex flex-col gap-3 py-3">
                <Text className="text-xl font-semibold text-font-black">{'실시간 기부현황'}</Text>
                <View className="flex flex-row gap-2">
                    <View className="w-[120px] h-[120px] bg-bg-gray rounded-xl" />
                    <View className="flex gap-1 py-2">
                        <Text className="text-xl font-semibold text-font-black">검단지역아동센터</Text>
                        <Text className="text-xs font-semibold text-font-gray">인천 서구 검단로501번길 69</Text>
                    </View>
                </View>
            </View>
        </Layout>
    );
}
