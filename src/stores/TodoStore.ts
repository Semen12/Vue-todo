import { defineStore } from 'pinia'
import { ref } from 'vue'

interface ToDo {
  id: string
  title: string
  completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<ToDo[]>([])

  const addTodo = (title: string) => {
    const newId = crypto.randomUUID()
    if (todos.value.findIndex((todo) => todo.id === newId) === -1) {
      todos.value.push({
        id: newId,
        title,
        completed: false
      })
      saveToLocalStorage()
    }
  }

  const removeTodo = (id: string) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
    saveToLocalStorage()
  }

  const toggleTodo = (id: string) => {
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
    saveToLocalStorage()
  }

  const editTodo = (id: string, newTitle: string) => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.value[index] = {
        ...todos.value[index],
        title: newTitle
      }
      saveToLocalStorage()
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  const loadFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
    }
  }

  return {
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
    saveToLocalStorage,
    loadFromLocalStorage,
    todos
  }
})
