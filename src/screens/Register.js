import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AlertView from '../components/AlertView';
import db from '../../database';

function Register() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  function showAlert() {
    setAlertVisible(true);
  }
  // HANDLE REGISTER
  function handelRegister() {
    if (username.length === 0) {
      showAlert();
      setMessage('Username Tidak Boleh Kosong !');
      setType('error');
    } else if (password !== confirm) {
      showAlert();
      setMessage('Konfirmasi password tidak sesuai !');
      setType('error');
    } else {
      isUsernameAvailable(username, available => {
        if (available) {
          saveData({username, password});
        } else {
          showAlert();
          setMessage('Username Sudah Digunakan !');
          setType('error');
        }
      });
    }
  }
  // HANDLE REGISTER

  const isUsernameAvailable = (username, callback) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT COUNT(*) AS count FROM pengguna WHERE username = ?;',
        [username],
        (_, result) => {
          const count = result.rows.item(0).count;
          callback(count === 0); // Jika count = 0, berarti username tersedia
        },
        (_, error) => {
          console.error('Gagal mengecek username:', error);
          callback(false);
        },
      );
    });
  };

  // SIMPAN DATA REGISTER USER KE DATABASE
  function saveData(data) {
    console.log(data.username, data.password);

    setIsLoading(true);
    // const currentDate = new Date().toISOString();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO pengguna (username, password) VALUES (?, ?)',
        [data.username, data.password],
        () => {
          console.log('Data saved successfully!');
          setTimeout(() => {
            setIsLoading(false);
            showAlert();
            setMessage('Berhasil !');
            setType('success');
            navigation.navigate('Login');
          }, 1000);
        },
        error => {
          console.error('Error saving data:', error);
          setTimeout(() => {
            setIsLoading(false);
            showAlert();
            setMessage('Gagal !');
            setType('error');
          }, 1000);
        },
      );
    });
  }
  // SIMPAN DATA REGISTER USER KE DATABASE

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
              paddingHorizontal: 20,
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
              onChangeText={text => setConfirm(text)}
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
            disabled={isLoading}
            onPress={() => handelRegister()}
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
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={{
                  fontSize: 22,
                  color: 'white',
                  fontSize: 25,
                }}>
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
          {/* PASSWORD */}
          {/* PASSWORD */}

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: '#5A6C57', fontSize: 20}}>
              Have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={{color: '#727D73', fontSize: 20}}> Sign In.</Text>
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

export default Register;
