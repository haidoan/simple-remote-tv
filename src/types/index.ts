export interface TvConfig {
  ip: string;
  name?: string;
  psk?: string; // Pre-Shared Key for authentication
}

export interface TvConnectionStatus {
  connected: boolean;
  loading: boolean;
  error: string | null;
}

export interface DiscoveredTv {
  ip: string;
  name: string;
  model?: string;
}

export interface BraviaResponse {
  success: boolean;
  error?: string;
}
