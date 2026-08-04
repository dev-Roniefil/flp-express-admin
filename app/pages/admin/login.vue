<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-box">
        <h1 class="title">Welcome Back!</h1>
        <p class="subtitle">Sign in to your account</p>

        <form @submit.prevent="login">
          <div class="form-group">
            <label>Username or Email</label>
            <input
              v-model="form.login"
              type="text"
              placeholder="Enter username or email"
              required
              autocomplete="username"
            >
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              required
              autocomplete="current-password"
            >
          </div>

          <div class="form-row">
            <label class="remember">
              <input type="checkbox" v-model="form.remember">
              <span>Remember me</span>
            </label>
            <NuxtLink to="/forgot-password" class="forgot-link">
              Forgot Password?
            </NuxtLink>
          </div>

          <p v-if="error" class="error">{{ error }}</p>

          <button type="submit" class="login-btn" :disabled="isLoading">
            {{ isLoading ? 'Logging in...' : 'Sign in' }}
          </button>

          <button type="button" class="btn-microsoft" @click="signInWithMicrosoft" disabled>
            <span class="ms-logo">
              <span class="sq r"></span><span class="sq g"></span>
              <span class="sq b"></span><span class="sq y"></span>
            </span>
            Sign in with Microsoft
          </button>

          <p class="terms">
            By continuing, you agree to our
            <a href="/terms" target="_blank">terms of use</a>
            and
            <a href="/privacy" target="_blank">privacy policy</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const config = useRuntimeConfig()
const isLoading = ref(false)
const error = ref('')

const form = ref({
  login: '',      // username OR email
  password: '',
  remember: false
})

const login = async () => {
  isLoading.value = true
  error.value = ''

  try {
    const response: any = await $fetch('/login', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        login: form.value.login.trim(),
        password: form.value.password
      }
    })

    if (!response?.token) {
      error.value = 'Login succeeded but no token returned'
      return
    }

    const maxAge = form.value.remember
      ? 60 * 60 * 24 * 30   // 30 days
      : 60 * 60 * 24        // 1 day

    const tokenCookie = useCookie('auth_token', {
      path: '/',
      sameSite: 'lax',
      maxAge
    })
    tokenCookie.value = response.token

    localStorage.setItem('token', response.token)
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user))
    }

    navigateTo('/admin')
  } catch (err: any) {
    error.value = err.data?.message || 'Invalid username/email or password'
  } finally {
    isLoading.value = false
  }
}

const signInWithMicrosoft = () => {
  error.value = 'Microsoft sign-in coming soon'
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
  font-size: 2rem;
  font-weight: 700;
}

.subtitle {
  color: #F49322;
  margin: 0 0 28px;
  font-size: 1rem;
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

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.remember {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
}

.remember input {
  width: 16px;
  height: 16px;
  accent-color: #F49322;
}

.forgot-link {
  color: #F49322;
  text-decoration: none;
  font-weight: 500;
}

.forgot-link:hover {
  text-decoration: underline;
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
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn:hover:not(:disabled) {
  background: #e07f1c;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-microsoft {
  width: 100%;
  margin-top: 14px;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #1f2937;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.2s;
}

.btn-microsoft:hover:not(:disabled) {
  background: #f9fafb;
}

.btn-microsoft:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.ms-logo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  width: 18px;
  height: 18px;
}

.ms-logo .sq { border-radius: 1px; }
.ms-logo .r { background: #f25022; }
.ms-logo .g { background: #7fba00; }
.ms-logo .b { background: #00a4ef; }
.ms-logo .y { background: #ffb900; }

.terms {
  margin-top: 24px;
  color: #6b7280;
  font-size: 0.8rem;
  line-height: 1.5;
}

.terms a {
  color: #0c2340;
  text-decoration: underline;
}
</style>