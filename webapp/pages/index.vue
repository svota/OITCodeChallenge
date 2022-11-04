<template>
  <div>
    <h1>Film Search Engine</h1>
    <input v-model="text" placeholder="movie name">
    <button @click="search(text)">
      Search
    </button>
    <li v-for="film in films" :key="film.title">
      <p>
        {{ film.title }}
      </p>
      <img :src="'https://image.tmdb.org/t/p/w200' + film.poster_path">
      <p>
        {{ film.popularity }}
      </p>
      <p>
        {{ film.overview }}
      </p>
    </li>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      text: '',
      films: null
    }
  },
  methods: {
    search (query) {
      const url = 'http://localhost:5000/movies?search=' + query
      axios.get(url, { headers: { apikey: '3779faf9ee7602e93ec15f01aed5f68a' } }).then(response => (this.films = response.data))
    }
  }
}
</script>

<style>
</style>
