import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="room/[id]" />
      <Stack.Screen name="join-room-modal" options={{presentation: 'modal'}}/>
      <Stack.Screen name="room/add-movie-modal" options={{presentation: 'modal'}}/>
    </Stack>
  );
}