import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import ImageHeader from '../components/ImageHeader';
import db from '../../database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native';

function Edit() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [nama, setNama] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [contact, setContact] = useState('');
  const [socialMedia, setSocialMedia] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState('');

  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState(null);

  const getUsers = async () => {
    const username = await AsyncStorage.getItem('username');
    const bio = await AsyncStorage.getItem('bio');
    const nama = await AsyncStorage.getItem('nama');
    const tglLahirString = await AsyncStorage.getItem('tglLahir'); // Get the string
    const contact = await AsyncStorage.getItem('contact');
    const socialMedia = await AsyncStorage.getItem('socialMedia');
    const imageUri = await AsyncStorage.getItem('imageUri');

    setUsername(username);
    setBio(bio);
    setNama(nama);
    setContact(contact);
    setSocialMedia(socialMedia);
    setImageUri(imageUri);

    if (tglLahirString) {
      setDate(new Date(tglLahirString)); // Convert string back to Date object
    }
  };


  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, []),
  );

  // Handle profile
  function HandleProfile() {
    saveData({imageUri, username, bio, nama, tgl_lahir, contact, social_media});
  }
  // Handle profile

  // SIMPAN DATA PROFILE PENGGUNA KE DATABASE
  function saveData(data) {
    if (!data.username) {
      setIsModalVisible(true); // Show the modal
      return;
    }

    const closeModal = () => {
      setIsModalVisible(false);
    };

    setIsLoading(true);

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO pengguna (gambar, username, bio, nama, tgl_lahir, contact, social_media) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          data.imageUri,
          data.username,
          data.bio,
          data.nama,
          data.tgl_lahir,
          data.contact,
          data.social_media,
        ],
        () => {
          console.log('Data saved succesfully!');
          setTimeout(() => {
            setIsLoading(false);

            navigation.goBack();
          }, 100);
        },
        error => {
          console.error('Error saving data:', error);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        },
      );
    });
  }
  // SIMPAN DATA PROFILE PENGGUNA KE DATABASE

  useEffect(() => {
    getUsers();
  }, []); // hanya sekali saat komponen pertama kali dimount

  const save = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (contact.length < 10) {
      Alert.alert('Nomor telepon tidak boleh di bawah 10 karakter');
    } else if (contact.length > 13) {
      Alert.alert('Nomor telepon tidak boleh di atas 13 karakter');
    } else if (socialMedia && !emailRegex.test(socialMedia)) {
      Alert.alert('Format email tidak valid');
    } else {
      await AsyncStorage.setItem('imageUri', imageUri || '');
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('bio', bio);
      await AsyncStorage.setItem('nama', nama);
      await AsyncStorage.setItem('tglLahir', date.toISOString());
      await AsyncStorage.setItem('contact', contact);
      await AsyncStorage.setItem('socialMedia', socialMedia);
      navigation.goBack();
    }
  };

  const handleChoosePhoto = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Error', 'Failed to select image.  Please try again.');
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(source);
        setImageUri(source.uri);
        setImageName(response.assets[0].fileName);
      }
    });
  };

  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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
                source={{uri: imageUri}}
                style={{width: 160, height: 160, borderRadius: 80}} // Gambar profil berbentuk lingkaran
              />
            ) : (
              <Image source={{uri: imageUri}} />
            )}
          </View>
        </View>
        {/* FOTO Profile */}
        {/* EDIT FOTO */}
        <TouchableOpacity
          onPress={handleChoosePhoto}
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
          <TextInput
            value={username}
            onChangeText={text => setUsername(text)}
            placeholder="Username"
            maxLength={10} // ⬅️ batasi input maksimal 10 karakter
            style={{
              fontSize: 30,
              fontStyle: 'italic',
              fontWeight: 'bold',
              height: 50,
              width: 131,
              textAlign: 'center',
            }}
          />
        </View>

        {/* USERNAME */}
        {/* EDIT */}

        <View
          style={{
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <TextInput
            value={bio}
            onChangeText={text => setBio(text)}
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
          <View style={{paddingHorizontal: 30, gap: 40}}>
            {/* Nama */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#555', width: 130}}>
                Nama                  :
              </Text>
              <TextInput
                multiline
                value={nama}
                onChangeText={text => setNama(text)}
                style={{
                  fontSize: 20,
                  padding: 0,
                  borderBottomWidth: 1,
                  flex: 1,
                }}
              />
            </View>

            {/* Tanggal Lahir */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#555', width: 130}}>
                Tanggal Lahir :
              </Text>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  padding: 0,
                  borderBottomWidth: 1,
                  flex: 1,
                  borderColor: 'black',
                }}>
                <Text style={{fontSize: 20}}>
                  {date.toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            {/* Contact */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#555', width: 130}}>
                Contact             :
              </Text>
              <TextInput
                value={contact}
                onChangeText={text => setContact(text)}
                style={{
                  fontSize: 20,
                  padding: 0,
                  borderBottomWidth: 1,
                  flex: 1,
                }}
              />
            </View>

            {/* Social Media */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#555', width: 130}}>
                E-mail                 :
              </Text>
              <TextInput
                multiline
                value={socialMedia}
                onChangeText={text => setSocialMedia(text)}
                style={{
                  fontSize: 20,
                  padding: 0,
                  borderBottomWidth: 1,
                  flex: 1,
                }}
              />
            </View>
          </View>
        </View>
        {/* INFO */}
        {/* Simpan */}
        <TouchableOpacity
          onPress={() => save()}
          style={{
            width: 120,
            height: 40,
            backgroundColor: '#727D73',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 10,
            marginVertical: 80,
          }}>
          <Text style={{fontSize: 22, alignSelf: 'center', color: '#FAEDCE'}}>
            Simpan
          </Text>
        </TouchableOpacity>
        {/* Simpan */}
      </ScrollView>
    </View>
  );
}

export default Edit;
