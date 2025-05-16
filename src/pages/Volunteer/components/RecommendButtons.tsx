import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const iconMap: {[key: string]: any} = {
    '0100': require('@/assets/buttonIcons/0100.png'),
    '0200': require('@/assets/buttonIcons/0200.png'),
    '0300': require('@/assets/buttonIcons/0300.png'),
    '0400': require('@/assets/buttonIcons/0400.png'),
    '0500': require('@/assets/buttonIcons/0500.png'),
    '0600': require('@/assets/buttonIcons/0600.png'),
    '0700': require('@/assets/buttonIcons/0700.png'),
    '0800': require('@/assets/buttonIcons/0800.png'),
    '0900': require('@/assets/buttonIcons/0900.png'),
    '1000': require('@/assets/buttonIcons/1000.png'),
    '1100': require('@/assets/buttonIcons/1100.png'),
    '1200': require('@/assets/buttonIcons/1200.png'),
    '1300': require('@/assets/buttonIcons/1300.png'),
    '1500': require('@/assets/buttonIcons/1500.png'),
    '1700': require('@/assets/buttonIcons/1700.png'),
};

const buttonData = [
    {title: 'Daily Convenience', iconKey: '0100'},
    {title: 'Housing & Environment', iconKey: '0200'},
    {title: 'Counseling & Mentoring', iconKey: '0300'},
    {title: 'Education', iconKey: '0400'},
    {title: 'Health & Medical', iconKey: '0500'},
    {title: 'Rural Volunteering', iconKey: '0600'},
    {title: 'Culture, Sports & Tourism', iconKey: '0700'},
    {title: 'Environment & Ecosystem', iconKey: '0800'},
    {title: 'Administrative Support', iconKey: '0900'},
    {title: 'Safety & Protection', iconKey: '1000'},
    {title: 'Human Rights & Public Good', iconKey: '1100'},
    {title: 'Disaster & Emergency Relief', iconKey: '1200'},
    {title: 'International Cooperation', iconKey: '1300'},
    {title: 'Other', iconKey: '1500'},
    {title: 'Basic Volunteer Education', iconKey: '1700'},
];

function Button({title, iconKey}: {title: string; iconKey: string}) {
    const navigation = useNavigation() as any;
    const handlePress = () => {
        navigation.navigate('volunteerCategory', {category: title, iconKey});
    };

    return (
        <TouchableOpacity className="flex items-center" onPress={handlePress}>
            <View className="items-center justify-center w-12 h-12 rounded-xl bg-bg-gray my-0.0500">
                <Image className="w-8 h-8" source={iconMap[iconKey]} />
            </View>
            <Text className="w-16 text-xs text-center mt-0.5">{title}</Text>
        </TouchableOpacity>
    );
}

export default function RecommendButtons() {
    const rows = [0, 1, 2].map(row => buttonData.slice(row * 5, row * 5 + 5));
    return (
        <>
            <Text className="text-xl font-semibold text-font-black">Volunteer Categories</Text>
            {rows.map((row, i) => (
                <View key={i} className="flex flex-row justify-between py-1">
                    {row.map(btn => (
                        <Button key={btn.iconKey} title={btn.title} iconKey={btn.iconKey} />
                    ))}
                </View>
            ))}
        </>
    );
}
