// meditation details screen

import { useStore } from '../bloomstorecntx/serenitybloomctxt';
import SerenityBloomLayout from '../[bloomserenitycmpnts]/SerenityBloomLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';

import Sound from 'react-native-sound';
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SenerityBloomMeditationDetails = ({ route }) => {
  const article = route.params;
  const videoRef = useRef(null);
  const { isOnMeditationsMusic } = useStore();
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { setOpenedMeditationsCount, openedMeditationsCount } = useStore();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      serenityMarkOpened();
    }, [article]),
  );

  const serenityMarkOpened = async () => {
    try {
      const opened = Array.isArray(openedMeditationsCount)
        ? openedMeditationsCount
        : [];

      if (!opened.includes(article.serenitylbl)) {
        const updated = [...opened, article.serenitylbl];
        setOpenedMeditationsCount(updated);
        await AsyncStorage.setItem(
          'openedMeditations',
          JSON.stringify(updated),
        );
      }
    } catch (e) {
      console.log('Failed', e);
    }
  };

  useEffect(() => {
    const s = new Sound(article.serenitysd, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('e', error);
        return;
      }
      s.setNumberOfLoops(-1);
      setSound(s);
    });

    return () => {
      if (s) {
        s.stop(() => s.release());
      }
    };
  }, [article]);

  const toggleSound = () => {
    if (!sound) return;
    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
    } else {
      sound.play(success => {
        if (!success) console.log('e');
      });
      setIsPlaying(true);
    }
  };

  const shareSerenityBloomMeditation = async () => {
    try {
      await Share.share({
        message: `${article.serenitylbl}\n\n${article.serenityabout}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SerenityBloomLayout>
      <View style={styles.serenitywelccont}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.serenityvideocont}>
            <Video
              source={article?.serenityvid}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 12,
              }}
              autoplay
              muted
              paused={false}
              resizeMode="cover"
              repeat
              ref={videoRef}
            />
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <Text style={styles.serenitywelctitle}>{article.serenitylbl}</Text>
            <Text style={styles.serenitywelcsubtitle}>
              {article.serenityabout}
            </Text>
          </View>
        </View>

        <View
          style={{
            gap: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../../assets/images/serenityback.png')} />
          </TouchableOpacity>

          {isOnMeditationsMusic && (
            <TouchableOpacity activeOpacity={0.7} onPress={toggleSound}>
              <Image
                style={{ width: 32, height: 32 }}
                source={
                  isPlaying
                    ? require('../../assets/images/serenitypause.png')
                    : require('../../assets/images/serenityisplaying.png')
                }
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={shareSerenityBloomMeditation}
          >
            <Image source={require('../../assets/images/serenityshare.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </SerenityBloomLayout>
  );
};

const styles = StyleSheet.create({
  serenitywelccont: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 22,
    padding: 11,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'center',
    marginTop: 15,
  },
  serenitywelctitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
  },
  serenitywelcsubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    marginTop: 26,
    marginBottom: 24,
    lineHeight: 22,
  },
  serenityvideocont: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  serenityduration: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 18,
  },
});

export default SenerityBloomMeditationDetails;
