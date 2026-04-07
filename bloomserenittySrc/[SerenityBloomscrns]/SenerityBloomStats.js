// stats screen

import { serenitybloommedt } from '../bloomserenitydtta/serenitybloommedt';
import { serenitybloombreathing } from '../bloomserenitydtta/serenitybloombreathing';

import { useCallback } from 'react';
import { useStore } from '../bloomstorecntx/serenitybloomctxt';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const moodDetails = {
  A: {
    label: 'Joyful',
    img: require('../../assets/images/serenitymood1.png'),
    description: 'You feel drained or quiet — your body asks for rest.',
    advice:
      'Slow down. Even five calm breaths can restore more than you expect.',
    meditation: serenitybloommedt[0],
    breathing: [serenitybloombreathing[0], serenitybloombreathing[1]],
  },
  B: {
    label: 'Calm',
    img: require('../../assets/images/serenitymood2.png'),
    description: 'You’re steady and centered — peace flows through your day.',
    advice: 'Protect this calm. Move slowly and stay present in small moments.',
    meditation: serenitybloommedt[1],
    breathing: [serenitybloombreathing[2], serenitybloombreathing[3]],
  },
  C: {
    label: 'Low / Tired',
    img: require('../../assets/images/serenitymood3.png'),
    description: 'Your body feels tense — emotions close to the surface.',
    advice:
      'Pause before reacting. A deep exhale helps you release what can’t control.',
    meditation: serenitybloommedt[2],
    breathing: [serenitybloombreathing[4], serenitybloombreathing[5]],
  },
  D: {
    label: 'Tense',
    img: require('../../assets/images/serenityispstarmood.png'),
    description: 'You feel light and inspired — your energy shines today.',
    advice: 'Share this warmth: smile at someone or do one small kind thing.',
    meditation: serenitybloommedt[3],
    breathing: [serenitybloombreathing[6], serenitybloombreathing[7]],
  },
};

const normalizeMoodStats = rawStats => ({
  A: Number(rawStats?.A) || 0,
  B: Number(rawStats?.B) || 0,
  C: Number(rawStats?.C) || 0,
  D: Number(rawStats?.D) || 0,
});

const SenerityBloomStats = () => {
  const { moodStats, setMoodStats } = useStore();
  const {
    setOpenedMeditationsCount,
    openedMeditationsCount,
    openedBreathingSessionCount,
    setOpenedBreathingSessionCount,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadSerenityBloomMoodStats();
      fetchSerenityBloomOpenedSessions();
      loadSerenityBloomOpenedMeditations();
    }, []),
  );

  const loadSerenityBloomOpenedMeditations = async () => {
    try {
      const data = await AsyncStorage.getItem('openedMeditations');
      if (data) {
        const arr = JSON.parse(data);

        setOpenedMeditationsCount(arr);
      }
    } catch (e) {
      console.log('Failed', e);
    }
  };

  const fetchSerenityBloomOpenedSessions = async () => {
    try {
      const openedSessions = await AsyncStorage.getItem(
        'openedBreathingSessions',
      );
      if (openedSessions) {
        const parsed = JSON.parse(openedSessions);
        setOpenedBreathingSessionCount(parsed.length);
      }
    } catch (err) {
      console.log('Error', err);
    }
  };

  const loadSerenityBloomMoodStats = async () => {
    const stats = await AsyncStorage.getItem('moodStats');
    if (stats) setMoodStats(normalizeMoodStats(JSON.parse(stats)));
  };

  const renderMeditationProgressBar = () => {
    const total = serenitybloommedt.length;
    const opened = openedMeditationsCount.length;
    const openedWidth = (opened / total) * 100;
    const closedWidth = 100 - openedWidth;

    return (
      <View style={styles.progressBarContainer}>
        <View
          style={{
            width: `${openedWidth}%`,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            borderTopRightRadius: opened === total ? 12 : 0,
            borderBottomRightRadius: opened === total ? 12 : 0,
            backgroundColor: '#B80019',
          }}
        />
        <View
          style={{
            width: `${closedWidth}%`,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            backgroundColor: '#000',
          }}
        />
        <Text style={styles.serenitybreathprogresstext}>
          {opened}/{total}
        </Text>
      </View>
    );
  };

  const renderBreathingProgressBar = () => {
    const total = serenitybloombreathing.length;
    const opened = openedBreathingSessionCount;
    const openedWidth = (opened / total) * 100;
    const closedWidth = 100 - openedWidth;

    return (
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressSegment,
            { width: `${openedWidth}%`, backgroundColor: '#B80019' },
          ]}
        />
        <View
          style={[
            styles.progressSegment,
            { width: `${closedWidth}%`, backgroundColor: '#000' },
          ]}
        />
        <Text style={styles.serenitybreathprogresstext}>
          {openedBreathingSessionCount}/{serenitybloombreathing.length}
        </Text>
      </View>
    );
  };

  const renderProgressBar = () => {
    const normalizedMoodStats = normalizeMoodStats(moodStats);
    const total = Object.values(normalizedMoodStats).reduce(
      (sum, value) => sum + value,
      0,
    );

    const getWidth = type => {
      if (!total) return '0%';
      return `${(normalizedMoodStats[type] / total) * 100}%`;
    };

    return (
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressSegment,
            { backgroundColor: '#FFEAEA', width: getWidth('A') },
          ]}
        />
        <View
          style={[
            styles.progressSegment,
            { backgroundColor: '#FFB3B3', width: getWidth('B') },
          ]}
        />
        <View
          style={[
            styles.progressSegment,
            { backgroundColor: '#FF0000', width: getWidth('C') },
          ]}
        />
        <View
          style={[
            styles.progressSegment,
            { backgroundColor: '#FF6666', width: getWidth('D') },
          ]}
        />
      </View>
    );
  };

  const renderRecommendations = () => {
    const normalizedMoodStats = normalizeMoodStats(moodStats);
    const total = Object.values(normalizedMoodStats).reduce(
      (sum, value) => sum + value,
      0,
    );

    return (
      <View style={{ alignItems: 'center', width: '100%' }}>
        <Text style={styles.serenitywelctitle}>Mood Check-Ins:</Text>
        <Text
          style={[styles.serenitywelctitle, { marginTop: 0, marginBottom: 50 }]}
        >
          {total}
        </Text>
        <Text style={styles.serenitywelcsectiontitle}>Breathing Sessions</Text>
        {renderBreathingProgressBar()}
        <Text style={styles.serenitywelcsectiontitle}>
          Meditations Completed
        </Text>
        {renderMeditationProgressBar()}
        <Text style={styles.serenitywelcsectiontitle}>Mood Balance Bar</Text>
        {renderProgressBar()}
        <View style={styles.moodStatsContainer}>
          {Object.keys(moodDetails).map(key => (
            <View key={key} style={styles.moodStatRow}>
              <Image source={moodDetails[key].img} style={styles.moodIcon} />

              <Text style={styles.moodCount}>x {normalizedMoodStats[key]}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/serenitybg.png')}
      style={{ flex: 1 }}
    >
      <View style={{ height: 80, backgroundColor: '#B80019' }} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {renderRecommendations()}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  serenitycnt: {},
  serenitywelctitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    fontStyle: 'italic',
    width: '60%',
    marginTop: 50,
    marginBottom: 20,
  },
  progressBarContainer: {
    height: 44,
    width: '90%',
    borderRadius: 22,
    overflow: 'hidden',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 15,
    backgroundColor: '#000',
  },
  progressSegment: {
    height: '100%',
  },
  moodStatsContainer: {
    width: '90%',
    marginTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  moodStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  moodCount: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
  },
  serenitywelcsectiontitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
  },
  serenitywelcsubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    fontStyle: 'italic',
    width: '60%',
    marginTop: 8,
  },
  serenitybreathprogresstext: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 5,
    position: 'absolute',
    width: '100%',
    top: 6,
    fontFamily: 'Sansation-Regular',
    fontSize: 20,
  },
});

export default SenerityBloomStats;
