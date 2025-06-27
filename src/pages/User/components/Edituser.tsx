import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileName} from '@/store/slice/userSlice';

import Layout from '@/components/Layout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import CustomModal from '@/components/layout/CustomModal';
import {API_URL} from '@env';
import {RootState} from '@/store/store';

export default function EditUser() {
    const navigation = useNavigation() as any;
    const dispatch = useDispatch();

    const [nickname, setNickname] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
    const {token} = useSelector((state: RootState) => state.user);
    const handleNicknameChange = async () => {
        try {
            if (token) {
                await fetch(`${API_URL}/api/users/nickname`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                    body: JSON.stringify({nickname}),
                });
            }
        } catch (error) {
            console.error('Error updating nickname:', error);
        }
    };
    const handleCompletePress = () => {
        if (nickname) {
            setShowSaveConfirmModal(true);
        } else {
            setShowCancelModal(true);
        }
    };

    const handleConfirmSave = () => {
        handleNicknameChange();
        dispatch(setProfileName(nickname));
        setShowSaveConfirmModal(false);
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'main', // StackNavigator가 아는 화면 이름
                        state: {
                            routes: [
                                {name: 'userInfo'}, // NavBar가 아는 화면 이름
                            ],
                        },
                    },
                ],
            }),
        );
    };

    return (
        <Layout>
            <View className="flex-row justify-between items-center pb-4">
                <HeaderBackButton className="flex-1">프로필수정</HeaderBackButton>

                <TouchableOpacity onPress={handleCompletePress}>
                    <Text className="font-bold text-[20px] text-font-black">완료</Text>
                </TouchableOpacity>
            </View>

            <View className="justify-center items-center mb-10">
                <View className="relative">
                    <View className="w-[120px] h-[120px] rounded-full bg-main-gray" />
                    <View className="absolute right-0 bottom-0 justify-center items-center w-10 h-10 bg-white rounded-full">
                        <Image source={require('@/assets/image.png')} className="w-[32px] h-[32px]" />
                    </View>
                </View>
            </View>

            <View className="px-4 mb-2">
                <Text className="mb-1 font-bold text-[16px] text-font-black">닉네임</Text>
                <TextInput
                    className="px-3 py-2 text-sm text-black rounded-xl border border-font-black"
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

            <CustomModal
                title="프로필 수정을 취소하시겠습니까?"
                visible={showCancelModal}
                action="cancel"
                onClose={() => setShowCancelModal(false)}
                onAction={() => {
                    setShowCancelModal(false);
                    navigation.goBack();
                }}>
                <Text className="mb-2 text-font-gray">변경사항이 없습니다</Text>
            </CustomModal>

            <CustomModal title="확인" visible={showSaveConfirmModal} action="edit" onClose={() => setShowSaveConfirmModal(false)} onAction={handleConfirmSave}>
                <Text className="text-font-gray">변경사항을 수정하시겠습니까?</Text>
            </CustomModal>
        </Layout>
    );
}
