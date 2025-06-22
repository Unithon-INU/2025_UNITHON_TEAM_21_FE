import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

import Layout from '@/components/Layout';
import DonationStatus from './components/DonationStatus';
import List from './components/List';

export default function UserInfo() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const {profile} = useSelector((state: any) => state.user);

    return (
        <Layout>
            <View className="flex flex-col justify-between py-4">
                <Text className="text-xl font-bold text-font-black">연수지역아동센터</Text>
            </View>
            <DonationStatus />
            <List />
        </Layout>
    );
}
