import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import db from '../../database';

function Diary() {
  const navigation = useNavigation();

  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  //Handle catatan
  function HandleCatatan() {
    saveData({judul, deskripsi});
  }
  //Handle catatan

  //SIMPAN DATA CATATAN DESTINASI KE DATABASE
  function saveData(data) {
    console.log(data.judul, data.deskripsi);

    setIsLoading(true);

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO destinasi (judul, deskripsi) VALUES (?, ?)',
        [data.judul, data.deskripsi],
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
  //SIMPAN DATA CATATAN DESTINASI KE DATABASE

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FAEDCE',
      }}>
      {/* BACK */}
      <View style={{padding: 15}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('./../assets/BACK.png')}
            style={{height: 40, width: 88}}
          />
        </TouchableOpacity>
      </View>
      {/* BACK */}
      {/* TITTLE */}
      <TextInput
        onChangeText={text => setJudul(text)}
        placeholder="Title"
        placeholderTextColor={'#949494'}
        style={{
          height: 56,
          fontSize: 40,
          alignSelf: 'flex-start',
          paddingHorizontal: 25,
          paddingVertical: 0,
          color: 'black',
        }}
      />
      <TextInput
        onChangeText={text => setDeskripsi(text)}
        placeholder="Description..."
        multiline
        placeholderTextColor={'#949494'}
        style={{
          fontSize: 20,
          alignSelf: 'flex-start',
          paddingHorizontal: 40,
          color: 'black',
        }}
      />
      {/* TITTLE */}
      {/* TAMBAH GAMBAR */}
      <TouchableOpacity>
        <View style={{paddingHorizontal: 40}}>
          <Image
            source={require('./../assets/image.png')}
            style={{height: 40, width: 40}}
          />
          <Image
            source={require('./../assets/text.png')}
            style={{
              height: 20,
              width: 64.9,
              padding: 10,
              left: 50,
              bottom: 30,
            }}
          />
        </View>
      </TouchableOpacity>
      {/* TAMBAH GAMBAR */}
      {/* SAVE */}
      <TouchableOpacity
        onPress={() => HandleCatatan()}
        style={{
          justifyContent: 'center',
          borderRadius: 30,
          right: 20,
          bottom: 20,
          position: 'absolute',
        }}>
        <Image
          source={require('./../assets/save.png')}
          style={{height: 70, width: 70}}
        />
      </TouchableOpacity>
      {/* SAVE */}
    </View>
  );
}

export default Diary;
