import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Injury from './screens/injury';
import Diagnose from './screens/diagnose';

const Tab = createBottomTabNavigator();

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.homepage}>
        <Tab.Navigator>
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
