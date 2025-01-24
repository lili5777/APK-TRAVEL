import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function Home() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          height: 30,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Details');
        }}>
        <Text>ke Details</Text>
      </TouchableOpacity>
    </View>
  );
}

function Destination() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          height: 30,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Text>ke Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

function Profile() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
    </View>
  );
}

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
      })}
      initialRouteName="Home">
      <Tab.Screen name="Destination" component={Destination} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyTabs" component={MyTabs} />
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
