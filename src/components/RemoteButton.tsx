import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, fontSize, buttonSize } from '../constants/theme';

interface RemoteButtonProps {
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'danger';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function RemoteButton({
  icon,
  label,
  onPress,
  size = 'medium',
  variant = 'default',
  style,
  textStyle,
  disabled = false,
}: RemoteButtonProps) {
  const buttonWidth = buttonSize[size];

  const backgroundColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'danger'
      ? colors.error
      : colors.buttonDefault;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          width: buttonWidth,
          height: buttonWidth,
          backgroundColor: disabled ? colors.buttonDisabled : backgroundColor,
        },
        style,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={size === 'small' ? 20 : size === 'large' ? 28 : 24}
          color={disabled ? colors.textMuted : colors.text}
        />
      )}
      {label && !icon && (
        <Text
          style={[
            styles.label,
            { color: disabled ? colors.textMuted : colors.text },
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
