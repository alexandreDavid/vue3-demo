<template>
  {{ searchedValue }}
  <search-input 
    v-model:search="searchedValue"
    v-model:type="searchedType"
    placeholder="Type something..."
    @update:search="getMovies"
    @update:type="getMovies" />
  <div v-if="loading">Loading</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="movies.length">
    <movie-card v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
  </div>
  <div v-else>
    No result
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import useApi from '../composable/useApi'
import SearchInput from './SearchInput.vue'
import MovieCard from './MovieCard.vue'

export default {
  name: 'MoviesContainer',
  components: { SearchInput, MovieCard },
  setup () {
    const searchedValue = ref('kill')
    const searchedType = ref('movie')
    const movies = ref([])
    const loading = ref(false)
    const error = ref(false)

    const getMovies = async () => {
      await useApi(
        `http://www.omdbapi.com/?type=${searchedType.value}&s=${searchedValue.value}&apikey=48d1aa&page=1`,
        (result) => {
          movies.value = result.Search || []
          if (result.Error) {
            error.value = result.Error
          }
        },
        { loading, error }
      )
    }

    onMounted(getMovies)

    return { searchedValue, searchedType, movies, loading, error, getMovies }
  }
}
</script>
