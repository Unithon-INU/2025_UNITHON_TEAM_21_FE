import {Image, View} from 'react-native';

import {useUserRestore} from '@/hook/api/useKakaoInfo';
import {useCenter} from '@/hook/api/useCenter';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/store/store';
import {useEffect} from 'react';
import {fetchLocation} from '@/store/slice/locationSlice';

import Layout from '../../components/Layout';
import Loading from '@/components/Loading';
import SignupButton from './components/SignupButton';
import DonationComponents from './components/DonantionItem';
import CenterItem from './components/CenterItem';
import RecommendActivity from './components/RecommendVolunteer';
import TotalDonationAmount from './components/TotalDonationAmount';
import MonthlyDonationHeroList from './components/MonthlyDonationHeroList';
import FollowCenter from './components/FollowCenter';
import LikeVolunteer from './components/LikeVolunteer';

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    useUserRestore();
    useEffect(() => {
        dispatch(fetchLocation());
    }, [dispatch]);
    const {centerData, loading} = useCenter();

    if (loading) {
        return <Loading />;
    }
    return (
        <Layout>
            <View className="flex flex-row items-center justify-between">
                <Image className="w-[100px] h-[36px]" source={require('@/assets/logo.png')} />
                <SignupButton />
            </View>
            <TotalDonationAmount />
            <FollowCenter />
            <DonationComponents />
            <CenterItem data={centerData} />
            <RecommendActivity />
            <LikeVolunteer />
            <MonthlyDonationHeroList />
        </Layout>
    );
}
