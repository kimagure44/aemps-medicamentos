const Utils = {
  dateFormat(value) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(value).toLocaleDateString("es-ES", options);
  }
}

export default Utils;