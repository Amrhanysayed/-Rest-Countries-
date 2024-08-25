import View from "./view.js";
import * as Model from "./model.js";

async function showAll(filter = "", search = "") {
  const allCountries = await Model.getAll(filter, search);
  console.log(allCountries);
  View.renderAllCountries(allCountries);
}

async function showCountry() {
  const hash = document.location.hash.slice(1);
  if (!hash) return showAll();

  const country = await Model.getCountry(hash);
  View.renderResult(country);
  View.backHandler();
}

function init() {
  View.handlers(showCountry);
  View.renderFilteredValue(showAll);
  View.renderSearchedValue(showAll);
}

init();
