/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef } from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  useColorScheme,
  View,
  Image,
  FlatList,
} from 'react-native';

import { Face } from './Face'

const mainbg = "#ebebd3";

// Everyone has three cats to start!
let catList = [
  { id: 0, name: "Fuzzy the cat" },
  { id: 1, name: "Herbie" },
  { id: 2, name: "Miki" }
]

let nextIndex = 3;

// Names you can name your cats
let moreCatNames = [
  "Fizzy", "Tiki", "Furby", "Fat cat", "Sphinx", "Cleo", "Boots", "Misty", "Ivy", "Mittens", "Rosie"
]

////////////
// Main application
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const headingbg = "#262424";
  const headingfg = "#e5dada";

  const appStyles = StyleSheet.create({
    Main: {
      backgroundColor: isDarkMode ? mainbg : mainbg,
      flex: 1,
    },
    List: {
      flexGrow: 1,
    },
    ContainerView: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
    },  
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
    },
    ButtonBasic: {
      height: 45,
      justifyContent: "center",
      borderRadius: 8,
      padding: 10,
      margin: 2,
    },
    ButtonUp: {
      backgroundColor: "orange",
    },
    ButtonDown: {
      backgroundColor: "red",
    },
    ButtonLabel: {
      fontSize: 24,
      color: "white"
    }
  });
  
  // Define state variables for "global data"
  const [ catListState, setCatListState ] = useState(catList.slice());
  const [ countState, setCountState ] = useState("You have " + catList.length + " cats.");
  const [ imageState, setImageState ] = useState(null);

  // Event handler to add a cat.
  function Swap() {
    console.log("swap pictures")
  }

  return (
    <SafeAreaView style={appStyles.Main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={headingbg}
      />
      <View style={appStyles.Heading}>
        <Text style={appStyles.TitleText}>Awesome Camera</Text>
        <Text style={appStyles.SubTitle}>and welcome to your cat collection!</Text>
        <Text style={appStyles.SubTitle}>{countState}</Text>
      </View>
      <View style={appStyles.ContainerView}>
      <Face name="Press Snapshot..."/>
      <Face name="Press Snapshot..."/>
      </View>
      <Pressable
        style={({pressed}) => [ appStyles.ButtonBasic, pressed ? appStyles.ButtonDown : appStyles.ButtonUp ]}
        onPress={Swap}
        >
        <Text style={appStyles.ButtonLabel}>Swap</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default App;
