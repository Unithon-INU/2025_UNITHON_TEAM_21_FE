import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from './Home';
import ChatListScreen from './Chatting/ChatList';
import Signup from './Signup';
import UserInformation from './UserInformation';

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
function NavBar() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarIcon: ({color, size}) =>
                    TAB_ICONS[route.name as keyof typeof TAB_ICONS] ? TAB_ICONS[route.name as keyof typeof TAB_ICONS](color, size) : null,
                tabBarActiveTintColor: '#FFB257',
                tabBarInactiveTintColor: '#999999',
                tabBarStyle: {
                    paddingTop: 6,
                    paddingBottom: 10,
                    height: 75,
                    backgroundColor: 'white',
                    borderTopWidth: 0.5,
                    borderTopColor: '#D5D5D5',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'semibold',
                    fontFamily: 'System',
                },
            })}>
            <Tab.Screen name="home" options={{tabBarLabel: '홈'}} children={Home} />
            <Tab.Screen name="donate" options={{tabBarLabel: '기부하기'}} children={() => <SimpleScreen label="기부하기" />} />
            <Tab.Screen name="chatting" options={{tabBarLabel: '채팅'}} children={ChatListScreen} />
            <Tab.Screen name="volunteer" options={{tabBarLabel: '지역봉사'}} children={() => <SimpleScreen label="지역봉사" />} />
            <Tab.Screen name="account" options={{tabBarLabel: '내정보'}} children={UserInformation} />
        </Tab.Navigator>
    );
}

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
    },
};
export default function Pages() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName={'main'} screenOptions={{headerShown: false}}>
                <Stack.Screen name="main" component={NavBar} />
                <Stack.Screen name="signup" component={Signup} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
