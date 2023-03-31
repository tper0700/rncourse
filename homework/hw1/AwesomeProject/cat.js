import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const catStyles = StyleSheet.create({
  View: {
    height: 50,
  },
  Text: {
    paddingBottom: 0,
    paddingLeft:5,
    fontSize: 16,
    color: "#4466ED"
  },
  Detail: {
    paddingTop: 0,
    paddingLeft:20,
    fontSize: 14,
    color: "#4466ED"
  }
});

const Feline = function(props) {
  return <View style={catStyles.View}>
      <Text style={catStyles.Text}>"{props.cat}"</Text>
      <Text style={catStyles.Detail}>Learn more about this cat</Text>
    </View>;
};

export { Feline };