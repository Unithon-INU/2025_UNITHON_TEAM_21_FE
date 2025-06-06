import React, {useCallback} from 'react';
import {Text, FlatList, ActivityIndicator} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import {useVolunteerData} from '@/hook/api/useVolunteerData';

import VolunteerItem from './components/VolunteerItem';
import Loading from '@/components/Loading';
import EmptyComponents from './components/EmptyCoponents';
import HeaderBackButton from '@/components/button/HeaderBackButton';

type VolunterrCategoryParams = {
    category: string;
    iconKey: string;
    keyword: string;
};

export default function VolunterrCategory() {
    const route = useRoute<RouteProp<Record<string, VolunterrCategoryParams>, string>>();
    const {category = '추천 봉사활동', iconKey = '', keyword = ''} = route.params || {};

    const {loading, volunteerData, items, loadMore, isFetchingMore, hasMore} = useVolunteerData(iconKey, keyword);

    const handleEndReached = useCallback(() => {
        if (hasMore && !isFetchingMore && !loading) {
            loadMore();
        }
    }, [hasMore, isFetchingMore, loading, loadMore]);

    if (loading) return <Loading />;
    return (
        <>
            <HeaderBackButton px={true}>{keyword ? keyword : category}</HeaderBackButton>
            <FlatList
                className="px-5"
                contentContainerStyle={{paddingBottom: 60}}
                data={items}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({item}) => <VolunteerItem item={item} />}
                ListHeaderComponent={
                    <Text className="mb-2 text-xl font-bold text-font-black">
                        총 <Text className="text-main-color">{volunteerData?.body?.totalCount}</Text>건
                    </Text>
                }
                ListEmptyComponent={<EmptyComponents category={keyword ? keyword : category} />}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.2}
                ListFooterComponent={isFetchingMore ? <ActivityIndicator size={'large'} className="text-main-color" /> : null}
            />
        </>
    );
}
