/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef } from 'react';
import {Asset} from 'react-native-image-picker';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  useColorScheme,
  View,
  ScrollView,
} from 'react-native';

import { Face, Rect } from './components/Face'

const mainbg = "#ebebd3";

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
      height: 85,
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
  const [ imgA, setImageA ] = useState<Asset | null>(null);
  const [ rectA, setRectA ] = useState<Rect | null>(null);
  const [ imgB, setImageB ] = useState<Asset | null>(null);
  const [ rectB, setRectB ] = useState<Rect | null>(null);

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
        <Text style={appStyles.TitleText}>Fun Camera</Text>
        <Text style={appStyles.SubTitle}>take a few face snaps!</Text>
      </View>
      <ScrollView>
        <View style={appStyles.ContainerView}>
          <Face setImage={setImageA} setRect={setRectA}/>
          <Face setImage={setImageB} setRect={setRectB}/>
        </View>
        <Pressable
          style={({pressed}) => [ appStyles.ButtonBasic, pressed ? appStyles.ButtonDown : appStyles.ButtonUp ]}
          onPress={Swap}
          >
          <Text style={appStyles.ButtonLabel}>Swap Faces</Text>
        </Pressable>
        <Text>Image A: { imgA ? imgA.uri : "not set" }</Text>
        <Text>Rect A: { rectA ? JSON.stringify(rectA) : "not set" }</Text>
        <Text>Image B: { imgB ? imgB.uri : "not set" }</Text>
        <Text>Rect B: { rectB ? JSON.stringify(rectB) : "not set" }</Text>
        </ScrollView>
    </SafeAreaView>
  );
}

export default App;
