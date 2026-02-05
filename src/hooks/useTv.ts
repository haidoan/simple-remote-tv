import { useState, useCallback } from 'react';
import { sendCommand, checkConnection, scanNetwork } from '../services/bravia';
import { IRCCCommand } from '../constants/ircc';
import { TvConfig, TvConnectionStatus, DiscoveredTv } from '../types';

export function useTv(config: TvConfig | null) {
  const [status, setStatus] = useState<TvConnectionStatus>({
    connected: false,
    loading: false,
    error: null,
  });

  const [scanning, setScanning] = useState(false);
  const [discoveredTvs, setDiscoveredTvs] = useState<DiscoveredTv[]>([]);

  // Send a remote command
  const send = useCallback(async (command: IRCCCommand) => {
    if (!config?.ip) {
      setStatus(prev => ({ ...prev, error: 'No TV configured' }));
      return false;
    }

    const result = await sendCommand(config.ip, command, config.psk);

    if (!result.success) {
      setStatus(prev => ({ ...prev, error: result.error || 'Command failed' }));
    } else {
      setStatus(prev => ({ ...prev, error: null }));
    }

    return result.success;
  }, [config]);

  // Test connection to TV
  const testConnection = useCallback(async () => {
    if (!config?.ip) {
      setStatus({ connected: false, loading: false, error: 'No TV configured' });
      return false;
    }

    setStatus(prev => ({ ...prev, loading: true, error: null }));

    const result = await checkConnection(config.ip, config.psk);

    setStatus({
      connected: result.success,
      loading: false,
      error: result.error || null,
    });

    return result.success;
  }, [config]);

  // Scan network for TVs
  const scan = useCallback(async (subnet?: string) => {
    setScanning(true);
    setDiscoveredTvs([]);

    try {
      const tvs = await scanNetwork(subnet);
      setDiscoveredTvs(tvs);
      return tvs;
    } catch (error) {
      console.error('Scan failed:', error);
      return [];
    } finally {
      setScanning(false);
    }
  }, []);

  return {
    status,
    scanning,
    discoveredTvs,
    send,
    testConnection,
    scan,
  };
}
