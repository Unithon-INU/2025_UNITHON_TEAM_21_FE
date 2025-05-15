import {ScrollView, View} from 'react-native';

export default function Layout({children, className = ''}: {children: React.ReactNode; className?: string}) {
    return (
        <ScrollView>
            <View className={`flex flex-col gap-3 px-5 ${className}`}>{children}</View>
        </ScrollView>
    );
}
