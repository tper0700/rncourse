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

  // Event handler for when RNCamera detects a QR Code
  function onScan(e : any) {
    let info : string = e.data;
    console.log("SCAN: " + info);
    // Server uses a "MEDIASERVER {<severdata>}" string in the QR Code.
    // This way we know we are looking at our QRCode.
    if (info.indexOf("MEDIASERVER {") == 0) {
      console.log("Got Data:===============")
      let data : Server = JSON.parse(info.slice(12));
      data.lat = props.location.lat;
      data.lon = props.location.lon;
      console.log(data);
      props.setServer(data);
    }
  }

  // Let RNCamera capture video until it sees a barcode.
  return (
    <View style={[styles.PlaybackSection, {
      flex: 1,
    }]}>
      <Text style={styles.Text}>QR Code Scanner</Text>
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
