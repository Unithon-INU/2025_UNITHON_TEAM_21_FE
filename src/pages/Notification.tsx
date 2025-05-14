import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Layout from './Layout';

export default function NotificationScreen() {
    const navigation = useNavigation();

    return (
        <Layout>
            <View className="flex-row justify-between h-[60px] pt-[5px] pb-[10px] pl-[2px] px-[5px]">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" resizeMode="contain" />
                </TouchableOpacity>
                <Text className="font-inter font-bold text-[24px]">알림</Text>
                <Image source={require('@/assets/delete.png')} className="w-8 h-8" resizeMode="contain" />
            </View>
        </Layout>
    );
}
