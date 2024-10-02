<template>
  <div class="todos">
    <div class="todos__header">
      <h1 class="todos__title">Создавайте задачи</h1>
      <p>
        <RouterLink to="/">Вернутся на главную</RouterLink>
      </p>
    </div>
    <ToDo />
  </div>
</template>

<script lang="ts" setup>
import ToDo from '@/components/ToDo.vue'
</script>

<style scoped lang="scss">
.todos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100vh;
  text-align: center;
  .todos__header {
    margin-bottom: 20px;
  }
}
</style>
