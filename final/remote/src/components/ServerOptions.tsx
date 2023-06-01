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

import { Server } from '../Types';

function ServerOptions(props: {
  setServer: Function,
  forgetServer: Function,
}): JSX.Element {
  return <View style={[styles.Heading, {flexDirection: "row"}]}>
        <Pressable
            style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
            onPress={() => props.setServer(null)}
            >
            <Text style={styles.ButtonLabel}>Select Another</Text>
        </Pressable>
        <Pressable
            style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
            onPress={() => props.forgetServer()}
            >
            <Text style={styles.ButtonLabel}>Forget Server</Text>
        </Pressable>
      </View>
}

export default ServerOptions;
