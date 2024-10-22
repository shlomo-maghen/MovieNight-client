import Movie from '@/models/Movie';
import User from '@/models/User';
import { searchMovies } from '@/util/network';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native';

type MovieSearchProps = {
  onResultClick: (roomId: string, movieId: string, user: User, voteType: VoteType) => void
}
export default function MovieSearch(props: MovieSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    if (!searchTerm) {
      return
    }
    const timeout = setTimeout(() => { search(searchTerm, setMovies) }, 1000)
    return () => clearTimeout(timeout)
  }, [searchTerm])

  const movieElements = movies.map(movie => {
    return (
    <Pressable onPress={props.onResultClick()}>
      <Text style={styles.result} key={movie.id}>{movie.title}</Text>
    </Pressable>
    )
  });

  return (
    <>
      {movieElements.length > 0 && (
        <ScrollView style={styles.resultList}>
          {movieElements}
        </ScrollView>
      )}
      <TextInput
        style={styles.searchBox}
        placeholder={"search..."}
        onChangeText={(term) => setSearchTerm(term)} />
    </>
  )
}


const search = (term: string, setMovies: (movies: Movie[]) => void) => {
  searchMovies(term)
    .then(response => {
      const movies = response["movies"]
        .map((movie: { id: string, title: string }) => {
          return new Movie(movie.id, movie.title)
        })
      setMovies(movies)
    })
}

const styles = StyleSheet.create({
  searchBox: {
    marginLeft: 16,
    fontSize: 24
  },
  resultList: {
    paddingTop: 16,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: "light-gray"
  },
  result: {
    fontSize: 24,
    paddingLeft: 16
  }
})