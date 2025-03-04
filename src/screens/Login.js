import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import SQLite from 'react-native-sqlite-storage';
import db from '../../database';
import AlertView from '../components/AlertView';

function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  function showAlert() {
    setAlertVisible(true);
  }
  // HANDLE Login
  function handelLogin() {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM pengguna WHERE username = ? AND password = ?`, // Hapus LIMIT dan OFFSET
        [username, password],
        (_, results) => {
          const rows = results.rows.raw();
          if (rows.length === 0) {
            console.log('gagal masuk');
            showAlert();
            setMessage('Gagal !');
            setType('error');
          } else {
            console.log('berhasil masuk');
            navigation.replace('MyTabs');
          }
        },
        error => {
          console.error('Error fetching data:', error);
        },
      );
    });
  }
  // HANDLE Login

  return (
    <View style={{backgroundColor: '#FAEDCE', flex: 1}}>
      {/* LOGO */}
      <ScrollView>
        <View style={{paddingVertical: 30, marginTop: 110}}>
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
            Login To Your Account
          </Text>
        </View>
        {/* TITTLE */}
        {/* FORM */}
        <View
          style={{
            //   minHeight: 300,
            paddingHorizontal: 35,
            paddingVertical: 20,
            gap: 10,
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
              onChangeText={text => setUsername(text)}
              placeholder="Username"
              placeholderTextColor={'#949494'}
              style={{
                height: 50,
                fontSize: 22,
                justifyContent: 'center',
                color: '#5A6C57',
                paddingHorizontal: -100,
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
              paddingHorizontal: 25,
            }}>
            <TextInput
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
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
            onPress={() => handelLogin()}
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
              Sign In
            </Text>
          </TouchableOpacity>
          {/* PASSWORD */}
          {/* BELUM PUNYA AKUN */}
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: '#5A6C57', fontSize: 20}}>
              Don’t have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{color: '#727D73', fontSize: 20}}> Sign up.</Text>
            </TouchableOpacity>
          </View>
          {/* BELUM PUNYA AKUN */}
        </View>
        {/* FORM */}
      </ScrollView>
      <AlertView
        message={message}
        visible={alertVisible}
        onHide={() => setAlertVisible(false)}
        type={type}
      />
    </View>
  );
}

export default Login;
