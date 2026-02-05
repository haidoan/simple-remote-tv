import { IRCC_CODES, IRCCCommand } from '../constants/ircc';
import { BraviaResponse, DiscoveredTv } from '../types';

const BRAVIA_PORT = 80;
const IRCC_PATH = '/sony/IRCC';
const SYSTEM_PATH = '/sony/system';

// Build SOAP envelope for IRCC command
function buildIRCCRequest(code: string): string {
  return `<?xml version="1.0"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <s:Body>
    <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
      <IRCCCode>${code}</IRCCCode>
    </u:X_SendIRCC>
  </s:Body>
</s:Envelope>`;
}

// Send IRCC command to TV
export async function sendCommand(
  ip: string,
  command: IRCCCommand,
  psk?: string
): Promise<BraviaResponse> {
  const code = IRCC_CODES[command];
  if (!code) {
    return { success: false, error: `Unknown command: ${command}` };
  }

  const url = `http://${ip}:${BRAVIA_PORT}${IRCC_PATH}`;
  const headers: HeadersInit = {
    'Content-Type': 'text/xml; charset=UTF-8',
    'SOAPACTION': '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
  };

  // Add PSK header if provided
  if (psk) {
    headers['X-Auth-PSK'] = psk;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: buildIRCCRequest(code),
    });

    if (response.ok) {
      return { success: true };
    }

    // Handle common errors
    if (response.status === 403) {
      return { success: false, error: 'Authentication failed. Check PSK or enable IP Control on TV.' };
    }
    if (response.status === 503) {
      return { success: false, error: 'TV is not available. It may be off or in standby.' };
    }

    return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: `Connection failed: ${message}` };
  }
}

// Check if TV is reachable and responding
export async function checkConnection(ip: string, psk?: string): Promise<BraviaResponse> {
  const url = `http://${ip}:${BRAVIA_PORT}${SYSTEM_PATH}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (psk) {
    headers['X-Auth-PSK'] = psk;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        method: 'getSystemInformation',
        id: 1,
        params: [],
        version: '1.0',
      }),
    });

    if (response.ok) {
      return { success: true };
    }

    if (response.status === 403) {
      return { success: false, error: 'Authentication required. Set up PSK on your TV.' };
    }

    return { success: false, error: `HTTP ${response.status}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}

// Get TV system information
export async function getTvInfo(ip: string, psk?: string): Promise<{ success: boolean; data?: any; error?: string }> {
  const url = `http://${ip}:${BRAVIA_PORT}${SYSTEM_PATH}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (psk) {
    headers['X-Auth-PSK'] = psk;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        method: 'getSystemInformation',
        id: 1,
        params: [],
        version: '1.0',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data: data.result?.[0] };
    }

    return { success: false, error: `HTTP ${response.status}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}

// Scan local network for Sony Bravia TVs
export async function scanNetwork(subnet: string = '192.168.1'): Promise<DiscoveredTv[]> {
  const discovered: DiscoveredTv[] = [];
  const timeout = 1000; // 1 second timeout per IP

  // Scan common IP range (1-254)
  const scanPromises = [];
  for (let i = 1; i <= 254; i++) {
    const ip = `${subnet}.${i}`;
    scanPromises.push(
      checkTvAtIp(ip, timeout).then(tv => {
        if (tv) discovered.push(tv);
      })
    );
  }

  // Wait for all scans to complete
  await Promise.all(scanPromises);

  return discovered;
}

// Check if a specific IP has a Sony Bravia TV
async function checkTvAtIp(ip: string, timeout: number): Promise<DiscoveredTv | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`http://${ip}:${BRAVIA_PORT}${SYSTEM_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'getSystemInformation',
        id: 1,
        params: [],
        version: '1.0',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const info = data.result?.[0];
      return {
        ip,
        name: info?.name || 'Sony Bravia',
        model: info?.model,
      };
    }

    // 403 means TV exists but needs auth - still a valid TV
    if (response.status === 403) {
      return {
        ip,
        name: 'Sony Bravia (Auth Required)',
      };
    }

    return null;
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}
