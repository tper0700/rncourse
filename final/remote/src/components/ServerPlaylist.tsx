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

    async function playMovie(movie: Movie) {
      let url = props.server.url + "/play/" + String(movie.id);
      console.log("play: [" + movie.name + "]");
      fetch(url)
      .then(response => response.json())
      .then(json => {
        props.onSelected(movie);
      }).catch(error => {
          console.log(error);
      })
   }
    
    async function getPlaylist() {
        let url = props.server.url + "/movies";
        console.log("get movies server: [" + url + "]");
        fetch(url)
        .then(response => response.json())
        .then(json => {
          setPlaylist(json);
          console.log(json);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {getPlaylist();}, [])

    return (
      <View style={{
          }}>
      {
        playList.length ? <FlatList
          horizontal={true}
          data={playList}
          renderItem={({item}) => <MovieEntry movie={item} playfn={playMovie}/>}
          keyExtractor={item => String(item.id)}
        /> : <Text style={styles.Text}>No movies available to play.</Text>
      }
      </View>
    );
}

export default Playlist;
