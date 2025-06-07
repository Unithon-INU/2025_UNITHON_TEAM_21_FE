import React from 'react';
import {FlatList, ActivityIndicator, Text} from 'react-native';

import {useCenter} from '@/hook/api/useCenter';

import Loading from '@/components/Loading';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import CenterItem from './components/CenterItem';

export default function CenterList() {
    const {centerData, loading, fetchMore, isFetchingMore, hasMore} = useCenter();

    if (loading) return <Loading />;
    return (
        <>
            <HeaderBackButton px={true}>인근 지역아동센터</HeaderBackButton>
            <FlatList
                className="px-5"
                contentContainerStyle={{paddingBottom: 60}}
                data={centerData}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({item}) => <CenterItem item={item} />}
                ListEmptyComponent={<Text className="text-base text-font-black">센터 정보가 없습니다.</Text>}
                onEndReached={() => {
                    if (hasMore && !isFetchingMore) fetchMore();
                }}
                onEndReachedThreshold={0.2}
                ListFooterComponent={isFetchingMore ? <ActivityIndicator size="large" className="text-main-color" /> : null}
            />
        </>
    );
}
