import {ColWrapper} from '@/components/layout/ContentWrapper';
import {Text, TouchableOpacity, View} from 'react-native';

import {useEffect, useState} from 'react';
import Papa from 'papaparse';
import RNFS from 'react-native-fs';

import {KakaoMapAddress} from '@/components/KakaoMap';
import {ChildrenCenterList} from '@/types/ChildrenCenter';
import {useNavigation} from '@react-navigation/native';

function Item({data}: {data: ChildrenCenterList}) {
    const daysLeft = Math.floor(Math.random() * 12) + 3; // 3~14 days
    const target = (Math.floor(Math.random() * 21) + 10) * 10000; // 100,000~300,000 KRW
    const current = (Math.floor(Math.random() * 41) + 10) * 10000; // 100,000~500,000 KRW
    const percent = Math.floor((current / target) * 100);
    const navigation = useNavigation() as any;

    return (
        <View className="flex flex-col gap-2">
            <View className="flex flex-row gap-2">
                <KakaoMapAddress className="relative w-[120px] h-[120px] bg-bg-gray rounded-xl" location={data.address} name={data.centerName}>
                    {/* 
                    {like ? (
                        <Ionicons name="heart" size={30} className="absolute bottom-2 right-2" color={'#FFB257'} onPress={() => setLike(false)} />
                    ) : (
                        <Ionicons name="heart-outline" size={30} className="absolute bottom-2 right-2" color={'#FFB257'} onPress={() => setLike(true)} />
                    )} 
                    */}
                </KakaoMapAddress>
                <TouchableOpacity className="flex justify-between flex-1" onPress={() => navigation.navigate('centerDetail', {id: data.id})}>
                    <View className="flex gap-1 py-2">
                        <Text className="text-xl font-semibold text-font-black">{data.centerName}</Text>
                        <Text className="text-sm font-semibold text-font-gray">{data.address}</Text>
                    </View>
                    <View className="flex gap-2">
                        <View className="flex flex-row items-baseline justify-between gap-1">
                            <View className="flex flex-row items-baseline gap-1">
                                <Text className="text-xl font-semibold text-main-color">{percent}%</Text>
                                <Text className="text-sm font-semibold text-font-gray">{target.toLocaleString()}원</Text>
                            </View>
                            <Text className="font-semibold text-font-black">{daysLeft}일 남음</Text>
                        </View>
                        <View className="w-full h-1 overflow-hidden rounded-full bg-bg-gray">
                            <View className="h-full bg-main-color" style={{width: `${Math.min(percent, 100)}%`}} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default function DonationItem() {
    const [data, setData] = useState<ChildrenCenterList[]>();
    useEffect(() => {
        const loadCSV = async () => {
            try {
                const content = await RNFS.readFileAssets('ChildrenCenterList.csv', 'utf8');
                const results = Papa.parse(content, {header: true});
                setData(results.data.slice(0, 3) as ChildrenCenterList[]);
            } catch (err) {
                console.error('Failed to read CSV:', err);
            }
        };
        loadCSV();
    }, []);
    return (
        <ColWrapper title="실시간 기부현황">
            {data?.map((item, index) => (
                <Item key={index} data={item} />
            ))}
        </ColWrapper>
    );
}
