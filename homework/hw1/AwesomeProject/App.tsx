/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import { Feline } from './cat'

const mainbg = "#ebebd3";
const mainbg_dark = "#8C5e58";
const headingbg = "#083D77";
const textcol = "#000000";
const textcol_dark = "#ffffff";

/*import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
*/

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? textcol_dark : textcol,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? textcol_dark : textcol,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const darker =  "#333355";
  const lighter = "#ffdcdc";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? mainbg : mainbg,
  };

  const backgroundHeading = {
    backgroundColor: isDarkMode ? headingbg : headingbg,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundHeading.backgroundColor}
      />
      <View style={backgroundHeading}>
      <Feline />
      </View>
      <View
        style={backgroundStyle}>
        <FlatList
        data={[
          {key: 'User 1'},
          {key: 'User 2'},
          {key: 'User 3'},
          {key: 'User 4'},
          {key: 'User 5'},
          {key: 'User 6'},
          {key: 'User 7'},
          {key: 'User 8'},
          {key: 'User 9'},
          {key: 'User 10'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});

export default App;
