import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../constants/theme';
import { useTvContext } from '../context/TvContext';

export function PowerButton() {
  const { send } = useTvContext();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => send('Power')}
      activeOpacity={0.7}
    >
      <Ionicons name="power" size={28} color={colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
