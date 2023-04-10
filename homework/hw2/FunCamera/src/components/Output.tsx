import React, { useState } from 'react';
import {Modal, Text, Image, View, StyleSheet, Pressable} from 'react-native';
import {launchCamera, launchImageLibrary, Asset, ImagePickerResponse, CameraType, MediaType} from 'react-native-image-picker';
import { CameraRoll, SaveToCameraRollOptions } from "@react-native-camera-roll/camera-roll";

import * as FaceDetector from 'expo-face-detector';

import {images} from "../../assets";
import { styles } from '../Styles';

// A single output picture pane.
const Output = function(props: {
  imageFile: Asset | null,
}) {
function saveFile() {
  console.log("Save: " + props.imageFile);
  if (props.imageFile && props.imageFile.uri) {
    CameraRoll.save(props.imageFile.uri, "photo" as SaveToCameraRollOptions);
  }
}

return <View style={styles.ModalContainer}>
      <View style={styles.ModalView}>
        <Image source={props.imageFile ? props.imageFile : images.question}
        style={{ width: 180, height: 200 }} />
      </View>
      <View style={styles.ButtonView}>
        <Pressable
        style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
        onPress={saveFile}
        >
          <Text style={styles.ButtonLabel}>Save</Text>
        </Pressable>
      </View>
    </View>
};

export { Output };