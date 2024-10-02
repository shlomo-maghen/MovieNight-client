import Movie from '@/models/Movie';
import { searchMovies } from '@/util/network';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native';

export default function MovieSearch() {
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
    return <Text key={movie.id}>{movie.title}</Text>
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
    flex: 1,
    fontSize: 24
  },
  resultList: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "dashed"
  }
})