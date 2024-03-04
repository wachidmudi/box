<template>
  <section id="main-page" class="container-fluid">
    <div class="row">
      <div class="col-5">
        <div class="mt-5">
          <h1 class="text-center mt-5">Kanban App</h1>
          <p class="lead text-center">
            Organize all your task here!! Sign Up for FREE
          </p>
          <img src="../images/scrum_board.svg" alt="cover" />
        </div>
      </div>
      <div class="col-7">
        <div id="login-register">
          <div class="container mt-5">
            <div class="row justify-content-center">
              <div class="col-11">
                <nav
                  class="nav nav-pills flex-column flex-sm-row bg-white border shadow"
                  role="tablist"
                >
                  <a
                    class="flex-sm-fill text-sm-center nav-link p-3 active"
                    href="#pills-login"
                    data-toggle="pill"
                  >
                    <strong> Login </strong>
                  </a>
                  <a
                    ref="registerBtn"
                    class="flex-sm-fill text-sm-center nav-link p-3"
                    href="#pills-register"
                    data-toggle="pill"
                  >
                    <strong> Register </strong>
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <section id="login" class="container">
                <div class="row justify-content-center">
                  <div class="col-9">
                    <div class="card p-5 shadow">
                      <h2 class="text-center">Login</h2>
                      <form @submit.prevent="login" method="POST">
                        <div class="form-group">
                          <label for="loginEmail">Email address</label>
                          <input
                            v-model="loginEmail"
                            type="email"
                            name="email"
                            class="form-control"
                            id="loginEmail"
                            aria-describedby="emailHelp"
                            required
                            placeholder="Enter your email address"
                          />
                        </div>
                        <div class="form-group">
                          <label for="loginPassword">Password</label>
                          <input
                            v-model="loginPassword"
                            type="password"
                            name="password"
                            class="form-control"
                            id="loginPassword"
                            required
                            placeholder="Enter your password"
                            autocomplete
                          />
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">
                          Submit
                        </button>
                        <div class="py-3">
                          Continue sign in with
                          <button
                            v-google-signin-button="clientId"
                            class="btn btn-light btn-sm border radius-sm"
                            type="button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="25"
                              height="25"
                              viewBox="0 0 48 48"
                            >
                              <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                              ></path>
                              <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                              ></path>
                              <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                              ></path>
                              <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                              ></path>
                            </svg>
                            Google
                          </button>
                        </div>
                        <div class="card-subtitle">
                          Don't have an account? Register
                          <button
                            class="btn btn-link p-0"
                            @click="goToRegister"
                          >
                            here
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div
              class="tab-pane fade"
              id="pills-register"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <section id="register" class="container">
                <div class="row justify-content-center">
                  <div class="col-9">
                    <div class="card p-5 shadow">
                      <h2 class="text-center">Register</h2>
                      <form @submit.prevent="register" method="POST">
                        <div class="form-group">
                          <label for="registerName">Name</label>
                          <input
                            v-model="registerName"
                            type="text"
                            name="name"
                            class="form-control"
                            id="registerName"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div class="form-group">
                          <label for="registerEmail">Email address</label>
                          <input
                            v-model="registerEmail"
                            type="email"
                            name="email"
                            class="form-control"
                            id="registerEmail"
                            required
                            placeholder="Enter your email address"
                          />
                          <small id="emailHelp" class="form-text text-muted"
                            >We'll never share your email with anyone
                            else.</small
                          >
                        </div>
                        <div class="form-group">
                          <label for="registerPassword">Password</label>
                          <input
                            v-model="registerPassword"
                            type="password"
                            name="password"
                            class="form-control"
                            id="registerPassword"
                            required
                            placeholder="Enter your password"
                            autocomplete
                          />
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive';

export default {
  name: 'LoginRegisterPage',
  directives: {
    GoogleSignInButton,
  },
  data() {
    return {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      loginEmail: '',
      loginPassword: '',
    };
  },
  methods: {
    login() {
      let payload = {
        email: this.loginEmail,
        password: this.loginPassword,
      };

      this.$emit('login', payload);

      // this.loginEmail = '';
      // this.loginPassword = '';
    },
    register() {
      let payload = {
        name: this.registerName,
        email: this.registerEmail,
        password: this.registerPassword,
      };

      this.$emit('register', payload);

      this.registerName = '';
      this.registerEmail = '';
      this.registerPassword = '';
    },
    OnGoogleAuthSuccess(idToken) {
      this.$emit('googleSignIn', idToken);
    },
    OnGoogleAuthFail(e) {
      console.log(e);
      this.$swal({
        icon: 'error',
        title: 'Failed to sign in with Google',
      });
    },
    goToRegister() {
      this.$refs.registerBtn.click();
    },
  },
};
</script>

<style></style>
