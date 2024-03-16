<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-6">
        <h2 class="text-center text-dark">
          <strong>
            E-Commerce Admin Area
          </strong>
        </h2>
        <hr>
        <img width="400px" src="../assets/online_store_.svg" alt="thumbnail">
      </div>
      <div class="col-6">
        <div class="card p-5 shadow mt-5 radius-10">
          <h2 class="text-center">Login</h2>
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="inputEmail1">Email address</label>
              <input v-model="email" type="email" class="form-control" id="inputEmail1" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Enter password">
            </div>
            <button type="submit" class="btn btn-raised btn-primary btn-lg btn-block" :disabled="isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Submit' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',

      isSubmitting: false,
    }
  },
  methods: {
    async login() {
      const payload = {
        email: this.email,
        password: this.password
      }

      this.isSubmitting = true;
      await this.$store.dispatch('login', payload)

      this.email = ''
      this.password = ''
      this.isSubmitting = false
    }
  }
}
</script>
