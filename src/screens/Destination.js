import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Text} from 'react-native';

function Destination() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          height: 30,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Text>ke Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Destination;
