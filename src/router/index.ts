import { createRouter, createWebHistory } from 'vue-router'
import HelloView from '../views/HelloView.vue'
import TasksView from '../views/TodosView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'hello',
      component: HelloView
    },
    {
      path: '/todos',
      name: 'todos',
      component: TasksView
      
    }
  ]
})

export default router
