/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import { Feline } from './cat'

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

  // Event handler to add a cat.
  function addCat() {
    let newCat = moreCatNames.pop();
    if (newCat) {
      catList.push({ id: nextIndex++, name: newCat });
      setCatListState(catList.slice()); // force update by sending copy
      if (moreCatNames.length == 0) {
        setCountState("You have " + catList.length + " cats, that's too many!");
      } else {
        setCountState("You have " + catList.length + " cats.");
      }
    }
  }

  // Event handler to remove a cat
  function removeCat(index) {
    let oldcat = catList[index];
    catList.splice(index, 1);
    moreCatNames.push(oldcat.name);
    setCatListState(catList.slice()); // force update by sending copy
    if (catList.length == 0) {
      setCountState("You have no cats! Are you ok?");
    } else {
      setCountState("You have " + catList.length + " cats.");
    }
}

  // make a single row of cats
  function renderCat (entry) {
    return <Feline cat={entry.item.name} index={entry.index} onRemove={removeCat}/>
  }

  return (
    <SafeAreaView style={appStyles.Main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={headingbg}
      />
      <View style={appStyles.Heading}>
        <Text style={appStyles.TitleText}>Hello world</Text>
        <Text style={appStyles.SubTitle}>and welcome to your cat collection!</Text>
        <Text style={appStyles.SubTitle}>{countState}</Text>
      </View>
      <FlatList
        style={appStyles.List}
        data={ catListState }
        extraData={ catListState }
        renderItem={ renderCat }
      />
      <Pressable
        style={({pressed}) => [ appStyles.ButtonBasic, pressed ? appStyles.ButtonDown : appStyles.ButtonUp ]}
        onPress={addCat}
        >
        <Text styles={appStyles.ButtonLabel}>Adopt a cat</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default App;
