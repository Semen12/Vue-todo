<template>
  <div class="todo">
    <div class="todo__add">
      <input v-model="newTodo" @keyup.enter="addNewTodo" placeholder="Напишите здесь свою задачу" />
      <button @click="addNewTodo">Создать задачу</button>
    </div>
    <div class="todo__content">
      <h2>Список ваших задач</h2>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <span :class="{ completed: todo.completed }">
            {{ todo.title }}
          </span>
          <input
            v-model="editValue"
            v-if="editingId === todo.id"
            @keyup.enter="saveEdit(todo.id)"
          />
          <div class="todo__content-buttons">
            <button @click="startEdit(todo.id, todo.title)" class="todo__content-buttons-edit">
              Редактировать
            </button>
            <button @click="toggleTodo(todo.id)" class="todo__content-buttons-ok">Выполнить</button>
            <button @click="removeTodo(todo.id)" class="todo__content-buttons-delete">
              Удалить
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const store = useTodoStore()

const newTodo = ref('')
const editingId = ref<string | null>(null)
const editValue = ref('')
const todos = computed(() => store.todos)

onMounted(() => {
  store.loadFromLocalStorage()
})

const addNewTodo = () => {
  if (newTodo.value.trim()) {
    store.addTodo(newTodo.value)
    newTodo.value = ''
  }
}

const startEdit = (id: string, currentTitle: string) => {
  if (editingId.value === id) {
    saveEdit(id)
  } else {
    // Иначе начинаем редактирование
    editingId.value = id
    editValue.value = currentTitle
  }
}

const saveEdit = (id: string) => {
  if (editValue.value.trim()) {
    store.editTodo(id, editValue.value)
    editingId.value = null
    editValue.value = ''
  }
}

const removeTodo = (id: string) => {
  store.removeTodo(id)
}

const toggleTodo = (id: string) => {
  store.toggleTodo(id)
}
</script>

<style scoped lang="scss">
.todo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .todo__add {
    margin-bottom: 20px;
    input,
    button {
      font-size: 16px;
      border-radius: 5px;
      border: transparent 0px solid;
      padding: 5px;
    }
    input {
      width: 100%;
      border: darkslategrey 1px solid;
      margin-bottom: 10px;
    }
    button {
      padding: 10px;
      background-color: aqua;
      box-shadow: #2c3e50 3px 3px;
      &:active {
        box-shadow: transparent 0 0;
      }
    }
  }
  .todo__content {
    display: flex;
    align-items: center;
    flex-direction: column;
    h2 {
      margin-bottom: 10px;
    }
    ul {
      padding: 0px;
    }
    ul li {
      span {
        margin-bottom: 10px;
      }

      display: flex;
      flex-direction: column;
      font-size: 18px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      input {
        font-size: 18px;
      }
      input {
        font-size: 16px;
        border-radius: 5px;
        padding: 5px;
        width: 100%;
        border: darkslategrey 1px solid;
        margin-bottom: 10px;
      }
      border-bottom: aquamarine solid 3px;
    }
    .todo__content-buttons {
      display: flex;
      gap: 10px;
      padding-bottom: 10px;
      button {
        font-size: 16px;
        border-radius: 5px;
        border: transparent 0px solid;
        padding: 5px;
        box-shadow: #2c3e50 3px 3px;
        &:active {
          box-shadow: transparent 0 0;
        }
      }
      &-edit {
        background-color: #6767cb;
      }
      &-ok {
        background-color: #04ed04;
      }
      &-delete {
        background-color: brown;
      }
    }
  }
}
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
