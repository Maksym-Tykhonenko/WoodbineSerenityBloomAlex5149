import { ImageBackground, ScrollView, View } from 'react-native';

const SerenityBloomLayout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/serenityappbg.png')}
      style={{ flex: 1 }}
    >
      <View style={{ height: 80, backgroundColor: '#B80019' }} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default SerenityBloomLayout;
