import React, { useState, useRef } from 'react';
import {Asset} from 'react-native-image-picker';
import RNPhotoManipulator from 'react-native-photo-manipulator';
import { Rect } from "./Face";

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

import { styles } from '../Styles';

const mainbg = "#ebebd3";

////////////
// Main application
const Swapper = function(props: {
    imgA: Asset | null,
    rectA: Rect | null,
    imgB: Asset | null,
    rectB: Rect | null,
    setA: Function,
    setB: Function,
  }) {

  // Swap pictures
  async function Swap() {
    if (!props.imgA || !props.imgB || !props.rectA || !props.rectB) {
      console.log("Unexpected swap without images");
      return;
    }
    let pathA = props.imgA.uri ? props.imgA.uri : "";
    let pathB = props.imgB.uri ? props.imgB.uri : "";

    try {
      let cropA = await RNPhotoManipulator.crop(pathA, props.rectA);
      let cropB = await RNPhotoManipulator.crop(pathB, props.rectB);

      let asA : Asset = {uri: cropA};
      let asB : Asset = {uri: cropB};
      props.setA(asA);
      props.setB(asB);
    } catch (e) {
      console.log(e);
    }
  }

  return props.imgA && props.imgB ? <View>
    <Pressable
        style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
        onPress={Swap}
        >
        <Text style={styles.ButtonLabel}>Swap Faces</Text>
    </Pressable>
    </View> : <View>
    <Text>Select Some images to swap!</Text>
    </View>
    ;
}

export { Swapper };
