export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('intersect', {
      mounted(el, binding) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            binding.value()
            observer.unobserve(el)
          }
        }, { threshold: 0.5 })
        observer.observe(el)
      }
    })
  })
  