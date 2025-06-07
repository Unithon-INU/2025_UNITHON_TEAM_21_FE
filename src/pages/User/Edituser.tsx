import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Layout from '../../components/Layout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import {useDispatch} from 'react-redux';
import {setProfileName} from '@/store/slice/userSlice';

export default function EditUser() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const dispatch = useDispatch();

    const [nickname, setNickname] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false); // 기존 '취소' 모달 상태

    const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);

    const handleCompletePress = () => {
        if (nickname) {
            setShowSaveConfirmModal(true);
        } else {
            setShowCancelModal(true);
        }
    };

    const handleConfirmSave = () => {
        dispatch(setProfileName(nickname));
        setShowSaveConfirmModal(false);
        navigation.replace('UserInfo');
    };

    return (
        <Layout>
            {/* Top Bar */}
            <View className="flex-row items-center justify-between pb-4">
                <HeaderBackButton className="flex-1">프로필수정</HeaderBackButton>

                <TouchableOpacity onPress={handleCompletePress}>
                    <Text className="font-bold text-[20px] text-font-black">완료</Text>
                </TouchableOpacity>
            </View>

            {/* 프로필 이미지 (기존과 동일) */}
            <View className="items-center justify-center mb-10">
                <View className="relative">
                    <View className="w-[120px] h-[120px] rounded-full bg-main-gray" />
                    <View className="absolute bottom-0 right-0 items-center justify-center w-10 h-10 bg-white rounded-full">
                        <Image source={require('@/assets/image.png')} className="w-[32px] h-[32px]" />
                    </View>
                </View>
            </View>

            {/* 닉네임 입력 필드 (기존과 동일) */}
            <View className="px-4 mb-2">
                <Text className="mb-1 font-bold text-[16px] text-font-black">닉네임</Text>
                <TextInput
                    className="px-3 py-2 text-sm text-black border border-font-black rounded-xl"
                    placeholder={'닉네임을 입력해주세요.'}
                    placeholderTextColor="black"
                    value={nickname}
                    onChangeText={setNickname}
                />
                {!nickname && (
                    <Text className="mt-1 font-inter font-normal text-[12px]" style={{color: '#FD5757'}}>
                        닉네임을 입력해주세요.
                    </Text>
                )}
            </View>

            <Modal transparent visible={showCancelModal} animationType="fade">
                <View className="items-center justify-center flex-1 bg-black/20">
                    <View className="bg-white px-6 py-5 rounded-2xl w-[280px] items-center">
                        <Text className="mb-3 text-base font-semibold text-font-black">프로필 수정을 취소하시겠습니까?</Text>
                        <View className="flex-row justify-between" style={{gap: 8}}>
                            <TouchableOpacity className="bg-bg-gray px-4 py-2 rounded-lg w-[80px] items-center" onPress={() => setShowCancelModal(false)}>
                                <Text className="font-bold">아니요</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-main-color px-4 py-2 rounded-lg w-[80px] items-center"
                                onPress={() => {
                                    setShowCancelModal(false);
                                    navigation.goBack();
                                }}>
                                <Text className="font-bold text-white">예</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent visible={showSaveConfirmModal} animationType="fade">
                <View className="items-center justify-center flex-1 bg-black/20">
                    <View className="bg-white px-6 py-5 rounded-2xl w-[280px] items-center">
                        <Text className="mb-3 text-base font-semibold text-font-black">변경사항을 저장하시겠습니까?</Text>
                        <View className="flex-row justify-between mt-2" style={{gap: 8}}>
                            <TouchableOpacity className="bg-bg-gray px-4 py-2 rounded-lg w-[80px] items-center" onPress={() => setShowSaveConfirmModal(false)}>
                                <Text className="font-bold">아니요</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-main-color px-4 py-2 rounded-lg w-[80px] items-center" onPress={handleConfirmSave}>
                                <Text className="font-bold text-white">예</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Layout>
    );
}
