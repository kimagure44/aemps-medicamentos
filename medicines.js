import AEMPS from './aemps.js';
import './drug-loading.js';

const Medicines = (() => {
  let page;
  let totalPages;
  const optionsFilters = (comboValue = 'medicamentos') => {
    if (getElem('#optionsFilters').children.length > 0) {
      getElem('#optionsFilters').innerHTML = '';
    }
    AEMPS.options.forEach(el => {
      if (!el.boolean && el.combo.includes(comboValue)) {
        const option = createElem('option');
        option.value = el.field;
        option.innerText = el.description;
        option.title = el.description;
        getElem('#optionsFilters').appendChild(option);
      }
    });
  };
  const optionsSearchMedicines = () => {
    getElem('#optionsSearchMedicines').addEventListener('change', e => {
      const optionSelected = (e.target.selectedOptions[0] || []).value || '';
      if (optionSelected === 'Medicamentos') {
        optionsFilters('medicamentos');
      }
      if (optionSelected === 'Presentaciones') {
        optionsFilters('presentaciones');
      }
    });
    AEMPS.optionSearch.forEach(el => {
      const option = createElem('option');
      option.value = el.field;
      option.innerText = el.field;
      option.title = el.description;
      getElem('#optionsSearchMedicines').appendChild(option);
    });
    optionsFilters();
  };
  const pagination = () => {
    getElem('#pages').innerHTML = `
    <ul>
      <li id="pagePrev" data-page><</li>
      <li id="infoPagination">0 de 0</li>
      <li id="pageNext" data-page>></li>
    </ul>
    `;
  };
  const loading = status => getElem('drug-loading').setAttribute('show', status);
  const getElem = selector => document.querySelector(selector);
  const createElem = selector => document.createElement(selector);
  const cardMedicines = (data = {}) => {
    const drugCardMedicines = createElem('drug-card-medicines');
    drugCardMedicines.setAttribute('data', JSON.stringify(data));
    getElem('#result').appendChild(drugCardMedicines);
  };
  const cardPresentations = (data = {}) => {
    const drugCardPresentations = createElem('drug-card-presentations');
    drugCardPresentations.setAttribute('data', JSON.stringify(data));
    getElem('#result').appendChild(drugCardPresentations);
  };
  const getPage = () => {
    return page;
  };
  const setPage = value => {
    page = value;
  };
  const getTotalPages = () => {
    return totalPages; 
  };
  const setTotalPages = value => {
    totalPages = value;
  };
  const search = (page = 1) => {
    loading(true);
    getElem('#result').innerHTML = '';
    const endpoint = getElem('#optionsSearchMedicines').selectedOptions[0].value.toLowerCase();
    AEMPS.medicinesAPI(endpoint, getElem('#optionsFilters').value, getElem('input[type=search]').value, page).then(response => {
      setPage(response.pagina);
      loading(false);
      setTotalPages(parseInt((response.totalFilas / response.tamanioPagina)) + 1);
      getElem('#pagePrev').setAttribute('data-page', response.pagina);
      getElem('#infoPagination').innerHTML = `Página ${response.pagina <= 1 ? 1 : response.pagina} de ${getTotalPages()} (${response.totalFilas} registros)`;
      getElem('#pageNext').setAttribute('data-page', response.pagina);
      if (endpoint === 'medicamentos') {
        response.resultados.forEach(el => cardMedicines(el));
      }
      if (endpoint === 'presentaciones') {
        response.resultados.forEach(el => cardPresentations(el));
      }
    }).catch(err => { 
      loading(false);
      console.log(`Error (API Call): ${err}`);
    });
  };

  return {
    get: {
      optionsSearch: () => optionsSearchMedicines()
    },
    set: {
      pagination: () => pagination(),
      evtClick: selector => {
        getElem(selector).addEventListener('click', evt => {
          if (evt.target.id === 'pagePrev') {
            let page = getPage();
            if (page > 1)
              search(--page);
          }
          if (evt.target.id === 'pageNext') {
            let page = getPage();
            const totalPages = getTotalPages();
            if (page < totalPages)
              search(++page);
          }
          if (evt.target.id === 'search') {
            search();
          }
        });
      }
    },
  }
})();

export default Medicines;