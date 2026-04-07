import React from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';

const SerenityBloomLoader = () => {
  const serenityBloomHtmlLoader = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body {
    margin: 0;
    padding: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    position: relative;
    transform: rotate(45deg);
    width: 3.5rem;
    height: 3.5rem;
  }

  .loader-inner {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #db3434;
    animation: loader_05101 1.2s linear infinite;
  }

  .loader-inner:nth-child(1) { top:0; left:0; animation-delay:0s; }
  .loader-inner:nth-child(2) { top:0; left:1.5rem; animation-delay:0.1s; }
  .loader-inner:nth-child(3) { top:0; left:3rem; animation-delay:0.2s; }

  .loader-inner:nth-child(4) { top:1.5rem; left:0; animation-delay:0.3s; }
  .loader-inner:nth-child(5) { top:1.5rem; left:1.5rem; animation-delay:0.4s; }
  .loader-inner:nth-child(6) { top:1.5rem; left:3rem; animation-delay:0.5s; }

  .loader-inner:nth-child(7) { top:3rem; left:0; animation-delay:0.6s; }
  .loader-inner:nth-child(8) { top:3rem; left:1.5rem; animation-delay:0.7s; }
  .loader-inner:nth-child(9) { top:3rem; left:3rem; animation-delay:0.8s; }

  @keyframes loader_05101 {
    0% { transform: scale(0); }
    100% { transform: scale(2); opacity: 0; }
  }
</style>
</head>

<body>
<div class="loader-container">
  <div class="loader">
    <div class="loader-inner"></div>
    <div class="loader-inner"></div>
    <div class="loader-inner"></div>
    <div class="loader-inner"></div>
    <div class="loader-inner"></div>
    <div class="loader-inner"></div>
    <div class="loader-inner"></div>
    <div class="loader-inner"></div>
    <div class="loader-inner"></div>
  </div>
</div>
</body>
</html>
  `;

  return (
    <ImageBackground
      source={require('../../assets/images/serenitybg.png')}
      style={{ flex: 1, width: '101%' }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <Image
            source={require('../../assets/images/serenitybloomloader.png')}
            style={{ alignSelf: 'center', marginBottom: 100 }}
          />
        </View>
        <View style={styles.loaderwrap}>
          <WebView
            originWhitelist={['*']}
            source={{ html: serenityBloomHtmlLoader }}
            style={{ width: 220, height: 90, backgroundColor: 'transparent' }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loadercnt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderwrap: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});

export default SerenityBloomLoader;
