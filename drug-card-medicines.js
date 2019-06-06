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
      #docs li {
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
      #extraInfoMedicamento {
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
            <div class='title'>
              Nº de registro del medicamento
              <span id="extraInfoMedicamento" data-nRegistro>(Info)</span>
            </div>
            <div id="nregistro"></div>
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
        <li>
          <div class='section'>
            <div class='title' data-idViaAdministracion>Vías de administración para las que está autorizado el medicamento</div>
            <div id="viasAdministracion"></div>
          </div>
        </li> 
      </ul>
    </div>
  `;

  class DrugCardMedicines extends HTMLElement {
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
        const {id, nombre} = {...data.viasAdministracion[0]};
        this.html('biosimilar', this.icon(data.biosimilar) || '');
        this.html('comerc', this.icon(data.comerc) || '');
        this.html('conduc', this.icon(data.conduc) || '');
        this.html('cpresc', data.cpresc || '');
        this.html('docs', this.docsMedicaments(data.docs) || '')
        this.html('dosis', data.dosis || '');
        this.html('ema', this.icon(data.ema) || '');
        this.html('estado', this.status(data.estado) || '');
        this.dataProps('idFormaFarmaceutica', data.formaFarmaceutica.id || '');
        this.html('formaFarmaceutica', data.formaFarmaceutica.nombre || '');
        this.dataProps('idformaFarmaceuticaSimplificada', data.formaFarmaceuticaSimplificada.id || '');
        this.html('formaFarmaceuticaSimplificada', data.formaFarmaceuticaSimplificada.nombre || '');
        this.html('huerfano', this.icon(data.huerfano) || '');
        this.html('labtitular', data.labtitular || '');
        this.html('materialesInf', this.icon(data.materialesInf) || '');
        this.html('nombre', data.nombre || '');
        this.dataProps('idMedicamenteSustituible', data.nosustituible.id || '');
        this.html('nosustituible', data.nosustituible.nombre || '');
        this.html('notas', this.icon(data.notas) || '');
        this.html('nregistro', data.nregistro || '');
        this.dataProps('nRegistro', data.nregistro || '');
        this.html('receta', this.icon(data.receta) || '');
        this.html('triangulo', this.icon(data.triangulo) || '');
        this.dataProps('idViaAdministracion', id || '');
        this.html('viasAdministracion', nombre || '');
        this.shadowRoot.querySelector('#extraInfoMedicamento').addEventListener('click', evt => {
          const nRegistro = evt.target.getAttribute('data-nRegistro');
          AEMPS.medicinesAPI('medicamento', 'nregistro', nRegistro).then(response => {
            this.modal(response);
          }).catch(err => {
            console.log(`Error (API Call): ${err}`);
          })
        });
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
  }
  customElements.define('drug-card-medicines', DrugCardMedicines);
})();