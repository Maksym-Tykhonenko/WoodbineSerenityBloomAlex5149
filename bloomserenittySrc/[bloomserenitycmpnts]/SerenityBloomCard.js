import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SerenityBloomCard = ({ article }) => {
  const navigation = useNavigation();

  const shareSerenityMeditation = async () => {
    try {
      await Share.share({
        message: `${article.serenitylbl}\n\n${article.serenityabout}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.serenitywelccont}>
      <Image
        source={article.serenityimg}
        style={{ width: 97, height: 97, borderRadius: 12 }}
      />
      <View style={{ alignItems: 'center', width: '60%' }}>
        <Text style={styles.serenitywelctitle}>{article.serenitylbl}</Text>
      </View>
      <View style={{ gap: 15 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('SenerityBloomMeditationDetails', article);
          }}
        >
          <Image source={require('../../assets/images/serenityplay.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            shareSerenityMeditation();
          }}
        >
          <Image source={require('../../assets/images/serenityshare.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  serenitywelccont: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 22,
    padding: 11,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    flexDirection: 'row',
  },
  serenitywelctitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
  },
  serenitywelcsubtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
  },
});

export default SerenityBloomCard;
