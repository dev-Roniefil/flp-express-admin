export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const token = useCookie('auth_token')

  if (to.path === '/login' || to.path.includes('/login')) {
    return
  }

  if (!token.value) {
    return navigateTo('/login', { external: true })
  }
})