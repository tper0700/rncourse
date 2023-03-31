import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const catStyles = StyleSheet.create({
    Text: {
      padding: 5,
      margin: 50,
      fontSize: 24,
      height: 50,
      color: "#4466ED"
    }
  });

const Feline = function() {
  return <View><Text style={catStyles.Text}>Hello world, dear feline!</Text></View>;
};

export { Feline };