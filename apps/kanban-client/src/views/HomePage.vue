<template>
  <section class="container-fluid p-0 main">
      <div class="row no-gutters">
        <div class="col-1">
          <div class="row no-gutters h-100">
            <div class="col-7 bg-primary text-white">
              <div class="bg-white mx-auto mt-3 p-1 rounded" style="width: 47%;">
                <img src="/logo.png" alt="Kanban App">
              </div>
              <h6 class="fw-light text-center py-3">
                Kanban App
              </h6>
            </div>
          </div>
        </div>
        <div class="col">
          <!-- Kanban -->
          <section class="container-fluid kanban-container vh-100 d-flex flex-column">
            <MainHeader @setPage="setPage"></MainHeader>
            <CategoriesContainer
              :categories="categories"
              :tags="tags"
              @deleteCategory="deleteCategory"
              @addCategory="addCategory"
              @editCategory="editCategory"
              @addTask="addTask"
              @editTask="editTask"
              @deleteTask="deleteTask"
              @updateTaskCategory="updateTaskCategory"
            ></CategoriesContainer>
          </section>
        </div>
      </div>
    </section>
</template>

<script>
import CategoriesContainer from '@/components/CategoriesContainer.vue'
import MainHeader from '@/components/MainHeader.vue'

export default {
  name: 'HomePage',
  components: {
    MainHeader,
    CategoriesContainer
  },
  props: ['categories', 'tags'],
  methods: {
    deleteCategory(id) {
      this.$emit('deleteCategory', id)
    },
    addCategory(title) {
      this.$emit('addCategory', title)
    },
    editCategory(payload) {
      this.$emit('editCategory', payload)
    },
    setPage(payload) {
      this.$emit('setPage', payload)
    },
    addTask(payload) {
      this.$emit('addTask', payload)
    },
    editTask(payload) {
      this.$emit('editTask', payload)
    },
    deleteTask(id) {
      this.$emit('deleteTask', id)
    },
    updateTaskCategory(payload) {
      this.$emit('updateTaskCategory', payload)
    }
  }
}
</script>

<style>

</style>
