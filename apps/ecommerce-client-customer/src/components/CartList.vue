<template>
  <div class="columns">
    <div class="column">
      <h1 class="title">Cart</h1>
      <CartCard
        v-for="cart in carts"
        :key="cart.id"
        :cart="cart"
      ></CartCard>
    </div>
    <div class="column is-one-third">
      <h1 class="title is-4">Total Price</h1>
      <h1 class="subtitle is-4">IDR {{ totalPrice }}</h1>
      <b-button @click="checkout"
        :class="isLoading && 'loading'"
        type="is-primary"
        size="is-medium"
        expanded>
        <strong>
          <span :class="`${isLoading && 'loading'} loader`"></span>
          Checkout
        </strong>
      </b-button>
    </div>
  </div>
</template>

<script>
import CartCard from '@/components/CartCard.vue'
import { formatIDR } from '@/helpers/formatter'

export default {
  name: 'CartList',
  components: {
    CartCard
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalPrice () {
      const total = this.carts.reduce((acc, val) => acc + (val.product.price * val.quantity), 0)
      return formatIDR(total)
    }
  },
  methods: {
    checkout () {
      this.isLoading = true

      this.$store.dispatch('checkout')
        .then(message => {
          this.isLoading = false

          this.$buefy.toast.open({
            message,
            type: 'is-success',
            position: 'is-top-right',
            duration: 3500
          })
        })
    }
  }
}
</script>

<style scoped>
.loader {
  display: none;
}

.loading.loader {
  display: inline-block;
}
.loading.button.is-primary {
  pointer-events: none;
  background-color: rgba(105, 67, 208, .7);
}
</style>
