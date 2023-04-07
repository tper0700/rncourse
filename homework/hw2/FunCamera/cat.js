import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

const catStyles = StyleSheet.create({
  HorizView: {
    flexDirection: "row",
  },
  View: {
    flex:1
  },
  ButtonView: {
    justifyContent: "flex-end"
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
  },
  ButtonBasic: {
    flex: 1,
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
    fontSize: 24,
    color: "white"
  }
});

// Creates a single row representing a cat that can be deleted.
// Expects a FlatList entry with an item containing id, name and delete events.
const Feline = function(props) {
  return <View style={catStyles.HorizView}>
    <View style={catStyles.View}>
      <Text style={catStyles.Text}>"{props.cat}"</Text>
      <Text style={catStyles.Detail}>This is cat #{props.index + 1}.</Text>
    </View>
    <View style={catStyles.ButtonView}>
      <Pressable
        style={({pressed}) => [ catStyles.ButtonBasic, pressed ? catStyles.ButtonDown : catStyles.ButtonUp ]}
        onPress={() => props.onRemove(props.index)}
        >
        <Text styles={catStyles.ButtonLabel}>Escaped!</Text>
      </Pressable>
    </View>
    </View>;
};

export { Feline };