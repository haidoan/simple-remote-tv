import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TvProvider } from '../context/TvContext';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <TvProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Remote',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="setup"
          options={{
            title: 'Setup',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
          }}
        />
      </Stack>
    </TvProvider>
  );
}
