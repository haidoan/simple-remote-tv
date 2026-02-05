import React, { createContext, useContext, ReactNode } from 'react';
import { useStorage } from '../hooks/useStorage';
import { useTv } from '../hooks/useTv';
import { TvConfig, TvConnectionStatus, DiscoveredTv } from '../types';
import { IRCCCommand } from '../constants/ircc';

interface TvContextType {
  // Config
  tvConfig: TvConfig | null;
  configLoading: boolean;
  saveConfig: (config: TvConfig) => Promise<boolean>;
  clearConfig: () => Promise<boolean>;

  // Connection
  status: TvConnectionStatus;
  testConnection: () => Promise<boolean>;

  // Commands
  send: (command: IRCCCommand) => Promise<boolean>;

  // Scanning
  scanning: boolean;
  discoveredTvs: DiscoveredTv[];
  scan: (subnet?: string) => Promise<DiscoveredTv[]>;
}

const TvContext = createContext<TvContextType | null>(null);

export function TvProvider({ children }: { children: ReactNode }) {
  const { tvConfig, loading: configLoading, saveConfig, clearConfig } = useStorage();
  const { status, scanning, discoveredTvs, send, testConnection, scan } = useTv(tvConfig);

  const value: TvContextType = {
    tvConfig,
    configLoading,
    saveConfig,
    clearConfig,
    status,
    testConnection,
    send,
    scanning,
    discoveredTvs,
    scan,
  };

  return <TvContext.Provider value={value}>{children}</TvContext.Provider>;
}

export function useTvContext() {
  const context = useContext(TvContext);
  if (!context) {
    throw new Error('useTvContext must be used within a TvProvider');
  }
  return context;
}
