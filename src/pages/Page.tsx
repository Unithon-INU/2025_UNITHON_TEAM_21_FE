import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import usePermission from '@/hook/usePermission';
import {useUserRestore} from '@/hook/api/useKakaoInfo';
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

import UserInfo from './User';
import UserLikedcenter from './User/components/Likedcenter';
import UserLikedvol from './User/components/Likedvol';
import UserDonate from './User/components/Donate';
import Edituser from './User/components/Edituser';

import Remittance from './Donation/Remittance';
import RemittanceCheck from './Donation/RemittanceCheck';
import RemittanceComplete from './Donation/RemittanceComplete';
import HeroListDetail from './Home/Ranking';
import Login from './Home/Login';
import SearchScreen from './Volunteer/SearchScreen';

import IDSignup from './Home/IDSignup';
import CenterList from './Center/CenterList';
import SerachResult from './Volunteer/SerachResult';
import Permission from './Permission';
import Loading from '@/components/Loading';
import CenterHome from './Center/CenterHome';
import CenterDonationAll from './Center/CenterHome/CenterDonationAll';
import RealTimeDonation from './Home/RealTimeDonation';

import CenterSearchScreen from './Home/CenterSearchScreen';
import CenterSearchResult from './Home/CenterSerachResult';
import CenterSignup from './Home/CenterSignup';
import DonationCheck from './Donation/DonationCheck';

const TAB_ICONS = {
    home: (color: string, size: number) => <Foundation name="home" size={size} color={color} />,
    chatting: (color: string, size: number) => <Ionicons name="chatbubbles" size={size} color={color} />,
    volunteer: (color: string, size: number) => <MatIcon name="account-group" size={size} color={color} />,
    userInfo: (color: string, size: number) => <Ionicons name="person" size={size} color={color} />,
    centerHome: (color: string, size: number) => <Ionicons name="person" size={size} color={color} />,
};

function NavBar() {
    const Tab = createBottomTabNavigator();
    const {profile} = useSelector((state: RootState) => state.user);
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
            {profile?.userRole === 1 ? (
                <Tab.Screen name="centerHome" options={{tabBarLabel: '센터관리'}} component={CenterHome} />
            ) : (
                <Tab.Screen name="userInfo" options={{tabBarLabel: '내정보'}} component={UserInfo} />
            )}
        </Tab.Navigator>
    );
}

export default function Pages() {
    useUserRestore();
    const Stack = createStackNavigator();
    const {loading, initialRouteName} = usePermission();

    if (loading) return <Loading />;

    return (
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{headerShown: false}}>
            {/* 권한 요청 */}
            <Stack.Screen name="permission" component={Permission} />
            {/* 홈 */}
            <Stack.Screen name="main" component={NavBar} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="heroListDetail" component={HeroListDetail} />
            <Stack.Screen name="idSignup" component={IDSignup} />
            <Stack.Screen name="centerSignup" component={CenterSignup} />
            <Stack.Screen name="realTimeDonation" component={RealTimeDonation} />
            <Stack.Screen name="centerSearchScreen" component={CenterSearchScreen} options={{animation: 'none'}} />
            <Stack.Screen name="centerSerachResult" component={CenterSearchResult} />

            {/* 채팅 */}
            <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="centerList" component={CenterList} />
            <Stack.Screen name="ChatList" component={ChatListScreen} />

            {/* 지역봉사 */}
            <Stack.Screen name="volunteerCategory" component={VolunteerCategory} />
            <Stack.Screen name="volunteerDetail" component={VolunterrDetail} />
            <Stack.Screen name="chatbot" component={Chatbot} />
            <Stack.Screen name="centerDetail" component={CenterDetail} />
            <Stack.Screen name="searchScreen" component={SearchScreen} options={{animation: 'none'}} />
            <Stack.Screen name="searchResult" component={SerachResult} />

            {/* 내 정보 */}
            <Stack.Screen name="Userlikedcenter" component={UserLikedcenter} />
            <Stack.Screen name="Userlikedvol" component={UserLikedvol} />
            <Stack.Screen name="Userdonate" component={UserDonate} />
            <Stack.Screen name="Edituser" component={Edituser} />
            <Stack.Screen name="UserInfo" component={UserInfo} />

            {/* 기부 */}
            <Stack.Screen name="donationCheck" component={DonationCheck} />
            <Stack.Screen name="remittance" component={Remittance} />
            <Stack.Screen name="remittanceCheck" component={RemittanceCheck} />
            <Stack.Screen name="remittanceComplete" component={RemittanceComplete} />

            {/* 아동센터 페이지 */}
            <Stack.Screen name="CenterDonationAll" component={CenterDonationAll} />
        </Stack.Navigator>
    );
}
