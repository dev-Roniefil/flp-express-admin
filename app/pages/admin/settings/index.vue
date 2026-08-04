<template>
  <div class="settings-page">
    <div class="page-header">
      <h1>Site Settings</h1>
      <button class="btn-primary" :disabled="saving" @click="saveSettings">
        {{ saving ? 'Saving...' : 'Save Settings' }}
      </button>
    </div>

    <div class="settings-grid">
      <!-- Contact -->
      <div class="card">
        <h2>Contact Us</h2>
        <div class="form-section">
          <label class="form-label">Email</label>
          <input v-model="form.contact_email" type="email" class="form-control" placeholder="info@example.com">
        </div>
        <div class="form-section">
          <label class="form-label">Phone (tel link)</label>
          <input v-model="form.contact_phone" type="text" class="form-control" placeholder="+19412221012">
          <small>Used in href="tel:..." — digits preferred</small>
        </div>
        <div class="form-section">
          <label class="form-label">Phone (display)</label>
          <input v-model="form.contact_phone_display" type="text" class="form-control" placeholder="(941) 222-1012">
          <small>Shown on “Call Us Now” button</small>
        </div>
        <div class="form-section">
          <label class="form-label">Address</label>
          <textarea v-model="form.contact_address" class="form-control" rows="3" placeholder="Sarasota, FL"></textarea>
        </div>
      </div>

      <!-- Social -->
      <div class="card">
        <h2>Social Media Links</h2>
        <div class="form-section">
          <label class="form-label">Facebook</label>
          <input v-model="form.social_facebook" type="url" class="form-control" placeholder="https://facebook.com/...">
        </div>
        <div class="form-section">
          <label class="form-label">Instagram</label>
          <input v-model="form.social_instagram" type="url" class="form-control" placeholder="https://instagram.com/...">
        </div>
        <div class="form-section">
          <label class="form-label">X (Twitter)</label>
          <input v-model="form.social_x" type="url" class="form-control" placeholder="https://x.com/...">
        </div>
        <div class="form-section">
          <label class="form-label">YouTube</label>
          <input v-model="form.social_youtube" type="url" class="form-control" placeholder="https://youtube.com/...">
        </div>
        <div class="form-section">
          <label class="form-label">Pinterest</label>
          <input v-model="form.social_pinterest" type="url" class="form-control" placeholder="https://pinterest.com/...">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig()
const router = useRouter()
const saving = ref(false)

const form = ref({
  contact_email: '',
  contact_phone: '',
  contact_phone_display: '',
  contact_address: '',
  social_facebook: '',
  social_instagram: '',
  social_x: '',
  social_youtube: '',
  social_pinterest: '',
})

const authHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {}

  const cookieToken = useCookie<string | null>('auth_token').value
  const localToken = import.meta.client ? localStorage.getItem('token') : null
  const token = cookieToken || localToken

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

const { showToast } = useToast()

// const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
//   // use your sonner/toast helper if you have one
//   if (type === 'error') {
//     // @ts-ignore
//     if (typeof toast !== 'undefined') toast.error(msg)
//     else alert(msg)
//   } else {
//     // @ts-ignore
//     if (typeof toast !== 'undefined') toast.success(msg)
//     else alert(msg)
//   }
// }

const loadSettings = async () => {
  try {
    const res: any = await $fetch('/settings', {
      baseURL: config.public.apiBase,
      headers: authHeaders(),
    })
    form.value = { ...form.value, ...res }
  } catch (e: any) {
    const msg = e?.data?.message || 'Not allowed. Please contact admin support.'
    showToast(msg, 'error')
    if (e?.status === 403) {
      router.push('/')
    }
  }
}

const saveSettings = async () => {
  saving.value = true
  try {
    await $fetch('/settings', {
      baseURL: config.public.apiBase,
      method: 'PUT',
      headers: authHeaders(),
      body: form.value
    })
    showToast('Settings saved')
  } catch (e: any) {
    showToast(e?.data?.message || 'Not allowed. Please contact admin support.', 'error')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  // Client-side role gate (extra; API also checks)
  if (!import.meta.client) return

  const userRaw = localStorage.getItem('user')
  if (userRaw) {
    try {
      const user = JSON.parse(userRaw)
      const role = user.role || ''
      if (!['admin', 'super_admin', 'administrator'].includes(role)) {
        showToast('Not allowed. Please contact admin support.', 'error')
        router.push('/')
        return
      }
    } catch (_) {
      // ignore parse error
    }
  }

  loadSettings()
})
</script>

<style scoped>
.settings-page { max-width: 1100px; }
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.page-header h1 { color: #0c2340; margin: 0; }
.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.card h2 {
  margin: 0 0 20px;
  color: #0c2340;
  font-size: 1.2rem;
}
.form-section { margin-bottom: 16px; }
.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #374151;
}
.form-control {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
}
.form-section small {
  display: block;
  margin-top: 4px;
  color: #64748b;
  font-size: 0.85rem;
}
.btn-primary {
  background: #F49322;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
@media (max-width: 768px) {
  .settings-grid { grid-template-columns: 1fr; }
}
</style>