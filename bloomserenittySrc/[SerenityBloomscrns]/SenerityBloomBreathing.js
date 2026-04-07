// breathing screen

import { serenitybloombreathing } from '../bloomserenitydtta/serenitybloombreathing';
import SerenityBloomLayout from '../[bloomserenitycmpnts]/SerenityBloomLayout';
import { Dimensions, StyleSheet, View } from 'react-native';
import SenerityBloomBreathCard from '../[bloomserenitycmpnts]/SenerityBloomBreathCard';

const { height } = Dimensions.get('window');

const SenerityBloomBreathing = () => {
  return (
    <SerenityBloomLayout>
      <View style={styles.serenitycnt}>
        {serenitybloombreathing.map((article, index) => (
          <SenerityBloomBreathCard key={index} article={article} meditations />
        ))}
      </View>
    </SerenityBloomLayout>
  );
};

const styles = StyleSheet.create({
  serenitycnt: {
    paddingTop: height * 0.05,
    padding: 16,
    paddingBottom: 110,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default SenerityBloomBreathing;
