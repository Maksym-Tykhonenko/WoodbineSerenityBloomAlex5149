import { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const SenerityBloomBreathCard = ({ article }) => {
  const [showBreathingArtDetails, setShowBreathingArtDetails] = useState(false);
  const [opened, setOpened] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkOpened = async () => {
        try {
          const openedSessions = await AsyncStorage.getItem(
            'openedBreathingSessions',
          );
          if (openedSessions) {
            const parsed = JSON.parse(openedSessions);
            if (parsed.includes(article.id)) {
              setOpened(true);
              setShowBreathingArtDetails(true);
            }
          }
        } catch (err) {
          console.log('Error reading breathing sessions', err);
        }
      };
      checkOpened();
    }, [article.id]),
  );

  const handleOpenSession = async () => {
    setShowBreathingArtDetails(true);

    try {
      const openedSessions = await AsyncStorage.getItem(
        'openedBreathingSessions',
      );
      let parsed = openedSessions ? JSON.parse(openedSessions) : [];

      if (!parsed.includes(article.id)) {
        parsed.push(article.id);
        await AsyncStorage.setItem(
          'openedBreathingSessions',
          JSON.stringify(parsed),
        );

        const statValue = await AsyncStorage.getItem('breathingStatsCount');
        const newCount = statValue ? Number(statValue) + 1 : 1;
        await AsyncStorage.setItem('breathingStatsCount', newCount.toString());

        setOpened(true);
      }
    } catch (err) {
      console.log('Error saving breathing session', err);
    }
  };

  return (
    <View style={[styles.serenitywelccont]}>
      <View style={styles.serenitywrapper}>
        {!showBreathingArtDetails ? (
          <>
            <Image
              source={article.senerityimg}
              style={{ width: '100%', height: 99, borderRadius: 12 }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ position: 'absolute' }}
              onPress={handleOpenSession}
            >
              <Image
                source={require('../../assets/images/serenityplaybl.png')}
              />
            </TouchableOpacity>
          </>
        ) : (
          <Text
            style={[
              styles.serenitywelcsubtitle,
              { minHeight: 70, marginTop: 10 },
            ]}
          >
            {article.seneritydesc}
          </Text>
        )}
      </View>

      <View style={{ alignItems: 'center', width: '80%' }}>
        <Text style={styles.serenitywelctitle}>{article.seneritylbl}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  serenitywelccont: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 22,
    padding: 9,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  serenitywelctitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    marginTop: 10,
  },
  serenitywelcsubtitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
  },
  serenitywrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default SenerityBloomBreathCard;
