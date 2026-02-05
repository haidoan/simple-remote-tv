import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RemoteButton } from './RemoteButton';
import { useTvContext } from '../context/TvContext';
import { spacing } from '../constants/theme';

export function VolumeControl() {
  const { send } = useTvContext();

  return (
    <View style={styles.container}>
      <RemoteButton
        icon="volume-high"
        onPress={() => send('VolumeUp')}
        size="medium"
      />
      <RemoteButton
        icon="volume-mute"
        onPress={() => send('Mute')}
        size="medium"
      />
      <RemoteButton
        icon="volume-low"
        onPress={() => send('VolumeDown')}
        size="medium"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
