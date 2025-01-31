import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';

function Details() {
  const navigation = useNavigation();

  const width = Dimensions.get('screen').width;

  const scrollViewRef = useRef(null);

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
            uri: 'https://www.litaofthepack.com/wp-content/uploads/2020/03/FullSizeRender-4.jpg',
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
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 40,
            height: 40,
          }}>
          Title
        </Text>
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 25,
            height: 40,
          }}>
          tanggal dibuat
        </Text>
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 25,
            height: 30,
          }}>
          Description
        </Text>
        {/* CATATAN*/}
      </ScrollView>
    </View>
  );
}

export default Details;
