import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef} from 'react';
import {Text, View, Animated} from 'react-native';

function SplashScreen({navigation}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const checkUserId = async () => {
    navigation.replace('MyTabs');
  };

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1.5, // Membesar 1.5 kali lipat
      duration: 2000, // Sama dengan durasi splash screen
      useNativeDriver: true,
    }).start(() => {
      checkUserId();
    });
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAEDCE'}}>
      <Animated.Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: '#5A6C57',
          textAlign: 'center',
          transform: [{scale: scaleAnim}],
        }}>
        Where<Text style={{color: '#CCD5AE'}}>Next</Text>
      </Animated.Text>
    </View>
  );
}

export default SplashScreen;