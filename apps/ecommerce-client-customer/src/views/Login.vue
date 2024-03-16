<template>
  <section class="hero is-fullheight is-white is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-half">
            <section class="box border">
              <h1 class="subtitle is-1 has-text-centered">Login</h1>
              <p class="has-text-centered">Please login to your account</p>
              <form @submit.prevent="login" class="p-3" method="post">
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
                  Don't have an account? Register
                  <a
                    @click.prevent="$router.push({ name: 'Register' })"
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
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
      };

      this.isSubmitting = true;
      await this.$store.dispatch('login', payload);

      this.email = '';
      this.password = '';
      this.isSubmitting = false;
    },
  },
  computed: {
    registerSuccess() {
      return this.$store.state.registerSuccess;
    },
  },
  created() {
    if (this.registerSuccess) {
      this.$buefy.toast.open({
        message: 'Register success, please login',
        type: 'is-success',
        position: 'is-top-right',
        duration: 4000,
      });

      this.$store.commit('SET_REGISTER_SUCCESS');
    }
  },
};
</script>
