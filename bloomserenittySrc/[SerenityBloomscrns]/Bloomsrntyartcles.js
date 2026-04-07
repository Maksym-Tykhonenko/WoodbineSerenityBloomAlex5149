// articles screen

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useEffect, useMemo, useState } from 'react';

import { useStore } from '../bloomstorecntx/serenitybloomctxt';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SAVED_ARTICLES_STORAGE_KEY = 'serenitySavedArticles';

const meditationArticles = [
  {
    id: 'med-1',
    title: 'The Power of Simple Meditation',
    text: 'Meditation is one of the easiest ways to bring calm into your daily routine. It does not require special equipment or a perfect environment. All you need is a quiet moment and the willingness to slow down. Even a few minutes can help reset your mind.\n\nWhen you meditate, your attention gently moves away from daily distractions. Instead of reacting to stress, you observe your thoughts and let them pass. This creates space between your emotions and your reactions. Over time, this habit builds emotional balance.\n\nA simple way to start is by focusing on your breathing. Sit comfortably and notice each inhale and exhale. When your mind wanders, gently bring your attention back to your breath. This small action trains your mind to stay present.\n\nWith regular practice, meditation can improve concentration and inner calm. It helps you become more aware of your thoughts and feelings. Many people notice that they respond to situations more thoughtfully. Meditation is not about perfection-it is about presence.',
    image: require('../../assets/images/sereniemedart1.png'),
  },
  {
    id: 'med-2',
    title: 'Finding Calm Through Breath Awareness',
    text: 'Breath awareness is one of the most common meditation techniques. It focuses on the natural rhythm of breathing. By paying attention to your breath, your mind slowly settles into a calmer state. This simple practice is accessible for beginners.\n\nStart by sitting in a comfortable position with your back relaxed. Close your eyes if it feels natural, or keep a soft gaze downward. Notice how the air moves in and out of your body. Try not to control the breath-just observe it.\n\nWhen thoughts appear, gently acknowledge them without judgment. Your mind may wander many times during meditation. Each time you return to your breath, you strengthen your focus. This is part of the practice.\n\nWith time, breath meditation becomes easier and more natural. It can help reduce stress and tension in the body. Many people use this method during busy days to reset their mind. Just a few mindful breaths can change how you feel.',
    image: require('../../assets/images/sereniemedart2.png'),
  },
  {
    id: 'med-3',
    title: 'Creating a Daily Meditation Habit',
    text: 'Starting a meditation habit can feel challenging at first. Many people think they need long sessions to benefit from meditation. In reality, consistency is more important than duration. Even five minutes a day can make a difference.\n\nChoose a quiet time in your day to practice. Morning meditation can set a calm tone for the day. Evening meditation can help release tension before sleep. The most important part is making it part of your routine.\n\nYou may begin with guided breathing or silent observation. Focus on how your body feels as you sit or breathe. Notice sensations without trying to change them. This awareness strengthens your connection to the present moment.\n\nOver time, meditation becomes a natural pause in your day. It helps create space between activity and rest. Many people find they feel more balanced and focused. Small daily practices often lead to meaningful long-term changes.',
    image: require('../../assets/images/sereniemedart3.png'),
  },
  {
    id: 'med-4',
    title: 'Understanding Mindfulness Meditation',
    text: 'Mindfulness meditation focuses on observing the present moment. Instead of thinking about the past or worrying about the future, you bring attention to what is happening now. This practice helps develop awareness and acceptance. It encourages a calm and steady mind.\n\nDuring mindfulness meditation, you may focus on breathing, body sensations, or sounds around you. The goal is not to stop thoughts completely. Instead, you notice them and allow them to pass without reacting. This creates a sense of mental clarity.\n\nMindfulness can also be practiced during everyday activities. Walking, eating, or even washing dishes can become mindful moments. Simply bring your attention to what you are doing. This helps you experience daily life more fully.\n\nWith regular practice, mindfulness meditation supports emotional balance. It helps you notice stress earlier and respond calmly. Many people find that mindfulness improves their focus and patience. It teaches the mind to slow down and observe.',
    image: require('../../assets/images/sereniemedart4.png'),
  },
  {
    id: 'med-5',
    title: 'The Benefits of Quiet Reflection',
    text: 'Meditation creates space for quiet reflection. In a busy world, moments of stillness are often rare. Taking time to sit quietly allows your mind to rest and reorganize. This simple pause can bring surprising clarity.\n\nReflection during meditation does not mean analyzing every thought. Instead, it means allowing thoughts to appear and fade naturally. This gentle awareness helps reduce mental tension. Over time, it becomes easier to let go of unnecessary worries.\n\nMany people notice physical benefits as well. Meditation can relax the body and slow the breath. Muscles release tension and the nervous system begins to calm. These effects support both mental and physical well-being.\n\nQuiet reflection also encourages self-understanding. When the mind becomes calm, it is easier to see what truly matters. Meditation creates a peaceful space for this awareness. It is a simple practice that supports balance in everyday life.',
    image: require('../../assets/images/sereniemedart5.png'),
  },
];

const breathingArticles = [
  {
    id: 'breath-1',
    title: 'The Power of Conscious Breathing',
    text: 'Breathing is something we do automatically every day, yet we rarely notice it. Conscious breathing means paying attention to how we inhale and exhale. This simple awareness can calm the mind and relax the body. Even a few slow breaths can reduce tension.\n\nWhen you focus on breathing, your nervous system begins to slow down. The body receives a signal that it is safe to relax. Heart rate gradually decreases, and the mind becomes quieter. This natural response helps reduce stress.\n\nTo practice, sit comfortably and breathe in slowly through your nose. Let the breath fill your lungs, then gently exhale through your mouth. Try to keep the breath smooth and steady. Continue for a few minutes.\n\nWith regular practice, conscious breathing becomes a powerful tool. It can help during stressful moments or busy days. Many people use it to regain focus and emotional balance. A calm breath often leads to a calm mind.',
    image: require('../../assets/images/sereniebreaart1.png'),
  },
  {
    id: 'breath-2',
    title: 'Deep Belly Breathing',
    text: "Belly breathing, also called diaphragmatic breathing, is a simple technique that encourages deeper breaths. Instead of breathing only into the chest, the breath moves into the lower lungs. This allows the body to receive more oxygen. It also helps release physical tension.\n\nPlace one hand on your chest and the other on your stomach. As you inhale, try to expand your belly rather than your chest. You should feel your stomach gently rise. When you exhale, let the belly fall naturally.\n\nThis technique activates the body's relaxation response. It slows the heart rate and eases tight muscles. Many people use belly breathing to manage anxiety or fatigue. It is especially helpful before sleep.\n\nPracticing belly breathing daily can improve overall well-being. It encourages deeper and more efficient breathing habits. Over time, your body learns to breathe more naturally and calmly. This simple exercise supports both mind and body.",
    image: require('../../assets/images/sereniebreaart2.png'),
  },
  {
    id: 'breath-3',
    title: 'The 4-4 Breathing Technique',
    text: 'The 4-4 breathing technique is a structured breathing exercise. It involves inhaling and exhaling for the same amount of time. This rhythm helps stabilize the breath and calm the mind. It is easy to practice anywhere.\n\nBegin by inhaling slowly through your nose for four seconds. Pause briefly, then exhale gently through your mouth for four seconds. Try to keep the rhythm smooth and comfortable. Repeat the cycle several times.\n\nThis balanced breathing pattern helps regulate the nervous system. It brings attention to the present moment and reduces mental tension. Many people find that it improves focus and clarity. It can also be helpful during stressful situations.\n\nYou can practice this technique for two to five minutes. It works well during short breaks in your day. The steady rhythm helps your body feel grounded and relaxed. With practice, it becomes a natural calming habit.',
    image: require('../../assets/images/sereniebreaart3.png'),
  },
  {
    id: 'breath-4',
    title: 'Breathing to Reduce Stress',
    text: 'Stress often changes the way we breathe. When we feel anxious, breathing becomes shallow and quick. This can make the body feel even more tense. Conscious breathing helps reverse this cycle.\n\nStart by taking a slow breath through your nose. Let the air fill your lungs comfortably. Then release the breath slowly through your mouth. Imagine tension leaving your body with each exhale.\n\nAs you continue breathing slowly, your muscles begin to relax. Your thoughts may become clearer and more focused. The body gradually moves from a state of tension to calm. This process may take only a few minutes.\n\nUsing breathing exercises during stressful moments can be very effective. It creates a pause before reacting to a situation. Over time, this simple practice improves emotional resilience. Calm breathing leads to calm responses.',
    image: require('../../assets/images/sereniebreaart4.png'),
  },
  {
    id: 'breath-5',
    title: 'Breathing as a Daily Reset',
    text: 'Breathing exercises can serve as a daily reset for the mind. During busy days, our thoughts often become scattered and restless. Taking a moment to breathe slowly helps restore balance. It creates a pause between activities.\n\nA simple breathing reset can take less than a minute. Inhale slowly, then exhale just as slowly. Focus only on the movement of air entering and leaving your body. Let other thoughts fade into the background.\n\nThese short breathing breaks help reduce mental fatigue. They also improve concentration and energy levels. Many people use them before meetings, studying, or creative work. A few calm breaths can refresh the mind.\n\nOver time, breathing exercises become a natural part of your routine. They remind you to slow down and reconnect with the present moment. Small mindful pauses can greatly improve daily well-being. Every breath offers a chance to begin again.',
    image: require('../../assets/images/sereniebreaart5.png'),
  },
];

const sections = ['Meditations', 'Breathing', 'Saved'];

const Bloomsrntyartcles = () => {
  const { isOnSerenityNtf } = useStore();
  const [activeSection, setActiveSection] = useState('Meditations');
  const [savedArticleIds, setSavedArticleIds] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const allArticles = useMemo(
    () => [...meditationArticles, ...breathingArticles],
    [],
  );

  const displayedArticles = useMemo(() => {
    if (activeSection === 'Meditations') {
      return meditationArticles;
    }

    if (activeSection === 'Breathing') {
      return breathingArticles;
    }

    return allArticles.filter(article => savedArticleIds.includes(article.id));
  }, [activeSection, allArticles, savedArticleIds]);

  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        const stored = await AsyncStorage.getItem(SAVED_ARTICLES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setSavedArticleIds(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.log('Failed to load saved articles', error);
      }
    };

    loadSavedArticles();
  }, []);

  const toggleSaveArticle = async articleId => {
    try {
      const isSavedNow = savedArticleIds.includes(articleId);
      const nextSavedIds = isSavedNow
        ? savedArticleIds.filter(id => id !== articleId)
        : [...savedArticleIds, articleId];

      setSavedArticleIds(nextSavedIds);
      await AsyncStorage.setItem(
        SAVED_ARTICLES_STORAGE_KEY,
        JSON.stringify(nextSavedIds),
      );

      if (isOnSerenityNtf) {
        Toast.show({
          text1: isSavedNow
            ? 'Article removed successfully'
            : 'Article saved successfully',
        });
      }
    } catch (error) {
      console.log('Failed to save article', error);
    }
  };

  const shareArticle = async article => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.text}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/serenityappbg.png')}
      style={styles.background}
    >
      <View style={styles.topBar}>
        {!selectedArticle && (
          <View style={styles.tabsWrap}>
            {sections.map(section => {
              const isActive = activeSection === section;
              return (
                <TouchableOpacity
                  key={section}
                  activeOpacity={0.8}
                  style={[styles.tabButton, isActive && styles.activeTabButton]}
                  onPress={() => setActiveSection(section)}
                >
                  <Text
                    style={[
                      styles.tabLabel,
                      !isActive && styles.inactiveTabLabel,
                    ]}
                  >
                    {section}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screen}>
          {selectedArticle ? (
            <View style={styles.openedCard}>
              <Image
                source={selectedArticle.image}
                style={styles.openedImage}
              />
              <Text style={styles.openedTitle}>{selectedArticle.title}</Text>

              <ScrollView
                style={styles.openedTextWrap}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.openedText}>{selectedArticle.text}</Text>
              </ScrollView>

              <View style={styles.openedActions}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelectedArticle(null)}
                >
                  <Image
                    source={require('../../assets/images/serenityback.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => shareArticle(selectedArticle)}
                >
                  <Image
                    source={require('../../assets/images/serenityshare.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : activeSection === 'Saved' && displayedArticles.length === 0 ? (
            <View style={styles.emptyStateWrap}>
              <Image
                source={require('../../assets/images/sereniemptsa.png')}
                style={styles.emptyImage}
              />

              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>Nothing Saved Yet</Text>
                <Text style={styles.emptyText}>
                  You have not added any articles to your favorites. Save the
                  ones you like to easily return to them later.
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveSection('Meditations')}
              >
                <ImageBackground
                  source={require('../../assets/images/serenitybtn.png')}
                  style={styles.exploreButton}
                >
                  <Text style={styles.exploreText}>Explore</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cardsWrap}>
              {displayedArticles.map(article => {
                const isSaved = savedArticleIds.includes(article.id);
                return (
                  <View key={article.id} style={styles.card}>
                    <Image source={article.image} style={styles.cardImage} />
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{article.title}</Text>
                      <View style={styles.actionsRow}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => toggleSaveArticle(article.id)}
                        >
                          <Image
                            source={
                              isSaved
                                ? require('../../assets/images/serenitysaved.png')
                                : require('../../assets/images/serenityasav.png')
                            }
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => setSelectedArticle(article)}
                        >
                          <Image
                            source={require('../../assets/images/serenityplay.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => shareArticle(article)}
                        >
                          <Image
                            source={require('../../assets/images/serenityshare.png')}
                            style={styles.actionIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  topBar: {
    height: 80,
    backgroundColor: '#B80019',
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  scrollContent: {
    flexGrow: 1,
  },
  screen: {
    paddingHorizontal: 14,
    paddingBottom: 110,
    paddingTop: 20,
  },
  tabsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  tabButton: {
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 112,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTabButton: {
    borderColor: '#FFFFFF',
  },
  tabLabel: {
    color: '#FFFFFF',
    fontSize: 28 / 2,
    fontFamily: 'Sansation-Regular',
  },
  inactiveTabLabel: {
    color: '#AFAFAF',
  },
  cardsWrap: {
    gap: 12,
  },
  card: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(0, 0, 0, 0.73)',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 102,
    height: 97,
    borderRadius: 14,
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 12,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 17 / 1.1,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
  },
  actionsRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
    resizeMode: 'contain',
  },
  savedActionIcon: {
    tintColor: '#D2AC67',
  },
  emptyStateWrap: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyImage: {
    width: 220,
    height: 284,
    resizeMode: 'contain',
  },
  emptyCard: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.73)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 20,
    paddingVertical: 26,
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#F4F7F6',
    fontSize: 22,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    color: '#F4F7F6',
    fontSize: 20,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
    lineHeight: 33 / 1.2,
  },
  exploreButton: {
    width: 103,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  exploreText: {
    color: '#FFFFFF',
    fontSize: 30 / 2,
    fontFamily: 'Sansation-Bold',
  },
  openedCard: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(0, 0, 0, 0.73)',
    paddingHorizontal: 14,
    paddingVertical: 18,
    alignItems: 'center',
    minHeight: 640,
  },
  openedImage: {
    width: 205,
    height: 205,
    borderRadius: 12,
    marginBottom: 20,
  },
  openedTitle: {
    color: '#F4F7F6',
    fontSize: 16,
    fontFamily: 'Sansation-Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  openedTextWrap: {
    width: '100%',
    maxHeight: 290,
  },
  openedText: {
    color: '#F4F7F6',
    fontSize: 13,
    fontFamily: 'Sansation-Regular',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  openedActions: {
    marginTop: 14,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Bloomsrntyartcles;
