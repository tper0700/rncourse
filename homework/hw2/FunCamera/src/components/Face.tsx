import React, { useState } from 'react';
import {Modal, Text, Image, View, StyleSheet, Pressable} from 'react-native';
import {launchCamera, launchImageLibrary, Asset, ImagePickerResponse, CameraType, MediaType} from 'react-native-image-picker';

import * as FaceDetector from 'expo-face-detector';

import {images} from "../../assets";
import { styles } from '../Styles';

export interface Rect {
  x: number,
  y: number,
  w: number,
  h: number,
}

// A single user picture pane.
const Face = function(props: {
  setImage: Function,
  setRect: Function,
}) {
  const [imageState, setImageState] = useState<Asset | null>(null);
  const [cameraPrompt, setCameraPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function selectImage(res: ImagePickerResponse) {
    if (res.didCancel) {
      console.log("ignoring canceled snap...");
      return;
    }
    let assets = res["assets"];
    if (assets && assets.length > 0 && assets[0].uri) {
      FaceDetector.detectFacesAsync(assets[0].uri)
      .then((res : FaceDetector.DetectionResult) => {
        if (res.faces.length == 0) {
          let msg = "There are no faces on this picture!";
          console.log("error: " + msg);
          setErrorMessage(msg);
        } else if (res.faces.length > 1) {
          let msg = "There are too many faces in this picture!";
          console.log("error: " + msg);
          setErrorMessage(msg);
        } else {
          console.log("Detector returned a face")
          let face = res.faces[0];
          let r : Rect = {
            x: face.bounds.origin.x,
            y: face.bounds.origin.y,
            h: face.bounds.size.height,
            w: face.bounds.size.width,
          };
          console.log("rect : " + JSON.stringify(r));
          if (assets) {
            setImageState(assets[0] as object);
            props.setImage(assets[0] as object);
            props.setRect(r);
          }
          setCameraPrompt(false);
        }
      });
    }
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

return <View style={styles.ModalContainer}>
    <View style={styles.ModalView}>
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
      onRequestClose={() => {setCameraPrompt(false)}}
      >
      <View style={styles.PromptContainer}>
        {
          errorMessage != "" ?
        <View style={styles.PromptView}>
          <Text style={styles.Text}>{errorMessage}</Text>
          <Pressable
            style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
            onPress={() => setErrorMessage("")}
            >
            <Text style={styles.ButtonLabel}>Ok</Text>
          </Pressable>
        </View> : <View style={styles.PromptView}>
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
        }
      </View>
    </Modal>
    </View>;
};

export { Face };