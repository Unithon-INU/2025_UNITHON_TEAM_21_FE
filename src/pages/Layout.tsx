import {View} from 'react-native';

export default function Layout({children}: {children: React.ReactNode}) {
  return <View className="flex flex-col gap-3 p-5">{children}</View>;
}
