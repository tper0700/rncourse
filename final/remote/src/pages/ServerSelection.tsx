/**
 * Server selection page: Lets user scan QR codes or select a known server
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Pressable,
} from 'react-native';

// UI Styles
import { styles, headingBG } from '../Styles';

import Scanner from '../components/Scanner';
import { NearbyServers, AllServers } from '../components/NearbyServers';
import { Server, coord, AddServerToList, RemoveServerFromList } from '../Types';

//////////////
// Keeps track of current location and tab selection state.
// Depending on current tab, shows the right page UI.
// At the bottom of the page, a hovering dock allows the user
// to switch tabs.
function PageServerSelection(props: {
  setServer: Function
}): JSX.Element {
  const [location, setLocation] = useState<coord | null>(null);
  const [tab, setTab] = useState<number>(0);

  return <View style={styles.Main}>
    <View style={styles.Heading}>
      <Text style={styles.TitleText}>Remote</Text>
      <Text style={styles.SubTitle}>Server Selection</Text>
    </View>
    {
      tab == 0 ? <NearbyServers setServer={props.setServer} setLocation={setLocation}/> : null
    }
    {
      tab == 1 ? <Scanner setServer={props.setServer} location={location}/> : null
    }
    {
      tab == 2 ? <AllServers setServer={props.setServer}/> : null
    }
        
    <View style={styles.PlaybackSection}>
      <View style={styles.TabButtons}>
        <Pressable
          style={({pressed}) => [ styles.ButtonBasic, {flex: 1}, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={() => setTab(0)}
          >
          <Text style={styles.ButtonLabel}>Nearby</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [ styles.ButtonBasic, {flex: 1}, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={() => setTab(1)}
          >
          <Text style={styles.ButtonLabel}>QR Code</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [ styles.ButtonBasic, {flex: 1}, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={() => setTab(2)}
          >
          <Text style={styles.ButtonLabel}>Show All</Text>
        </Pressable>
      </View>
    </View>
  </View>
}

export default PageServerSelection;
