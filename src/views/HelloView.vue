<template>
  <div class="home">
    <h1>Добро пожаловать в To-Do!</h1>
    <RouterLink to="/todos"> Перейти к списку задач </RouterLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
</style>
