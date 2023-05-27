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
function PlaybackControls(props: {
    server: Server,
    movie: Movie,
  }): JSX.Element {
    if (!props.movie || !props.server) {
        return <View style={{
            flex: 1,
            width: '100%',
            }}>
          <Text style={styles.Text}>No movie playing.</Text>        
        </View>
    }

    async function pause() {
      let url = props.server.url + "/pause";
      console.log("pause");
      fetch(url)
      .then(response => {
        console.log("Paused");
      }).catch(error => {
          console.log(error);
      })
    }
    
    async function stop() {
      let url = props.server.url + "/stop";
      console.log("stop");
      fetch(url)
      .then(response => {
        console.log("Stopped");
      }).catch(error => {
          console.log(error);
      })
    }
    
    return (
      <View style={{
          }}>
        <Text style={styles.Text}>Playing: {props.movie.name}</Text>
        <Pressable
          style={({pressed}) => [ styles.ButtonMovie, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={() => pause()}
        >
          <Text style={styles.ButtonLabel}>Pause</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [ styles.ButtonMovie, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={() => stop()}
        >
          <Text style={styles.ButtonLabel}>Stop</Text>
        </Pressable>
      </View>
    );
}

export default PlaybackControls;
