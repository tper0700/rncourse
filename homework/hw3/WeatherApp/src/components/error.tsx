import React, { useState } from 'react';
import { Text, Image, View, Pressable} from 'react-native';

import { styles } from '../Styles';

// Displays an error if something goes wrong
const Error = function(props: {
  error: string | null,
}) {
  return <View>
    {
          props.error ? <View>
            <Text style={styles.Text}>Error reported: {props.error}</Text>
          </View> : null
        }
  </View>
};

export { Error };