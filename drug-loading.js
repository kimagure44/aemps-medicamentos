(() => {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      .loading {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        opacity: 0.7;
        z-index: 10;
      }
      .hide {
        display: none;
      }
      .lds-ring {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
        left: 50%;
        top: 50%;
      }
      .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 51px;
        height: 51px;
        margin: 6px;
        border: 6px solid #148cf3;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #148cf3 transparent transparent transparent;
      }
      .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
    <div class="loading">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `;

  class DrugLoading extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    get show() {
      return this.getAttribute('show');
    }

    set show(value) {
      this.setAttribute('show', value);
    }

    static get observedAttributes() {
      return ['show'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) { 
      if (attrName === 'show') {
        const loading = this.shadowRoot.querySelector('.loading');
        JSON.parse(newValue) ? loading.classList.remove('hide') : loading.classList.add('hide');
      }
    }

    connectedCallback() {
      if (!this.hasAttribute('show')) {
        this.show = false;
      }
    }
  }

  customElements.define('drug-loading', DrugLoading);
})();