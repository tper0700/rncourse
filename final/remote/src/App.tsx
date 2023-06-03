/**
 * Main Remote application
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text
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

  // Wrapper function for server state. Also adds the server to storage.
  function SelectServer(s: Server | null) {
    setServer(s);
    if (s) {
      AddServerToList(s);
    }
  }
  
  // Called when user wants to detach a server.
  function ForgetServer(server: Server) {
    RemoveServerFromList(server);
  }

  // Show the server selection page if no server is selected.
  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={headingBG}
      />
      {
        server != null ? (
          <PageServerControl server={server} setServer={SelectServer} forgetServer={ForgetServer}/>
        ) : (
          <PageServerSelection setServer={SelectServer}/>
        )
      }
    </SafeAreaView>
  );
}

export default App;
