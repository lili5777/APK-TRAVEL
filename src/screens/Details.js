import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  Modal,
} from 'react-native';
import db from '../../database';

function Details({route}) {
  const {id} = route.params;
  const navigation = useNavigation();
  const width = Dimensions.get('screen').width;
  const scrollViewRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function DeleteCatatan(id) {
    setIsModalVisible(true);
  }

  function confirmDelete(id) {
    deleteData(id);
    setIsModalVisible(false);
  }

  function cancelDelete() {
    setIsModalVisible(false);
  }

  function deleteData(id) {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM destinasi WHERE id = ?',
        [id],
        () => {
          console.log('Data saved succesfully!');
          setTimeout(() => {
            navigation.goBack();
          }, 100);
        },
        error => {
          console.error('Error saving data:', error);
          setTimeout(() => {}, 1000);
        },
      );
    });
  }

  function editData(id) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE destinasi SET nama = ?, deskripsi = ? WHERE id = ?',
        [newNama, newDeskripsi, id],
        () => {
          console.log('Data updated successfully!');
          setTimeout(() => {
            navigation.navigate('Diary');
          }, 100);
        },
        error => {
          console.error('Error updating data:', error);
          setTimeout(() => {}, 1000);
        },
      );
    });
  }

  function convertDate(timestamp) {
    console.log(timestamp);

    const date = new Date(timestamp);

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('id-ID', options);
  }

  const [destinasiDetails, setDestinasiDetails] = useState(null);

  function getDestinationDetails() {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM destinasi WHERE id=?  `,
        [id],
        (_, results) => {
          const rows = results.rows.raw();
          if (rows.length === 0) {
            setDestinasiDetails(null);
            console.log('tidak ada data');
            setType('error');
          } else {
            console.log('berhasil memuat');
            setDestinasiDetails(rows[0]);
            console.log(rows[0]);
          }
        },
        error => {
          setDestinasi([]);
          console.error('Error fetching data:', error);
        },
      );
    });
  }

  useFocusEffect(
    useCallback(() => {
      getDestinationDetails();
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: '#FAEDCE'}}>
      <ScrollView>
        {/* HEADER */}

        <ImageBackground
          imageStyle={{
            borderBottomLeftRadius: 60,
            borderBottomRightRadius: 60,
          }}
          style={{
            height: 300,
            width: width,

            marginTop: -13,
          }}
          source={{
            uri:
              destinasiDetails?.gambar ||
              'https://www.litaofthepack.com/wp-content/uploads/2020/03/FullSizeRender-4.jpg',
          }}>
          {/* BACK */}
          <View style={{paddingHorizontal: 15, paddingVertical: 25}}>
            <TouchableOpacity
              style={{alignSelf: 'flex-start'}}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('./../assets/BACK.png')}
                style={{height: 40, width: 88}}
              />
            </TouchableOpacity>
          </View>
          {/* BACK */}
        </ImageBackground>
        {/* HEADER */}
        {/* CATATAN*/}

        <View style={{marginBottom: 20}}>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: 40,
              height: 50,
            }}>
            {destinasiDetails?.judul}
          </Text>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: 15,
              height: 40,
            }}>
            {`Tanggal Dibuat: ${convertDate(destinasiDetails?.tgl_dibuat)}`}
          </Text>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: 25,
              height: 30,
            }}>
            {destinasiDetails?.deskripsi}
          </Text>
        </View>

        {/* CATATAN*/}
      </ScrollView>

      {/* EDIT */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditDetails', {destinasiDetails});
        }}
        style={{
          width: 75,
          height: 70,
          justifyContent: 'center',
          right: 290,
          bottom: 20,
          position: 'absolute',
        }}>
        <Image
          source={require('./../assets/penEdit.png')}
          style={{height: 65, width: 65}}
        />
      </TouchableOpacity>
      {/* EDIT */}

      {/* Delete */}
      <TouchableOpacity
        onPress={() => DeleteCatatan(destinasiDetails?.id)}
        style={{
          width: 75,
          height: 70,
          justifyContent: 'center',
          right: 20,
          bottom: 20,
          position: 'absolute',
        }}>
        <Image
          source={require('./../assets/delete.png')}
          style={{height: 65, width: 65}}
        />
      </TouchableOpacity>
      {/* Delete */}

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#FAEDCE',
              borderRadius: 20,
              padding: 25,
              alignItems: 'center',
              shadowColor: '#000',
              width: 300,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Text
              style={{
                marginBottom: 15,
                textAlign: 'center',
                fontSize: 18,
                color: 'black',
              }}>
              Apakah Anda yakin ingin menghapus catatan ini?
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#DDDDDD',
                  borderRadius: 10,
                  padding: 10,
                  marginHorizontal: 10,
                }}
                onPress={cancelDelete}>
                <Text>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF0000',
                  borderRadius: 10,
                  padding: 10,
                  marginHorizontal: 10,
                }}
                onPress={() => confirmDelete(destinasiDetails?.id)}>
                <Text style={{color: 'white'}}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal */}
    </View>
  );
}

export default Details;
