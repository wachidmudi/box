<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="container is-fluid">
      <div class="columns is-centered is-vcentered">
        <div class="column is-5">
          <div class="columns is-centered is-vcentered">
            <div class="column is-6">
              <figure class="image">
                <img :src="product.image_url" alt="cover">
              </figure>
            </div>
          </div>
        </div>
        <div class="column is-5">
          <div class="box is-shadowless is-radiusless">
            <h1 class="title">{{ product.name }}</h1>
            <hr>
            <h3 class="subtitle is-6 mb-2">Description</h3>
            <p class="has-text-grey">{{ product.description }}</p>
            <p class="subtitle is-6 has-text-darker mt-4">IDR {{ formatPrice }}</p>
            <p class="subtitle is-6 has-text-darker">STOCK {{ product.stock }}</p>
            <p class="subtitle is-6 has-text-darker">Categories</p>
            <b-taglist v-if="product.categories.length > 0">
              <b-tag v-for="category in product.categories"
                :key="category.id"
                type="is-primary is-light">{{ category.title }}</b-tag>
            </b-taglist>
            <p v-else>-</p>
            <div class="buttons mt-5">
                <b-button
                  v-if="product.stock > 0"
                  @click="addToCart(product.id)"
                  type="is-primary"
                  expanded>
                  <strong>
                    Add to Cart
                  </strong>
                </b-button>

                <b-button
                  v-else
                  type="is-danger is-light"
                  expanded>
                  <strong>
                    Product out of stock
                  </strong>
                </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { formatIDR } from '@/helpers/formatter'

export default {
  name: 'Product',
  components: {
    Navbar
  },
  data() {
    return {
      isLoading: false
    }
  },
  created () {
    const { id } = this.$route.params
    if (id) {
      this.$store.dispatch('fetchOneProduct', { id })
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    },
    formatPrice () {
      return formatIDR(this.product.price)
    }
  },
  methods: {
    addToCart (productId) {
      /*

        if (notAuthorized) {
          this.$router.push({ name: 'Login' })
        }
        if (Quantity cannot be more than available stock) {
          SHOW MESSAGE ERROR
        }
        if (addToCart is SUCCESS) {
          SHOW MESSAGE 'Product has been added to Cart'
        }

      */
      const user = JSON.parse(localStorage.getItem('user'))
      if (user?.access_token) {
        this.isLoading = true

        this.$store.dispatch('addCart', { productId })
          .then(message => {
            this.isLoading = false
            this.$buefy.toast.open({
              message,
              type: 'is-success',
              position: 'is-top-right',
              duration: 3500
            })
          })
      } else {
        this.$buefy.toast.open({
          message: 'Please login first',
          type: 'is-warning',
          position: 'is-top-right',
          duration: 3500
        })
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style scoped>
.image img {
  width: auto;
}

.button.is-danger.is-light {
  pointer-events: none;
}
</style>
