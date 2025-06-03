import {ScrollView, View} from 'react-native';

export default function Layout({children, className = ''}: {children: React.ReactNode; className?: string}) {
    return (
        <ScrollView>
            <View className={`${className} flex flex-col gap-3 px-5`}>{children}</View>
        </ScrollView>
    );
}
