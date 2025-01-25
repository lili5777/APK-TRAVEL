import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import ImageHeader from '../components/ImageHeader';

function Profile() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#FAEDCE'}}>
      <ScrollView>
        {/* HEADER */}

        <ImageHeader />

        {/* HEADER */}
      </ScrollView>
    </View>
  );
}

export default Profile;
