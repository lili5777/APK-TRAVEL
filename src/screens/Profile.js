import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import {useCallback, useEffect, useState} from 'react';
import db from '../../database';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile() {

  

  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(null);
  
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [nama, setNama] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [contact, setContact] = useState('');
  const [socialMedia, setSocialMedia] = useState('');

  const getUsers =async () => {
    const savedImageUri = await AsyncStorage.getItem('imageUri');
    const username = await AsyncStorage.getItem('username');
    const bio = await AsyncStorage.getItem('bio');
    const nama = await AsyncStorage.getItem('nama');
    const tglLahir = await AsyncStorage.getItem('tglLahir');
    const contact = await AsyncStorage.getItem('contact');
    const socialMedia = await AsyncStorage.getItem('socialMedia');
    setImageUri(savedImageUri)
    setUsername(username)
    setBio(bio)
    setNama(nama)
    setTglLahir(tglLahir)
    setContact(contact)
    setSocialMedia(socialMedia)
  };

  useFocusEffect(
      useCallback(() => {
        getUsers();
      }, []),
    );

    
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
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 160, height: 160, borderRadius: 80 }}
                />
              ) : (
                <Text style={{ color: 'white' }}>Foto</Text> // default jika belum ada
              )}              
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
              width: 100,
              textAlign: 'center'
            }}>
            {username}
          </Text>
        </View>
        {/* USERNAME */}

        {/* BIO */}
          <View
            style={{alignItems: 'center',
              marginVertical: -100, }}>
            <Text
                style={{fontSize: 20,
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  height: 40,
                  width: 350,
                  color: 'black',
                  textAlign: 'center'}}>
              {bio}
            </Text>
          </View>
        {/* BIO */}
        

        {/* INFO */}
        <View
          style={{
            paddingHorizontal: 30,
            gap: 25,
            marginVertical: 110,
          }}>
          <View style={{ paddingHorizontal: 20, gap: 40 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, color: '#555', width: 150 }}>Nama                    : </Text>
              <Text style={{ fontSize: 20, color: '#555' }}>{nama}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, color: '#555', width: 150 }}>Tanggal Lahir   :</Text>
              <Text style={{ fontSize: 20, color: '#555' }}>{tglLahir}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, color: '#555', width: 150 }}>Contact               :</Text>
              <Text style={{ fontSize: 20, color: '#555' }}>{contact}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, color: '#555', width: 150 }}>E-mail                   :</Text>
              <Text style={{ fontSize: 20, color: '#555' }}>{socialMedia}</Text>
            </View>
          </View>

        </View>
        {/* INFO */}
        {/* EDIT */}
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <View
            style={{
            width: 120,
            height: 40,
            backgroundColor: '#727D73',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 10,
            marginVertical: -80,
            }}>
            <Text
                style={{fontSize: 22, alignSelf: 'center', color: '#FAEDCE'}}>
              Edit
            </Text>
          </View>
        </TouchableOpacity>
        {/* EDIT */}
      </ScrollView>
    </View>
  );
}

export default Profile;
