<template>
  <div id="base">
    <h1>Film Search Engine</h1>
    <div>
      <input v-model="text" placeholder="movie name">
      <button @click="search(text)">
        Search
      </button>
    </div>
    <ul>
      <li v-for="film in films" :key="film.id">
        <p class="filmTitle">
          {{ film.title }}
        </p>
        <img :src="film.poster_image_url">
        <p>
          {{ film.popularity_summary }}
        </p>
      </li>
    </ul>
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
      axios
        .get(url, { headers: { apikey: '3779faf9ee7602e93ec15f01aed5f68a' } })
        .then(response => (this.films = response.data))
    }
  }
}
</script>

<style>
#base {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.filmTitle {
  text-align: center;
}
ul {
  display: flex;
  width: 75%;
  flex-wrap: wrap;
  list-style-type: none;
}
li {
  width: 200px;
  margin: 1rem;
}
</style>
