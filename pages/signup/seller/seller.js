const $ = (el) => document.querySelector(el)
// const $$ = (el) => document.querySelectorAll(el)

const form = $('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(form)
  const fields = Object.fromEntries(formData.entries())

  // Validación personalizada si es necesaria
  if (!fields.nameSeller || !fields.emailSeller || !fields.passwordSeller || !fields.passwordConfirmSeller) {
    window.alert('Por favor, completa todos los campos obligatorios.')
    return
  }

  if (fields.passwordSeller !== fields.passwordConfirmSeller) {
    window.alert('Las contraseñas no coinciden')
    return
  }

  window.localStorage.setItem('user', JSON.stringify(fields))

  window.location.href = '/pages/seller/seller.html'
})
