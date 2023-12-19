import React, {useState, useEffect} from 'react';
import {setupPlayer, addtrack} from '../musicePlayerServices';

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MusicPlayer from './screens/MusicPlayer';

function App(): React.JSX.Element {
  const [isPlayerRddy, setIsPlayerRddy] = useState(false);

  async function setUp() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addtrack();
    }

    setIsPlayerRddy(isSetup);
  }

  useEffect(() => {
    setUp();
  }, []);

  if (!isPlayerRddy) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'}/>
     <MusicPlayer/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,

  },
});

export default App;
