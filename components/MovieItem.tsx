import { Pressable, StyleSheet, Text, View } from "react-native";

type MovieItemProps = {
  title: string,
  userId: string,
  currentUser: string
}

export default function MovieItem(props: MovieItemProps) {
  return (
    <>
      <View style={styles.movieRow}>
        <View style={styles.movieTitle}>
          <Text>
            {props.title}
          </Text>
        </View>

        <View style={styles.voteGroup}>
          <Pressable style={styles.vote} onPress={() => console.log(props.currentUser, "votes up movie", props.title)}>
            <Text>UPVOTE</Text>
          </Pressable>
          <Pressable style={styles.vote} onPress={() => console.log(props.currentUser, "votes down movie", props.title)}>
            <Text>DOWNVOTE</Text>
          </Pressable>
        </View>


      </View>
      <Text style={styles.userRow}>
        {props.userId}
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
  voteGroup: {
    justifyContent: "flex-end",
    textAlign: "center",
    flexDirection: "row"
  },
  vote: {
    paddingLeft: 16
  },
  userRow: {
    paddingLeft: 16,
    fontSize: 12,
    marginBottom: 10
  }
})