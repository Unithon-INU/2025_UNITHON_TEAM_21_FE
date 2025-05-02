import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Text, View} from 'react-native';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  home: (color: string, size: number) => <Foundation name="home" size={size} color={color} />,
  donate: (color: string, size: number) => <FontAwesome5 name="donate" size={size} color={color} />,
  chatting: (color: string, size: number) => <Ionicons name="chatbubbles" size={size} color={color} />,
  volunteer: (color: string, size: number) => <MatIcon name="account-group" size={size} color={color} />,
  account: (color: string, size: number) => <Ionicons name="person" size={size} color={color} />,
};

function SimpleScreen({label}: {label: string}) {
  return (
    <View className="items-center justify-center flex-1">
      <Text>{label}</Text>
    </View>
  );
}
export default function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({color, size}) => (TAB_ICONS[route.name as keyof typeof TAB_ICONS] ? TAB_ICONS[route.name as keyof typeof TAB_ICONS](color, size) : null),
        tabBarActiveTintColor: '#FFB257',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          paddingTop: 6,
          paddingBottom: 10,
          height: 70,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          fontFamily: 'System',
        },
      })}>
      <Tab.Screen name="home" options={{tabBarLabel: '홈'}} children={() => <SimpleScreen label="홈" />} />
      <Tab.Screen name="donate" options={{tabBarLabel: '기부하기'}} children={() => <SimpleScreen label="기부하기" />} />
      <Tab.Screen name="chatting" options={{tabBarLabel: '채팅'}} children={() => <SimpleScreen label="채팅" />} />
      <Tab.Screen name="volunteer" options={{tabBarLabel: '지역봉사'}} children={() => <SimpleScreen label="지역봉사" />} />
      <Tab.Screen name="account" options={{tabBarLabel: '내정보'}} children={() => <SimpleScreen label="내정보" />} />
    </Tab.Navigator>
  );
}
