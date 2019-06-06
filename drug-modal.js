import Utils from './mixins.js';

(() => {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :root {
        font-family: 'Raleway', sans-serif;
      }
      .container {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        opacity: 0.7;
        z-index: 10;
      }
      .modal {
        left: calc(50% - 40%);
        position: fixed;
        width: 80%;
        height: calc(100% - 200px);
        background-color: #ffffff;
        top: 100px;
        box-shadow: 0px 0px 15px 10px rgba(0,0,0,0.2);
        opacity: 1;
        z-index: 30;
        display: grid;
        grid-template: 50px 1fr 50px / 1fr;
        justify-items: stretch;
        transition: 350ms ease-in-out;
        transform: scale(1, 1);
      }
      .grid-center {
        display: grid;
        justify-content: center;
        justify-self: stretch;
        align-content: center;
        align-self: stretch;
      }
      .header {
        border-bottom: 1px solid #dddddd;
      }
      .footer {
        border-top: 1px solid #dddddd;
        cursor: pointer;
        transition: 200ms ease-in-out;
      }
      .footer:hover {
        background-color: #008dc3;
        color: #ffffff;
        font-weight: bold;
        transition: 200ms ease-in-out;
      }
      .hide {
        opacity: 0;
        z-index: -1;
        transition: 350ms ease-in-out;
        transform: scale(0,0);
      }
      .body {
        overflow-y: scroll;
      }
      .section {
        font-size: 13px;
        border-bottom: 1px solid #dddddd;
        padding: 5px;
      }
      li {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .title {
        font-weight: bold;
      }
      #docs li {
        padding-left: 20px;
      }
      #atcs li,
      #docs li,
      #fotos li,
      #excipientes li, 
      #presentaciones li,
      #pactivosDetalle li {
        border: 1px solid #dddddd;
        padding: 10px 0 10px 10px;
        margin: 10px;
      }
    </style>
    <div class="container"></div>
    <div class="modal">
      <div class="header grid-center">
        <slot name="header">
          <div>Información detallada</div>
        </slot>
      </div>
      <div class="body">
        <ul>
          <li>
            <div class='section'>
              <div class='title'>Nombre del medicamento</div>
              <div id="nombre"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Códigos ATC asociados al medicamento</div>
              <ul id="atcs"></ul>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>El medicamento está considerado como biosimilar</div>
              <div id="biosimilar"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Tiene alguna presentación comercializada</div>
              <div class='icon' id="comerc"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>El medicamento afecta a la conducción</div>
              <div class='icon' id="conduc"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Condiciones de prescripción del medicamento</div>
              <div class='icon' id="cpresc"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Lista de documentos asociados al medicamento</div>
              <ul id="docs"></ul>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Dosis del o los principios activos</div>
              <div id="dosis"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>El medicamento se ha registrado por procedimiento centralizado (EMA)</div>
              <div id="ema"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Estado de registro del medicamento</div>
              <div id="estado"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Excipientes</div>
              <ul id="excipientes"></ul>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title' data-idFormaFarmaceutica>Forma farmacéutica</div>
              <div id="formaFarmaceutica"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title' data-idformaFarmaceuticaSimplificada>Forma farmacéutica simplificada</div>
              <div id="formaFarmaceuticaSimplificada"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Fotos</div>
              <ul id="fotos"></ul>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>El medicamento está considerado como medicamentos huérfano</div>
              <div id="huerfano"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Laboratorio titular del medicamento</div>
              <div id="labtitular"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Existen materiales informáticos de seguridad asociados al medicamento</div>
              <div id="materialesInf"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title' data-idMedicamenteSustituible>Tipo de medicamento sustituible</div>
              <div id="nosustituible"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Existen notas asociadas al medicamento</div>
              <div id="notas"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Nº de registro del medicamento</div>
              <div id="nregistro"></div>
            </div>
          </li> 
          <li>
            <div class='section'>
              <div class='title'>Principios activos</div>
              <div id="pactivos"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Presentaciones del medicamento</div>
              <ul id="presentaciones"></ul>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>Detalle de los principios activos</div>
              <ul id="pactivosDetalle"></ul>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>El medicamento tienen problemas de suministro abiertos</div>
              <div id="psum"></div>
            </div>
          </li>
          <li>
            <div class='section'>
              <div class='title'>El medicamento necesita receta médica</div>
              <div id="receta"></div>
            </div>
          </li> 
          <li>
            <div class='section'>
              <div class='title'>El medicamento tiene asociado el triángulo negro</div>
              <div id="triangulo"></div>
            </div>
          </li> 
          <li>
            <div class='section'>
              <div class='title' data-idViaAdministracion>Vías de administración para las que está autorizado el medicamento</div>
              <div id="viasAdministracion"></div>
            </div>
          </li> 
        </ul>
      </div>
      <div class="footer grid-center">
        <slot name="footer">
          <div><a>X</a></div>
        </slot>
      </div>
    </div>
  `;

  class DrugModal extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
      this.shadowRoot.querySelector('.footer').addEventListener('click', () => {
        this.show = false;
      });
    }

    get data() {
      return this.getAttribute('data');
    }

    set data(value) {
      this.setAttribute('data', value);
    }

    get show() {
      return this.getAttribute('show');
    }

    set show(value) {
      this.setAttribute('show', value);
    }

    static get observedAttributes() {
      return ['data', 'show'];
    }

    connectedCallback() {
      if (!this.hasAttribute('show')) {
        this.show = false;
      }
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'data') {
        const data = JSON.parse(newValue);
        const {id, nombre} = {...data.viasAdministracion[0]};
        (data.atcs || []).forEach(el => {
          let li = document.createElement('li');
          li.innerHTML = `
            <div><b>Código</b>: ${el.codigo}</div>
            <div><b>Nivel:</b> ${el.nivel}</div>
            <div><b>Nombre:</b> ${el.nombre}</div>
          `;
          this.shadowRoot.querySelector('#atcs').appendChild(li);
        });
        this.html('biosimilar', this.icon(data.biosimilar) || '');
        this.html('comerc', this.icon(data.comerc) || '');
        this.html('conduc', this.icon(data.conduc) || '');
        this.html('cpresc', this.icon(data.cpresc) || '');
        this.html('docs', this.docsMedicaments(data.docs) || '');
        this.html('dosis', data.dosis || '');
        this.html('ema', this.icon(data.ema) || '');
        this.html('estado', this.status(data.estado) || '');
        (data.excipientes || []).forEach(el => {
          let li = document.createElement('li');
          li.innerHTML = `
            <div><b>Cantidad</b></div>
            <div>${el.cantidad}</div>
            <div><b>Nombre:</b></div>
            <div>${el.nombre}</div>
            <div><b>Orden:</b></div>
            <div>${el.orden}</div>
            <div><b>Unidad:</b></div>
            <div>${el.unidad}</div>
          `;
          li.setAttribute('data-id', el.id);
          this.shadowRoot.querySelector('#excipientes').appendChild(li);
        });
        this.dataProps('idFormaFarmaceutica', data.formaFarmaceutica.id || '');
        this.html('formaFarmaceutica', data.formaFarmaceutica.nombre || '');
        this.dataProps('idformaFarmaceuticaSimplificada', data.formaFarmaceuticaSimplificada.id || '');
        this.html('formaFarmaceuticaSimplificada', data.formaFarmaceuticaSimplificada.nombre || '');
        const ulImages = document.createElement('ul');
        (data.fotos || []).forEach(el => {
          let li = document.createElement('li');
          li.innerHTML = `
            <div><b>Fecha</b>: ${Utils.dateFormat(el.fecha)}</div>
            <div><b>Tipo:</b> ${el.tipo}</div>
            <div><img src="${el.url || ''}"></div>
          `;
          ulImages.appendChild(li);
        });
        this.shadowRoot.querySelector('#fotos').appendChild(ulImages);
        this.html('huerfano', this.icon(data.huerfano) || '');
        this.html('labtitular', data.labtitular || '');
        this.html('materialesInf', this.icon(data.materialesInf) || '');
        this.html('nombre', data.nombre || '');
        this.dataProps('idMedicamenteSustituible', data.nosustituible.id || '');
        this.html('nosustituible', data.nosustituible.nombre || '');
        this.html('notas', this.icon(data.notas) || '');
        this.html('nregistro', data.nregistro || '');
        this.html('pactivos', data.pactivos || '');
        (data.presentaciones || []).forEach(el => {
          let li = document.createElement('li');
          li.innerHTML = `
            <div><b>Código nacional</b></div>
            <div>${el.cn}</div>
            <div><b>Tiene alguna presentación comercializada</b></div>
            <div>${this.icon(el.comerc)}</div>
            <div><b>Estado</b></div>
            <div>${this.status(el.estado)}</div>
            <div><b>Tienen problemas de suministro abiertos</b></div>
            <div>${this.icon(el.psum)}</div>
          `;
          this.shadowRoot.querySelector('#presentaciones').appendChild(li);
        });
        (data.principiosActivos || []).forEach(el => {
          let li = document.createElement('li');
          li.innerHTML = `
            <div><b>Cantidad</b></div>
            <div>${el.cantidad}</div>
            <div><b>Código</b></div>
            <div>${el.codigo}</div>
            <div><b>Nombre</b></div>
            <div>${el.nombre}</div>
            <div><b>Orden</b></div>
            <div>${el.orden}</div>
            <div><b>Unida</b></div>
            <div>${el.unidad}</div>
          `;
          li.setAttribute('data-id', el.id);
          this.shadowRoot.querySelector('#pactivosDetalle').appendChild(li);
        });
        this.html('psum', this.icon(data.psum) || '');
        this.html('receta', this.icon(data.receta) || '');
        this.html('triangulo', this.icon(data.triangulo) || '');
        this.dataProps('idViaAdministracion', id || '');
        this.html('viasAdministracion', nombre || '');
      }
      if (attrName === 'show') {
        const container = this.shadowRoot.querySelector('.container');
        const modal = this.shadowRoot.querySelector('.modal');
        JSON.parse(newValue) ? container.classList.remove('hide') : container.classList.add('hide');
        JSON.parse(newValue) ? modal.classList.remove('hide') : modal.classList.add('hide');
      }
    }

    html(id, value) {
      this.shadowRoot.getElementById(id).innerHTML = value;
    }

    icon(value) {
      return value ? 'Si' : 'No';
    } 

    docsMedicaments(doc) {
      const template = document.createElement('template');
      doc.forEach(el => {
        template.innerHTML = `
          <li>
            <div>
              <div class='title'>Fecha</div>
              <div class='capitalize'>${Utils.dateFormat(el.fecha)}</div>
            </div>
          </li>
          <li>
            <div>
              <div class='title'>El documento está disponible en HTML por secciones</div>
              <div>${this.icon(el.secc)}</div>
            </div>
          </li>
          <li>
            <div>
              <div class='title'>Tipo</div>
              <div>
                ${this.type(el.tipo)} (<a href='${el.url}' target='_blank'>PDF</a> / <a href='${el.urlHtml}' target='_blank'>HTML</a>)
              </div>
            </div>
          </li>
        `;
      });
      return template.innerHTML;
    }

    type(value) {
      let result;
      if (value === 1) {
        result = 'Ficha técnica';
      } else if (value === 2) {
        result = 'Prospecto';
      } else if (value === 3) {
        result = 'Informe públicac Evaluación';
      } else if (value === 4) {
        result = 'Plan de gestión de riesgos';
      } else {
        result = '';
      }
      return result;
    }

    status(value) {
      let estado = '';
      switch (Object.keys(value)[0]) {
        case 'aut':
          estado = 'Fecha de autorización del medicamento/presentación';
          break;
        case 'susp':
          estado = 'Fecha de suspensión del medicamento/presentación';
          break;
        case 'rev':
          estado = 'Fecha de revocación del medicamento/presentación';
          break;
      }
      return `${estado}: ${Utils.dateFormat(Object.values(value)[0])}`;
    }

    dataProps(data, value) {
      this.shadowRoot.querySelector(`[data-${data}]`).setAttribute(`data-${data}`, value);
    }
  }

  customElements.define('drug-modal', DrugModal);
})();