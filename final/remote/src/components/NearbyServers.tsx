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
import { Server, GetServerList, coord } from '../Types';

import Geolocation from '@react-native-community/geolocation';

function ServerEntry(props: {
  server: Server,
  setServer: Function,
}): JSX.Element {
  return <View>
    <Pressable
        style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
        onPress={() => props.setServer(props.server)}
        >
        <Text style={styles.ButtonLabel}>{props.server.name}</Text>
    </Pressable>
  </View>
}

////////////
// Server selector
function NearbyServers(props: {
    setServer: Function,
    setLocation: Function
  }): JSX.Element {
    const [nearbyServers, setNearbyServers] = useState<Server[]>([]);

    function isNearby(s: Server, c: coord) {
      let latdist = Math.abs(s.lat - c.lat);
      let londist = Math.abs(s.lon - c.lon);
      console.log(" => " + s.name + " : " + latdist + ", " + londist);
      return (latdist < 0.0005 && londist < 0.0005);
    }

    /*
    getCurrentLocation(): Call GeoLocation to get curent location 
     */
    function startLocation() {
      Geolocation.getCurrentPosition((position) => {
        let c : coord = {
          "lat": Math.round(position.coords.latitude * 100000) / 100000,
          "lon": Math.round(position.coords.longitude * 100000) / 100000,
        }
        props.setLocation(c);

        const allServers = GetServerList();
        let nearby = allServers.filter((s) => isNearby(s, c));

        setNearbyServers(nearby);
        console.log(c);
      }, undefined, {
        maximumAge: 0,
        enableHighAccuracy: true
      });
    }


    // On startup, start watching the location
    useEffect(() => { startLocation(); }, []);

    return (
      <View style={{
          flex: 1,
          width: '100%',
          }}>
        <Text style={styles.Text}>Nearby Servers:</Text>
        {
          nearbyServers.length ? <FlatList
          data={nearbyServers}
          renderItem={({item}) => <ServerEntry server={item} setServer={props.setServer}/>}
        /> : <Text style={styles.Text}>Scan a media center QR code.</Text>
        }
        
      </View>
    );
}

export default NearbyServers;
