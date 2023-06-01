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
  Pressable,
} from 'react-native';

// UI Styles
import { styles, headingBG } from '../Styles';

import Playlist from '../components/ServerPlaylist';
import PlaybackControls from '../components/PlaybackControls';
import ServerOptions from '../components/ServerOptions';
import { Server, Movie } from '../Types';

function PageServerControl(props: {
  server: Server,
  setServer: Function,
  forgetServer: Function,
}): JSX.Element {
  const [movie, setMovie] = useState<Movie|null>(null);
  const [options, setOptions] = useState<boolean>(false);

  function forgetServer() {
    console.log("forget " + props.server.name)
    props.forgetServer(props.server);
    props.setServer(null);
  }
  
  function stop() {
    setMovie(null);
  }

  return <View style={styles.Main}>
    <View style={[styles.Heading, {flexDirection: "row"}]}>
      <Pressable
          style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
          onPress={() => setOptions(!options)}
          >
          <Text style={styles.ButtonLabel}>...</Text>
      </Pressable>
      <View style={{flex: 1}}>
        <Text style={styles.TitleText}>{props.server.name}</Text>
        <Text style={styles.SubTitle}>{props.server.url}</Text>
      </View>
    </View>
    {
      options ? <ServerOptions setServer={props.setServer} forgetServer={forgetServer} /> : null
    }
    
    <Playlist server={props.server} onSelected={setMovie}/>
    <PlaybackControls server={props.server} movie={movie} onStop={stop}/>
  </View>
}

export default PageServerControl;
