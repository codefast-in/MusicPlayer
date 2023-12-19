// import {Pressable, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import TrackPlayer, {State, Track, usePlaybackState} from 'react-native-track-player';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {playbackService} from '../../musicePlayerServices';
// export default function MusicControls() {
//   const playBackState = usePlaybackState();

//   const skipToNext = async () => TrackPlayer.skipToNext();
//   const skipToPrevious = async () => TrackPlayer.skipToPrevious();

//   const togglePlay = async (playback: State) => {
//     let curranttrack = await TrackPlayer.getCurrentTrack();

//     if (curranttrack !== null) {
//       if (playback === State.Paused || playback === State.Ready) {
//         await TrackPlayer.play();
//       } else {
//         await TrackPlayer.pause();
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Pressable onPress={skipToPrevious}>
//         <Icon name="skip-previous" size={40} style={styles.icon} />
//       </Pressable>
//       <Pressable onPress={() => togglePlay(playBackState)}>
//         <Icon
//           style={styles.icon}
//           name={playBackState === State.Playing ? 'pause' : 'play-arrow'}
//           size={75}
//         />
//       </Pressable>
//       <Pressable onPress={skipToNext}>
//         <Icon name="skip-next" size={40} style={styles.icon} />
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 56,
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     color: '#FFFFFF',
//   },
//   playButton: {
//     marginHorizontal: 24,
//   },
// });

import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import TrackPlayer, {
  RepeatMode,
  State,
  usePlaybackState,
} from 'react-native-track-player';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {playbackService} from '../../musicePlayerServices';

const ControlCenter = () => {
  const playerState = usePlaybackState().state;

  // next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  // Previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const repetTrack = async (playback: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
      } else {
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* <Pressable onPress={()=>repetTrack(playerState)}>
        <Icon name="loop" size={35} color={playerState === State.Playing ? '#26ae60' : '#fff'} />
      </Pressable> */}

      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>

      <Pressable onPress={() => togglePlayback(playerState)}>
        <Icon
          style={styles.playButton}
          name={playerState === State.Playing ? 'pause' : 'play-arrow'}
          size={55}
        />
      </Pressable>

      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 54,
    color: '#001d23',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});

export default ControlCenter;
