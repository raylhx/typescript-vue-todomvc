<template>
  <section class="todoapp">
    <header class="header">
    <h1>todos</h1>
      <input
        placeholder="What needs to be done?"
        autofocus
        @keyup.enter="create()"
        @click="test"
        class="new-todo"
        v-model="newTodoTitle"
      />
    </header>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" @keyup.enter="create()" />
      <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
        <todo-item></todo-item>
      </ul>
    </section>
<todo-footer></todo-footer>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import TodoFooter from "./TodoFooter.vue";
import TodoItem from "./TodoItem.vue";

export default Vue.extend({
  data() {
    return {
      newTodoTitle: ""
    };
  },

  components: {
    TodoFooter,
    TodoItem
  },
  methods: {
    create() {
      console.log("");
    }
  }
});
</script>

<style scoped>
</style>
