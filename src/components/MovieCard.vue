<template>
  <img :src="movie.Poster" @click="openInfos" />
  <teleport to="body">
    <transition name="fade">
      <div class="alert" v-if="infoOpened" @click="infoOpened = false">
        Title: {{ movie.Title }}
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  setup () {
    const infoOpened = ref(false)

    const openInfos = () => {
      infoOpened.value = true
      setTimeout(() => {
        infoOpened.value = false
      }, 2000)
    }

    return { infoOpened, openInfos }
  }
}
</script>

<style scoped>
img {
  padding: .5rem;
}
.alert {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 1rem;
  background: lightblue;
  border-radius: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>