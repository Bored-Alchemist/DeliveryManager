import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// importing screens
import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import Splash from '../screens/Splash';
import Dashboard from '../screens/Dashboard';
import Wallet from '../screens/Wallet';
import Companies from '../screens/Companies';
import Vendors from '../screens/Vendors';
import Cafeteria from '../screens/Cafeteria';
import Checklist from '../screens/Checklist';
import Cafelist from '../screens/Cafelist';
import Profile from '../screens/Profile';

const UiStack = createStackNavigator();
const UiNavigator = ({ navigation,isLoggedIn }) => isLoggedIn ? (
        <UiStack.Navigator headerMode='none'>
            <UiStack.Screen name='Dashboard' component={Dashboard} />
        {/* <UiStack.Screen name='Splash' component={Splash} /> */}
        <UiStack.Screen name='Home' component={Home} />
        <UiStack.Screen name='Login' component={Login} />
        <UiStack.Screen name='Register' component={SignUp} />
        <UiStack.Screen name='ForgotPassword' component={ForgotPassword} />
        <UiStack.Screen name='Cafelist' component={Cafelist} />
        <UiStack.Screen name='Wallet' component={Wallet} />
        <UiStack.Screen name='Companies' component={Companies} />
        <UiStack.Screen name='Vendors' component={Vendors} />
        <UiStack.Screen name='Cafeteria' component={Cafeteria} />
        <UiStack.Screen name='Checklist' component={Checklist} />
        <UiStack.Screen name='Profile' component={Profile} />
    </UiStack.Navigator>
) : (
    <UiStack.Navigator headerMode='none'>
        {/* <UiStack.Screen name='Splash' component={Splash} /> */}
        <UiStack.Screen name='Home' component={Home} />
        <UiStack.Screen name='Login' component={Login} />
        <UiStack.Screen name='Register' component={SignUp} />
        <UiStack.Screen name='ForgotPassword' component={ForgotPassword} />
        <UiStack.Screen name='Cafelist' component={Cafelist} />
        <UiStack.Screen name='Dashboard' component={Dashboard} />
        <UiStack.Screen name='Wallet' component={Wallet} />
        <UiStack.Screen name='Companies' component={Companies} />
        <UiStack.Screen name='Vendors' component={Vendors} />
        <UiStack.Screen name='Cafeteria' component={Cafeteria} />
        <UiStack.Screen name='Checklist' component={Checklist} />
        <UiStack.Screen name='Profile' component={Profile} />
        </UiStack.Navigator>
);

const Navigation = ({isLoggedIn}) => (
    <NavigationContainer>
        <UiNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
    )
    
  
    
    export default Navigation