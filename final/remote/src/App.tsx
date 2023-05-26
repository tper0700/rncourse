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

import Scanner from './components/Scanner';
import NearbyServers from './components/NearbyServers';
import Playlist from './components/ServerPlaylist';
import { Server, coord } from '../Types';


function PageServerSelection(props: {
  setServer: Function
}): JSX.Element {
  const [location, setLocation] = useState<coord | null>(null);

  return <View style={styles.Main}>
    <View style={styles.Heading}>
      <Text style={styles.TitleText}>Remote</Text>
      <Text style={styles.SubTitle}>Server Selection</Text>
    </View>
    <Scanner setServer={props.setServer} location={location}/>
    <NearbyServers setServer={props.setServer} setLocation={setLocation}></NearbyServers>
  </View>
}

function PageServerControl(props: {
  server: Server,
  setServer: Function,
}): JSX.Element {
  return <View style={styles.Main}>
    <View style={[styles.Heading, {flexDirection: "row"}]}>
      <Pressable
          style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={() => props.setServer(null)}
          >
          <Text style={styles.ButtonLabel}>Back</Text>
      </Pressable>
      <View style={{flex: 1}}>
        <Text style={styles.TitleText}>{props.server.name}</Text>
        <Text style={styles.SubTitle}>{props.server.url}</Text>
      </View>
    </View>
    <Playlist server={props.server}/>
  </View>
}

////////////
// Main application
function App(): JSX.Element {
  const [server, setServer] = useState<Server>(null);
  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={headingBG}
      />
      {
        server == null ? <PageServerSelection setServer={setServer}/> : null
      }
      {
        server != null ? <PageServerControl server={server} setServer={setServer}/> : null
      }
    </SafeAreaView>
  );
}

export default App;
