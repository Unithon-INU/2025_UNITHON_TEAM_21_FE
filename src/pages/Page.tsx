import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from './Home';
import Signup from './Home/Signup';

import ChatListScreen from './Chatting/ChatList';
import ChatRoomScreen from './Chatting/ChatRoom';
import NotificationScreen from './Notification';

import VolunteerCategory from './Volunteer/VolunteerCategory';
import VolunterrDetail from './Volunteer/VolunterrDetail';
import Volunteer from './Volunteer';
import Chatbot from './Volunteer/Chatbot';
import CenterDetail from './Center/CenterDetail';

import UserInfo from './User/Info';
import UserLikedcenter from './User/Likedcenter';
import UserLikedvol from './User/Likedvol';
import UserDonate from './User/Donate';
import Edituser from './User/Edituser';

import Remittance from './Center/CenterDetail/Remittance';
import RemittanceCheck from './Center/CenterDetail/RemittanceCheck';
import RemittanceComplete from './Center/CenterDetail/RemittanceComplete';
import HeroListDetail from './Home/components/HeroListDetail';
import Login from './Home/Login';
import SearchScreen from './Volunteer/SearchScreen';
import IDLogin from './Home/IDLogin';
import IDSignup from './Home/IDSignup';
import CenterList from './Center/CenterList';

const TAB_ICONS = {
    home: (color: string, size: number) => <Foundation name="home" size={size} color={color} />,
    donate: (color: string, size: number) => <FontAwesome5 name="donate" size={size} color={color} />,
    chatting: (color: string, size: number) => <Ionicons name="chatbubbles" size={size} color={color} />,
    volunteer: (color: string, size: number) => <MatIcon name="account-group" size={size} color={color} />,
    account: (color: string, size: number) => <Ionicons name="person" size={size} color={color} />,
};

function NavBar() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarIcon: ({color, size}) => TAB_ICONS[route.name as keyof typeof TAB_ICONS]?.(color, size),
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
            <Tab.Screen name="home" options={{tabBarLabel: '홈'}} component={Home} />
            <Tab.Screen name="chatting" options={{tabBarLabel: '채팅'}} component={ChatListScreen} />
            <Tab.Screen name="volunteer" options={{tabBarLabel: '지역봉사'}} component={Volunteer} />
            <Tab.Screen name="account" options={{tabBarLabel: '내정보'}} component={UserInfo} />
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
                {/* 홈 */}
                <Stack.Screen name="main" component={NavBar} />
                <Stack.Screen name="signup" component={Signup} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="idlogin" component={IDLogin} />
                <Stack.Screen name="heroListDetail" component={HeroListDetail} />
                <Stack.Screen name="idSignup" component={IDSignup} />

                {/* 채팅 */}
                <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
                <Stack.Screen name="Notification" component={NotificationScreen} />
                <Stack.Screen name="centerList" component={CenterList} />

                {/* 지역봉사 */}
                <Stack.Screen name="volunteerCategory" component={VolunteerCategory} />
                <Stack.Screen name="volunteerDetail" component={VolunterrDetail} />
                <Stack.Screen name="chatbot" component={Chatbot} />
                <Stack.Screen name="centerDetail" component={CenterDetail} />
                <Stack.Screen name="searchScreen" component={SearchScreen} options={{animation: 'none'}} />

                {/* 내 정보 */}
                <Stack.Screen name="Userlikedcenter" component={UserLikedcenter} />
                <Stack.Screen name="Userlikedvol" component={UserLikedvol} />
                <Stack.Screen name="Userdonate" component={UserDonate} />
                <Stack.Screen name="Edituser" component={Edituser} />
                <Stack.Screen name="UserInfo" component={UserInfo} />

                {/* 기부 */}
                <Stack.Screen name="remittance" component={Remittance} />
                <Stack.Screen name="remittanceCheck" component={RemittanceCheck} />
                <Stack.Screen name="remittanceComplete" component={RemittanceComplete} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
