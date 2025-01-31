import {useNavigation} from '@react-navigation/native';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

function Diary() {
  const navigation = useNavigation();

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
        placeholder="Description..."
        multiline
        placeholderTextColor={'#949494'}
        style={{
          fontSize: 20,
          alignSelf: 'flex-start',
          paddingHorizontal: 40,
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
        onPress={() => navigation.goBack()}
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
