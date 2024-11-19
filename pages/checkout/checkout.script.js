const $ = (el) => document.querySelector(el)

const productsStorage = JSON.parse(window.localStorage.getItem('cart')) || []
const checkoutProducts = $('.checkoutProducts')

function generateCard () {
  checkoutProducts.innerHTML = ''
  checkoutProducts.innerHTML = `
            <h2>Resumen del pedido</h2>
  `

  if (productsStorage.length === 0) {
    const productElement = document.createElement('article')
    productElement.innerHTML = '<p>No hay productos en el carrito</p>'
    checkoutProducts.appendChild(productElement)
    return
  }

  productsStorage.forEach((product) => {
    const productElement = document.createElement('article')
    productElement.innerHTML = `
        <figure>
            <img src="${product.thumbnail}" alt="${product.title}">
        </figure>
        <div>
          <h2>${product.title}</h2>
          <p>Precio unitario: $ ${product.price}</p>
          Cantidad: <span class="displayStock">${product.displayStock}</span>
        </div>
      `
    checkoutProducts.appendChild(productElement)
  })
}

function calculatePrice () {
  const totalPrice = productsStorage.reduce((sum, product) => {
    return sum + product.price * product.displayStock
  }, 0)
  $('.totalPrice').textContent = `$ ${totalPrice}`
}

function renderTotal () {
  const totalEl = document.createElement('section')
  totalEl.classList.add('total')
  totalEl.innerHTML = `
    <h3>Total: <span class='totalPrice'></span></h3>
  `
  checkoutProducts.appendChild(totalEl)
}

const tarjeta = $('#tarjeta')
const paypal = $('#paypal')
const transferencia = $('#transferencia')

function renderPaymentMethod () {
  const cardDetails = $('.card')

  if (tarjeta.checked) {
    cardDetails.innerHTML = `
      <legend>Detalles de la Tarjeta</legend>
      <label for="tarjeta">
          <span>Número de tarjeta</span>
          <input required type="text" id="tarjeta" name="tarjeta" placeholder="1234 5678 9012 3456">
      </label>
      <label for="expiracion">
          <span>Fecha de expiración</span>
          <input required type="text" id="expiracion" name="expiracion" placeholder="MM/YY">
      </label>
      <label for="seguridad">
          <span>Código de seguridad</span>
          <input required type="text" id="seguridad" name="seguridad" placeholder="123">
      </label>
    `
  } else if (paypal.checked) {
    cardDetails.innerHTML = `
      <legend>PayPal</legend>
      <span> Serás redirigido a PayPal para completar tu pago de forma segura.</span>
    `
  } else if (transferencia.checked) {
    cardDetails.innerHTML = `
      <legend>Transferencia Bancaria</legend>
      <p>
        Detalles de Transferencia Bancaria
        <br>Banco: Banco Ejemplo
        <br>IBAN: ES91 2100 0418 4502 0005 1332
        <br>BIC/SWIFT: CAIXESBBXXX
        <br>Referencia: Tu número de pedido
      </p>
    `
  }
}

function calculateStockDifference () {
  const stockDifferences = productsStorage.map(product => {
    const initialStock = product.stock
    const requestedStock = product.displayStock
    const difference = initialStock - requestedStock

    return {
      productId: product.id,
      title: product.title,
      initialStock,
      requestedStock,
      difference
    }
  })

  return stockDifferences
}

async function submitForm () {
  const stockDifferences = calculateStockDifference()

  const response = await fetch('https://dummyjson.com/products/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      stockDifferences
    })
  })
    .then(res => res.json())
    .catch(err => console.log(err))

  return response
}

async function pay (event) {
  event.preventDefault()
  const response = await submitForm()

  if (response !== undefined) {
    window.alert('Tu pago se ha procesado correctamente')
    window.location.href = '/pages/tienda/tienda.html'
  }
}

tarjeta.addEventListener('change', renderPaymentMethod)
paypal.addEventListener('change', renderPaymentMethod)
transferencia.addEventListener('change', renderPaymentMethod)
$('form').addEventListener('submit', pay)
renderPaymentMethod()
generateCard()
renderTotal()
calculatePrice()
