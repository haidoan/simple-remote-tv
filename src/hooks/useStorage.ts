import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TvConfig } from '../types';

const STORAGE_KEY = '@bravia_remote_tv_config';

export function useStorage() {
  const [tvConfig, setTvConfig] = useState<TvConfig | null>(null);
  const [loading, setLoading] = useState(true);

  // Load config on mount
  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTvConfig(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load TV config:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = useCallback(async (config: TvConfig) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      setTvConfig(config);
      return true;
    } catch (error) {
      console.error('Failed to save TV config:', error);
      return false;
    }
  }, []);

  const clearConfig = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setTvConfig(null);
      return true;
    } catch (error) {
      console.error('Failed to clear TV config:', error);
      return false;
    }
  }, []);

  return {
    tvConfig,
    loading,
    saveConfig,
    clearConfig,
  };
}
