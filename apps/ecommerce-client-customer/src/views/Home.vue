<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-3">
          <div class="box is-shadowless">
            <h1 class="subtitle is-4 has-text-weight-medium">Filter</h1>
            <h1 class="subtitle is-5">Categories</h1>
            <section>
              <CategoryCheckBox v-for="category in categories"
                :key="category.id"
                :category="category"
                @handleCheck="handleCheck"
                ></CategoryCheckBox>
              <div class="buttons">
                <b-button
                  @click="filterByCategories"
                  type="is-primary"
                  outlined
                  expanded>
                  Apply
                </b-button>
              </div>
            </section>
          </div>
        </div>
        <div class="column">
          <div class="box is-shadowless is-radiusless">
            <ProductList></ProductList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCheckBox from '@/components/CategoryCheckBox.vue'
import Navbar from '@/components/Navbar.vue'
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'Home',
  components: {
    ProductList,
    Navbar,
    CategoryCheckBox
  },
  created () {
    this.$store.dispatch('fetchCategories')
  },
  data () {
    return {
      selectedCategories: []
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    handleCheck (categoryId) {
      if (!this.selectedCategories.includes(categoryId)) {
        this.selectedCategories.push(categoryId)
      } else {
        const index = this.selectedCategories.indexOf(categoryId)

        if (index !== -1) {
          this.selectedCategories.splice(index, 1)
        }
      }
    },
    filterByCategories () {
      this.$store.dispatch('fetchProductsByCategory', { id: this.selectedCategories })
    }
  }
}
</script>
