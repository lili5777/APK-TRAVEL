import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import db from '../../database';

function Edit() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [nama, setNama] = useState('');
  const [tgl_lahir, setTgl_lahir] = useState('');
  const [contact, setContact] = useState('');
  const [social_media, setSocial_media] = useState('');

  const [isLoading, setIsLoading] = useState('');

  const getUsers = setUsername => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM pengguna;',
        [],
        (_, {rows}) => {
          let data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          setUsers(data);
        },
        (_, error) => console.log('Gagal mengambil data', error),
      );
    });
  };

  useEffect(() => {
    getUsers();
  } );

  //hanldle Edit
  function HandleEdit() {
    saveData({username, bio, nama, tgl_lahir, contact, social_media});
  }
  //hanldle Edit

  // SIMPAN DATA REGISTER USER KE DATABASE
  function saveData(data) {
    console.log(
      data.username,
      data.bio,
      data.nama,
      data.tgl_lahir,
      data.contact,
      data.social_media,
    );

    setIsLoading(true);
    // const currentDate = new Date().toISOString();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO pengguna (username, bio, nama, tgl_lahir, contact, socia_media) VALUES (?, ?, ?, ?, ?, ?)',
        [
          data.username,
          data.bio,
          data.nama,
          data.tgl_lahir,
          data.contact,
          data.social_media,
        ],
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
    <View style={{flex: 1, backgroundColor: '#FAEDCE'}}>
      <ScrollView>
        {/* HEADER */}
        <ImageHeader />
        {/* HEADER */}
        {/* FOTO Profile */}
        <View style={{alignItems: 'center', marginVertical: -100}}>
          <View
            style={{
              width: 160,
              height: 160,
              backgroundColor: '#727D73',
              borderRadius: 80, // Membuat lingkaran
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 50,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Foto</Text>
          </View>
        </View>
        {/* FOTO Profile */}
        {/* EDIT FOTO */}
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            paddingVertical: 60,
            paddingHorizontal: 80,
            marginVertical: -10,
          }}>
          <Image
            source={require('./../assets/pen.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
        {/* EDIT FOTO */}
        {/* USERNAME */}
        <View
          style={{
            alignItems: 'center',
            marginVertical: -40,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontStyle: 'italic',
              fontWeight: 'bold',
              height: 40,
            }}>
            {username ? username : 'username'}
          </Text>
        </View>
        {/* USERNAME */}
        {/* EDIT */}

        <View
          style={{
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <TextInput
            placeholder="Edit Bio"
            multiline
            placeholderTextColor={'#949494'}
            style={{
              fontSize: 20,
              fontStyle: 'italic',
              fontWeight: 'bold',
              height: 40,
              width: 350,
              color: 'black',
              textAlign: 'center',
            }}
          />
        </View>

        {/* EDIT */}

        {/* INFO */}
        <View
          style={{
            paddingHorizontal: 30,
            gap: 30,
            marginVertical: -20,
          }}>
          <Text style={{fontSize: 20, color: '#555'}}>Nama : <TextInput></TextInput></Text>
          <Text style={{fontSize: 20, color: '#555'}}>Tanggal Lahir :</Text>
          <Text style={{fontSize: 20, color: '#555'}}>Contact :</Text>
          <Text style={{fontSize: 20, color: '#555'}}>Cocial Media :</Text>
          <Text style={{fontSize: 20, color: '#555'}}>
            Password : **********
            {/* GANTI PASSWORD */}
            <TouchableOpacity onPress={() => navigation.navigate('Password')}>
              <Text style={{fontSize: 20, color: '#5559'}}>
                {' '}
                ( change Password )
              </Text>
            </TouchableOpacity>
            {/* GANTI PASSWORD */}
          </Text>
        </View>
        {/* INFO */}
        {/* Simpan */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 120,
            height: 40,
            backgroundColor: '#727D73',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 10,
            marginVertical: 35,
          }}>
          <Text style={{fontSize: 22, alignSelf: 'center', color: '#FAEDCE'}}>
            Simpan
          </Text>
        </TouchableOpacity>
        {/* Simpan */}
        {/* LOG OUT */}
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={{
            width: 120,
            height: 40,
            backgroundColor: '#727D73',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 10,
            marginVertical: -20,
          }}>
          <Text style={{fontSize: 22, alignSelf: 'center', color: '#FAEDCE'}}>
            Log Out
          </Text>
        </TouchableOpacity>
        {/* LOG OUT */}
      </ScrollView>
    </View>
  );
}

export default Edit;
