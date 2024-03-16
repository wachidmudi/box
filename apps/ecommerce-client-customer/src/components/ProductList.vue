<template>
  <div>
    <h1 class="title is-4">Products</h1>
    <div  v-if="products.length"
      class="columns is-multiline is-variable is-2">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      ></ProductCard>
    </div>
    <div v-else class="columns">
      <div class="column">
        <h1  class="subtitle has-text-centered is-4">Oppss.. No product found</h1>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>
