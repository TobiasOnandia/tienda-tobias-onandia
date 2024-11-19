const ctx = document.getElementById('myChart')
async function getProducts () {
  const response = await fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .catch(err => console.log(err))
  const data = await response
  console.log(data)
  return data
}

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Ventas',
      data: [15000, 20000, 25000, 20000, 35000, 15000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
})

const $ = (el) => document.querySelector(el)
const dialog = $('dialog')
const cancel = $('.cancel')
cancel.addEventListener('click', () => {
  dialog.close()
})

function generateCard (products) {
  products.forEach((product) => {
    const productElement = document.createElement('tr')
    productElement.setAttribute('data-id', product.id)
    productElement.innerHTML = `
      <tr>
        <th scope="row">${product.title}</th>
        <td>$ ${product.price}</td>
        <td>${product.stock}</td>
        <td>
          <button class="setOpen">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
              <path d="M0 0h24v24H0z" stroke="none"/>
              <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>
            </svg>
          </button>
        </td>
      </tr>
    `

    const button = productElement.querySelector('button')
    button.addEventListener('click', () => {
      dialog.setAttribute('data-id', product.id)
      dialog.showModal()
    })

    addTable.appendChild(productElement)
  })
}

const addTable = $('.tbody')
const deleteButton = $('.delete')

deleteButton.addEventListener('click', () => {
  const productId = dialog.getAttribute('data-id')
  const productRow = addTable.querySelector(`tr[data-id="${productId}"]`)

  if (productRow) {
    addTable.removeChild(productRow)
    dialog.close()
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .catch(error => console.log(error))
  }
})

$('.singout').addEventListener('click', () => {
  window.localStorage.clear()
  window.location.href = '/pages/tienda/tienda.html'
})

async function renderProducts () {
  addTable.innerHTML = ''
  const { products } = await getProducts()
  generateCard(products.slice(0, 5))
}

renderProducts()
