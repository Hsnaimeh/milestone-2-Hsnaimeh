import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createNativeStackNavigator} from '@react-navigation/native-stack';


// Screens
import HomeScreen from './home/HomeScreen';
import SettingsScreen from './settings/SettingsScreen';
import WelcomeScreen from "./intro/WelcomeScreen";
import DetailsPatientScreen from "./patients/details/DetailsPatient";
import AddPatientScreen from "./patients/add/AddPatientScreen";
import PatientsScreen from "./patients/main/PatientsScreen";

//Screen names
const homeName = "Home";
const patientsName = "Patients";
const settingsName = "Setting";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={
            {
                tabBarShowLabel: false,
                headerShown: false
            }
        }>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        </Stack.Navigator>
    );
};


const PatientsStack = () => {
    return (
        <Stack.Navigator screenOptions={
            {
                tabBarShowLabel: false,
                headerShown: false
            }
        }>
            <Stack.Screen name="PatientsScreen" component={PatientsScreen}/>
            <Stack.Screen name="PatientDetails" component={DetailsPatientScreen}/>
            <Stack.Screen name="AddPatient" component={AddPatientScreen}/>
            {/*<Stack.Screen name="UpdatePatient" component={DetailsPatientScreen}/>*/}
            {/*<Stack.Screen name="AddRecord" component={DetailsPatientScreen}/>*/}
            {/*<Stack.Screen name="UpdateRecord" component={DetailsPatientScreen}/>*/}
        </Stack.Navigator>
    );
};

function MainContainer() {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    activeTintColor: 'blue',
                    inactiveTintColor: 'grey',
                    labelStyle: {paddingBottom: 10, fontSize: 10},
                    style: {padding: 10, height: 70},
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';

                        } else if (rn === patientsName) {
                            iconName = focused ? 'list' : 'people';

                        } else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}>

                <Tab.Screen name={homeName} component={HomeStack}/>
                <Tab.Screen name={patientsName} component={PatientsStack}/>
                <Tab.Screen name={settingsName} component={SettingsScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;