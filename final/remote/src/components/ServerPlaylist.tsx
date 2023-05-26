/**
 * List of movies to play in server
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
import { Server, Movie, coord } from '../Types';

////////////
// Playlist component
function Playlist(props: {
    server: Server,
  }): JSX.Element {
    if (!props.server) {
        return <View style={{
            flex: 1,
            width: '100%',
            }}>
          <Text style={styles.Text}>No server connected!</Text>        
        </View>
    }

    const [playlist, setPlaylist] = useState<Movie[]>([])

    async function getPlaylist() {
        let url = props.server.url + "/movies";
        console.log("get movies server: [" + url + "]");
        fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {getPlaylist();})

    return (
      <View style={{
          flex: 1,
          width: '100%',
          }}>
        <Text style={styles.Text}>Videos available:</Text>        
      </View>
    );
}

export default Playlist;
