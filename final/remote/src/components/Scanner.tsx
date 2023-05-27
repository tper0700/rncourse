/**
 * QR Code UI Component
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
import { styles, headingBG } from '../Styles';
import { Server, coord } from '../Types';

import { RNCamera } from 'react-native-camera';

////////////
// QR Code component
function Scanner(props: {
    setServer: Function,
    location: coord,
  }): JSX.Element {

  function onScan(e : any) {
    let info : string = e.data;
    console.log("SCAN: " + info);
    if (info.indexOf("MEDIASERVER {") == 0) {
      console.log("Got Data:===============")
      let data : Server = JSON.parse(info.slice(12));
      data.lat = props.location.lat;
      data.lon = props.location.lon;
      console.log(data);
      props.setServer(data);
    }
  }

  return (
    <View style={{
      flex: 1,
      width: '100%',
      }}>
    <RNCamera
      style={{
      flex: 1,
      width: '100%',
      }}
      captureAudio={false}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.off}
      onBarCodeRead={onScan}
    ></RNCamera>
    </View>
  );
}

export default Scanner;
