<template>
    <b-navbar type="is-white">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <h1 class="title is-4 has-text-primary">Happy</h1>
            </b-navbar-item>
        </template>
        <!-- <template slot="start">
            <b-navbar-item class="has-text-primary" tag="router-link" :to="{ path: '/' }">
                Home
            </b-navbar-item>
        </template> -->

        <template slot="end">
            <b-navbar-item v-if="getEmail" tag="div">
              <div class="buttons">
                  <b-button
                    @click="$router.push({ path: '/cart' })"
                    type="is-white">
                    <button v-if="carts.length" class="button is-danger badge">
                      {{ carts.length }}
                    </button>
                    Cart
                  </b-button>
                  <b-button
                    @click="$router.push({ path: '/transaction' })"
                    type="is-white">
                    Transation
                  </b-button>
              </div>
            </b-navbar-item>
            <b-navbar-dropdown v-if="getEmail" :label="getEmail" right>
                <b-navbar-item @click.prevent="logout">
                  Logout
                </b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-item v-else tag="div">
                <div class="buttons">
                    <b-button
                      @click="$router.push({ path: '/login' })"
                      type="is-danger"
                      outlined>
                      <strong>Login</strong>
                    </b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    getEmail () {
      return JSON.parse(localStorage.getItem('user'))?.email
    },
    carts () {
      return this.$store.state.carts
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('user')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>
.badge {
  border-radius: 25px !important;
  pointer-events: none;
  position: absolute;
  padding: 5px;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: bold;
  top: 0;
  right: 0;
}

.navbar {
  border-bottom: thin solid #dfdfdf;
}

.navbar-brand {
  margin-left: 1.5rem;
}

.navbar-menu {
  margin-right: 1.5rem;
}
</style>
