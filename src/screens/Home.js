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
import ImageHeader from '../components/ImageHeader';

function Home() {
  const navigation = useNavigation();

  const width = Dimensions.get('screen').width;

  const scrollViewRef = useRef(null);

  const imagesBanner = [
    require('./../assets/pantai.png'),
    require('./../assets/gunung.png'),
    require('./../assets/bersama.png'),
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#FAEDCE'}}>
      <ScrollView>
        {/* HEADER */}
        <ImageHeader />
        {/* HEADER */}
        {/* KONTEN HOME */}
        <View style={{padding: 20, gap: 10}}>
          {imagesBanner.map((image, index) => (
            <Image
              key={index}
              style={{
                height: 135.3,
                width: '100%',
                // borderRadius: 20,
              }}
              source={image}
            />
          ))}
        </View>
        {/* KONTEN HOME */}
      </ScrollView>
    </View>
  );
}

export default Home;
