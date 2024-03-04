<template>
  <div class="vh-100">
    <HomePage
      :categories="categories"
      :tags="tags"
      @setPage="setPage"
      @deleteCategory="deleteCategory"
      @addCategory="addCategory"
      @editCategory="editCategory"
      @addTask="addTask"
      @editTask="editTask"
      @deleteTask="deleteTask"
      @updateTaskCategory="updateTaskCategory"
      v-if="page == 'home-page'"
    ></HomePage>

    <LoginRegisterPage
      v-if="page == 'login-register-page'"
      @login="login"
      @register="register"
      @googleSignIn="googleSignIn"
    ></LoginRegisterPage>
  </div>
</template>

<script>
import { http } from './lib/http';
import HomePage from './views/HomePage.vue';
import LoginRegisterPage from './views/LoginRegisterPage.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    LoginRegisterPage,
  },
  data() {
    return {
      page: 'login-register-page',
      categories: [],
      tags: [],
    };
  },
  created() {
    if (this.getToken()) {
      this.setPage('home-page');
      this.getCategories();
      this.getTags();
    }
  },
  methods: {
    setPage(page) {
      // console.log('page', page)
      this.page = page;
    },
    // Users
    login(payload) {
      http
        .post('users/login', {
          email: payload.email,
          password: payload.password,
        })
        .then(data => {
          // console.log('data', data)
          this.setUser(data.data.user);
          this.page = 'home-page';
          this.getCategories();
        })
        .catch(err => {
          // console.log(err.response)
          this.$swal({
            icon: 'error',
            title: 'Failed to login',
            text: err.response.data.errors.join(', '),
          });
        });
    },
    register(payload) {
      http
        .post('users/register', {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        })
        .then(data => {
          // console.log('data', data)
          this.$swal({
            icon: 'success',
            title: 'Register success, please login!',
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch(err => {
          // console.log(err.response)
          this.$swal({
            icon: 'error',
            title: 'Failed to register',
            text: err.response.data.errors.join(', '),
          });
        });
    },
    googleSignIn(googleToken) {
      http
        .post('users/google-sign-in', { googleToken })
        .then(data => {
          // console.log('data', data)
          this.setUser(data.data.user);
          this.page = 'home-page';
          this.getCategories();
        })
        .catch(err => {
          // console.log(err.response)
          this.$swal({
            icon: 'error',
            title: 'Failed to sign in with Google',
            text: err.response.data.errors.join(', '),
          });
        });
    },
    // Categories
    getCategories() {
      http
        .get('categories', {
          headers: {
            token: this.getToken(),
          },
        })
        .then(({ data }) => {
          console.log('data', data);
          this.categories = data.categories;
        })
        .catch(err => {
          // console.log(err.response)
          this.$swal({
            icon: 'error',
            title: 'Unable to load category',
            text: err.response.data.errors.join(', '),
          });
        });
    },
    addCategory(title) {
      http
        .post(
          'categories',
          { title },
          {
            headers: {
              token: this.getToken(),
            },
          }
        )
        .then(({ data }) => {
          data = data.category;
          data.Tasks = [];
          this.categories.push(data);
          // console.log('data', data)
        })
        .catch(err => {
          // console.log(err.response)
          this.$swal({
            icon: 'error',
            title: 'Failed to add category',
            text: err.response.data.errors.join(', '),
          });
        });
    },
    editCategory(payload) {
      http
        .put(
          'categories/' + payload.id,
          { title: payload.title },
          {
            headers: {
              token: this.getToken(),
            },
          }
        )
        .then(({ data }) => {
          const category = this.categories.find(
            category => category.id == data.category.id
          );
          category.title = data.category.title;
        })
        .catch(err => {
          // console.log(err.response)
          this.$swal({
            icon: 'error',
            title: 'Failed to update category',
            text: err.response.data.errors.join(', '),
          });
        });
    },
    deleteCategory(id) {
      this.$swal
        .fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })
        .then(result => {
          if (result.isConfirmed) {
            http
              .delete('categories/' + id, {
                headers: {
                  token: this.getToken(),
                },
              })
              .then(({ data }) => {
                // console.log('data', data)
                const index = this.categories.findIndex(
                  category => category.id == data.category.id
                );
                this.categories.splice(index, 1);
              })
              .catch(err => {
                // console.log(err.response)
                this.$swal({
                  icon: 'error',
                  title: 'Failed to delete category',
                  text: err.response.data.errors.join(', '),
                });
              });
          }
        });
    },
    // Tasks
    addTask(payload) {
      http
        .post(
          'tasks',
          {
            title: payload.title,
            description: payload.description,
            category_id: payload.category_id,
            tags: payload.tags,
          },
          {
            headers: {
              token: this.getToken(),
            },
          }
        )
        .then(() => {
          // console.log('data', data)
          // const category = this.categories.find(category => category.id == data.task.category_id)
          // category.Tasks.unshift(data.task)
          this.getCategories();
        })
        .catch(err => {
          // console.log(err.response)
          this.$swal({
            icon: 'error',
            title: 'Failed to add task',
            text: err.response.data.errors.join(', '),
          });
        });
    },
    editTask(payload) {
      http
        .put(
          'tasks/' + payload.id,
          {
            title: payload.title,
            description: payload.description,
            category_id: payload.category_id,
            tags: payload.tags,
          },
          {
            headers: {
              token: this.getToken(),
            },
          }
        )
        .then(() => this.getCategories())
        .catch(err => {
          // console.log(err.response)
          this.$swal({
            icon: 'error',
            title: 'Failed to update task',
            text: err.response.data.errors.join(', '),
          });
        });
    },
    deleteTask(id) {
      this.$swal
        .fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })
        .then(result => {
          if (result.isConfirmed) {
            http
              .delete('tasks/' + id, {
                headers: {
                  token: this.getToken(),
                },
              })
              .then(({ data }) => {
                // console.log('data', data)
                const category = this.categories.find(
                  category => category.id == data.task.category_id
                );
                const index = category.Tasks.findIndex(
                  task => task.id == data.task.id
                );
                category.Tasks.splice(index, 1);
              })
              .catch(err => {
                // console.log(err.response)
                this.$swal({
                  icon: 'error',
                  title: 'Failed to delete task',
                  text: err.response.data.errors.join(', '),
                });
              });
          }
        });
    },
    updateTaskCategory(payload) {
      http
        .put(
          'tasks/' + payload.taskId + '/category',
          { category_id: payload.categoryId },
          {
            headers: {
              token: this.getToken(),
            },
          }
        )
        .then(() => this.getCategories())
        .catch(err => {
          // console.log(err.response)
          this.$swal({
            icon: 'error',
            title: 'Failed to update task category',
            text: err.response.data.errors.join(', '),
          }).then(() => {
            if (err.response.status == 401) {
              this.getCategories();
            }
          });
        });
    },
    // Tags
    getTags() {
      http
        .get('tags', {
          headers: {
            token: this.getToken(),
          },
        })
        .then(({ data }) => {
          this.tags = data.tags;
        })
        .catch(err => {
          // console.log(err.response)
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', '),
          });
        });
    },
    // Utils
    getToken() {
      try {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        return user?.token;
      } catch (e) {
        console.log('Error when getting token', e)
        return null;
      }
    },
    setUser(user) {
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('Error when setting token', e)
      }
    },
  },
};
</script>

<style></style>
