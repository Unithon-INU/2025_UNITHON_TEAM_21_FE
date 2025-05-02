import {NavigationContainer} from '@react-navigation/native';
import './global.css';
import NavBar from '@/pages/NavBar';

export default function App() {
  return (
    <NavigationContainer>
      <NavBar />
    </NavigationContainer>
  );
}
