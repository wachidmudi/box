<template>
  <div id="app">
    <div class="home">
      <router-view/>
    </div>
  </div>
</template>

<script>
import '@/assets/style.css'

export default {
  name: 'App'
}
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
