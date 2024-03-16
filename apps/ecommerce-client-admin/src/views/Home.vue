<template>
  <div class="w-100">
    <Navbar></Navbar>
    <div class="row no-gutters">
      <div class="col-3">
        <div class="list-group bg-white px-3 py-5 auto-height shadow-sm">
          <router-link
            class="list-group-item list-group-item-action font-weight-bold radius-25"
            active-class="active"
            to="/home"
            exact
          >
            <i class="material-icons-outlined">dashboard</i>
            Dashboard
          </router-link>
          <router-link
            class="list-group-item list-group-item-action font-weight-bold radius-25"
            active-class="active"
            to="/home/products"
          >
            <i class="material-icons-outlined">local_mall</i>
            Products
          </router-link>
          <router-link
            class="list-group-item list-group-item-action font-weight-bold radius-25"
            active-class="active"
            to="/home/categories"
          >
            <i class="material-icons-outlined">category</i>
            Categories
          </router-link>
        </div>
      </div>
      <div class="col-9">
        <div class="container-fluid mt-4">
          <div class="row justify-content-center">
            <div class="col-md-11 p-0">
              <div class="bg-white radius-10 p-4 shadow-sm">
                <transition
                  name="fade"
                  mode="out-in"
                >
                  <router-view></router-view>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Home',
  components: { Navbar }
}
</script>
