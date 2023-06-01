/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

// UI Styles
import { styles, headingBG } from './Styles';

import PageServerSelection from './pages/ServerSelection';
import PageServerControl from './pages/ServerPlayback';
import { Server, AddServerToList, RemoveServerFromList } from './Types';

////////////
// Main application
function App(): JSX.Element {
  const [server, setServer] = useState<Server | null>(null);

  function SelectServer(s: Server | null) {
    setServer(s);
    if (s) {
      AddServerToList(s);
    }
  }
  
  function ForgetServer(server: Server) {
    RemoveServerFromList(server);
  }

  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={headingBG}
      />
      {
        server == null ? <PageServerSelection setServer={SelectServer}/> : null
      }
      {
        server != null ? <PageServerControl server={server} setServer={SelectServer} forgetServer={ForgetServer}/> : null
      }
    </SafeAreaView>
  );
}

export default App;
