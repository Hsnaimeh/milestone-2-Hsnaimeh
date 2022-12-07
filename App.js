import * as React from 'react';
import MainContainer from './app/ui/MainContainer';
import LoginScreen from './app/ui/auth/login/LoginScreen';
import RegisterScreen from './app/ui/auth/register/RegisterScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={
            {
                tabBarShowLabel: false,
                headerShown: false
            }
        }>
            <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login'}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Register'}}/>
        </Stack.Navigator>
    );
};

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="AuthStack"
                    component={AuthStack}
                />
                <Stack.Screen
                    name="MainStack"
                    component={MainContainer}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default App;