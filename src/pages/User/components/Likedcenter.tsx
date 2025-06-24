import React from 'react';
import {Text, ScrollView} from 'react-native';

import Layout from '../../../components/Layout';

import {useSelector} from 'react-redux';
import {ChildrenCenterList} from '@/types/ChildrenCenter';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import CenterItem from '../../Center/CenterList/components/CenterItem';

export default function UserLikedcenter() {
    const centerList = useSelector((state: any) => state.likedCenter?.likedList || []);

    return (
        <Layout>
            <HeaderBackButton>관심 지역아동센터</HeaderBackButton>
            <Text className="mb-2 text-xl font-bold text-font-black">
                총 <Text className="text-main-color">{centerList.length}</Text>건
            </Text>
            <ScrollView className="flex-1 px-2">
                {centerList.length === 0 ? (
                    <Text className="mt-10 text-lg font-semibold text-center text-font-black">
                        좋아요 한 <Text className="text-main-color">지역아동센터</Text>가 없습니다.
                    </Text>
                ) : (
                    centerList.map((item: ChildrenCenterList, idx: number) => <CenterItem key={idx} item={item} />)
                )}
            </ScrollView>
        </Layout>
    );
}
