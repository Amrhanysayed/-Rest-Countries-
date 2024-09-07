class View {
  // Setting some useful/needed HTML elements
  #parentElement = document.querySelector(".crads-box");
  #searchForm = document.querySelector(".search-form");
  #searchArea = document.querySelector(".search-input");
  #filterArea = document.getElementById("filter");
  #resultElement = document.querySelector(".search-result");
  #mainElement = document.querySelector("main");

  // Storing values to be restored upon pages navigation
  #loaded = false;
  #filterValue = "All";
  #searchValue = "";

  /**
   * Keeps scraping the search box and renders countries starting with the entered value
   * @param {function} callback
   */
  renderSearchedValue(callback) {
    this.#searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.#searchArea.addEventListener("keyup", (e) => {
      const countryRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/; // Regex to check for valid input (only chars)
      const val = this.#searchArea.value; // Stores the search value

      if (countryRegex.test(val))
        callback(this.#filterArea.value, val); // If valid input
      else if (!val) callback(this.#filterArea.value); // else, renders all
      else {
        this.#searchArea.value = "";
        this.#searchArea.placeholder = "Invalid Country Name";
      }
    });
  }

  /**
   * Renders countries with the filter value properties (continent)
   * @param {function} callback
   */
  renderFilteredValue(callback) {
    this.#filterArea.addEventListener("change", (e) => {
      if (e.target.value === "All") return callback();
      callback(e.target.value);
    });
  }

  /**
   * Renders all countries objects given
   * @param {Object[]} countries
   */
  renderAllCountries(countries) {
    this.#resultElement.classList.add("hidden");
    this.#mainElement.classList.remove("hidden");
    this.#parentElement.innerHTML = "";
    let markup = "";
    Array.from(countries).forEach((country) => {
      markup += this.#generateAllMarkup(country);
    });

    this.#parentElement.insertAdjacentHTML("beforeend", markup);
  }

  /**
   *
   * @param {object} country
   */
  renderResult(country) {
    this.#filterValue = this.#filterArea.value;
    this.#searchValue = this.#searchArea.value;

    this.#mainElement.classList.add("hidden");
    this.#resultElement.classList.remove("hidden");

    const markup = this.#generateResultMarkup(country);

    this.#resultElement.innerHTML = "";
    this.#resultElement.insertAdjacentHTML("beforeend", markup);
  }

  /**
   * Resets the hash value upon clicking on the back button
   * Restores the main page with the previous search & filter values
   */
  backHandler() {
    document.querySelector(".back-container").addEventListener("click", (e) => {
      this.#filterArea.value = this.#filterValue;
      document.location.hash = "";
      this.#resultElement.innerHTML = "";
      this.#mainElement.classList.toggle("hidden");
      this.#resultElement.classList.toggle("hidden");
    });
  }

  /**
   *
   * @param {object} country
   * @returns {markup}
   */
  #generateAllMarkup(country) {
    return `
    <a href="#${country.ccn3}">
    <div class="card">
              <img
                src="${country.flags.png}"
                alt=""
                height="150px"
              />
              <div class="card-text">
                <div class="card-title">
                  <h3>${country.name.common}</h3>
                </div>
                <p><span>Population:</span> ${country.population}</p>
                <p><span>Region:</span> ${country.region}</p>
                <p><span>Capital:</span> ${country.capital}</p>
              </div>
            </div>
          </a>
            `;
  }

  /**
   * Returns the country native name or its currency(ies)
   * @param {string} nativeName
   * @param {string | Array<string>} cur
   * @returns {Array<string> | string}
   */
  #getNativeName(nativeName, cur = "") {
    const [_, obj] = Object.entries(nativeName)[0];
    if (cur === "cur") return obj.name;
    if (cur === "lang") return obj.split(",");
    return obj.common;
  }

  /**
   * Generates country result markup
   * @param {object} country
   * @returns {markup}
   */
  #generateResultMarkup(country) {
    return `
        <div class="back-container">
        <button>Back</button>
        <i class="bx bx-left-arrow-alt"></i>
      </div>
      <div class="main-flex-container">
        <div class="image-container">
          <img
            src="${country.flags.png}"
            height="300px"
          />
        </div>
        <div class="details-container">
          <h1>${country.name.common}</h1>
          <div class="country-details--grid">
            <p><span class="key">Native Name</span>: ${this.#getNativeName(
              country.name.nativeName
            )}</p>
            <p><span class="key">Population</span>: ${country.population}</p>
            <p><span class="key">Region</span>: ${country.region}</p>
            <p><span class="key">Sub Region</span>: ${
              country.subregion ? country.subregion : "None"
            }</p>
            <p><span class="key">Capital</span>: ${country.capital}</p>
            <p><span class="key">Top Level Domain</span>: ${country.tld[0]}</p>
            <p><span class="key">Currencies</span>: ${this.#getNativeName(
              country.currencies,
              "cur"
            )}</p>
            <p><span class="key">Languages</span>: ${this.#getNativeName(
              country.languages,
              "lang"
            )}</p>
          </div>
          <div class="country-borders">
            <div class="key">Border Countries:</div>
            ${this.#generateBorders(country.borders)}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Generates borders boxes markup
   * @param {Array<object> | null} borders
   * @returns {markup}
   */
  #generateBorders(borders) {
    if (!borders) return `<div class="boxing">NONE</div>`;
    let html = ``;
    borders.forEach(
      (border) =>
        (html += ` <a href="#${border}"><div class="boxing">${border}</div></a>`)
    );
    return html;
  }

  /**
   * Sets main event handlers
   * @param {function} callbackLoad
   * @param {function} callbackInit
   */
  handlers(callbackLoad, callbackInit) {
    window.addEventListener("hashchange", () => {
      callbackLoad(this.#filterValue, this.#searchValue);
    });

    window.addEventListener("load", async () => {
      if (!this.#loaded) {
        await callbackInit();
        this.#loaded = true;
      }
      callbackLoad();
    });
  }
}

export default new View();
