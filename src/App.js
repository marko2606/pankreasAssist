import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Router from './Router';

//console.disableYellowBox = true;
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <Router />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
