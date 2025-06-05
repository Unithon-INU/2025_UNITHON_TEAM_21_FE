import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Layout from '../../components/Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import RecommendActivity from '../Home/components/RecommendActivity';

export default function UserLikedvol() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    return (
        <Layout>
            {/* Top Bar */}
            <View className="flex-row items-center space-x-2 pb-7 ">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
                <Text className="font-inter font-bold text-[20px]"> 관심 봉사활동</Text>
            </View>
        </Layout>
    );
}
