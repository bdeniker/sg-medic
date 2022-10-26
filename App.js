import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {AppRegistry, SafeAreaView, StyleSheet} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Diagnose from './screens/diagnose';
import Injury from './screens/injury';

AppRegistry.registerComponent('NfcManagerDev', () => App);
NfcManager.start().catch(error => console.error('Ohno, NFC failed\n' + error));
const Tab = createBottomTabNavigator();

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.homepage}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Injury') {
                iconName = 'user-injured';
              } else if (route.name === 'Diagnose') {
                iconName = 'user-nurse';
              }

              // You can return any component that you like here!
              // return <Ionicons name={iconName} size={size} color={color} />;
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Injury" component={Injury} />
          <Tab.Screen name="Diagnose" component={Diagnose} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  homepage: {
    backgroundColor: Colors.darker,
    flex: 1,
  },
  homeView: {
    margin: 10,
  },
});

export default App;
