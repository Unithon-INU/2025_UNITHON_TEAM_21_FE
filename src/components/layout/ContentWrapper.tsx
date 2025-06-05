import {ScrollView, Text, View} from 'react-native';
import ShowMoreButton from '../button/ShowMoreButton';

export function RowWrapper({title, children}: {title: string; children: React.ReactNode}) {
    return (
        <View className="flex flex-col gap-3 py-3">
            <Text className="text-xl font-semibold text-font-black">{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex flex-row gap-3">{children}</View>
            </ScrollView>
        </View>
    );
}

export function ColWrapper({title, children, morebutton, href}: {title: string; children: React.ReactNode; morebutton?: boolean; href?: string}) {
    return (
        <View className="flex flex-col gap-3 py-3">
            {morebutton ? (
                <View className="flex flex-row items-center justify-between">
                    <Text className="text-xl font-semibold text-font-black">{title}</Text>
                    <ShowMoreButton href={href} />
                </View>
            ) : (
                <Text className="text-xl font-semibold text-font-black">{title}</Text>
            )}

            <View className="flex flex-col gap-3">{children}</View>
        </View>
    );
}
