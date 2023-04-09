import React, { useState } from 'react';
import {Modal, Text, Image, View, StyleSheet, Pressable} from 'react-native';
import {launchCamera, launchImageLibrary, Asset, ImagePickerResponse, CameraType, MediaType} from 'react-native-image-picker';

import {images} from "../../assets";

const headingbg = "#262424";
const headingfg = "#e5dada";

const styles = StyleSheet.create({
  ContainerView: {
    flexDirection: "column",
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
  },
  PromptContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  PromptView: {
    padding: 8,
    marginTop: 15,
    marginBottom: 60,
    backgroundColor: headingbg,
    borderRadius: 8,
  },
  PromptButtons: {
    flexDirection: "row",
    alignItems: "center",
  }
});

// A single user picture pane.
const Face = function(props: { name: string }) {
  const [imageState, setImageState] = useState<Asset | null>(null);
  const [cameraPrompt, setCameraPrompt] = useState(false);

  function selectImage(res: ImagePickerResponse) {
    if (res.didCancel) {
      console.log("ignoring canceled snap...");
      return;
    }
    let assets = res["assets"];
    if (assets && assets.length > 0) {
      setImageState(assets[0] as object);  
    }
    setCameraPrompt(false);
  }

  function LoadFromFile() {
    console.log("from file...");
    let options = {
      "mediaType": "photo" as MediaType,
    };
    launchImageLibrary(options, selectImage);
  }

  function Snapshot(camera : CameraType) {
    console.log("snaphot: " + camera);
    let options = {
      "mediaType": "photo" as MediaType,
      "cameraType": camera,
    };
    launchCamera(options, selectImage);
  }

  function ClosePrompt() {
    console.log("Close camera prompt");
    setCameraPrompt(false);
  }

return <View style={styles.ContainerView}>
    <View style={styles.View}>
      <Image source={imageState ? imageState : images.question}
        style={{ width: 180, height: 200 }} />
    </View>
    <View style={styles.ButtonView}>
      <Pressable
        style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
        onPress={() => setCameraPrompt(true)}
        >
        <Text style={styles.ButtonLabel}>Take Photo</Text>
      </Pressable>
    </View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={cameraPrompt}
      supportedOrientations={["portrait", "landscape"]}
      onRequestClose={ClosePrompt}>
      <View style={styles.PromptContainer}>
        <View style={styles.PromptView}>
          <Text style={styles.Text}>Choose a camera</Text>
          <View style={styles.PromptButtons}>
          <Pressable
            style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
            onPress={() => Snapshot("back" as CameraType)}
            >
            <Text style={styles.ButtonLabel}>Back Camera</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
            onPress={() => Snapshot("front" as CameraType)}
            >
            <Text style={styles.ButtonLabel}>Front Camera</Text>
          </Pressable>
          </View>
          <Pressable
            style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
            onPress={() => LoadFromFile()}
            >
            <Text style={styles.ButtonLabel}>Load from Phone</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
            onPress={() => setCameraPrompt(false)}
            >
            <Text style={styles.ButtonLabel}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    </View>;
};

export { Face };