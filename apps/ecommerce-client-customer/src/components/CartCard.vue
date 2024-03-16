<template>
  <div class="block">
    <article class="media box">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="cart.product.image_url">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ cart.product.name }}</strong>
            <br>
            {{ shortDescription }}...
          </p>
        </div>
        <span class="subtitle is-6 mr-2">IDR {{ formattedPrice }} x</span>
        <b-button
          @click="changeQuantity(false)"
          type="is-dark"
          icon-right="minus-thick"
          size="is-small"/>
        <span class="subtitle mx-3">{{ cart.quantity }}</span>
        <b-button
          @click="changeQuantity(true)"
          type="is-dark"
          icon-right="plus-thick"
          size="is-small"/>
      </div>
      <div class="media-right">
        <button @click="removeCart" class="delete"></button>
      </div>
    </article>
  </div>
</template>

<script>
import { formatIDR, shortenText } from '@/helpers/formatter'
import Swal from 'sweetalert2'

export default {
  name: 'CartCard',
  props: ['cart'],
  computed: {
    shortDescription () {
      return shortenText(this.cart.product.description, 120)
    },
    formattedPrice () {
      return formatIDR(this.cart.product.price)
    }
  },
  methods: {
    changeQuantity (increment) {
      const payload = {
        id: this.cart.id,
        productId: this.cart.product.id,
        increment
      }

      this.$store.dispatch('editCart', payload)
    },
    removeCart () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
            return this.$store.dispatch('deleteCart', { id: this.cart.id })
          }
          throw { msg: 'Delete canceled!' }
        })
        .then(message => {
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
