<template>
  <section class="hero is-fullheight is-white is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-half">
            <section class="box border">
              <h1 class="subtitle is-1 has-text-centered">Register</h1>
              <p class="has-text-centered">Register new account now</p>
              <form @submit.prevent="register" class="p-3" method="post">
                <b-field label="Email">
                  <b-input
                    type="email"
                    v-model="email"
                    maxlength="30"
                    placeholder="Input email address"
                  >
                  </b-input>
                </b-field>

                <b-field label="Password">
                  <b-input
                    type="password"
                    v-model="password"
                    password-reveal
                    placeholder="Input password"
                  >
                  </b-input>
                </b-field>

                <b-button
                  class="mt-5"
                  type="is-danger"
                  native-type="submit"
                  expanded
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Submitting...' : 'Submit' }}
                </b-button>
                <p class="mt-3">
                  Already have an account? Login
                  <a
                    @click.prevent="$router.push({ name: 'Login' })"
                    class="has-text-link"
                  >
                    here
                  </a>
                </p>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
    <img src="../assets/wave.svg" class="login-bg" alt="background" />
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',

      isSubmitting: false,
    };
  },
  methods: {
    async register() {
      const payload = {
        email: this.email,
        password: this.password,
      };

      this.isSubmitting = true;
      await this.$store.dispatch('register', payload);

      this.email = '';
      this.password = '';
      this.isSubmitting = false;
    },
  },
};
</script>
