import Main from '@/components/Main';
import Register from '@/components/Register';
import { getUser } from '@/util/user';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";

export default function Home() {
  const [username, setUsername] = useState<string | null>();

  getUser().then(user => setUsername(user.displayName));

  return (
    <View style={styles.container}>
      {username ? <Main /> : <Register />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#347',
    flex: 1,
    justifyContent: 'center',
  },
});
