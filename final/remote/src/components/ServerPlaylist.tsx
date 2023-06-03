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

// Renders a single movie in the playlist control.
function MovieEntry(props: {
  movie: Movie,
  playfn: Function
}): JSX.Element {
  return <View>
    <Pressable
        style={({pressed}) => [ styles.ButtonMovie, pressed ? styles.ButtonDown : styles.ButtonUp ]}
        onPress={() => props.playfn(props.movie)}
        >
        <Text style={styles.ButtonLabel}>{props.movie.name}</Text>
    </Pressable>
  </View>
}

////////////
// Playlist component
function Playlist(props: {
    server: Server,
    onSelected: Function,
  }): JSX.Element {
    if (!props.server) {
        return <View style={{
            flex: 1,
            width: '100%',
            }}>
          <Text style={styles.Text}>No server connected!</Text>        
        </View>
    }

    const [playList, setPlaylist] = useState<Movie[]>([])

    // Button handler for playlist movie button.
    async function playMovie(movie: Movie) {
      props.onSelected(null);
      let url = props.server.url + "/play/" + String(movie.id);
      console.log("play: [" + movie.name + "]");
      fetch(url)
      .then(response => response.json())
      .then(json => {
        // "Select the movie when the server says it has started."
        props.onSelected(movie);
      }).catch(error => {
          console.log(error);
      })
   }
    
   // Initialize playlist.
   // This is the first code that runs when a server is chosen.
    async function getPlaylist() {
        let url = props.server.url + "/movies";
        fetch(url)
        .then(response => response.json())
        .then(json => {
          // Update the playlist
          setPlaylist(json);
          console.log(JSON.stringify(json));
        }).catch(error => {
            console.log(error);
        })

        // Check server state. If already playing a movie, "select" it
        url = props.server.url + "/state";
        fetch(url)
        .then(response => response.json())
        .then(json => {
          if (json.current) {
            props.onSelected(json.current);
          }
        }).catch(error => {
          console.log(error)
        })
    }

    useEffect(() => {getPlaylist();}, [])

    return (
      <View style={styles.PlaybackSection}>
      {
        playList.length ? <View>
          <Text style={styles.Text}>Movies Available:</Text>
          <FlatList
          horizontal={true}
          data={playList}
          renderItem={({item}) => <MovieEntry movie={item} playfn={playMovie}/>}
          keyExtractor={item => String(item.id)}
        /></View> : <Text style={styles.Text}>No movies available to play.</Text>
      }
      </View>
    );
}

export default Playlist;
