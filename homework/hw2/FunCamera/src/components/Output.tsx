import React, { useState } from 'react';
import { Text, Image, View, Pressable} from 'react-native';
import { Asset } from 'react-native-image-picker';
import { CameraRoll, SaveToCameraRollOptions } from "@react-native-camera-roll/camera-roll";

import {images} from "../../assets";
import { styles } from '../Styles';

// A single output picture pane, and a save button for that image.
const Output = function(props: {
  imageFile: Asset | null,
}) {
  // Handler for "save" button. Saves to camera roll
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