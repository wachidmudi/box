<template>
  <div class="col-3">
    <div class="btn-group float-right">
      <button
        type="button"
        class="btn btn-light dot-menu"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <svg
          width="20px"
          x="0px"
          y="0px"
          viewBox="0 0 32.055 32.055"
          style="enable-background: new 0 0 32.055 32.055"
          xml:space="preserve"
        >
          <g>
            <path
              d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
            C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
            s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
            c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
            />
          </g>
        </svg>
      </button>
      <div class="dropdown-menu dropdown-menu-right">
        <button class="dropdown-item" @click="renameCategory(category)">
          Rename
        </button>
        <button class="dropdown-item" @click="deleteCategory(category.id)">
          Delete
        </button>
      </div>
    </div>
    <input
      v-if="categoryId === category.id"
      v-model="categoryEditText"
      class="lead text-capitalize mb-2 form-control"
      style="width: 80%"
      type="text"
      required
      v-focus
      @blur="editCategory"
    />
    <p v-else class="lead text-capitalize">
      {{ category.title }}
    </p>
    <div class="clearfix"></div>
    <div class="container-fluid kanban-content">
      <div class="row">
        <draggable
          :move="onMove"
          :list="filteredTasksByTag"
          :categoryId="category.id"
          @end="updateTaskCategory"
          group="task"
          class="w-100"
        >
          <Task
            v-for="task in filteredTasksByTag"
            :key="task.id"
            :id="task.id"
            :task="task"
            :showEditTaskForm="showEditTaskForm"
            :deleteTask="deleteTask"
            :filterTaskByTag="filterTaskByTag"
          ></Task>
        </draggable>
        <div class="w-100 m-2 radius">
          <button
            @click="showAddTaskForm(category.id)"
            data-toggle="modal"
            data-target="#modalTask"
            class="btn btn-block btn-lg"
          >
            <svg width="40" height="40" viewBox="0 0 32 32" fill="#787b7f">
              <g>
                <path
                  d="M 9,18L 16,18 l0,7 C 16,25.552, 16.448,26, 17,26S 18,25.552, 18,25L 18,18 l 7,0 C 25.552,18, 26,17.552, 26,17 C 26,16.448, 25.552,16, 25,16L 18,16 L 18,9 C 18,8.448, 17.552,8, 17,8S 16,8.448, 16,9L 16,16 L 9,16 C 8.448,16, 8,16.448, 8,17C 8,17.552, 8.448,18, 9,18z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import draggable from 'vuedraggable';
import Task from './Task.vue';

export default {
  name: 'Category',
  props: [
    'category',
    'categoryId',
    'categoryText',
    'renameCategory',
    'deleteCategory',
    'showAddTaskForm',
    'showEditTaskForm',
    'deleteTask',
    'filterTaskByTag',
    'tagId',
  ],
  components: { Task, draggable },
  directives: {
    focus: {
      inserted(el) {
        Vue.nextTick(() => el.focus());
      },
    },
  },
  data() {
    return {
      currentTaskId: null,
      currentCategoryId: null,
      categoryEditText: this.category.title,
    };
  },
  computed: {
    filteredTasksByTag() {
      if (this.tagId) {
        return this.category.Tasks.filter(task => {
          return task.Tags.find(tag => tag.id == this.tagId);
        });
      }

      return this.category.Tasks;
    },
  },
  methods: {
    onMove(e) {
      this.currentTaskId = e.draggedContext.element.id;
      this.currentCategoryId = e.relatedContext.component.$attrs.categoryId;
    },
    updateTaskCategory() {
      let payload = {
        taskId: this.currentTaskId,
        categoryId: this.currentCategoryId,
      };

      if (!payload.taskId || !payload.categoryId) {
        return;
      }

      this.$emit('updateTaskCategory', payload);
    },
    editCategory() {
      let payload = {
        id: this.category.id,
        title: this.categoryEditText,
      };

      if (payload.title) {
        this.$emit('editCategory', payload);
      }
    },
  },
};
</script>

<style></style>
