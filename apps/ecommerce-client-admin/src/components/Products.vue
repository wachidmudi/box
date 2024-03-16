<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-5">
        <h1 class="mb-0">Products</h1>
      </div>
      <div class="col-7">
        <div
          v-if="isListPage"
          class="row"
        >
          <div class="col-6">
            <select
              v-model="category"
              @change="onChange($event)"
              class="custom-select shadow-sm"
            >
              <option value="" selected>All Categories</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.title }}
              </option>
            </select>
            <i class="material-icons-outlined select-icon">expand_more</i>
          </div>
          <div class="col-6">
            <button
              type="button"
              class="btn btn-raised btn-primary d-flex"
              @click="addPage"
            >
              <i class="material-icons-outlined">add</i>
              <span style="margin-top: 2px;">Add Product</span>
            </button>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-raised btn-primary d-flex"
          @click="listPage"
          v-else
        >
          Back
        </button>
      </div>
    </div>
    <hr>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      category: ''
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCategories')
  },
  computed: {
    isListPage () {
      const { path } = this.$route
      const listingPath = '/home/products'
      return path == listingPath || path == (listingPath + '/')
    },
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    addPage () {
      this.$router.push({ name: 'ProductAdd' })
    },
    listPage () {
      this.$router.push({ name: 'TableProducts' })
    },
    onChange (e) {
      this.$store.dispatch('fetchProductsByCategory', { id: e.target.value })
    }
  }
}
</script>
