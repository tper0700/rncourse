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
  Text,
  View,
  ScrollView,
} from 'react-native';

// Face component to show an input picture, and handle the buttons for taking pictures.
import { Face, Rect } from './components/Face';

// Swapper component implements the swap of faces.
import { Swapper } from './components/Swapper';

// UI Styles
import { styles, headingBG } from './Styles';

// Output component shows an output image and handles saving the file to device.
import { Output } from './components/Output';

////////////
// Main application
// Presents 3 main elements:
// 1. A view with two images representing the user input images
// 2. A Swapper component, when two images are selected, 
//    it displays a button to swap faces.
// 3. A view with two output images, this view is only shown once
//    output swapped images have been created.
function App(): JSX.Element {

  // Left input image file and face rect
  const [ imgA, setImageA ] = useState<Asset | null>(null);
  const [ rectA, setRectA ] = useState<Rect | null>(null);
  // Right input image file and face rect
  const [ imgB, setImageB ] = useState<Asset | null>(null);
  const [ rectB, setRectB ] = useState<Rect | null>(null);

  // Output swapped images
  const [ swapA, setSwapA ] = useState<Asset | null>(null);
  const [ swapB, setSwapB ] = useState<Asset | null>(null);

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
          setA={setSwapA}
          setB={setSwapB}
        />
        {
          swapA && swapB ? <View style={styles.ContainerView}>
          <Output imageFile={swapA}/>
          <Output imageFile={swapB}/>
        </View> : <Text>No output yet...</Text>
        }
        
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
