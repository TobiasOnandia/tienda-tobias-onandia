const $ = (el) => document.querySelector(el)

const form = $('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(form)
  const fields = Object.fromEntries(formData.entries())

  if (fields.password !== fields.passwordConfirm) {
    window.alert('Las contraseñas no coinciden')
    return
  }

  window.localStorage.setItem('user', JSON.stringify({
    name: fields.name,
    email: fields.email,
    password: fields.password
  }))

  window.location.href = '/pages/tienda/tienda.html'
})
