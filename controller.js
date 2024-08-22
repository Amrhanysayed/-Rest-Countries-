import View from "./view.js";
import * as Model from "./model.js";

async function showAll() {
  const allCountries = await Model.getAll();
  View.renderAllCountries(allCountries);
}

async function showCountry() {
  const hash = document.location.hash.slice(1);
  if (!hash) return;

  const country = await Model.getCountry(hash);
  View.renderResult(country);
  View.backHandler();
}

function init() {
  showAll();
  View.handlers(showCountry);
}

init();