import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, radius } from '../constants/theme';
import { useTvContext } from '../context/TvContext';
import { DPad } from '../components/DPad';
import { VolumeControl } from '../components/VolumeControl';
import { PowerButton } from '../components/PowerButton';
import { RemoteButton } from '../components/RemoteButton';
import { MoreModal } from '../components/MoreModal';

export default function RemoteScreen() {
  const { tvConfig, configLoading, send, status } = useTvContext();
  const [moreVisible, setMoreVisible] = useState(false);

  // Redirect to setup if no config
  useEffect(() => {
    if (!configLoading && !tvConfig) {
      router.replace('/setup');
    }
  }, [configLoading, tvConfig]);

  if (configLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!tvConfig) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.tvInfo}>
          <View style={[styles.statusDot, { backgroundColor: status.connected ? colors.success : colors.error }]} />
          <Text style={styles.tvName}>{tvConfig.name || tvConfig.ip}</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push('/settings')}
        >
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Error message */}
      {status.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{status.error}</Text>
        </View>
      )}

      {/* Main Controls */}
      <View style={styles.mainControls}>
        {/* Power Button */}
        <View style={styles.powerSection}>
          <PowerButton />
        </View>

        {/* D-Pad and Volume */}
        <View style={styles.centerSection}>
          <VolumeControl />
          <DPad />
          <View style={styles.placeholder} />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navSection}>
          <RemoteButton
            icon="arrow-back"
            onPress={() => send('Return')}
            size="medium"
          />
          <RemoteButton
            icon="home"
            onPress={() => send('Home')}
            size="medium"
          />
          <RemoteButton
            icon="ellipsis-horizontal"
            onPress={() => setMoreVisible(true)}
            size="medium"
          />
        </View>
      </View>

      {/* More Modal */}
      <MoreModal visible={moreVisible} onClose={() => setMoreVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.lg,
  },
  tvInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tvName: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
  },
  settingsButton: {
    padding: spacing.xs,
  },
  errorContainer: {
    backgroundColor: colors.error + '20',
    padding: spacing.sm,
    marginHorizontal: spacing.md,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  mainControls: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  powerSection: {
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  centerSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  placeholder: {
    width: 56,
  },
  navSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    paddingBottom: spacing.xl,
  },
});
