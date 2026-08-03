<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-box">
        <h1 class="title">Forgot Password?</h1>
        <p class="subtitle">Enter your email and we’ll send a reset link</p>

        <form v-if="!sent" @submit.prevent="submit">
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              autocomplete="email"
            >
          </div>

          <p v-if="error" class="error">{{ error }}</p>

          <button type="submit" class="login-btn" :disabled="isLoading">
            {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
          </button>

          <NuxtLink to="/login" class="back-link">← Back to Sign in</NuxtLink>
        </form>

        <div v-else class="success-box">
          <p class="success-text">
            If an account exists for <strong>{{ email }}</strong>, a reset link has been sent.
            Check your inbox (and spam folder).
          </p>
          <NuxtLink to="/login" class="login-btn back-btn">Back to Sign in</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const config = useRuntimeConfig()
const email = ref('')
const isLoading = ref(false)
const error = ref('')
const sent = ref(false)

const submit = async () => {
  isLoading.value = true
  error.value = ''

  try {
    await $fetch('/forgot-password', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { email: email.value.trim() }
    })
    sent.value = true
  } catch (err: any) {
    // Still show success-style message to avoid email enumeration, or show real error in staging:
    error.value = err.data?.message || 'Unable to send reset link. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #0c2340 0%, #1a3a5c 45%, #c4a574 100%);
  font-family: 'Poppins', system-ui, sans-serif;
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-box {
  background: white;
  padding: 48px 40px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.title {
  color: #0c2340;
  margin: 0 0 8px;
  font-size: 1.75rem;
  font-weight: 700;
}

.subtitle {
  color: #6b7280;
  margin: 0 0 28px;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #F49322;
  box-shadow: 0 0 0 3px rgba(244, 147, 34, 0.15);
}

.error {
  color: #ef4444;
  background: #fef2f2;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 14px;
  font-size: 0.9rem;
  text-align: left;
}

.login-btn {
  width: 100%;
  background: #F49322;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-block;
  text-decoration: none;
  text-align: center;
}

.login-btn:hover:not(:disabled) {
  background: #e07f1c;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #0c2340;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.95rem;
}

.back-link:hover {
  color: #F49322;
}

.success-box {
  text-align: center;
}

.success-text {
  color: #374151;
  line-height: 1.6;
  margin-bottom: 24px;
}

.back-btn {
  margin-top: 8px;
}
</style>