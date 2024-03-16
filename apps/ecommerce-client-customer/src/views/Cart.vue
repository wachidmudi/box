<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-8">
          <div v-if="carts.length" class="box is-shadowless is-radiusless">
            <CartList></CartList>
          </div>
          <div v-else class="box is-shadowless is-radiusless">
            <h1 class="title is-4 has-text-centered">Your cart is empty</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartList from '@/components/CartList.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Cart',
  components: {
    CartList,
    Navbar
  },
  created () {
    this.$store.dispatch('fetchCarts')
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
}
</script>
