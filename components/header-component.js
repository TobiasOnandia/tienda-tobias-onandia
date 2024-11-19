class HeaderComponent extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const title = this.getAttribute('title') || 'Título por defecto'
    this.render(title)
  }

  render (title) {
    this.shadowRoot.innerHTML = `
        <style>
        header{
                display: flex;
                height: 20px;
                padding: 20px;
                background-color: var(--muted-foreground);
                color: var(--foreground);
                justify-content: center;
                align-items: center;
                position: relative;

                & > a{
                    width: max-content;
                    position: absolute;
                    left: 25px;
                    transition: all 0.3s ease-in-out;
                    color: var(--foreground);
                    border-radius: 5px;
                    padding: 10px;
                    
                    &:hover{
                        transform:translateX(-5px);
                        background-color: var(--primary);
                    }

                }
            }

            h1{
                font-size: 1.2rem;
                font-weight: bold;
            }
        </style>
        <header>
          <a href="/pages/tienda/tienda.html">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path d="M0 0h24v24H0z" stroke="none"/><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>
          </a>
          <h1>${title}</h1>
        </header>
      `
  }
}

window.customElements.define('header-component', HeaderComponent)
