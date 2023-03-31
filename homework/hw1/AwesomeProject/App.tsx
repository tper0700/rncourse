/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import { Feline } from './cat'

const mainbg = "#ebebd3";
const mainbg_dark = "#8C5e58";
const headingbg = "#083D77";
const textcol = "#000000";
const textcol_dark = "#ffffff";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const darker =  "#333355";
  const lighter = "#ffdcdc";
  const headingbg = "#262424";
  const headingfg = "#e5dada";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? mainbg : mainbg,
  };

  const appStyles = StyleSheet.create({
    Heading: {
      height: 150,
      backgroundColor: headingbg,
      alignItems: "center",
      justifyContent: "center",
    },
    TitleText: {
      fontSize: 42,
      color: headingfg,
    },
    SubTitle: {
      fontSize: 14,
      color: headingfg,
    }
  });
  
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={darker}
      />
      <View style={appStyles.Heading}>
      <Text style={appStyles.TitleText}>Hello world</Text>
      <Text style={appStyles.SubTitle}>and welcome to your cat collection</Text>
      </View>
      <View
        style={backgroundStyle}>
        <FlatList
        data={[
          {key: 'User 1'},
          {key: 'User 2'},
          {key: 'User 3'},
          {key: 'User 4'},
          {key: 'User 5'},
          {key: 'User 6'},
          {key: 'User 7'},
          {key: 'User 8'},
          {key: 'User 9'},
          {key: 'User 10'},
        ]}
        renderItem={({item}) => <Feline cat={item.key}/>}
      />
      </View>
    </SafeAreaView>
  );
}

export default App;
