/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Linking,
  Pressable,
  ScrollView,
} from 'react-native';

// UI Styles
import { styles, headingBG } from './Styles';

////////////
// Main application
function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={headingBG}
      />
      <View style={styles.Heading}>
        <Text style={styles.TitleText}>AppTemplate</Text>
        <Text style={styles.SubTitle}>AppTemplate subtitle!</Text>
      </View>
      <ScrollView>
        <Text>Enter content here...</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
