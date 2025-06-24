import {Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {ColWrapper} from '@/components/layout/ContentWrapper';
import {KakaoMapAddress} from '@/components/KakaoMap';
import {ChildrenCenterList} from '@/types/ChildrenCenter';
import {useCenterTotalDonation} from '@/hook/api/useDonation';
import {daysLeft} from '@/utils/formatDate';

function Item({data}: {data: ChildrenCenterList}) {
    const {total, loading: TotalLoading} = useCenterTotalDonation(Number(data.id));
    const target = 100000;
    const percent = Math.floor((total.totalAmount / target) * 100);
    const navigation = useNavigation() as any;
    if (TotalLoading) return null;

    return (
        <View className="flex flex-col gap-2">
            <View className="flex flex-row gap-2">
                <KakaoMapAddress className="relative w-[120px] h-[120px] bg-bg-gray rounded-xl" location={data.address} name={data.centerName} />
                <TouchableOpacity className="flex flex-1 justify-between" onPress={() => navigation.navigate('centerDetail', {id: data.id})}>
                    <View className="flex gap-1 py-2">
                        <Text className="text-base font-semibold text-font-black">{data.centerName}</Text>
                        <Text className="text-sm font-semibold text-font-gray">{data.address}</Text>
                    </View>
                    <View className="flex gap-2">
                        <View className="flex flex-row gap-1 justify-between items-baseline">
                            <View className="flex flex-row gap-1 items-baseline">
                                <Text className="text-lg font-semibold text-main-color">{percent}%</Text>
                                <Text className="text-sm font-semibold text-font-gray">{target.toLocaleString()}원</Text>
                            </View>
                            <Text className="text-sm font-semibold text-font-black">{daysLeft()}일 남음</Text>
                        </View>
                        <View className="overflow-hidden w-full h-1 rounded-full bg-bg-gray">
                            <View className="h-full bg-main-color" style={{width: `${Math.min(percent, 100)}%`}} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default function DonationItem({items}: {items: ChildrenCenterList[]}) {
    if (!items) return null;

    return (
        <ColWrapper title="실시간 기부현황" href="realTimeDonation">
            {items.slice(0, 3)?.map((item, index) => (
                <Item key={index} data={item} />
            ))}
        </ColWrapper>
    );
}
