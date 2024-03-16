<template>
  <div class="column is-4">
    <div @click="$router.push({ path: `/product/${product.id}` })"
      class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="product.image_url" alt="Thumbnail">
        </figure>
      </div>
      <div class="card-content">
        <h4 class="title is-5">{{ product.name }}</h4>
        <div class="content">
          <p v-if="product.stock > 0"
            class="subtitle is-6 has-text-success">
            {{ product.stock }} items left
          </p>
          <p v-else
            class="subtitle is-6 has-text-danger">
            Product out of stock
          </p>
          <p class="subtitle is-5">IDR {{ formatPrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatIDR } from '@/helpers/formatter'

export default {
  name: 'ProductCard',
  props: ['product'],
  computed: {
    formatPrice () {
      return formatIDR(this.product.price)
    }
  }
}
</script>

<style scoped>
figure {
  overflow: hidden;
}

figure img {
  height: auto !important;
}

.card {
  border-radius: 6px;
  cursor: pointer;
}

.card:hover {
    box-shadow: 0 10px 16px rgba(0, 0, 0, .13), 0 6px 6px rgba(0, 0, 0, .19);
}
</style>
