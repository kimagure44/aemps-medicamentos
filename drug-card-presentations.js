import AEMPS from "./aemps.js";
import './drug-modal.js';
import Utils from './mixins.js';

(() => {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :root {
        font-family: 'Raleway', sans-serif;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      li {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .card {
        border: 1px solid #dddddd;
        margin-bottom: 25px;
        box-shadow: 0px 0px 4px 1px rgba(0,0,255,0.2);
      }
      .title {
        font-weight: bold;
      }
      #docs li,
      #excipientes li,
      #pactivosDetalle li {
        border: 1px solid #dddddd;
        padding: 10px 0 10px 10px;
        margin: 10px;
      }
      .section {
        font-size: 13px;
        border-bottom: 1px solid #dddddd;
        padding: 5px;
      }
      .capitalize {
        text-transform: capitalize;
      }
      #docs {
        margin: 10px 0;
      }
      #extraInfoPresentacion {
        color: #2233aa;
        font-weight: bold;
        cursor: pointer;
      }
    </style>
    <div class='card'>
      <ul>
        <li>
          <div class='section'>
            <div class='title'>Nombre del medicamento</div>
            <div id="nombre"></div>
          </div>
        </li>
        <li>
          <div class='section'>
            <div class='title'>Está considerado como biosimilar</div>
            <div class='icon' id="biosimilar"></div>
          </div>
        </li>
        <li>
          <div class='section'>
            <div class='title'>Código nacional</div>
            <div id="cn"></div>
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
            <div class='title'>Tiene alguna presentación comercializada</div>
            <div class='icon' id="comerc"></div>
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
            <div class='title'>El medicamento tienen asociado el triángulo negro</div>
            <div id="triangulo"></div>
          </div>
        </li> 
      </ul>
    </div>
  `;

  class DrugCardPresentations extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    get data() {
      return this.getAttribute('data');
    }

    set data(value) {
      this.setAttribute('data', value);
    }

    static get observedAttributes() {
      return ['data'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'data') {
        const data = JSON.parse(newValue);
        this.html('nombre', data.nombre || '');
        this.html('biosimilar', this.icon(data.biosimilar) || '');
        this.html('cn', data.cn || '');
        this.html('comerc', this.icon(data.comerc) || '');
        this.html('conduc', this.icon(data.conduc) || '');
        this.html('cpresc', data.cpresc || '');
        this.html('docs', this.docsPresentations(data.docs) || '')
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
        this.html('huerfano', this.icon(data.huerfano) || '');
        this.html('labtitular', data.labtitular || '');
        this.html('materialesInf', this.icon(data.materialesInf) || '');
        this.dataProps('idMedicamenteSustituible', data.nosustituible.id || '');
        this.html('nosustituible', data.nosustituible.nombre || '');
        this.html('notas', this.icon(data.notas) || '');
        this.html('nregistro', data.nregistro || '');
        this.html('pactivos', data.pactivos || '');
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
      }
    }
    
    modal(data = {}) {
      let drugCard = document.querySelector('drug-modal');
      if (drugCard === null) {
        console.log('Error (Component not found): Not found the component <drug-modal></drug-modal>')
      } else {
        drugCard.setAttribute('data', JSON.stringify(data));
        drugCard.setAttribute('show', true);
      }
    }
    
    connectedCallback() {
      if (!this.hasAttribute('data')) {
        this.data = {};
      }
    }

    dataProps(data, value) {
      this.shadowRoot.querySelector(`[data-${data}]`).setAttribute(`data-${data}`, value);
    }

    html(id, value) {
      this.shadowRoot.getElementById(id).innerHTML = value;
    }
    
    icon(value) {
      return value ? 'Si' : 'No';
    } 

    docsPresentations(doc = []) {
      const template = document.createElement('template');
      
      doc.forEach(el => {
        template.innerHTML = `
          <li>
            <div>
              <div class='title'>Tipo</div>
              <div>${this.type(el.tipo)}</div>
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
              <div class='title'>Documento</div>
              <div>
                ${this.type(el.tipo)} (<a href='${el.url}' target='_blank'>PDF</a>)
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
  }
  customElements.define('drug-card-presentations', DrugCardPresentations);
})();