import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Layout from '../../components/Layout';

export default function EditUser() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState('');

    return (
        <Layout>
            {/* Top Bar */}
            <View className="flex-row items-center justify-between pb-4">
                <View className="flex-row items-center space-x-2">
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                    </TouchableOpacity>
                    <Text className="font-inter font-bold text-[20px]">프로필 수정</Text>
                </View>

                <TouchableOpacity onPress={() => {
                  navigation.navigate('UserInfo', {
                  userName,
                  profileImage: null, // 프로필 이미지 처리 시 여기에 값 설정
                  });     
                  }}>
                  <Text className="text-[16px]">완료</Text>
                </TouchableOpacity>
            </View>

            {/* 프로필 이미지 + 카메라 아이콘 */}
            <View className="items-center justify-center mb-10">
                <View className="relative">
                    <View className="w-[120px] h-[120px] rounded-full bg-main-gray" />
                    <Image
                        source={require('@/assets/image.png')}
                        className="w-[32px] h-[32px] absolute bottom-0 right-0"
                    />
                </View>
            </View>

            {/* 닉네임 입력 필드 */}
            <View className="px-4 mb-2">
                <Text className="mb-1 font-bold text-[16px]">닉네임</Text>
                <TextInput
                    className="px-3 py-2 text-sm text-black border border-black rounded-xl"
                    placeholder="기존에 작성되었던 닉네임"
                    placeholderTextColor="black"
                    value={userName}
                    onChangeText={setUserName}
                />
                <Text className="mt-1 font-inter font-normal text-[12px]"style={{color:'#FD5757'}}>
                    닉네임을 입력해주세요.
                </Text>
            </View>

            {/* 팝업 */}
            <Modal transparent visible={showModal} animationType="fade">
              <View className="items-center justify-center flex-1 bg-black/20">
              <View className="bg-white px-6 py-5 rounded-xl w-[280px] items-center">
                <Text className="mb-3 text-xs font-normal text-font-black">프로필 수정을 취소하시겠습니까?</Text>

                <View className="flex-row justify-between px-6 mt-2" style={{gap:8}}>
                  <TouchableOpacity
                    className="bg-bg-gray px-4 py-2 rounded-lg w-[80px] items-center"
                    onPress={() => setShowModal(false)}>
                    <Text className="font-bold">아니요</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-main-color px-4 py-2 rounded-lg w-[80px] items-center"
                    onPress={() => {
                    setShowModal(false);
                    navigation.goBack();
                    }}
                    >
                    <Text className="font-bold text-white">예</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </View>
            </Modal>
        </Layout>
    );
}