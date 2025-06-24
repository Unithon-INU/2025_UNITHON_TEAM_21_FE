import React, {useCallback} from 'react';
import {Text, FlatList, ActivityIndicator, View, TouchableOpacity, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {useVolunteerData} from '@/hook/api/useVolunteerData';
import {useNavigation} from '@react-navigation/native';

import Loading from '@/components/Loading';
import EmptyComponents from '../VolunteerCategory/components/EmptyCoponents';
import VolunteerItem from '../VolunteerCategory/components/VolunteerItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function VolunterrCategory() {
    const navigation = useNavigation() as any;
    const route = useRoute();
    const {category = '추천 봉사활동', iconKey = '', keyword = ''} = route.params as {category: string; iconKey: string; keyword: string};

    const {loading, volunteerData, items, loadMore, isFetchingMore, hasMore} = useVolunteerData(iconKey, keyword);

    const handleEndReached = useCallback(() => {
        if (hasMore && !isFetchingMore && !loading) {
            loadMore();
        }
    }, [hasMore, isFetchingMore, loading, loadMore]);

    if (loading) return <Loading />;

    return (
        <>
            <View className="flex flex-row items-center px-3 py-1 mb-4 border-b-2 border-main-color">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('@/assets/navi.png')} className="w-8 h-8" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 py-2.5 ml-2" onPress={() => navigation.navigate('searchScreen')}>
                    <Text className="text-base">{keyword}</Text>
                </TouchableOpacity>
                <Ionicons name="search-outline" size={20} color="#9A9A9A" />
            </View>
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
