/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
} from 'react-native';

// UI Styles
import { styles, headingBG } from '../Styles';

import Scanner from '../components/Scanner';
import NearbyServers from '../components/NearbyServers';
import { Server, coord, AddServerToList, RemoveServerFromList } from './Types';


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

export default PageServerSelection;
