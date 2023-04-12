/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Pressable,
  View,
} from 'react-native';

import { styles } from './styles';
import { Sensor } from './SensorData';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "white" : "white",
  };

  const [ sensor, setSensor ] = useState("accel");

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
          <Sensor sensor={sensor} />
          <Pressable
            style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
            onPress={() => {
              if (sensor == "accel") { setSensor("gyro"); }
              else { setSensor("accel"); }
            } }
            >
          <Text style={styles.ButtonLabel}>{sensor == "accel" ? "Switch to Gyroscope" : "Switch to Accelerometer"}</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
