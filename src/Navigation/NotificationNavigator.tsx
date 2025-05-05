// // src/Navigation/NotificationNavigator.tsx

// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import NotificationScreen from '@/pages/Notification';

// export type NotificationStackParamList = {
//   NotificationMain: undefined; // 알림 메인 화면
//   // 필요 시 이후에 더 추가 가능
// };

// const Stack = createNativeStackNavigator<NotificationStackParamList>();

// export default function NotificationNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="NotificationMain">
//       <Stack.Screen name="NotificationMain" component={NotificationScreen} />
//     </Stack.Navigator>
//   );
// }
