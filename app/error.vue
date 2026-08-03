<template>
  <div class="admin-error">
    <div class="error-card">
      <div class="code">{{ error?.statusCode || 500 }}</div>
      <h1>{{ is404 ? 'Page not found' : 'Something went wrong' }}</h1>
      <p>
        {{ is404
          ? "This admin page doesn’t exist."
          : error?.message || 'An unexpected error occurred.' }}
      </p>
      <div class="actions">
        <NuxtLink to="/admin" class="btn-primary">Go to Dashboard</NuxtLink>
        <NuxtLink to="/login" class="btn-secondary">Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const is404 = computed(() => props.error?.statusCode === 404)

useHead({
  title: is404.value ? '404 - Admin' : 'Error - Admin'
})
</script>

<style scoped>
.admin-error {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f8fafc;
  font-family: 'Poppins', system-ui, sans-serif;
}

.error-card {
  background: #fff;
  border-radius: 16px;
  padding: 48px 40px;
  text-align: center;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.code {
  font-size: 3.5rem;
  font-weight: 800;
  color: #F49322;
  line-height: 1;
  margin-bottom: 12px;
}

h1 {
  color: #0c2340;
  font-size: 1.5rem;
  margin: 0 0 10px;
}

p {
  color: #64748b;
  margin: 0 0 28px;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  background: #F49322;
  color: #fff;
  padding: 12px 22px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
}

.btn-primary:hover {
  background: #0c2340;
}

.btn-secondary {
  background: #fff;
  color: #0c2340;
  border: 2px solid #0c2340;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
}

.btn-secondary:hover {
  background: #0c2340;
  color: #fff;
}
</style>