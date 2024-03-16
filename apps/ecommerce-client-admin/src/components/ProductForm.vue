<template>
  <form @submit.prevent="sendProduct" method="POST">
    <div class="form-group">
      <label for="name">Name</label>
      <input v-model="name" type="text" class="form-control" id="name" required>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea v-model="description" class="form-control" id="description" rows="5"></textarea>
    </div>
    <div class="form-group">
      <label for="imageUrl">Image URL</label>
      <input v-model="imageUrl" type="text" class="form-control" id="imageUrl" required>
    </div>
    <div class="form-row">
      <div class="form-group col-6">
        <label for="price">Price</label>
        <input v-model="price" type="number" class="form-control" id="price" required>
      </div>
      <div class="form-group col-6">
        <label for="stock">Stock</label>
        <input v-model="stock" type="number" class="form-control" id="stock" required>
      </div>
    </div>
    <div class="form-group">
      <label for="categories">Categories</label>
      <div class="input-group">
        <select v-model="category" class="custom-select" id="categories">
          <option disabled selected value="">Select tag</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category"
            class="text-capitalize"
          >
          {{ category.title }}
          </option>
        </select>
        <div class="input-group-append">
          <button
            class="btn btn-outline-primary"
            type="button"
            @click="addCategory"
          >
            Add
          </button>
        </div>
      </div>
      <div class="py-2">
        <div
          v-for="category in uniqueCategories"
          :key="category.id"
          class="border border-secondary rounded d-inline-block py-1 px-2 mr-2 mb-2"
          role="tag"
        >
          {{ category.title }}
          <button
            @click="removeCategory(category.id)"
            type="button"
            class="close ml-1"
            aria-label="Remove"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-raised btn-primary btn-lg btn-block mt-2 mb-4">
      Submit
    </button>
  </form>
</template>

<script>
export default {
  name: 'ProductForm',
  data () {
    return {
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      stock: 0,
      category: '',
      selectedCategories: []
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')

    const { id } = this.$route.params
    if (id) {
      this.$store.dispatch('getProduct', id)
    }
  },
  computed: {
    uniqueCategories () {
      return [...new Set(this.selectedCategories)]
    },
    categories () {
      return this.$store.state.categories
    },
    product () {
      return this.$store.state.product
    }
  },
  watch: {
    product() {
      this.name = this.product.name
      this.description = this.product.description
      this.imageUrl = this.product.image_url
      this.price = this.product.price
      this.stock = this.product.stock
      // this.selectedCategories = this.product.categories
    },
    'product.categories' (newVal) {
      this.selectedCategories = newVal
    },
    deep: true
  },
  methods: {
    sendProduct () {
      const payload = {
        name: this.name,
        description: this.description,
        image_url: this.imageUrl,
        price: this.price,
        stock: this.stock,
        categories: this.uniqueCategories.map(i => i.id)
      }

      const { id } = this.$route.params

      // If edit otherwise add
      if (id) {
        this.$store.dispatch('editProduct', { id, ...payload })
      } else {
        this.$store.dispatch('addProduct', payload)
      }
    },
    addCategory() {
      const checkDuplicate = this.selectedCategories.some(i => i.title === this.category.title)
      if (!checkDuplicate) {
        this.selectedCategories.push(this.category)
      }
    },
    removeCategory (id) {
      const categories = [...this.selectedCategories]
      const index = categories.findIndex(i => i.id == id)
      categories.splice(index, 1)
      this.$store.commit('setProductCategories', categories)
    }
  },
}
</script>
