# Sony Bravia API Skill

## Overview
Sony Bravia TVs support IP control via REST API. This skill covers how to interact with the TV.

## Connection Methods

### Simple IP Control (Recommended)
- Protocol: HTTP REST
- Port: 80 (default)
- Authentication: Pre-Shared Key (PSK) or None

### Endpoints
```
Base URL: http://<TV_IP>/sony/

Endpoints:
- /sony/IRCC           - Send remote commands (IR codes)
- /sony/system         - System info and control
- /sony/avContent      - Content/input control
- /sony/audio          - Volume control
```

## Authentication

### Pre-Shared Key (PSK)
Add header to all requests:
```
X-Auth-PSK: <your-psk>
```

### No Authentication
Some TVs work without auth if "Simple IP Control" is enabled.

## IRCC Commands (Remote Control)

### Request Format
```ts
async function sendIRCC(tvIp: string, command: string, psk?: string): Promise<void> {
  const body = `<?xml version="1.0"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <s:Body>
    <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
      <IRCCCode>${command}</IRCCCode>
    </u:X_SendIRCC>
  </s:Body>
</s:Envelope>`;

  const headers: Record<string, string> = {
    'Content-Type': 'text/xml; charset=UTF-8',
    'SOAPACTION': '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
  };

  if (psk) {
    headers['X-Auth-PSK'] = psk;
  }

  await fetch(`http://${tvIp}/sony/IRCC`, {
    method: 'POST',
    headers,
    body,
  });
}
```

### IRCC Code Reference
```ts
export const IRCC_CODES = {
  // Power
  Power: 'AAAAAQAAAAEAAAAVAw==',
  PowerOff: 'AAAAAQAAAAEAAAAvAw==',

  // Navigation
  Up: 'AAAAAQAAAAEAAAB0Aw==',
  Down: 'AAAAAQAAAAEAAAB1Aw==',
  Left: 'AAAAAQAAAAEAAAA0Aw==',
  Right: 'AAAAAQAAAAEAAAAzAw==',
  Confirm: 'AAAAAQAAAAEAAABlAw==',  // OK/Enter
  Return: 'AAAAAgAAAJcAAAAjAw==',   // Back
  Home: 'AAAAAQAAAAEAAABgAw==',

  // Volume
  VolumeUp: 'AAAAAQAAAAEAAAASAw==',
  VolumeDown: 'AAAAAQAAAAEAAAATAw==',
  Mute: 'AAAAAQAAAAEAAAAUAw==',

  // Channels
  ChannelUp: 'AAAAAQAAAAEAAAAQAw==',
  ChannelDown: 'AAAAAQAAAAEAAAARAw==',

  // Numbers
  Num0: 'AAAAAQAAAAEAAAAJAw==',
  Num1: 'AAAAAQAAAAEAAAAAAw==',
  Num2: 'AAAAAQAAAAEAAAABAw==',
  Num3: 'AAAAAQAAAAEAAAACAw==',
  Num4: 'AAAAAQAAAAEAAAADAw==',
  Num5: 'AAAAAQAAAAEAAAAEAw==',
  Num6: 'AAAAAQAAAAEAAAAFAw==',
  Num7: 'AAAAAQAAAAEAAAAGAw==',
  Num8: 'AAAAAQAAAAEAAAAHAw==',
  Num9: 'AAAAAQAAAAEAAAAIAw==',

  // Media
  Play: 'AAAAAgAAAJcAAAAaAw==',
  Pause: 'AAAAAgAAAJcAAAAZAw==',
  Stop: 'AAAAAgAAAJcAAAAYAw==',
  Rewind: 'AAAAAgAAAJcAAAAbAw==',
  Forward: 'AAAAAgAAAJcAAAAcAw==',

  // Inputs
  Input: 'AAAAAQAAAAEAAAAlAw==',
  HDMI1: 'AAAAAgAAABoAAABaAw==',
  HDMI2: 'AAAAAgAAABoAAABbAw==',
  HDMI3: 'AAAAAgAAABoAAABcAw==',
  HDMI4: 'AAAAAgAAABoAAABdAw==',

  // Apps
  Netflix: 'AAAAAgAAABoAAAB8Aw==',
  YouTube: 'AAAAAgAAAMQAAABHAw==',

  // Other
  Display: 'AAAAAQAAAAEAAAA6Aw==',
  Options: 'AAAAAgAAAJcAAAA2Aw==',
  Guide: 'AAAAAgAAAKQAAABbAw==',
  Info: 'AAAAAQAAAAEAAAA6Aw==',
} as const;
```

## REST API Commands

### Get System Info
```ts
async function getSystemInfo(tvIp: string, psk?: string) {
  const response = await fetch(`http://${tvIp}/sony/system`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(psk && { 'X-Auth-PSK': psk }),
    },
    body: JSON.stringify({
      method: 'getSystemInformation',
      id: 1,
      params: [],
      version: '1.0',
    }),
  });
  return response.json();
}
```

### Get Power Status
```ts
async function getPowerStatus(tvIp: string, psk?: string) {
  const response = await fetch(`http://${tvIp}/sony/system`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(psk && { 'X-Auth-PSK': psk }),
    },
    body: JSON.stringify({
      method: 'getPowerStatus',
      id: 1,
      params: [],
      version: '1.0',
    }),
  });
  return response.json();
}
```

### Set Volume
```ts
async function setVolume(tvIp: string, volume: number, psk?: string) {
  const response = await fetch(`http://${tvIp}/sony/audio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(psk && { 'X-Auth-PSK': psk }),
    },
    body: JSON.stringify({
      method: 'setAudioVolume',
      id: 1,
      params: [{ target: 'speaker', volume: String(volume) }],
      version: '1.0',
    }),
  });
  return response.json();
}
```

## Network Discovery

### Finding Sony TVs on Network
Sony Bravia TVs respond to SSDP (Simple Service Discovery Protocol):

```ts
// Scan common IP range for Sony TVs
async function scanForTVs(subnet: string = '192.168.1'): Promise<string[]> {
  const foundTVs: string[] = [];
  const timeout = 1000; // 1 second timeout per IP

  const promises = [];
  for (let i = 1; i <= 254; i++) {
    const ip = `${subnet}.${i}`;
    promises.push(
      fetch(`http://${ip}/sony/system`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'getSystemInformation',
          id: 1,
          params: [],
          version: '1.0',
        }),
        signal: AbortSignal.timeout(timeout),
      })
        .then(res => res.json())
        .then(data => {
          if (data.result) {
            foundTVs.push(ip);
          }
        })
        .catch(() => {}) // Ignore errors (not a TV)
    );
  }

  await Promise.all(promises);
  return foundTVs;
}
```

## Error Handling

### Common Errors
- **Connection refused**: TV might be off or IP wrong
- **401 Unauthorized**: PSK required or incorrect
- **Timeout**: TV not reachable, check network

### Error Response Format
```ts
interface TVError {
  error: [number, string]; // [error_code, error_message]
}

// Common error codes
// 403: Forbidden (auth required)
// 404: Method not found
// 503: Service unavailable (TV busy)
```

## Service Pattern
```ts
// Centralized TV service
class BraviaService {
  private ip: string;
  private psk?: string;

  constructor(ip: string, psk?: string) {
    this.ip = ip;
    this.psk = psk;
  }

  async sendCommand(code: keyof typeof IRCC_CODES): Promise<void> {
    await sendIRCC(this.ip, IRCC_CODES[code], this.psk);
  }

  async isConnected(): Promise<boolean> {
    try {
      const status = await getPowerStatus(this.ip, this.psk);
      return !!status.result;
    } catch {
      return false;
    }
  }
}
```
