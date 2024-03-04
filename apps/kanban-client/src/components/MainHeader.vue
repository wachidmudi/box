<template>
  <div class="row justify-content-between main-header my-2">
    <div class="col-4">
      <h3>{{ organization }}</h3>
    </div>
    <div class="col-3">
      <div class="d-flex justify-content-end px-3">
        <div class="btn-group float-right">
          <button type="button" class="btn btn-link text-dark text-decoration-none dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false">
            <div class="btn bg-danger text-white avatar mr-2">
              {{ userFirstLetter }}
            </div>
            {{ name }}
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button @click="logout" class="dropdown-item" type="button">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      name: this.getUser().name,
      organization: this.getUser().organization
    }
  },
  methods: {
    logout() {
      this.removeUser()
      this.$emit('setPage', 'login-register-page')
    },
    getUser() {
      let user = localStorage.getItem('user')
      return JSON.parse(user)
    },
    removeUser() {
      localStorage.removeItem('user')
    }
  },
  computed: {
    userFirstLetter() {
      return this.name.charAt(0)
    }
  },
}
</script>

<style>

</style>
