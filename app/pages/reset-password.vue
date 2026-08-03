<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-box">
        <h1 class="title">Reset Password</h1>
        <p class="subtitle">Enter your new password</p>

        <form v-if="!done" @submit.prevent="submit">
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" required readonly>
          </div>

          <div class="form-group">
            <label>New Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Min. 8 characters"
              required
              minlength="8"
            >
          </div>

          <div class="form-group">
            <label>Confirm Password</label>
            <input
              v-model="form.password_confirmation"
              type="password"
              placeholder="Confirm password"
              required
              minlength="8"
            >
          </div>

          <p v-if="error" class="error">{{ error }}</p>

          <button type="submit" class="login-btn" :disabled="isLoading">
            {{ isLoading ? 'Saving...' : 'Reset Password' }}
          </button>
        </form>

        <div v-else class="success-box">
          <p class="success-text">Password updated successfully.</p>
          <NuxtLink to="/login" class="login-btn back-btn">Sign in</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const config = useRuntimeConfig()
const route = useRoute()
const isLoading = ref(false)
const error = ref('')
const done = ref(false)

const form = ref({
  email: (route.query.email as string) || '',
  token: (route.query.token as string) || '',
  password: '',
  password_confirmation: ''
})

const submit = async () => {
  if (form.value.password !== form.value.password_confirmation) {
    error.value = 'Passwords do not match'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    await $fetch('/reset-password', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        email: form.value.email,
        token: form.value.token,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
      }
    })
    done.value = true
  } catch (err: any) {
    error.value = err.data?.message || 'Invalid or expired reset link'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* same styles as forgot-password.vue — copy login-page / login-box / form-group / login-btn / error */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #0c2340 0%, #1a3a5c 45%, #c4a574 100%);
  font-family: 'Poppins', system-ui, sans-serif;
}
.login-container { width: 100%; max-width: 420px; }
.login-box {
  background: white;
  padding: 48px 40px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  text-align: center;
}
.title { color: #0c2340; margin: 0 0 8px; font-size: 1.75rem; font-weight: 700; }
.subtitle { color: #6b7280; margin: 0 0 28px; font-size: 0.95rem; }
.form-group { margin-bottom: 20px; text-align: left; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #374151; }
.form-group input {
  width: 100%; padding: 14px 16px; border: 1px solid #d1d5db;
  border-radius: 8px; font-size: 1rem;
}
.form-group input:focus {
  outline: none; border-color: #F49322;
  box-shadow: 0 0 0 3px rgba(244, 147, 34, 0.15);
}
.error {
  color: #ef4444; background: #fef2f2; padding: 10px 12px;
  border-radius: 8px; margin-bottom: 14px; font-size: 0.9rem; text-align: left;
}
.login-btn {
  width: 100%; background: #F49322; color: white; border: none;
  padding: 16px; border-radius: 8px; font-weight: 700; font-size: 1.05rem;
  cursor: pointer; text-decoration: none; display: inline-block; text-align: center;
}
.login-btn:hover:not(:disabled) { background: #e07f1c; }
.success-text { color: #374151; line-height: 1.6; margin-bottom: 24px; }
</style>