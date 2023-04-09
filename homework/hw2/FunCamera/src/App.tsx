/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef } from 'react';
import {Asset} from 'react-native-image-picker';
import Jimp from "jimp";

import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { Face, Rect } from './components/Face';
import { Swapper } from './components/Swapper';
import { styles, headingBG } from './Styles';

////////////
// Main application
function App(): JSX.Element {

  // Define state variables for "global data"
  const [ imgA, setImageA ] = useState<Asset | null>(null);
  const [ rectA, setRectA ] = useState<Rect | null>(null);
  const [ imgB, setImageB ] = useState<Asset | null>(null);
  const [ rectB, setRectB ] = useState<Rect | null>(null);

  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={headingBG}
      />
      <View style={styles.Heading}>
        <Text style={styles.TitleText}>Fun Camera</Text>
        <Text style={styles.SubTitle}>take a few face snaps!</Text>
      </View>
      <ScrollView>
        <View style={styles.ContainerView}>
          <Face setImage={setImageA} setRect={setRectA}/>
          <Face setImage={setImageB} setRect={setRectB}/>
        </View>
        <Swapper 
          imgA={imgA}
          rectA={rectA}
          imgB={imgB}
          rectB={rectB}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
