// home screen
import SenerityBloomBreathCard from '../[bloomserenitycmpnts]/SenerityBloomBreathCard';
import { serenityquizques } from '../bloomserenitydtta/serenityquizques';
import SerenityBloomLayout from '../[bloomserenitycmpnts]/SerenityBloomLayout';
import { useCallback, useState } from 'react';

import { useStore } from '../bloomstorecntx/serenitybloomctxt';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { serenitybloommedt } from '../bloomserenitydtta/serenitybloommedt';
import { serenitybloombreathing } from '../bloomserenitydtta/serenitybloombreathing';
import SerenityBloomCard from '../[bloomserenitycmpnts]/SerenityBloomCard';

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

const SenerityBloomHome = () => {
  const [serenityBloomQuizStarted, setSerenityBloomQuizStarted] =
    useState(false);
  const [serenityBloomCurrentQ, setSerenityBloomCurrentQ] = useState(0);
  const [serenityBloomSelectedOption, setSerenityBloomSelectedOption] =
    useState(null);
  const [serenityBloomAnswers, setSerenityBloomAnswers] = useState([]);

  const {
    moodStats,
    setMoodStats,
    quizResult,
    setQuizResult,
    setIsOnMeditationsMusic,
    setIsOnSerenityNtf,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadSerenityBloomSettings();
      loadSerenityBloomQuizResult();
      loadSerenityBloomMoodStats();
    }, []),
  );

  const loadSerenityBloomMoodStats = async () => {
    const stats = await AsyncStorage.getItem('moodStats');
    if (stats) setMoodStats(JSON.parse(stats));
  };

  const saveMoodStats = async newStats => {
    setMoodStats(newStats);
    await AsyncStorage.setItem('moodStats', JSON.stringify(newStats));
  };

  const loadSerenityBloomSettings = async () => {
    try {
      const crovvnMusicValue = await AsyncStorage.getItem(
        'SerenityBloomMeditationMusic',
      );
      setIsOnMeditationsMusic(JSON.parse(crovvnMusicValue));

      const crovvnNotifValue = await AsyncStorage.getItem('SerenityBloomNtf');
      if (crovvnNotifValue !== null)
        setIsOnSerenityNtf(JSON.parse(crovvnNotifValue));
    } catch (e) {
      console.error(e);
    }
  };

  const loadSerenityBloomQuizResult = async () => {
    const result = await AsyncStorage.getItem('quizResult');
    if (result) setQuizResult(result);
  };

  const handleSerenityOptionConfirm = async () => {
    if (!serenityBloomSelectedOption) {
      Alert.alert('Please select an option');
      return;
    }

    const updatedAnswers = [
      ...serenityBloomAnswers,
      serenityBloomSelectedOption,
    ];
    setSerenityBloomAnswers(updatedAnswers);
    setSerenityBloomSelectedOption(null);

    if (serenityBloomCurrentQ + 1 < serenityquizques.length) {
      setSerenityBloomCurrentQ(serenityBloomCurrentQ + 1);
    } else {
      const resultType = calculateSerenityQuizResult(updatedAnswers);
      await AsyncStorage.setItem('quizResult', resultType);
      setQuizResult(resultType);
      setSerenityBloomQuizStarted(false);

      const newStats = { ...moodStats };
      newStats[resultType] = (newStats[resultType] || 0) + 1;
      saveMoodStats(newStats);
    }
  };

  const calculateSerenityQuizResult = answersArray => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    answersArray.forEach(ans => counts[ans]++);

    let maxCount = Math.max(...Object.values(counts));
    const maxTypes = Object.keys(counts).filter(k => counts[k] === maxCount);
    if (maxTypes.length > 1) return answersArray[answersArray.length - 1];
    return maxTypes[0];
  };

  const renderQuiz = () => (
    <View style={styles.serenityBloomQuizContainer}>
      <View
        style={[
          styles.serenityBloomWelcCont,
          { flexDirection: 'column', padding: 20 },
        ]}
      >
        <Text style={styles.serenityBloomQuestTxt}>
          {serenityquizques[serenityBloomCurrentQ].question}
        </Text>
        <View style={styles.serenityBloomIndicator}>
          {serenityquizques.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.serenityBloomDot,
                idx <= serenityBloomCurrentQ
                  ? styles.serenityBloomActiveDot
                  : {},
              ]}
            />
          ))}
        </View>
      </View>

      {serenityquizques[serenityBloomCurrentQ].options.map(opt => (
        <TouchableOpacity
          key={opt.type}
          style={[
            styles.serenityBloomOptCont,
            serenityBloomSelectedOption === opt.type
              ? styles.serenityBloomSelectedOption
              : {},
          ]}
          onPress={() => setSerenityBloomSelectedOption(opt.type)}
        >
          <Text style={styles.serenityBloomOptionText}>{opt.text}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        disabled={!serenityBloomSelectedOption}
        onPress={handleSerenityOptionConfirm}
        style={{ alignSelf: 'center', marginTop: 50 }}
        activeOpacity={0.7}
      >
        <ImageBackground
          source={require('../../assets/images/serenitybtn.png')}
          style={{
            width: 103,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: serenityBloomSelectedOption ? 1 : 0.5,
          }}
        >
          <Text style={styles.serenityBloomBtnText}>Confirm</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  const renderRecommendations = () => {
    if (!quizResult) return null;

    const mood = moodDetails[quizResult];

    return (
      <View>
        <View style={[styles.serenityBloomWelcCont, { marginBottom: 0 }]}>
          <Image source={require('../../assets/images/serenityhomewm.png')} />
          <Text style={styles.serenityBloomWelcTitle}>
            One mindful minute can change the tone of your day.
          </Text>
        </View>
        <View
          style={[
            styles.serenityStarCont,
            {
              marginTop: 17,
              marginBottom: 12,
            },
          ]}
        >
          <Image source={mood.img} style={{ position: 'absolute', left: 10 }} />
          <View style={{ alignItems: 'center', width: '98%' }}>
            <Text style={styles.serenityBloomWelcStarTitle}>
              {mood.description}
            </Text>
            <Text style={styles.serenityBloomWelcStarSubtitle}>
              {mood.advice}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
          <Text style={styles.serenityBloomWelcSectionTitle}>
            Recommended meditation:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {mood.breathing.map(b => (
              <SenerityBloomBreathCard article={b} key={b.id} />
            ))}
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginBottom: 8,
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.serenityBloomWelcSectionTitle}>
            Recommended breathing exercises:
          </Text>
          <SerenityBloomCard article={mood.meditation} />
        </View>
      </View>
    );
  };

  return (
    <SerenityBloomLayout>
      <View style={styles.serenityBloomCnt}>
        {!serenityBloomQuizStarted && !quizResult && (
          <>
            <View style={styles.serenityBloomWelcCont}>
              <Image
                source={require('../../assets/images/serenityhomewm.png')}
              />
              <Text style={styles.serenityBloomWelcTitle}>
                One mindful minute can change the tone of your day.
              </Text>
            </View>
            <Image
              source={require('../../assets/images/serenityhomelot.png')}
              style={{ alignSelf: 'center' }}
            />
            <View
              style={[
                styles.serenityBloomWelcCont,
                { paddingBottom: 30, padding: 30 },
              ]}
            >
              <Text style={[styles.serenityBloomWelcTitle, { width: '100%' }]}>
                You haven’t done your daily check-in yet. Tap “Start” whenever
                you feel ready.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setSerenityBloomQuizStarted(true);
                setSerenityBloomCurrentQ(0);
                setSerenityBloomAnswers([]);
              }}
              style={{ alignSelf: 'center' }}
              activeOpacity={0.7}
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
                <Text style={styles.serenityBloomBtnText}>Start</Text>
              </ImageBackground>
            </TouchableOpacity>
          </>
        )}
        {serenityBloomQuizStarted && renderQuiz()}
        {!serenityBloomQuizStarted && quizResult && renderRecommendations()}
      </View>
    </SerenityBloomLayout>
  );
};

const styles = StyleSheet.create({
  serenityBloomCnt: { paddingBottom: 110 },
  serenityBloomWelcCont: {
    width: '90%',
    marginBottom: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 22,
    padding: 16,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'center',
    marginTop: 26,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  serenityStarCont: {
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    gap: 8,
  },
  serenityBloomBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  serenityBloomWelcTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    fontStyle: 'italic',
    width: '60%',
  },
  serenityBloomWelcStarTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    fontStyle: 'italic',
    width: '60%',
  },
  serenityBloomQuizContainer: { padding: 20, justifyContent: 'center' },
  serenityBloomIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  serenityBloomDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#656565',
    margin: 5,
  },
  serenityBloomActiveDot: { backgroundColor: '#E30800' },
  serenityBloomSelectedOption: { backgroundColor: '#ab0f09ff' },
  serenityBloomOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
  },
  serenityBloomWelcSectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    marginBottom: 8,
  },
  serenityBloomWelcSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    fontStyle: 'italic',
    width: '60%',
    marginTop: 8,
  },
  serenityBloomWelcStarSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    fontStyle: 'italic',
    width: '70%',
    marginTop: 8,
  },
  serenityBloomQuestTxt: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
    width: '70%',
  },
  serenityBloomOptCont: {
    width: '90%',
    marginBottom: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.61)',
    borderRadius: 22,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default SenerityBloomHome;
