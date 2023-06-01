/**
 * List of movies to play in server
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Pressable,
} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

// UI Styles
import { styles, headingBG } from '../Styles';
import { Server, Movie, coord } from '../Types';

////////////
// Playlist component
function PlaybackControls(props: {
    server: Server,
    movie: Movie,
    onStop: Function,
  }): JSX.Element {
    if (!props.movie || !props.server) {
        return <View style={{
            flex: 1,
            width: '100%',
            }}>
          <Text style={styles.Text}>No movie playing.</Text>        
        </View>
    }

    let [volume, setVolume] = useState<number>(0);

    async function getVolume() {
      let url = props.server.url + "/volume";
      fetch(url)
      .then(response => response.json())
      .then(json => {
        setVolume(json.volume);
      }).catch(error => {
          console.log(error);
      })
    }

    function setVolumeSlider(vol) {
      let tgt = Math.round(vol);
      let url = props.server.url + "/volume";
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({volume: tgt}),
      })
      .then(response => response.json())
      .then(json => {
        console.log(JSON.stringify(json));
        setVolume(json.volume);
      }).catch(error => {
          console.log(error);
      })
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
        props.onStop();
      }).catch(error => {
          console.log(error);
      })
    }
    
    useEffect(() => {getVolume()}, []);
    
    return (
      <View style={styles.PlaybackSection}>
        <Text style={styles.Text}>Now playing:</Text>
        <Text style={styles.MovieTitle}>{props.movie.name}</Text>
        <Text style={styles.Text}>Volume: </Text>
        <Slider
          value={volume}
          onSlidingComplete={setVolumeSlider}
          minimumValue={0}
          maximumValue={100}
        />
        <View style={styles.PlaybackButtons}>
        <Pressable
          style={({pressed}) => [ styles.ButtonPlayback, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={() => pause()}
        >
          <Text style={styles.ButtonLabel}>Pause</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [ styles.ButtonPlayback, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={() => stop()}
        >
          <Text style={styles.ButtonLabel}>Stop</Text>
        </Pressable>
        </View>
      </View>
    );
}

export default PlaybackControls;
