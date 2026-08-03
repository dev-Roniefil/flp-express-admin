export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const token = useCookie('auth_token')

  // Allow login page itself
  if (to.path === '/login' || to.path.endsWith('/login')) return

  if (!token.value) {
    // Full path from site root so Nginx hits the admin app
    return navigateTo('/admin/login', { external: true })
  }
})