import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import db from '../../database';
import { launchImageLibrary } from 'react-native-image-picker';

function EditDetails({route}) {
  const navigation = useNavigation();
  const {destinasiDetails} = route.params;
  

  const [judul, setJudul] = useState(destinasiDetails?.judul);
  const [deskripsi, setDeskripsi] = useState(destinasiDetails?.deskripsi);
//   const [image, setIma] = useState(destinasiDetails?.deskripsi);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle catatan
  function HandleCatatan() {
    saveData({judul, deskripsi, imageUri});
  }
  // Handle catatan

  // SIMPAN DATA CATATAN DESTINASI KE DATABASE
  function saveData(data) {
    if (!data.judul || !data.deskripsi) {
      setIsModalVisible(true); // Show the modal
      return;
    }

    setIsLoading(true);

    db.transaction(tx => {
        tx.executeSql(
          'UPDATE destinasi SET judul = ?, deskripsi = ?, gambar = ? WHERE id = ?',
          [data.judul, data.deskripsi, data.imageUri, destinasiDetails.id], // pastikan destinasi.id ada
          () => {
            console.log('Data updated successfully!');
            setIsLoading(false);
            navigation.goBack();
          },
          error => {
            console.error('Error updating data:', error);
            setIsLoading(false);
          },
        );
      });        
  }

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const [imageUri, setImageUri] = useState(destinasiDetails?.gambar);
  const [imageName, setImageName] = useState(null);

  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
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


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FAEDCE',
      }}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

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
        value={judul}
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
        value={deskripsi}
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
      <TouchableOpacity onPress={handleChoosePhoto}>
        <View style={{paddingHorizontal: 40}}>
          <Image
            source={require('./../assets/image.png')}
            style={{height: 40, width: 40}}
          />
          <Image
          value={imageUri}
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
      {imageUri && (
      <Image
        source={{uri: imageUri}}
        style={{width: 200, height: 200, marginBottom: 20}}
      />)}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Judul dan Deskripsi tidak boleh kosong!
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: '#FAEDCE',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  modalButton: {
    backgroundColor: '#5A6C57',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
  },
});

export default EditDetails;