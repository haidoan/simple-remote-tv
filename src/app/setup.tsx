import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, fontSize } from '../constants/theme';
import { useTvContext } from '../context/TvContext';

export default function SetupScreen() {
  const { saveConfig, scan, scanning, discoveredTvs, testConnection } = useTvContext();
  const [manualIp, setManualIp] = useState('');
  const [psk, setPsk] = useState('');
  const [subnet, setSubnet] = useState('192.168.1');
  const [testing, setTesting] = useState(false);

  const handleScan = async () => {
    await scan(subnet);
  };

  const handleSelectTv = async (ip: string) => {
    setManualIp(ip);
  };

  const handleConnect = async () => {
    const ip = manualIp.trim();
    if (!ip) {
      Alert.alert('Error', 'Please enter a TV IP address');
      return;
    }

    setTesting(true);

    // Save config
    const saved = await saveConfig({ ip, psk: psk || undefined });

    if (saved) {
      // Test connection
      const connected = await testConnection();

      if (connected) {
        router.replace('/');
      } else {
        Alert.alert(
          'Connection Warning',
          'Could not verify TV connection. The TV might be off or IP Control may need to be enabled. Save anyway?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Save Anyway',
              onPress: () => router.replace('/'),
            },
          ]
        );
      }
    } else {
      Alert.alert('Error', 'Failed to save configuration');
    }

    setTesting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Before You Start</Text>
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>1. Make sure your TV is on</Text>
            <Text style={styles.instructionText}>
              2. Enable IP Control on your TV:{'\n'}
              Settings → Network → Home Network → IP Control → Simple IP Control → On
            </Text>
            <Text style={styles.instructionText}>
              3. (Optional) Set a Pre-Shared Key (PSK) for authentication
            </Text>
          </View>
        </View>

        {/* Network Scanner */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Find Your TV</Text>

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.subnetInput]}
              value={subnet}
              onChangeText={setSubnet}
              placeholder="192.168.1"
              placeholderTextColor={colors.textMuted}
              keyboardType="decimal-pad"
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={handleScan}
              disabled={scanning}
            >
              {scanning ? (
                <ActivityIndicator color={colors.text} />
              ) : (
                <>
                  <Ionicons name="search" size={20} color={colors.text} />
                  <Text style={styles.scanButtonText}>Scan</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Discovered TVs */}
          {discoveredTvs.length > 0 && (
            <View style={styles.tvList}>
              {discoveredTvs.map((tv) => (
                <TouchableOpacity
                  key={tv.ip}
                  style={[
                    styles.tvItem,
                    manualIp === tv.ip && styles.tvItemSelected,
                  ]}
                  onPress={() => handleSelectTv(tv.ip)}
                >
                  <Ionicons name="tv" size={24} color={colors.text} />
                  <View style={styles.tvInfo}>
                    <Text style={styles.tvName}>{tv.name}</Text>
                    <Text style={styles.tvIp}>{tv.ip}</Text>
                  </View>
                  {manualIp === tv.ip && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {scanning && (
            <Text style={styles.scanningText}>
              Scanning network... This may take a moment.
            </Text>
          )}
        </View>

        {/* Manual IP Entry */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Or Enter Manually</Text>

          <TextInput
            style={styles.input}
            value={manualIp}
            onChangeText={setManualIp}
            placeholder="TV IP Address (e.g., 192.168.1.100)"
            placeholderTextColor={colors.textMuted}
            keyboardType="decimal-pad"
          />

          <TextInput
            style={styles.input}
            value={psk}
            onChangeText={setPsk}
            placeholder="Pre-Shared Key (optional)"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
          />
        </View>

        {/* Connect Button */}
        <TouchableOpacity
          style={[styles.connectButton, !manualIp && styles.connectButtonDisabled]}
          onPress={handleConnect}
          disabled={!manualIp || testing}
        >
          {testing ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <Text style={styles.connectButtonText}>Connect</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  instructions: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  instructionText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subnetInput: {
    flex: 1,
    marginBottom: 0,
  },
  scanButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  scanButtonText: {
    color: colors.text,
    fontWeight: '600',
  },
  scanningText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  tvList: {
    marginTop: spacing.md,
  },
  tvItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  tvItemSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  tvInfo: {
    flex: 1,
  },
  tvName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  tvIp: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  connectButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  connectButtonDisabled: {
    backgroundColor: colors.buttonDisabled,
  },
  connectButtonText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
});
