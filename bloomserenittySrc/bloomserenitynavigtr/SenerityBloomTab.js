// bottom tab navigation

import SenerityBloomHome from '../[SerenityBloomscrns]/SenerityBloomHome';
import SenerityBloomStats from '../[SerenityBloomscrns]/SenerityBloomStats';
import Bloomsrntyartcles from '../[SerenityBloomscrns]/Bloomsrntyartcles';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';

import SenerityBloomSetup from '../[SerenityBloomscrns]/SenerityBloomSetup';

import SenerityBloomMed from '../[SerenityBloomscrns]/SenerityBloomMed';
import SenerityBloomBreathing from '../[SerenityBloomscrns]/SenerityBloomBreathing';

const Tab = createBottomTabNavigator();

const SenerityBloomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.serenitytabs,
        tabBarActiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="SenerityBloomHome"
        component={SenerityBloomHome}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.serenityicon,
                focused && { borderWidth: 1, borderColor: '#FFFFFF' },
              ]}
            >
              <Image
                source={require('../../assets/images/serenityhome.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SenerityBloomMed"
        component={SenerityBloomMed}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.serenityicon,
                focused && { borderWidth: 1, borderColor: '#FFFFFF' },
              ]}
            >
              <Image
                source={require('../../assets/images/serenitymed.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SenerityBloomBreathing"
        component={SenerityBloomBreathing}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.serenityicon,
                focused && { borderWidth: 1, borderColor: '#FFFFFF' },
              ]}
            >
              <Image
                source={require('../../assets/images/serenitybreath.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Bloomsrntyartcles"
        component={Bloomsrntyartcles}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.serenityicon,
                focused && { borderWidth: 1, borderColor: '#FFFFFF' },
              ]}
            >
              <Image
                source={require('../../assets/images/serenityartcls.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SenerityBloomStats"
        component={SenerityBloomStats}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.serenityicon,
                focused && { borderWidth: 1, borderColor: '#FFFFFF' },
              ]}
            >
              <Image
                source={require('../../assets/images/serenitystat.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SenerityBloomSetup"
        component={SenerityBloomSetup}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.serenityicon,
                focused && { borderWidth: 1, borderColor: '#FFFFFF' },
              ]}
            >
              <Image
                source={require('../../assets/images/serenitytracking.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  serenitytabs: {
    backgroundColor: '#B80019',
    elevation: 1,
    borderTopWidth: 1,
    borderTopColor: '#B80019',
    paddingTop: 20,
    paddingBottom: 13,
    justifyContent: 'center',
    position: 'absolute',
    height: 94,
    paddingHorizontal: 50,
  },
  serenityicon: {
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 3,
    alignItems: 'center',
  },
});

export default SenerityBloomTab;
