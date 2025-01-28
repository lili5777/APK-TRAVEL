import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';

function Diary() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAEDCE',
      }}>
      <Text>Tittle</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          height: 30,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Diary');
        }}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Diary;
