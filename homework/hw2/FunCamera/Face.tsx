import React, { useState } from 'react';
import {Text, Image, View, StyleSheet, Pressable} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const styles = StyleSheet.create({
  ContainerView: {
    flexDirection: "column",
    width: 180,
    height: 255,
  },
  View: {
    flex:1,
  },
  Text: {
    paddingBottom: 0,
    paddingLeft:5,
    fontSize: 24,
    color: "#4466ED"
  },
  ButtonView: {
    justifyContent: "flex-end"
  },
  Detail: {
    paddingTop: 0,
    paddingLeft:20,
    fontSize: 14,
    color: "#4466ED"
  },
  ButtonBasic: {
    height: 45,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 8,
    padding: 10,
    margin: 2,
  },
  ButtonUp: {
    backgroundColor: "orange",
  },
  ButtonDown: {
    backgroundColor: "red",
  },
  ButtonLabel: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    color: "white",
  }
});

// Creates a single row representing a cat that can be deleted.
// Expects a FlatList entry with an item containing id, name and delete events.
const Face = function(props: { name: string }) {
  const [fileState, setFileState] = useState(null);
  const [imageState, setImageState] = useState(null);

  function selectImage(res) {
    if (res.didCancel) {
      console.log("ignoring canceled snap...");
      return;
    }
    let assets = res["assets"];
    if (assets.length > 0) {
      console.log(assets);
      setImageState(assets[0]);  
    }
  }

  function Snapshot(name: string) {
    console.log("snaphot: " + name);
    let options = {
      "mediaType": "photo",
      "cameraType": "front",
    }
    launchCamera(options, selectImage);
  }

return <View style={styles.ContainerView}>
    <View style={styles.View}>
      { imageState &&
      <Image source={imageState} style={{ width: 180, height: 200 }} />}
      { !imageState &&
      <Text style={styles.Text}>{props.name}</Text>}
    </View>
    <View style={styles.ButtonView}>
      <Pressable
        style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
        onPress={() => Snapshot(props.name)}
        >
        <Text style={styles.ButtonLabel}>Snapshot</Text>
      </Pressable>
    </View>
    </View>;
};

export { Face };