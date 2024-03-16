<template>
  <div class="container-fluid">
    <h1>
      Dashboard
    </h1>
    <hr>
    <div class="row justify-content-around">
      <div class="col-4">
        <div
          @click="goToPage('TableProducts')"
          class="box box-purple shadow"
        >
          <h1 class="mb-0">
            <strong>
              {{ products.length }}
            </strong>
          </h1>
          <h3 class="mb-0">Products</h3>
          <i class="material-icons-outlined">local_mall</i>
        </div>
      </div>
      <div class="col-4">
        <div
          @click="goToPage('Categories')"
          class="box box-tomato shadow"
        >
          <h1 class="mb-0">
            <strong>
              {{ categories.length }}
            </strong>
          </h1>
          <h3 class="mb-0">Categories</h3>
          <i class="material-icons-outlined">category</i>
        </div>
      </div>
    </div>
    <div class="my-5"></div>
    <div class="row">
      <div class="col">
        <h3 class="mb-4">Recent Products</h3>
        <ul class="list-unstyled">
          <li
            v-for="product in recentProducts"
            :key="product.id"
            class="media mb-3"
          >
            <img :src="product.image_url" class="mr-3" alt="cover" style="max-height: 200px">
            <div class="media-body">
              <h5 class="mt-0 mb-1">{{ product.name }}</h5>
              <p>{{ product.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCategories')
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    recentProducts () {
      return this.products.slice(0, 3)
    },
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    goToPage (name) {
      this.$router.push({ name })
    }
  }
}
</script>
