import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

function ImageHeader() {
  const width = Dimensions.get('screen').width;

  const scrollViewRef = useRef(null);

  const images = [
    require('./../assets/bali.png'),
    require('./../assets/gambar1.png'),
    require('./../assets/gambar2.png'),
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

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      style={{height: '100%', width: '100%'}}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16} // Agar smooth
      pagingEnabled={true} // Membuat scroll snap ke tiap halaman
    >
      {images.map((image, index) => (
        <View
          key={index}
          style={{
            height: 300,
            backgroundColor: '#5A6C57',
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}>
          <Image
            style={{
              height: 300,
              width: width,
              borderBottomLeftRadius: 60,
              borderBottomRightRadius: 60,
              marginTop: -13,
              interval: 5,
            }}
            source={image}
          />
        </View>
      ))}
    </ScrollView>
  );
}

export default ImageHeader;
