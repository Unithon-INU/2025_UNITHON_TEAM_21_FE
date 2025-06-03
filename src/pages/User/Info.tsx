import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Layout from '../../components/Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export default function UserInfo() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    return (
        <Layout>
            {/* Top Bar */}
            <View className="h-[60px] pt-[5px] pb-[10px] pl-[2px] px-[5px]">
                <Text className="font-inter font-semibold text-[24px] leading-[24px]">My Info</Text>
            </View>

            {/* Profile Edit Navigation */}

            {/* Donation Amount */}
            <View className="h-[60px] pt-[5px] pb-[10px] pl-[2px] px-[5px]">
                <Text className="font-inter font-semibold text-[20px] leading-[24px]">Donations with Gibongsa</Text>
            </View>

            <View className="h-auto pt-[10px] pb-[10px] px-[5px]">
                <Text className="font-inter font-bold text-[20px] leading-[24px] mb-2">My Details</Text>

                {/* Favorite Children's Centers */}
                <View className="flex-row items-center justify-between mt-5 mb-3">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedcenter.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
                        <Text className="font-inter text-[16px]">Favorite Children’s Centers</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Userlikedcenter')}>
                        <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                    </TouchableOpacity>
                </View>

                {/* Favorite Volunteer Activities */}
                <View className="flex-row items-center justify-between mt-5 mb-3">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedvol.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
                        <Text className="font-inter text-[16px]">Favorite Volunteer Activities</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Userlikedvol')}>
                        <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                    </TouchableOpacity>
                </View>

                {/* Donation History */}
                <View className="flex-row items-center justify-between mt-5 mb-3">
                    <View className="flex-row items-center">
                        <Image source={require('@/assets/likedcenter.png')} className="w-6 h-6 mr-2" resizeMode="contain" />
                        <Text className="font-inter text-[16px]">Donation History</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Userdonate')}>
                        <Image source={require('@/assets/rightnavi.png')} className="w-[18px] h-[18px]" />
                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    );
}
