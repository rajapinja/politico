// App.js
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
//import { ThemeProvider } from './src/app/ThemeContext';
import { ThemeProvider } from './src/app/LightDarkContext';
import AppNavigator from './src/navigation/index';
import { UserProvider } from './src/app/UserContext';
import RadioButton from './src/components/RadioButton';
import GradientBanner from './src/components/Header';

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <SafeAreaView style={styles.container}>
          {/* <GradientBanner text="Score Recorder" /> */}
          <AppNavigator />
          {/* <RadioButton />          */}
        </SafeAreaView>
      </ThemeProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
