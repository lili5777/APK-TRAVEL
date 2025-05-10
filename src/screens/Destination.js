import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  RefreshControl,
} from 'react-native';
import Details from './Details';
import db from '../../database';

function Destination() {
  const navigation = useNavigation();

  const width = Dimensions.get('screen').width;

  const scrollViewRef = useRef(null);

  const [destinasi, setDestinasi] = useState([]);

  const images = [
    require('./../assets/pantaiD.png'),
    require('./../assets/gunungD.png'),
    require('./../assets/bersamaD.png'),
  ];
  useEffect(() => {
    let scrollPosition = 0;
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        scrollPosition += width; // Pindah ke gambar berikutnya
        scrollViewRef.current.scrollTo({x: scrollPosition, animated: true});

        // Jika sudah mencapai akhir, kembali ke awal
        if (scrollPosition >= width * (images.length - 1)) {
          scrollPosition = -width; // Set ke -width agar animasi terlihat smooth saat kembali
          setTimeout(() => {
            scrollViewRef.current.scrollTo({x: 0, animated: false});
          }, 500); // Waktu jeda untuk menyelesaikan animasi terakhir
        }
      }
    }, 3000); // Scroll setiap 3 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDestination();
    }, []),
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getDestination();
      setRefreshing(false);
    }, 2000);
  }, []);

  function getDestination() {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM destinasi ORDER BY id DESC  `,
        [],
        (_, results) => {
          const rows = results.rows.raw();
          if (rows.length === 0) {
            setDestinasi([]);
            console.log('tidak ada data');
            setType('error');
          } else {
            console.log('berhasil memuat');
            setDestinasi(rows);
            console.log(rows);
          }
        },
        error => {
          setDestinasi([]);
          console.error('Error fetching data:', error);
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

  return (
    <View style={{flex: 1, backgroundColor: '#FAEDCE'}}>
      <View>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          contentContainerStyle={{height: 150}}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          pagingEnabled={true}>
          {images.map((image, index) => (
            <View
              key={index}
              style={{
                height: 150,
                backgroundColor: '#5A6C57',
                borderBottomLeftRadius: 23,
                borderBottomRightRadius: 23,
              }}>
              <Image
                style={{
                  height: 160,
                  width: width,
                  borderBottomLeftRadius: 60,
                  borderBottomRightRadius: 60,
                  marginTop: 20,
                }}
                source={image}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{padding: 20}}>
        {destinasi.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('Details', {
                  id: item.id,
                });
              }}
              style={{
                height: 100,
                width: '100%',
                backgroundColor: '#5A6C57',
                marginBottom: 10,
                borderRadius: 10,
                elevation: 10,
                padding: 10,
                position: 'relative',
              }}>
              <Text style={{fontSize: 30, color: '#FAEDCE'}}>{item.judul}</Text>

              <Text
                style={{
                  fontSize: 15,
                  color: '#FAEDCE',
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}>
                {convertDate(item.tgl_dibuat)}
              </Text>

              <Text style={{fontSize: 15, color: '#FAEDCE', marginTop: 10}}>
                {item.deskripsi}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* TAMBAH */}

      <TouchableOpacity
        onPress={() => navigation.navigate('Diary')}
        style={{
          width: 75,
          height: 70,
          justifyContent: 'center',
          right: 20,
          bottom: 20,
          position: 'absolute',
        }}>
        <Image
          source={require('./../assets/plus.png')}
          style={{height: 65, width: 65}}
        />
      </TouchableOpacity>
      {/* TAMBAH */}
    </View>
  );
}

export default Destination;
