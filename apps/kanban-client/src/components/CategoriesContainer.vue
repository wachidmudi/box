<template>
  <div class="row flex-row flex-nowrap overflow-auto flex-grow-1">
    <!-- Category Column -->
    <Category
      v-for="category in categories" :key="category.id"
      :category="category"
      :categoryId="categoryId"
      :categoryText="categoryText"
      :renameCategory="renameCategory"
      :deleteCategory="deleteCategory"
      :showAddTaskForm="showAddTaskForm"
      :showEditTaskForm="showEditTaskForm"
      :deleteTask="deleteTask"
      @updateTaskCategory="updateTaskCategory"
      @editCategory="editCategory"
      :tagId="tagId"
      :filterTaskByTag="filterTaskByTag"
    ></Category>

    <div class="col-3">
      <input
        v-if="isAddCategory"
        v-model="addCategoryText"
        @blur="addCategory"
        class="lead text-capitalize mb-2 form-control"
        v-focus
        type="text"
        placeholder="Input new category"
        required
      >
      <p
        v-else
        @click="isAddCategory = true"
        class="lead text-capitalize"
        role="button"
        tabindex="0"
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="#787b7f">
          <g>
            <path
              d="M 9,18L 16,18 l0,7 C 16,25.552, 16.448,26, 17,26S 18,25.552, 18,25L 18,18 l 7,0 C 25.552,18, 26,17.552, 26,17 C 26,16.448, 25.552,16, 25,16L 18,16 L 18,9 C 18,8.448, 17.552,8, 17,8S 16,8.448, 16,9L 16,16 L 9,16 C 8.448,16, 8,16.448, 8,17C 8,17.552, 8.448,18, 9,18z">
            </path>
          </g>
        </svg>
        Add New Category
      </p>
      <div class="container-fluid kanban-content">
        <div class="row">
          <div class="w-100 m-2 radius">
            <button class="btn btn-block btn-lg" disabled>
              <svg width="40" height="40" viewBox="0 0 32 32" fill="#787b7f">
                <g>
                  <path
                    d="M 9,18L 16,18 l0,7 C 16,25.552, 16.448,26, 17,26S 18,25.552, 18,25L 18,18 l 7,0 C 25.552,18, 26,17.552, 26,17 C 26,16.448, 25.552,16, 25,16L 18,16 L 18,9 C 18,8.448, 17.552,8, 17,8S 16,8.448, 16,9L 16,16 L 9,16 C 8.448,16, 8,16.448, 8,17C 8,17.552, 8.448,18, 9,18z">
                  </path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Add Todo -->
    <div class="modal fade" id="modalTask" tabindex="-1" role="dialog" aria-labelledby="modalTaskLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="modalTaskLabel"
              class="col-10 modal-title text-center"
            >
              {{ formTitle }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <section id="add-todo" class="p-3 ">
              <form @submit.prevent="task" method="POST">
                <div class="form-row">
                  <div class="form-group col-6">
                    <label for="addTitle">Title</label>
                    <input v-model="title" type="text" name="title" class="form-control" id="addTitle" required>
                  </div>
                  <div class="form-group col-6">
                    <label for="addCategory">Category</label>
                    <select v-model="category_id" name="status" class="custom-select" id="addCategory">
                      <option disabled value="">Select status</option>
                      <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                        class="text-capitalize"
                      >
                      {{ category.title }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-6">
                    <label for="addDescription">Description</label>
                    <textarea v-model="description" name="description" class="form-control" id="addDescription" rows="3"></textarea>
                  </div>
                  <div class="form-group col-6">
                    <label for="addTag">Tag</label>
                    <div class="input-group">
                      <select v-model="tag" class="custom-select" id="addTag">
                        <option disabled selected value="">Select tag</option>
                        <option
                          v-for="tag in tags"
                          :key="tag.id"
                          :value="tag"
                          class="text-capitalize"
                        >
                        {{ tag.title }}
                        </option>
                      </select>
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-primary"
                          type="button"
                          @click="addTag"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div class="py-2">
                      <div v-for="tag in uniqueTags" :key="tag.id" :class="`tag tag-${tag.color}`" role="tag">
                        {{ tag.title }}
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary btn-block mt-2 mb-4">Submit</button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Category from './Category.vue'

export default {
  name: 'CategoriesContainer',
  components: { Category },
  directives: {
    focus: {
      inserted(el) {
        Vue.nextTick(() => el.focus())
      }
    }
  },
  props: ['categories', 'tags'],
  data() {
    return {
      categoryId: null,
      categoryText: null,
      taskId: '' || 0,
      title: '',
      description: '',
      category_id: '',
      tag: '',
      selectedTags: [],
      formTitle: '',
      isAddCategory: false,
      addCategoryText: '',
      tagId: 0
    }
  },
  computed: {
    uniqueTags() {
      return [...new Set(this.selectedTags)]
    }
  },
  methods: {
    filterTaskByTag(tagId) {
      // console.log('tagId', tagId)
      if (this.tagId == tagId) {
        this.tagId = 0
      } else {
        this.tagId = tagId
      }
    },
    addTag() {
      this.selectedTags.push(this.tag)
    },
    renameCategory(category) {
      this.categoryId = category.id
      this.categoryText = category.title
    },
    deleteCategory(id) {
      this.$emit('deleteCategory', id)
    },
    addCategory() {
      this.clearInputCategory()
      this.isAddCategory = false

      if (this.addCategoryText) {
        this.$emit('addCategory', this.addCategoryText)
      }
    },
    editCategory(payload) {
      this.$emit('editCategory', payload)

      this.categoryId = null
    },
    clearInputCategory() {
      this.categoryId = null
      this.categoryText = null
    },
    showAddTaskForm(id) {
      this.formTitle = 'Add Task'
      this.title = ''
      this.description = ''
      this.category_id = id
    },
    showEditTaskForm(task) {
      this.formTitle = 'Edit Task'
      this.taskId = task.id
      this.title = task.title
      this.description = task.description
      this.category_id = task.category_id
    },
    task() {
      let payload = {
        id: this.taskId,
        title: this.title,
        description: this.description,
        category_id: this.category_id,
        tags: this.uniqueTags.map(i => i.id)
      }

      let status = this.formTitle == 'Add Task' ? 'addTask' : 'editTask'
      this.$emit(status, payload)

      this.title = ''
      this.category_id = ''
      this.description = ''
      this.selectedTags = []
      $('#modalTask').modal('hide')
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
