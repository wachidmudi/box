<template>
  <div class="card m-2 radius">
    <div class="btn-group btn-task-menu">
      <button
        class="btn btn-light btn-sm p-0"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        &nbsp;
      </button>
      <div class="dropdown-menu dropdown-menu-right">
        <button
          @click="showEditTaskForm(task)"
          class="dropdown-item"
          data-toggle="modal"
          data-target="#modalTask"
        >
          Edit
        </button>
        <button class="dropdown-item" @click="deleteTask(task.id)">Delete</button>
      </div>
    </div>
    <div class="card-body p-3">
      <h6 class="card-title">{{ task.title }}</h6>
      <p class="card-text">{{ task.description }}</p>
      <div>
        <div
          v-for="tag in task.Tags"
          :key="tag.id"
          :class="`tag tag-${tag.color}`"
          role="button"
          tabindex="0"
          @click="filterByTag(tag.id)"
        >
          {{ tag.title }}
        </div>
      </div>
      <small class="mt-1 text-muted">By: {{ task.User.name }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: ['task', 'showEditTaskForm', 'deleteTask', 'filterTaskByTag'],
  methods: {
    filterByTag(tagId) {
      this.filterTaskByTag(tagId)
    }
  }
}
</script>

<style>

</style>
