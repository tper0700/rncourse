/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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
import { styles, headingBG } from './Styles';

import Geolocation from '@react-native-community/geolocation';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

type coord = {
  "lon": number,
  "lat": number,
}

////////////
// Main application
function App(): JSX.Element {
  const [location, setLocation] = useState<coord | null>(null);
  const [server, setServer] = useState<string>("");

  /*
  getCurrentLocation(): Call GeoLocation to get curent location 
   */
  function startLocation() {
    Geolocation.getCurrentPosition((position) => {
      let c : coord = {
        "lat": Math.round(position.coords.latitude * 100000) / 100000,
        "lon": Math.round(position.coords.longitude * 100000) / 100000,
      }
      console.log(c);
      setLocation(c);
    }, undefined, {
      maximumAge: 0,
      enableHighAccuracy: true
    });
  }

  // On startup, start watching the location
  useEffect(() => { startLocation(); }, []);

  function onScan(e) {
    let url : string = e.data;
    if (url.indexOf("http://Titania.local") == 0) {
      console.log("Got Data:===============")
      console.log(e.data);  
      setServer("Connected to Titania");
    }
  }

  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={headingBG}
      />
      <View style={styles.Heading}>
        <Text style={styles.TitleText}>Remote</Text>
        <Text style={styles.SubTitle}>Remote subtitle!</Text>
      </View>
      {
        server == "" ? <RNCamera
          style={{
            flex: 1,
            width: '100%',
          }}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          onBarCodeRead={onScan}
        ></RNCamera> : <Text style={styles.Text}>{server}</Text> }
      <ScrollView>
        {
          location ? <View>
            <Text style={styles.Text}>Lat: {location.lat}</Text>
            <Text style={styles.Text}>Lon: {location.lon}</Text>
          </View> : <Text style={styles.Text}>Waiting for location...</Text>
        }
        <Pressable
          style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={startLocation}
          >
          <Text>Refresh</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
