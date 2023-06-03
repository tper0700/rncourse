/**
 * Known server selector
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

// Button for a single server in the list of servers.
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

// Base list component, Given a list of servers,
// renders a flatlist of  buttons for each server
function BaseServerList(props: {
  serverList: Server[],
  setServer: Function,
  title: string,
}): JSX.Element {
  return (
    <View style={[styles.PlaybackSection, {
        flex: 1,
        }]}>
      <Text style={styles.Text}>{props.title}</Text>
      {
        props.serverList.length ? <FlatList
        data={props.serverList}
        renderItem={({item}) => <ServerEntry server={item} setServer={props.setServer}/>}
      /> : <Text style={styles.Text}>No known servers available</Text>
      }
      
    </View>
  );
}

// Renders a BaseServerList with all known servers (from storage.)
export function AllServers(props: {
  setServer: Function
}): JSX.Element {
  const [servers, setServers] = useState<Server[]>([]);

  async function getAllServers() {
    setServers(await GetServerList());
  }

  // On startup, set the server list
  useEffect(() => { getAllServers(); }, []);

  return (
    <BaseServerList title={"All Servers:"} serverList={servers} setServer={props.setServer}/>
  ); 
}

////////////
// Shows a BaseServerList with only those servers that are nearby.
export function NearbyServers(props: {
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
      <BaseServerList title={"Nearby Servers:"} serverList={nearbyServers} setServer={props.setServer}/>
    );
}
