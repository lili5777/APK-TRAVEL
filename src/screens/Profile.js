import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import {useEffect} from 'react';
import db from '../../database';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile() {
  const navigation = useNavigation();

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
  });

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

        {/* USERNAME */}
        <View
          style={{
            alignItems: 'center',
            marginVertical: 100,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontStyle: 'italic',
              fontWeight: 'bold',
              height: 40,
            }}>
            Username.
          </Text>
        </View>
        {/* USERNAME */}
        {/* EDIT */}
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <View
            style={{
              alignItems: 'center',
              marginVertical: -100,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontStyle: 'italic',
                fontWeight: 'bold',
                height: 40,
              }}>
              Edit.
            </Text>
          </View>
        </TouchableOpacity>
        {/* EDIT */}

        {/* INFO */}
        <View
          style={{
            paddingHorizontal: 30,
            gap: 30,
            marginVertical: -50,
          }}>
          <Text style={{fontSize: 20, color: '#555'}}>Nama : </Text>
          <Text style={{fontSize: 20, color: '#555'}}>Tanggal Lahir :</Text>
          <Text style={{fontSize: 20, color: '#555'}}>Contact :</Text>
          <Text style={{fontSize: 20, color: '#555'}}>Cocial Media :</Text>
        </View>
        {/* INFO */}
        {/* LOG OUT */}
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('userId');
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }}
          style={{
            width: 120,
            height: 40,
            backgroundColor: '#727D73',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 10,
            marginVertical: 80,
          }}>
        </TouchableOpacity>
        {/* LOG OUT */}
      </ScrollView>
    </View>
  );
}

export default Profile;
