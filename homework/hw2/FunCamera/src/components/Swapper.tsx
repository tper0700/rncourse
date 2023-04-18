import React, { useState, useRef } from 'react';
import {Asset} from 'react-native-image-picker';
import { PhotoManipulator, Point } from 'react-native-photo-manipulator';
import { Rect } from "./Face";

import {
  Text,
  Pressable,
  View,
} from 'react-native';

import { styles } from '../Styles';

const mainbg = "#ebebd3";

////////////
// Implements the swap faces button using RN-Photo-Manipulator
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
      let sizeA = {width: props.rectB.width, height: props.rectB.height};
      let sizeB = {width: props.rectA.width, height: props.rectA.height};
      let cropA = await PhotoManipulator.crop(pathA, props.rectA, sizeA);
      let cropB = await PhotoManipulator.crop(pathB, props.rectB, sizeB);
      let posA : Point = { x: props.rectA.x, y: props.rectA.y };
      let posB : Point = { x: props.rectB.x, y: props.rectB.y };
      let swapA = await PhotoManipulator.overlayImage(pathA, cropB, posA)
      let swapB = await PhotoManipulator.overlayImage(pathB, cropA, posB)

      let asA : Asset = {uri: swapA};
      let asB : Asset = {uri: swapB};
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
