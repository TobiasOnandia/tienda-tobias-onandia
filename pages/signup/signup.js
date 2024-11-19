const $ = (el) => document.querySelector(el)
// const $$ = (el) => document.querySelectorAll(el)

const form = $('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(form)
  const fields = Object.fromEntries(formData.entries())

  // Validación personalizada si es necesaria
  if (!fields.name || !fields.email || !fields.password || !fields.passwordConfirm) {
    window.alert('Por favor, completa todos los campos obligatorios.')
    return
  }

  if (fields.password !== fields.passwordConfirm) {
    window.alert('Las contraseñas no coinciden')
    return
  }

  window.localStorage.setItem('user', JSON.stringify(fields))

  window.location.href = '/pages/tienda/tienda.html'
})
