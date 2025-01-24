import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';

function Login() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          height: 40,
          width: 90,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('MyTabs');
        }}>
        <Text>Belum Punya Akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
