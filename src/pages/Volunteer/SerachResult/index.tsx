import React, {useCallback} from 'react';
import {Text, FlatList, ActivityIndicator} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import {useVolunteerData} from '@/hook/api/useVolunteerData';

import Loading from '@/components/Loading';
import EmptyComponents from '../VolunteerCategory/components/EmptyCoponents';
import VolunteerItem from '../VolunteerCategory/components/VolunteerItem';
import Header from './components/Header';

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
            <Header text={keyword} />
            <FlatList
                className="px-5 bg-white"
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
