import React, { useState } from 'react';
import { Text, Image, View, Pressable} from 'react-native';

import { styles } from '../Styles';

type weather = {
    "temp": string,
    "weather": string,
    "min": string,
    "max": string,
  }
  
// Displays the weather if a city is selected and OpenWeather returns.
const Weather = function(props: {
  conditions: weather | null,
}) {
  let conditions = props.conditions;
  return <View>
    {
    conditions ? <View>
        <Text style={styles.Text}>Weather Conditions: {conditions.weather}</Text>
        <Text style={styles.Text}>Current Temp: {conditions.temp} C</Text>
        <Text style={styles.Text}>Min Temp: {conditions.min} C</Text>
        <Text style={styles.Text}>Max Temp: {conditions.max} C</Text>
    </View> : <Text>Select a city to get weather.</Text>
    }
  </View>
};

export type { weather };
export { Weather };