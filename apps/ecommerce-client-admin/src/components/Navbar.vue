<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <router-link to="/" class="navbar-brand ml-5">
      <strong>
        E-Commerce Admin
      </strong>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <!-- <li class="nav-item">
          <router-link to="/home" class="nav-link active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li> -->
      </ul>
    </div>
    <div class="nav-item dropdown">
      <a class="nav-link dropdown-toggle text-lowercase" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ email }}
      </a>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
        <button
          @click.prevent="logout"
          class="dropdown-item" href="#"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    email () {
      const user = JSON.parse(localStorage.getItem('user') ?? '{}')
      return user.email
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
