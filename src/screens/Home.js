import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';

function Home() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          height: 30,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Details');
        }}>
        <Text>ke Details</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
