<template>
  <div class="row">
    <div class="col-3">
      <img
        :src="product.image_url"
        class="img-fluid"
        alt="cover"
      >
    </div>
    <div class="col-9">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <h6>Price: Rp. {{ formatPrice(product.price) }}</h6>
      <h6>Stock: {{ product.stock }}</h6>
      <div
        v-for="category in product.categories"
        :key="category.id"
        class="border border-secondary rounded d-inline-block py-1 px-2 mr-2 mb-2"
        role="tag"
      >
          {{ category.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductView',
  created () {
    const { id } = this.$route.params
    if (id) {
      this.$store.dispatch('getProduct', id)
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    }
  },
  methods: {
    formatPrice(value) {
      if (value) {
        return value.toLocaleString().replace(/,/g, '.')
      }
      return null
    }
  }
}
</script>
