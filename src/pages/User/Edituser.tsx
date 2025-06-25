import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileName } from '@/store/slice/userSlice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '@env'; // ✅ 추가된 부분

import Layout from '../../components/Layout';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import CustomModal from '@/components/layout/CustomModal';
import { RootState } from '@/store/store';

export default function EditUser() {
  const navigation = useNavigation() as any;
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state:RootState) => state.user);

  const handleCompletePress = () => {
    if (nickname) {
      setShowSaveConfirmModal(true);
    } else {
      setShowCancelModal(true);
    }
  };

  const handleConfirmSave = async () => {
    setLoading(true);
    console.log('handleConfirmSave 실행됨');
    console.log('보낼 닉네임:', nickname);

    try {
      console.log(token.accessToken)
      if (!token) throw Error("토큰이 없습니다");
      const response = await fetch(`${API_URL}/api/users/nickname`,{
        method:"PUT",
        headers:{
          Authorization: `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({ nickname }),
        });

        console.log(token.accessToken, response);

      dispatch(setProfileName(nickname));
      setShowSaveConfirmModal(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'UserInfo' }],
      });
    } catch (error) {
      Alert.alert('오류', '프로필 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <View className="flex-row items-center justify-between pb-4">
        <HeaderBackButton className="flex-1">프로필수정</HeaderBackButton>
        <TouchableOpacity onPress={handleCompletePress} disabled={loading}>
          <Text className="font-bold text-[20px] text-font-black">완료</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center justify-center mb-10">
        <View className="relative">
          <View className="w-[120px] h-[120px] rounded-full bg-main-gray" />
          <View className="absolute bottom-0 right-0 items-center justify-center w-10 h-10 bg-white rounded-full">
            <Image source={require('@/assets/image.png')} className="w-[32px] h-[32px]" />
          </View>
        </View>
      </View>

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
          <Text className="mt-1 font-inter font-normal text-[12px]" style={{ color: '#FD5757' }}>
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

      <CustomModal
        title="변경사항을 수정하시겠습니까?"
        visible={showSaveConfirmModal}
        action="edit"
        onClose={() => setShowSaveConfirmModal(false)}
        onAction={handleConfirmSave}
      />
    </Layout>
  );
}
