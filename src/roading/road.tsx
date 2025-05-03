import React from 'react';
import {View, Image} from 'react-native';

export default function LoadingScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white p-[10px]">
            {/* 기봉사 로고 margin은 일단 넣어두긴함 css오류로 돌려보진못함함*/}
            <Image source={require('@/assets/logo.png')} style={{width: 211, height: 81, marginBottom: 24}} resizeMode="contain" />

            {/* 로딩 아이콘 */}
            <Image
                source={require('@/assets/roading.png')}
                style={{
                    width: 36,
                    height: 36, 
                    transform: [{rotate: '30deg'}],
                }}
                resizeMode="contain"
            />
        </View>
    );
}
