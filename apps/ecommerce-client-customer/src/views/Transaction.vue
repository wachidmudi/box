<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-8">
          <div v-if="transactions.length > 0"
            class="box is-shadowless is-radiusless">
            <h1 class="title is-4 has-text-centered">History Transaction</h1>
            <table class="table is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transaction in transactions"
                  :key="transaction.id">
                  <td>{{ date(transaction.updatedAt) }}</td>
                  <td>{{ transaction.product.name }}</td>
                  <td>{{ transaction.quantity }}</td>
                  <td>IDR {{ formatPrice(transaction.quantity * transaction.product.price) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else
            class="box is-shadowless is-radiusless">
            <h1 class="title is-4 has-text-centered">You don't have History Transaction</h1>
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
  name: 'Cart',
  components: {
    Navbar
  },
  created () {
    this.$store.dispatch('getTransactions')
  },
  computed: {
    transactions () {
      return this.$store.state.transactions
    }
  },
  methods: {
    date (date) {
      return new Date(date).toISOString().substring(0, 10)
    },
    formatPrice (number) {
      return formatIDR(number)
    }
  }
}
</script>
