import {View, Text} from 'react-native';

import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {useInquiryCenter} from '@/hook/api/useCenter';
import {useInquiryDonation} from '@/hook/api/useDonation';
import {useGetItemDonation} from '@/hook/api/useItemDonation';

import Layout from '@/components/Layout';
import DonationStatus from './components/DonationStatus';
import List from './components/List';
import Waiting from './components/Waiting';
import Loading from '@/components/Loading';
import AllDonation from './components/AllDonation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function UserInfo() {
    const {profile} = useSelector((state: RootState) => state.user);
    const {item: centerItem, loading: centerLoading} = useInquiryCenter(profile?.id ?? -1);
    const {items, loading: InquiryLoading, fetchDonations} = useInquiryDonation(profile?.id ?? -1);
    const {items: donationItem, loading: itemsLoading, refetch} = useGetItemDonation(profile?.id ?? -1);
    // const {total, loading: TotalLoading} = useCenterTotalDonation(profile?.id ?? 0);

    const handleRefresh = () => fetchDonations();
    const handleRefetch = () => refetch();

    if (InquiryLoading || itemsLoading || centerLoading) return <Loading />;

    if (!centerItem)
        return (
            <View className="flex flex-col gap-3 justify-center items-center h-full">
                <MaterialIcons name="error" color={'#FFB257'} size={100} />
                <Text className="text-xl font-semibold text-center text-font-black">센터정보를 불러올 수 없습니다.</Text>
            </View>
        );

    return (
        <Layout>
            <View className="flex flex-col justify-between py-4">
                <Text className="text-xl font-bold text-font-black">{centerItem.name}</Text>
            </View>

            <DonationStatus total={centerItem.totalReceivedAmount} />
            <List centerId={centerItem.id} items={donationItem} onRefresh={handleRefetch} />
            <Waiting items={items} onRefresh={handleRefresh} />
            <AllDonation items={items} />
        </Layout>
    );
}
