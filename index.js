import Medicines from './medicines.js';
import './drug-card-medicines.js';
import './drug-card-presentations.js';
import './drug-modal.js';

window.onload = () => {
  Medicines.get.optionsSearch();
  Medicines.set.pagination();
  Medicines.set.evtClick('#pagePrev');
  Medicines.set.evtClick('#pageNext');
  Medicines.set.evtClick('#search');
};