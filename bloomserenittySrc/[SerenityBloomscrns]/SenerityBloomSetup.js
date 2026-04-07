// setup screen

import { BlurView } from '@react-native-community/blur';
import SerenityBloomLayout from '../[bloomserenitycmpnts]/SerenityBloomLayout';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from '../bloomstorecntx/serenitybloomctxt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const SenerityBloomSetup = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const navigation = useNavigation();
  const {
    isOnMeditationsMusic,
    setIsOnMeditationsMusic,
    isOnSerenityNtf,
    setIsOnSerenityNtf,
    setMoodStats,
    setOpenedBreathingSessionCount,
    setOpenedMeditationsCount,
    setQuizResult,
  } = useStore();

  const toggleMeditationsBgMusic = async value => {
    if (isOnSerenityNtf) {
      Toast.show({
        text1: !isOnMeditationsMusic ? 'Music turned on' : 'Music turned off',
      });
    }
    try {
      await AsyncStorage.setItem(
        'SerenityBloomMeditationMusic',
        JSON.stringify(value),
      );
      setIsOnMeditationsMusic(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const toggleCrovvnNotifications = async value => {
    Toast.show({
      text1: !isOnSerenityNtf
        ? 'Notifications turned on'
        : 'Notifications turned off',
    });

    try {
      await AsyncStorage.setItem('SerenityBloomNtf', JSON.stringify(value));
      setIsOnSerenityNtf(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const resetSerenityBloomProgress = async () => {
    try {
      await AsyncStorage.multiRemove([
        'moodStats',
        'quizResult',
        'openedMeditations',
        'openedBreathingSessions',
      ]);

      setOpenedBreathingSessionCount(0);
      setIsVisibleModal(false);
      setOpenedMeditationsCount([]);
      setMoodStats({ A: 0, B: 0, C: 0, D: 0 });
      setQuizResult(null);
      navigation.navigate('SenerityBloomWelcome');
    } catch (err) {
      console.log('Failed to reset stats', err);
    }
  };

  return (
    <SerenityBloomLayout>
      <View
        style={[
          styles.serenitycnt,
          Platform.OS === 'android' &&
            isVisibleModal && { filter: 'blur(12px)' },
        ]}
      >
        <View style={styles.serenitywelccont}>
          <View>
            <Text style={styles.serenitywelctitle}>Settings</Text>
            {Platform.OS === 'ios' && (
              <View style={styles.serenitycntwrp}>
                <Text style={styles.serenitywelcsubtitle}>Sounds</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    toggleMeditationsBgMusic(!isOnMeditationsMusic)
                  }
                >
                  {isOnMeditationsMusic ? (
                    <Image
                      source={require('../../assets/images/serenityon.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/serenityoff.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.serenitycntwrp}>
              <Text style={styles.serenitywelcsubtitle}>Notifications</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleCrovvnNotifications(!isOnSerenityNtf)}
              >
                {isOnSerenityNtf ? (
                  <Image
                    source={require('../../assets/images/serenityon.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/serenityoff.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.serenitycntwrp}>
              <Text style={styles.serenitywelcsubtitle}>Reset Progress</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsVisibleModal(true)}
              >
                <Image
                  source={require('../../assets/images/serenityolear.png')}
                />
              </TouchableOpacity>
            </View>
            {Platform.OS === 'ios' && (
              <View style={styles.serenitycntwrp}>
                <Text style={styles.serenitywelcsubtitle}>Share App</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    Linking.openURL(
                      'https://apps.apple.com/us/app/woobbine-bloom-serenity/id6760403167',
                    )
                  }
                >
                  <Image
                    source={require('../../assets/images/serenityshr.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibleModal}
        >
          {Platform.OS === 'ios' && (
            <BlurView
              style={styles.serenityblur}
              blurType="dark"
              blurAmount={4}
            />
          )}
          <View style={styles.serenitywrapper}>
            <View style={styles.serenitywelccont}>
              <View
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}
              >
                <Text style={[styles.serenitywelctitle, { marginBottom: 0 }]}>
                  Are you sure you want to reset your app progress?
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  resetSerenityBloomProgress();
                }}
              >
                <ImageBackground
                  source={require('../../assets/images/serenitybtn.png')}
                  style={styles.serenitymodalbtn}
                >
                  <Text style={styles.serenitybtntext}>Confirm</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsVisibleModal(false)}
              >
                <ImageBackground
                  source={require('../../assets/images/serenitybtngr.png')}
                  style={styles.serenitymodalbtn}
                >
                  <Text style={styles.serenitybtntext}>Cancel</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SerenityBloomLayout>
  );
};

const styles = StyleSheet.create({
  serenitycnt: {
    paddingBottom: 110,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  serenitycntwrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 23,
  },
  serenitywelccont: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 22,
    padding: 27,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  serenitybtntext: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  serenitywelctitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  serenitywelcsubtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
  },
  serenityblur: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  serenitymodalbtn: {
    width: 103,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serenitywrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default SenerityBloomSetup;
