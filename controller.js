import View from "./view.js";
import * as Model from "./model.js";

function showAll(filter = "", search = "") {
  const allCountries = Model.getAll(filter, search);

  View.renderAllCountries(allCountries);
}

function showCountry(filter) {
  const hash = document.location.hash.slice(1);
  if (!hash) return showAll(filter);

  const country = Model.getCountry(hash);
  View.renderResult(country);
  View.backHandler();
}

function init() {
  View.handlers(showCountry, Model.stateInit);
  View.renderFilteredValue(showAll);
  View.renderSearchedValue(showAll);
}

init();
