import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Layout from '../../components/Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export default function UserEdit() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    return (
        <Layout>
            {/* Top Bar */}
            <View className="flex-row items-center justify-between space-x-2 pb-7">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
                <Text className="font-inter font-bold text-[20px]"> Edit Profile</Text>
            </View>
        </Layout>
    );
}
