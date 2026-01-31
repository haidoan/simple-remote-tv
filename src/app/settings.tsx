import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, fontSize } from '../constants/theme';
import { useTvContext } from '../context/TvContext';

export default function SettingsScreen() {
  const { tvConfig, clearConfig, testConnection, status } = useTvContext();

  const handleTestConnection = async () => {
    const connected = await testConnection();
    if (connected) {
      Alert.alert('Success', 'TV is connected and responding!');
    } else {
      Alert.alert('Failed', status.error || 'Could not connect to TV');
    }
  };

  const handleChangeTV = () => {
    router.push('/setup');
  };

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect TV',
      'Are you sure you want to disconnect from this TV?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            await clearConfig();
            router.replace('/setup');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Current TV */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current TV</Text>
          <View style={styles.tvCard}>
            <Ionicons name="tv" size={32} color={colors.text} />
            <View style={styles.tvInfo}>
              <Text style={styles.tvName}>{tvConfig?.name || 'Sony Bravia'}</Text>
              <Text style={styles.tvIp}>{tvConfig?.ip || 'Not configured'}</Text>
            </View>
            <View style={[styles.statusBadge, status.connected && styles.statusConnected]}>
              <Text style={styles.statusText}>
                {status.connected ? 'Connected' : 'Unknown'}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleTestConnection}>
            <Ionicons name="wifi" size={24} color={colors.text} />
            <Text style={styles.menuItemText}>Test Connection</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleChangeTV}>
            <Ionicons name="swap-horizontal" size={24} color={colors.text} />
            <Text style={styles.menuItemText}>Change TV</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.dangerItem]}
            onPress={handleDisconnect}
          >
            <Ionicons name="log-out" size={24} color={colors.error} />
            <Text style={[styles.menuItemText, styles.dangerText]}>Disconnect</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Troubleshooting</Text>
          <View style={styles.helpCard}>
            <Text style={styles.helpTitle}>TV not responding?</Text>
            <Text style={styles.helpText}>
              1. Make sure your TV is turned on{'\n'}
              2. Check that your phone is on the same WiFi network{'\n'}
              3. Verify IP Control is enabled on your TV:{'\n'}
              {'   '}Settings → Network → Home Network → IP Control{'\n'}
              4. Try restarting your TV
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tvCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    gap: spacing.md,
  },
  tvInfo: {
    flex: 1,
  },
  tvName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
  tvIp: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statusBadge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  statusConnected: {
    backgroundColor: colors.success + '30',
  },
  statusText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
  dangerItem: {
    marginTop: spacing.sm,
  },
  dangerText: {
    color: colors.error,
  },
  helpCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  helpTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  helpText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
