// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const token = useCookie('auth_token')

  const isLoginPage =
    to.path === '/admin/login' ||
    to.path === '/login' ||
    to.path.endsWith('/login')

  if (isLoginPage) {
    if (token.value) {
      return navigateTo('/admin')
    }
    return
  }

  if (to.path.startsWith('/admin') && !token.value) {
    return navigateTo('/admin/login')
  }
})