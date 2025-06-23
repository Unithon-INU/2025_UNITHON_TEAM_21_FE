import {View, Text} from 'react-native';
import {useCallback} from 'react';

import {useInquiryDonation, useCenterTotalDonation} from '@/hook/api/useDonation';

import Layout from '@/components/Layout';
import DonationStatus from './components/DonationStatus';
import List from './components/List';
import Waiting from './components/Waiting';
import Loading from '@/components/Loading';
import AllDonation from './components/AllDonation';

export default function UserInfo() {
    const id = 1;

    const {items, loading: InquiryLoading, fetchDonations} = useInquiryDonation(id);
    const {total, loading: TotalLoading} = useCenterTotalDonation(id);

    const handleRefresh = useCallback(() => {
        fetchDonations();
    }, [fetchDonations]);

    if (InquiryLoading || TotalLoading) return <Loading />;

    return (
        <Layout>
            <View className="flex flex-col justify-between py-4">
                <Text className="text-xl font-bold text-font-black">연수지역아동센터</Text>
            </View>

            <DonationStatus total={total} />
            <List />
            <Waiting items={items} onRefresh={handleRefresh} />
            <AllDonation items={items} />
        </Layout>
    );
}
