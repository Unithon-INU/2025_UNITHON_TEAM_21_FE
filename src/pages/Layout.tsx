import {View} from 'react-native';

export default function Layout({children, className = ''}: {children: React.ReactNode; className?: string}) {
    return <View className={`flex flex-col gap-3 p-5 ${className}`}>{children}</View>;
}
