const AEMPS = {
  baseURL: 'https://cima.aemps.es/cima/rest/',
  options: [
    { 
      field: 'nombre', 
      description: 'Nombre del medicamento', 
      moreInfo: '',
      boolean: false,
      combo: ['medicamentos']
    },
    { 
      field: 'laboratorio', 
      description: 'Nombre del laboratorio', 
      moreInfo: '',
      boolean: false,
      combo: ['medicamentos']
    },
    { 
      field: 'practiv1', 
      description: 'Nombre del principio activo 1', 
      moreInfo: '',
      boolean: false ,
      combo: ['medicamentos']
    },
    { 
      field: 'practiv2', 
      description: 'Nombre del principio activo 2', 
      moreInfo: '',
      boolean: false,
      combo: ['medicamentos']
    },
    { 
      field: 'idpractiv1', 
      description: 'ID del principio activo 1', 
      moreInfo: '',
      boolean: false,
      combo: ['medicamentos', 'presentaciones']
    },
    { 
      field: 'idpractiv2', 
      description: 'ID del principio activo 2', 
      moreInfo: '',
      boolean: false,
      combo: ['medicamentos']
    },
    { 
      field: 'cn', 
      description: 'Código nacional', 
      moreInfo: '',
      boolean: false,
      combo: ['medicamentos', 'medicamento', 'presentaciones']
    },
    { 
      field: 'atc', 
      description: 'Código ATC o descripción', 
      moreInfo: '',
      boolean: false,
      combo: ['medicamentos']
    },
    { 
      field: 'nregistro', 
      description: 'Nº de registro', 
      moreInfo: '',
      boolean: false,
      combo: ['medicamentos', 'medicamento', 'presentaciones']
    },
    { 
      field: 'npactiv', 
      description: 'Nº de principios activos asociados al medicamento', 
      moreInfo: '',
      boolean: false,
      combo: ['medicamentos']
    },
    { 
      field: 'triangulo', 
      description: 'Triangulo negro', 
      moreInfo: '1 – Tienen triángulo, 0 –No tienen triangulo',
      boolean: true,
      combo: ['medicamentos']
    },
    { 
      field: 'huerfano', 
      description: 'Medicamento huerfano', 
      moreInfo: '1 – Huérfano, 0 –No huérfano',
      boolean: true,
      combo: ['medicamentos']
    },
    { 
      field: 'biosimilar', 
      description: 'Biosimilar', 
      moreInfo: '1 – Biosimilar, 0 –No biosimilar',
      boolean: true,
      combo: ['medicamentos']
    },
    { 
      field: 'sust', 
      description:'Sust', 
      moreInfo: '1 – Biológicos, 2 – Medicamentos con principios activos de estrecho margen terapéutico, 3 – Medicamentos de especial control médico o con medidas especiales de seguridad, 4 – Medicamentos para el aparato respiratorio administrados por vía inhalatoria, 5 – Medicamentos de estrecho margen terapéutico',
      boolean: true,
      combo: ['medicamentos']
    },
    { 
      field: 'vmp', 
      description: 'ID del código VMP', 
      moreInfo: 'Medicamentos que contienen igual principio activo, dosis y forma farmacéutica',
      boolean: false,
      combo: ['medicamentos', 'presentaciones']
    },
    { 
      field: 'comerc', 
      description: 'comercializada la presentación', 
      moreInfo: '1 – Comercializados, 0 – No comercializado',
      boolean: true,
      combo: ['medicamentos', 'presentaciones']
    },
    { 
      field: 'autorizados', 
      description: 'Medicamente autorizado', 
      moreInfo: '1 – Solo medicamentos autorizados, 0 – Solo medicamentos no autorizados',
      boolean: true,
      combo: ['medicamentos']
    },
    { 
      field: 'receta', 
      description: 'Receta necesaria', 
      description: '1 – Medicamentos con receta, 0 – Medicamentos sin receta',
      boolean: true,
      combo: ['medicamentos']
    },
    {
      field: 'vmpp', 
      description: 'ID del código VMP', 
      moreInfo: 'Medicamentos que contienen igual principio activo, dosis, forma farmacéutica y número de unidades de dosificación',
      boolean: false,
      combo: ['medicamentos', 'presentaciones']
    }
  ],
  optionSearch: [
    {
      field: 'Medicamentos',
      description: 'Buscar por medicamento'
    },
    {
      field: 'Presentaciones',
      description: 'Buscar por presentación'
    }
  ],
  async medicinesAPI(resource, option, value, page = 1) {
    const endpoint = resource === 'presentacion' ? `${resource}${option}${value}` : `${resource}?${option}=${value}&pagina=${page}`;
    const url = `${AEMPS.baseURL}${endpoint}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}

export default AEMPS;