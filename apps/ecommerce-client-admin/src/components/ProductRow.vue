<template>
  <tr class="d-flex">
    <th scope="row" class="col-1 my-auto">
      <h5>
        {{ product.id }}
      </h5>
    </th>
    <td class="col-5 my-auto">
      <div class="row">
        <div class="col-4 my-auto">
          <img :src="product.image_url" class="img-fluid" alt="thumbnail">
        </div>
        <div class="col-8 my-auto">
          <h5
            @click="viewProduct(product.id)"
            class="text-left"
            style="cursor: pointer;"
          >
            {{ product.name }}
          </h5>
        </div>
      </div>
    </td>
    <td class="col-2 my-auto">
      <h5>
        Rp. {{ formatPrice(product.price) }}
      </h5>
    </td>
    <td class="col-2 my-auto">
      <div class="alert alert-info radius-25 text-center" role="alert">
        <span>
          In Stock {{ product.stock }}
        </span>
      </div>
    </td>
    <td class="col-2 my-auto">
      <div class="btn-group">
        <button type="button" class="btn btn-secondary pb-1 px-2 rounded" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="material-icons-outlined menu-more">more_horiz</i>
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <button
            @click="editProduct(product.id)"
            type="button"
            class="btn btn-primary btn-block dropdown-item"
          >
            <i class="material-icons-outlined mr-3">edit</i>
            Edit
          </button>
          <button
            @click="deleteProduct(product.id)"
            type="button"
            class="btn btn-danger btn-block dropdown-item"
          >
            <i class="material-icons-outlined mr-3">delete</i>
            Delete
          </button>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ProductRow',
  props: ['product'],
  methods: {
    viewProduct (id) {
      this.$router.push({ name: 'ProductView', params: { id } })
    },
    editProduct (id) {
      this.$router.push({ name: 'ProductEdit', params: { id } })
    },
    deleteProduct (id) {
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
          return this.$store.dispatch('deleteProduct', { id })
        }
        throw { msg: 'Delete product canceled!' }
      })
      .then(() => {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      })
    },
    formatPrice(value) {
      if (value) {
        return value.toLocaleString().replace(/,/g, '.')
      }
      return null
    }
  }
}
</script>
