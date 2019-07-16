<template>
  <div>
    <div class="container-fluid">
      <div class="form-group">
        <label for="item">Add Items</label>
        <input
          type="text"
          class="form-control"
          id="item"
          v-model="newTodo"
          placeholder="What needs to be done"
          v-on:keyup.enter="addNewItems"
          autofocus
        >
      </div>
      <transition-group
        name="fade"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <div v-for="(todo,index) in todosFiltered" :key="todo.id" class="todoItems">
          <div class="todo-item-left">
            <input type="checkbox" class="checkboxFilter" v-model="todo.completed">
            <div
              v-if="!todo.editing"
              @dblclick="editTodos(todo)"
              class="todo-item-label"
              :class="{completed : todo.completed}"
            >{{todo.title}}</div>
            <input
              v-else
              class="todo-item-edit"
              type="text"
              v-model="todo.title"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
              v-focus
            >
          </div>
          <button type="button" class="btn btn-danger" v-on:click="removeItem(index)">
            <span class="glyphicon glyphicon-trash"></span> Delete
          </button>
          <!-- <div class="deleteItem" v-on:click="removeItem(index)">X</div> -->
        </div>
      </transition-group>
      <div class="extra-container">
        <div>
          <label>
            <input type="checkbox" :checked="anyRemaining" @change="checkAllTodos"> Check All
          </label>
        </div>
        <div>{{remaining}} item left</div>
      </div>
      <div class="extra-container">
        <div>
          <button :class="{active: filter == 'all'}" @click="filter='all'">All</button>
          <button :class="{active: filter == 'active'}" @click="filter='active'">Active</button>
          <button :class="{active: filter == 'completed'}" @click="filter='completed'">Completed</button>
        </div>
        <div>
          <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-app",
  data: function() {
    return {
      newTodo: "",
      beforeEditCache: "",
      idForTodo: 3,
      filter: "all",
      todos: [
        {
          id: 1,
          title: "Finish View Screencast",
          completed: true,
          editing: false
        },
        {
          id: 2,
          title: "Take over world",
          completed: false,
          editing: false
        },
        {
          id: 3,
          title: "Finished",
          completed: true,
          editing: false
        }
      ]
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining == 0;
    },
    todosFiltered() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter(todo => todo.completed);
      } else return this.todos;
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },
  methods: {
    addNewItems: function() {
      if (this.newTodo.trim() != "") {
        this.todos.push({
          id: this.idForTodo,
          title: this.newTodo,
          completed: false,
          editing: false
        });
        this.newTodo = "";
        this.idForTodo++;
      } else {
        this.newTodo = "";
      }
    },
    removeItem: function(index) {
      this.todos.splice(index, 1);
    },
    editTodos: function(todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    doneEdit: function(todo) {
      if (todo.title.trim() == "") {
        todo.title = this.beforeEditCache;
      }
      todo.editing = false;
    },
    cancelEdit: function(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },
    checkAllTodos: function() {
      this.todos.forEach(todo => (todo.completed = event.target.checked));
    },
    clearCompleted: function() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
};
</script>
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
.todoItems {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  margin: 10px 2px;
  padding: 10px 30px;
  animation-duration: 0.5s;
}
.deleteItem {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: red;
  text-align: center;
  color: white;
  padding: 4px 0px 0px 0px;
  cursor: pointer;
}
.todo-item-left {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.todo-item-edit {
  cursor: pointer;
  font-size: 16px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}
input.checkboxFilter {
  margin-right: 20px;
}
.completed {
  text-decoration: line-through;
  color: red;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid #ccc;
  padding-top: 14px;
  margin-bottom: 14px;
}
.active {
  background-color: #62b162;
  border: 2px solid #62b162;
  outline: none;
}
</style>


