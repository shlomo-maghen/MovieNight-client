import { Pressable, StyleSheet, Text, View } from "react-native";

type MovieItemProps = {
  title: string,
  displayNames: string[],
  currentUserVoted: boolean,
  voteAction: () => void,
}

export default function MovieItem(props: MovieItemProps) {

  const votePressable = (props.currentUserVoted) ?
    <Pressable
      style={styles.vote}
      onPress={props.voteAction}>
      <Text>DOWNVOTE</Text>
    </Pressable>
    :
    <Pressable
      style={styles.vote}
      onPress={props.voteAction}>
      <Text>UPVOTE</Text>
    </Pressable>
  return (
    <View style={styles.movieItem}>
      <Text style={styles.voteCount}>{props.displayNames.length}</Text>
      <View style={styles.movieBlock}>
        <Text style={styles.movieTitle}>
          {props.title}
        </Text>
        <Text style={styles.userRow}>
          {props.displayNames.join(", ")}
        </Text>
      </View>
      {votePressable}
    </View>
  )
}

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  movieBlock: {
    flex: 1,
  },
  title: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  voteCount: {
    fontSize: 20,
    marginRight: 10,
  },
  movieTitle: {
    flex: 1,
    fontSize: 20,
  },
  vote: {
    justifyContent: "flex-end",
    textAlign: "center",
    flexDirection: "row"
  },
  userRow: {
    fontSize: 12,
  }
})