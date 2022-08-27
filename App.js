/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import BigButton from './components/BigButton';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <SafeAreaView style={styles.homepage}>
      <View style={styles.homeView}>
        <BigButton
          title="Take wound"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <BigButton
          title="Diagnose wound"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>
    </SafeAreaView>
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
