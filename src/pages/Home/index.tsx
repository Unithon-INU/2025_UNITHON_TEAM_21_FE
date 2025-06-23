import {Image, View} from 'react-native';

import {useCenter} from '@/hook/api/useCenter';
import {useVolunteerData} from '@/hook/api/useVolunteerData';

import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import SignupButton from './components/SignupButton';
import DonationComponents from './components/DonantionItem';
import CenterItem from './components/CenterItem';
import RecommendActivity from './components/RecommendVolunteer';
import TotalDonationAmount from './components/TotalDonationAmount';
import MonthlyDonationHeroList from './components/MonthlyDonationHeroList';
import FollowCenter from './components/FollowCenter';
import LikeVolunteer from './components/LikeVolunteer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {useEffect} from 'react';
import {fetchLocation} from '@/store/slice/locationSlice';

export default function Home() {
    const locationLoading = useSelector((state: RootState) => state.location.loading);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchLocation());
    }, [dispatch]);
    const {centerData, loading} = useCenter();
    const {items: recommendItems, loading: recommendLoading} = useVolunteerData('0400');

    if (loading || recommendLoading || locationLoading === 'pending') {
        return <Loading />;
    }

    return (
        <Layout>
            <View className="flex flex-row justify-between items-center">
                <Image className="w-[100px] h-[36px]" source={require('@/assets/logo.png')} />
                <SignupButton />
            </View>
            <TotalDonationAmount />
            <FollowCenter />
            <CenterItem items={centerData} />
            <DonationComponents items={centerData} />
            <RecommendActivity items={recommendItems} />
            <LikeVolunteer />
            <MonthlyDonationHeroList />
        </Layout>
    );
}
