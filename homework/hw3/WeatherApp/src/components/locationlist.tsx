import React, { useState } from 'react';
import { Text, Pressable, View, FlatList} from 'react-native';

import { styles } from '../Styles';

type coord = {
  "lon": number,
  "lat": number,
}

type location = {
  "location": string,
  "coord": coord,
  "id": number,
}

// Displays a list of locations.
// Used when user searches for a city with multiple matches.
const LocationList = function(props: {
  options: location[] | null,
  onSelect: Function,
}) {
  let options : location[] = props.options;
  let onSelect = props.onSelect;

  const OptionItem = (props) => (
    <View>
      <Pressable
        style={({pressed}) => [ styles.ButtonBasic, pressed ? styles.ButtonDown : styles.ButtonUp ]}
        onPress={() => { onSelect(props.option); } }
        >
      <Text>{props.option.location}</Text>
      <Text>({props.option.coord.lat}, {props.option.coord.lon})</Text>
      </Pressable>
    </View>
  );

  return <View>
    {
      options ? <FlatList
        data={options}
        renderItem={({item}) => <OptionItem option={item} />}
        keyExtractor={item => item.id}
        /> : null
    }
  </View>
};

export type { coord, location };
export { LocationList };