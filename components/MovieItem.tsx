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
    <>
      <View style={styles.movieRow}>
        <Text style={styles.movieTitle}>
          {props.title}
        </Text>
        {votePressable}
      </View>
      <Text style={styles.userRow}>
        {props.displayNames.join(", ")}
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  movieRow: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16
  },
  movieTitle: {
    flex: 1,
    fontSize: 20,
  },
  vote: {
    paddingLeft: 16,
    justifyContent: "flex-end",
    textAlign: "center",
    flexDirection: "row"
  },
  userRow: {
    paddingLeft: 16,
    fontSize: 12,
    marginBottom: 10
  }
})