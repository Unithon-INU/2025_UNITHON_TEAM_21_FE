import React from 'react';
import {Text, View} from 'react-native';
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
import CenterDetail from './CenterDetail';

import UserInfo from './User/Info';
import UserLikedcenter from './User/Likedcenter';
import UserLikedvol from './User/Likedvol';
import UserDonate from './User/Donate';

import Remittance from './CenterDetail/Remittance';
import RemittanceCheck from './CenterDetail/RemittanceCheck';
import RemittanceComplete from './CenterDetail/RemittanceComplete';
import DonatePage from './Donation';

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
        <>
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
                <Tab.Screen name="home" options={{tabBarLabel: 'Home'}} children={Home} />
                <Tab.Screen name="donate" options={{tabBarLabel: 'Donate'}} children={DonatePage} />
                <Tab.Screen name="chatting" options={{tabBarLabel: 'Chatting'}} children={ChatListScreen} />
                <Tab.Screen name="volunteer" options={{tabBarLabel: 'Voluunteer'}} children={Volunteer} />
                <Tab.Screen name="account" options={{tabBarLabel: 'My'}} children={UserInfo} />
            </Tab.Navigator>
        </>
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
                <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
                <Stack.Screen name="Notification" component={NotificationScreen} />
                <Stack.Screen name="volunteerCategory" component={VolunteerCategory} />
                <Stack.Screen name="volunteerDetail" component={VolunterrDetail} />
                <Stack.Screen name="chatbot" component={Chatbot} />
                <Stack.Screen name="centerDetail" component={CenterDetail} />
                <Stack.Screen name="Userlikedcenter" component={UserLikedcenter} />
                <Stack.Screen name="Userlikedvol" component={UserLikedvol} />
                <Stack.Screen name="Userdonate" component={UserDonate} />

                <Stack.Screen name="remittance" component={Remittance} />
                <Stack.Screen name="remittanceCheck" component={RemittanceCheck} />
                <Stack.Screen name="remittanceComplete" component={RemittanceComplete} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
