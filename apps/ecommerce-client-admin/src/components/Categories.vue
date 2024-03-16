<template>
  <div class="container-fluid">
    <h1>
      Categories
    </h1>
    <hr>
    <h4 class="mb-4">Add New Category</h4>
    <div class="row">
      <div class="col-6">
        <form @submit.prevent="addCategory" method="post">
          <div class="input-group mb-3">
            <input
              v-model="title"
              type="text"
              class="form-control"
              placeholder="Input category name"
              aria-label="Category name"
            >
            <div class="input-group-append">
              <button
                type="submit"
                class="btn btn-outline-primary"
              >
                Add Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="mt-3 pb-4">
      <div
        v-for="category in categories"
        :key="category.id"
        class="border border-secondary rounded d-inline-block py-1 px-2 mr-2 mb-2"
      >
        {{ category.title }}
        <button
          @click="deleteCategory(category.id)"
          type="button"
          class="close ml-2 text-primary"
          aria-label="Delete"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Categories',
  created () {
    this.$store.dispatch('fetchCategories')
  },
  data () {
    return {
      title: ''
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    addCategory () {
      this.$store.dispatch('addCategory', { title: this.title })
      this.title = ''
    },
    deleteCategory (id) {
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
          return this.$store.dispatch('deleteCategory', { id })
        }
        throw { msg: 'Delete category canceled!' }
      })
      .then(() => {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      })
    }
  }
}
</script>
