import View from "./view.js";
import * as Model from "./model.js";

/**
 * Returns all countries upon given filter & search values (optional)
 * @param {string | null} filter
 * @param {string | null} search
 */
function showAll(filter = "", search = "") {
  const allCountries = Model.getAll(filter, search);

  View.renderAllCountries(allCountries);
}

/**
 * Displays a single country upon changing the hash.
 * Displays all if its empty hash
 * @param {string | null} filter
 * @param {string | null} search
 */
function showCountry(filter, search) {
  const hash = document.location.hash.slice(1);
  if (!hash) return showAll(filter, search);

  const country = Model.getCountry(hash);
  View.renderResult(country);
  View.backHandler();
}

/**
 * Initializes all events handlers to the View class
 */
function init() {
  View.handlers(showCountry, Model.stateInit);
  View.renderFilteredValue(showAll);
  View.renderSearchedValue(showAll);
}

init();
