// welcome screen

import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const SenerityBloomWelcome = () => {
  const [serenityBloomIdx, setSerenityBloomIdx] = useState(0);
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/serenityappbg.png')}
      style={styles.serenitybackground}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1,
            paddingBottom: 40,
          }}
        >
          {serenityBloomIdx === 0 && (
            <Image
              source={require('../../assets/images/serenityonb1.png')}
              style={{}}
            />
          )}
          {serenityBloomIdx === 1 && (
            <Image source={require('../../assets/images/serenityonb2.png')} />
          )}
          {serenityBloomIdx === 2 && (
            <Image source={require('../../assets/images/serenityonb3.png')} />
          )}
          {serenityBloomIdx === 3 && (
            <Image source={require('../../assets/images/serenityonb4.png')} />
          )}
          {serenityBloomIdx === 4 && (
            <Image source={require('../../assets/images/serenityonb5.png')} />
          )}

          <View style={styles.serenitywelccont}>
            <Text style={styles.serenitywelctitle}>
              {Platform.OS === 'ios' ? (
                <>
                  {serenityBloomIdx === 0 &&
                    'Welcome to Woobbine Bloom Serenity'}
                </>
              ) : (
                <>
                  {serenityBloomIdx === 0 &&
                    'Welcome to Serenity of Luxury Bloom'}
                </>
              )}
              {serenityBloomIdx === 1 && 'Daily Check-Ins'}
              {serenityBloomIdx === 2 && 'Personalized Guidance'}
              {serenityBloomIdx === 3 && 'Begin Your Journey'}
              {serenityBloomIdx === 4 && 'Calm Your Mind Through Reading'}
            </Text>
            <Text style={styles.serenitywelcsubtitle}>
              {serenityBloomIdx === 0 &&
                'Discover a calm daily space where reflection meets balance — one mindful minute at a time.'}
              {serenityBloomIdx === 1 &&
                'Answer four simple questions each day to explore your emotional state and track your personal bloom.'}
              {serenityBloomIdx === 2 &&
                'Receive advice, breathing exercises, and meditations tailored to your current mood.'}
              {Platform.OS === 'ios' ? (
                <>
                  {serenityBloomIdx === 3 &&
                    'Start your mindful practice and let Woobbine Bloom Serenity guide you toward inner calm.'}
                </>
              ) : (
                <>
                  {serenityBloomIdx === 3 &&
                    'Start your mindful practice and let Serenity of Luxury Bloom guide you toward inner calm.'}
                </>
              )}
              {serenityBloomIdx === 4 &&
                'Explore simple articles about meditation and breathing to support daily balance.'}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (serenityBloomIdx < 4) {
                setSerenityBloomIdx(serenityBloomIdx + 1);
              } else {
                navigation.replace('SenerityBloomTab');
              }
            }}
          >
            <ImageBackground
              source={require('../../assets/images/serenitybtn.png')}
              style={{
                width: 103,
                height: 36,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.serenitybtntext}>
                {serenityBloomIdx === 0 && 'Proceed'}
                {serenityBloomIdx === 1 && 'Proceed'}
                {serenityBloomIdx === 2 && 'Next'}
                {serenityBloomIdx === 3 && 'Next'}
                {serenityBloomIdx === 4 && 'Start'}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  serenitybackground: {
    flex: 1,
    width: '100%',
  },
  serenitywelccont: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 22,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 60,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    minHeight: 269,
    justifyContent: 'center',
  },
  serenitybtntext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  serenitywelctitle: {
    color: '#F4F7F6',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
  },
  serenitywelcsubtitle: {
    color: '#F4F7F6',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    lineHeight: 25,
  },
});

export default SenerityBloomWelcome;
