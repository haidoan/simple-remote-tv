import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, buttonSize, spacing } from '../constants/theme';
import { useTvContext } from '../context/TvContext';

export function DPad() {
  const { send } = useTvContext();

  const handlePress = async (command: 'Up' | 'Down' | 'Left' | 'Right' | 'Confirm') => {
    await send(command);
  };

  return (
    <View style={styles.container}>
      {/* Up button */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.upButton]}
          onPress={() => handlePress('Up')}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-up" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Middle row: Left, OK, Right */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.leftButton]}
          onPress={() => handlePress('Left')}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.centerButton]}
          onPress={() => handlePress('Confirm')}
          activeOpacity={0.7}
        >
          <Ionicons name="ellipse" size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={() => handlePress('Right')}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-forward" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Down button */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.downButton]}
          onPress={() => handlePress('Down')}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-down" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const DPAD_SIZE = buttonSize.dpad;
const CENTER_SIZE = buttonSize.dpadCenter;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: DPAD_SIZE,
    height: DPAD_SIZE,
    backgroundColor: colors.buttonDefault,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upButton: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    marginBottom: 2,
  },
  downButton: {
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    marginTop: 2,
  },
  leftButton: {
    borderTopLeftRadius: radius.lg,
    borderBottomLeftRadius: radius.lg,
    marginRight: 2,
  },
  rightButton: {
    borderTopRightRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    marginLeft: 2,
  },
  centerButton: {
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceLight,
  },
});
