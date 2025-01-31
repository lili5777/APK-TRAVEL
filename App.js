import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Destination from './src/screens/Destination';
import Profile from './src/screens/Profile';
import Login from './src/screens/Login';
import Daftar from './src/screens/Daftar';
import Register from './src/screens/Register';
import Diary from './src/screens/Diary';
import Details from './src/screens/Details';
import Edit from './src/screens/Edit';
import Password from './src/screens/Password';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('./src/assets/home.png');
          } else if (route.name === 'Destination') {
            iconSource = require('./src/assets/maps.png');
          } else if (route.name === 'Profile') {
            iconSource = require('./src/assets/user.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: color,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarActiveTintColor: '#727D73',
        tabBarInactiveTintColor: '#b3ba9e',
        tabBarStyle: {
          backgroundColor: '#FFF9F0',
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false,
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Destination" component={Destination} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Daftar" component={Daftar} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Diary" component={Diary} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="Password" component={Password} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
