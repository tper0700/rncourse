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
import { Server, GetServerList, coord, isServerClose,  } from '../Types';

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

    /*
    updateServersByLocation: Filters servers list by coordinate c
    */
    async function updateServersByLocation(c: coord) {
      const allServers = await GetServerList();
      let nearby = allServers.filter((s) => isServerClose(s, c));

      setNearbyServers(nearby);
      console.log(c);
    }

    /*
    checkLocationAndServers(): Use Geolocation to pick nearby server list. 
     */
    async function checkLocationAndServers() {
      Geolocation.getCurrentPosition((position) => {
        let c : coord = {
          "lat": Math.round(position.coords.latitude * 100000) / 100000,
          "lon": Math.round(position.coords.longitude * 100000) / 100000,
        }
        props.setLocation(c);
        updateServersByLocation(c);
      }, undefined, {
        maximumAge: 0,
        enableHighAccuracy: true
      });
    }


    // On startup, start watching the location
    useEffect(() => { checkLocationAndServers(); }, []);

    return (
      <View style={[styles.PlaybackSection, {
          flex: 1,
          }]}>
        <Text style={styles.Text}>Nearby Servers:</Text>
        {
          nearbyServers.length ? <FlatList
          data={nearbyServers}
          renderItem={({item}) => <ServerEntry server={item} setServer={props.setServer}/>}
        /> : <Text style={styles.Text}>No known servers nearby</Text>
        }
        
      </View>
    );
}

export default NearbyServers;
