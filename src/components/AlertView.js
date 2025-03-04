import React, {useRef, useState} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';

const AlertView = ({message, visible, onHide, type = 'error'}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      // Animasi fade-in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Timer untuk menghilangkan alert
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(onHide);
      }, 3000); // 3 detik

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.alertBox,
        {
          opacity: fadeAnim,
          backgroundColor: type === 'error' ? '#780C28' : '#5B913B',
        },
      ]}>
      <Text style={styles.alertText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertBox: {
    position: 'absolute',
    bottom: 100,

    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AlertView;
