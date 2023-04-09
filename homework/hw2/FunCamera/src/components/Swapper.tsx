import React, { useState, useRef } from 'react';
import {Asset} from 'react-native-image-picker';
import Jimp from "jimp";
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
  }) {

  // Swap pictures
  function Swap() {
    console.log("swap pictures")
  }

  return props.imgA && props.imgB ? <View>
    <Pressable
        style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
        onPress={Swap}
        >
        <Text style={styles.ButtonLabel}>Swap Faces</Text>
    </Pressable>
    <Text>Image A: { props.imgA ? props.imgA.uri : "not set" }</Text>
    <Text>Rect A: { props.rectA ? JSON.stringify(props.rectA) : "not set" }</Text>
    <Text>Image B: { props.imgB ? props.imgB.uri : "not set" }</Text>
    <Text>Rect B: { props.rectB ? JSON.stringify(props.rectB) : "not set" }</Text>
    </View> : <View>
    <Text>Select Some images to swap!</Text>
    </View>
    ;
}

export { Swapper };
