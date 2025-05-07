import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import Layout from '../Layout';
import Modal from 'react-native-modal';
import KakoLogin from './components/KakoLogin';

export default function Signup() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <Layout className="h-full">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <EvilIcons size={32} name="close" />
            </TouchableOpacity>

            <View className="flex items-center justify-center flex-1">
                <Image className="h-20 w-52" source={require('@/assets/logo.png')} />
                <Text className="text-2xl font-semibold tracking-[-2px]">나눔의 일상을 만나다</Text>
            </View>

            <View className="flex gap-3 py-10">
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="flex flex-row items-center justify-between w-full py-1 pl-10 pr-5 rounded-3xl bg-main-color ">
                    <Text className="text-xl font-bold text-white">고객으로 시작</Text>
                    <Image className="w-[60px] h-[60px]" source={require('@/assets/customer.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="flex flex-row items-center justify-between w-full py-1 pl-10 pr-5 rounded-3xl bg-main-color ">
                    <Text className="text-xl font-bold text-white">아동센터로 시작</Text>
                    <Image className="w-[60px] h-[60px]" source={require('@/assets/childecenter.png')} />
                </TouchableOpacity>
            </View>

            <Modal className="m-0 " isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                <View className="p-5 bg-white rounded-t-3xl">
                    <TouchableOpacity className="py-3 mb-3 bg-main-color rounded-xl">
                        <Text className="text-base font-bold text-center text-white">이메일로 로그인</Text>
                    </TouchableOpacity>
                    <KakoLogin />
                </View>
            </Modal>
        </Layout>
    );
}
