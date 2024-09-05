import Room from '@/models/Room';
import { Text, View } from 'react-native';

export default function JoinedRoom(props: { id: string }) {
  return (
    <View>
      <Text> Room id: {props.id} </Text>
    </View>
  )
}