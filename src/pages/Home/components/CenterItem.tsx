import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Papa from 'papaparse';
import RNFS from 'react-native-fs';

import {RowWrapper} from '@/components/layout/ContentWrapper';
import {ChildrenCenterList} from '@/types/ChildrenCenter';

function Item({data}: {data: ChildrenCenterList}) {
    const navigation = useNavigation() as any;
    return (
        <TouchableOpacity className="flex flex-row" onPress={() => navigation.navigate('centerDetail', {id: data.id})}>
            <View className="flex flex-col gap-1 px-2 py-3 bg-main-color rounded-2xl">
                <Text className="text-base font-semibold text-white">{data.centerName}</Text>
                <Text className="text-xs font-semibold text-white">{data.address}</Text>
                <Text className="text-xs font-semibold text-white">{data.phoneNumber}</Text>
                <Text className="text-xs font-semibold text-white">아동 수 : {data.chidrenNumber}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function CenterItem() {
    const [data, setData] = useState<ChildrenCenterList[]>();
    useEffect(() => {
        const loadCSV = async () => {
            try {
                const content = await RNFS.readFileAssets('ChildrenCenterList.csv', 'utf8');
                const results = Papa.parse(content, {header: true});
                setData(results.data as ChildrenCenterList[]);
            } catch (err) {
                console.error('Failed to read CSV:', err);
            }
        };
        loadCSV();
    }, []);
    return (
        <RowWrapper title="인천 지역아동센터">
            {data?.map((item, index) => (
                <Item key={index} data={item} />
            ))}
        </RowWrapper>
    );
}
