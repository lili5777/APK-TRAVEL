import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';

function Password() {
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: '#FAEDCE', flex: 1}}>
      <ScrollView>
        {/* LOGO */}
        <View style={{paddingVertical: 30, marginTop: 60}}>
          <Image
            source={require('./../assets/logo.png')}
            style={{
              height: 150,
              aspectRatio: 2, // Menjaga aspek rasio gambar (1:1 untuk persegi)
              alignSelf: 'center',
            }}
          />
        </View>
        {/* LOGO */}

        {/* TITTLE */}
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{color: '#727D73', fontSize: 25}}>
            Gunakan Password Yang Kuat
          </Text>
        </View>
        {/* TITTLE */}
        {/* FORM */}
        <View
          style={{
            //   minHeight: 300,
            paddingHorizontal: 50,
            paddingVertical: 20,
            gap: 30,
            //   overflow: 'hidden',
          }}>
          {/* USERNAME */}
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#CCD5AE',
              borderRadius: 10,
              elevation: 5,
              shadowColor: 'grey',
              paddingHorizontal: 30,
            }}>
            <TextInput
              placeholder="Password Lama"
              placeholderTextColor={'#949494'}
              style={{
                height: 50,
                fontSize: 22,
                justifyContent: 'center',
                color: '#5A6C57',
              }}
            />
          </View>
          {/* USERNAME */}
          {/* PASSWORD */}
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#CCD5AE',
              borderRadius: 10,
              elevation: 5,
              shadowColor: 'grey',
              paddingHorizontal: 20,
            }}>
            <TextInput
              secureTextEntry={true}
              placeholder="Password Baru"
              placeholderTextColor={'#949494'}
              style={{
                height: 50,
                fontSize: 22,
                justifyContent: 'center',
                color: '#5A6C57',
              }}
            />
          </View>
          {/* PASSWORD */}
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#CCD5AE',
              borderRadius: 10,
              elevation: 5,
              shadowColor: 'grey',
              paddingHorizontal: 20,
            }}>
            <TextInput
              secureTextEntry={true}
              placeholder="Confirm Password"
              placeholderTextColor={'#949494'}
              style={{
                height: 50,
                fontSize: 22,
                justifyContent: 'center',
                color: '#5A6C57',
              }}
            />
          </View>
          {/* PASSWORD */}
          {/* PASSWORD */}
          <TouchableOpacity
            onPress={() => navigation.replace('Edit')}
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#727D73',
              borderRadius: 10,
              elevation: 5,
              shadowColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 22,
                color: 'white',
                fontSize: 25,
              }}>
              Simpan
            </Text>
          </TouchableOpacity>
          {/* PASSWORD */}
          {/* PASSWORD */}
        </View>
        {/* FORM */}
      </ScrollView>
    </View>
  );
}

export default Password;
