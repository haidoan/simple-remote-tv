// Sony Bravia IRCC (Infrared Compatible Control over IP) command codes
// These are standard codes used by Sony Bravia TVs for remote control

export const IRCC_CODES = {
  // Power
  Power: 'AAAAAQAAAAEAAAAVAw==',
  PowerOn: 'AAAAAQAAAAEAAAAuAw==',
  PowerOff: 'AAAAAQAAAAEAAAAvAw==',

  // Navigation / D-Pad
  Up: 'AAAAAQAAAAEAAAB0Aw==',
  Down: 'AAAAAQAAAAEAAAB1Aw==',
  Left: 'AAAAAQAAAAEAAAA0Aw==',
  Right: 'AAAAAQAAAAEAAAAzAw==',
  Confirm: 'AAAAAQAAAAEAAABlAw==', // OK / Select / Enter

  // Menu navigation
  Home: 'AAAAAQAAAAEAAABgAw==',
  Return: 'AAAAAgAAAJcAAAAjAw==', // Back
  Options: 'AAAAAgAAAJcAAAA2Aw==',

  // Volume
  VolumeUp: 'AAAAAQAAAAEAAAASAw==',
  VolumeDown: 'AAAAAQAAAAEAAAATAw==',
  Mute: 'AAAAAQAAAAEAAAAUAw==',

  // Channel
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

  // Media controls
  Play: 'AAAAAgAAAJcAAAAaAw==',
  Pause: 'AAAAAgAAAJcAAAAZAw==',
  Stop: 'AAAAAgAAAJcAAAAYAw==',
  Rewind: 'AAAAAgAAAJcAAAAbAw==',
  Forward: 'AAAAAgAAAJcAAAAcAw==',

  // Input selection
  Input: 'AAAAAQAAAAEAAAAlAw==',
  Hdmi1: 'AAAAAgAAABoAAABaAw==',
  Hdmi2: 'AAAAAgAAABoAAABbAw==',
  Hdmi3: 'AAAAAgAAABoAAABcAw==',
  Hdmi4: 'AAAAAgAAABoAAABdAw==',

  // Apps
  Netflix: 'AAAAAgAAABoAAAB8Aw==',
  YouTube: 'AAAAAgAAAMQAAABHAw==',

  // Color buttons
  Red: 'AAAAAgAAAJcAAABDAw==',
  Green: 'AAAAAgAAAJcAAABEAw==',
  Yellow: 'AAAAAgAAAJcAAABFAw==',
  Blue: 'AAAAAgAAAJcAAABGAw==',

  // Other
  Guide: 'AAAAAgAAAKQAAABbAw==',
  Display: 'AAAAAQAAAAEAAAA6Aw==',
  Audio: 'AAAAAQAAAAEAAAAXAw==',
  SubTitle: 'AAAAAgAAAJcAAAAoAw==',
} as const;

export type IRCCCommand = keyof typeof IRCC_CODES;
