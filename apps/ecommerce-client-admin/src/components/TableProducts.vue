<template>
  <table class="table table-borderless">
    <thead>
      <tr class="d-flex">
        <th scope="col" class="col-1">ID</th>
        <th scope="col" class="col-5">Product Name</th>
        <th scope="col" class="col-2">Price</th>
        <th scope="col" class="col-2">Product Availity</th>
        <th scope="col" class="col-2"></th>
      </tr>
    </thead>
    <tbody>
      <ProductRow v-for="product in products" :key="product.id" :product="product"></ProductRow>
    </tbody>
  </table>
</template>

<script>
import ProductRow from './ProductRow.vue';

export default {
  name: 'TableProducts',
  components: {
    ProductRow
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products() {
      return this.$store.state.products
    }
  }
}
</script>
