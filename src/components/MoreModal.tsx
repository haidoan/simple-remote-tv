import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, fontSize } from '../constants/theme';
import { useTvContext } from '../context/TvContext';
import { IRCCCommand } from '../constants/ircc';

interface MoreModalProps {
  visible: boolean;
  onClose: () => void;
}

interface ButtonConfig {
  label: string;
  command: IRCCCommand;
  icon?: keyof typeof Ionicons.glyphMap;
}

const NUMBER_BUTTONS: ButtonConfig[] = [
  { label: '1', command: 'Num1' },
  { label: '2', command: 'Num2' },
  { label: '3', command: 'Num3' },
  { label: '4', command: 'Num4' },
  { label: '5', command: 'Num5' },
  { label: '6', command: 'Num6' },
  { label: '7', command: 'Num7' },
  { label: '8', command: 'Num8' },
  { label: '9', command: 'Num9' },
  { label: '0', command: 'Num0' },
];

const MEDIA_BUTTONS: ButtonConfig[] = [
  { label: 'Play', command: 'Play', icon: 'play' },
  { label: 'Pause', command: 'Pause', icon: 'pause' },
  { label: 'Stop', command: 'Stop', icon: 'stop' },
  { label: 'Rewind', command: 'Rewind', icon: 'play-back' },
  { label: 'Forward', command: 'Forward', icon: 'play-forward' },
];

const INPUT_BUTTONS: ButtonConfig[] = [
  { label: 'Input', command: 'Input', icon: 'swap-horizontal' },
  { label: 'HDMI 1', command: 'Hdmi1' },
  { label: 'HDMI 2', command: 'Hdmi2' },
  { label: 'HDMI 3', command: 'Hdmi3' },
  { label: 'HDMI 4', command: 'Hdmi4' },
];

const APP_BUTTONS: ButtonConfig[] = [
  { label: 'Netflix', command: 'Netflix', icon: 'tv' },
  { label: 'YouTube', command: 'YouTube', icon: 'logo-youtube' },
];

const CHANNEL_BUTTONS: ButtonConfig[] = [
  { label: 'CH +', command: 'ChannelUp', icon: 'add' },
  { label: 'CH -', command: 'ChannelDown', icon: 'remove' },
];

export function MoreModal({ visible, onClose }: MoreModalProps) {
  const { send } = useTvContext();

  const handlePress = async (command: IRCCCommand) => {
    await send(command);
  };

  const renderButton = ({ label, command, icon }: ButtonConfig) => (
    <TouchableOpacity
      key={command}
      style={styles.button}
      onPress={() => handlePress(command)}
      activeOpacity={0.7}
    >
      {icon ? (
        <Ionicons name={icon} size={20} color={colors.text} />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );

  const renderSection = (title: string, buttons: ButtonConfig[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.buttonGrid}>{buttons.map(renderButton)}</View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>More Controls</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {renderSection('Number Pad', NUMBER_BUTTONS)}
              {renderSection('Media', MEDIA_BUTTONS)}
              {renderSection('Channels', CHANNEL_BUTTONS)}
              {renderSection('Inputs', INPUT_BUTTONS)}
              {renderSection('Apps', APP_BUTTONS)}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    maxHeight: '80%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    padding: spacing.xs,
  },
  content: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  button: {
    width: 56,
    height: 56,
    backgroundColor: colors.buttonDefault,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
});
