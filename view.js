class View {
  parentElement = document.querySelector(".crads-box");

  renderSearchedValue(callback) {
    const searchCountry = document.querySelector(".search-form");
    document.querySelector(".search-input").addEventListener("keyup", (e) => {
      e.preventDefault();
      const countryRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
      const val = document.querySelector(".search-input").value;
      console.log(val);
      if (countryRegex.test(val)) callback("", val);
      else if (!val) callback();
      else {
        document.querySelector(".search-input").value = "";
        document.querySelector(".search-input").placeholder =
          "Invalid Country Name";
      }
    });
  }
  renderFilteredValue(callback) {
    const selectedFilter = document.getElementById("filter");
    selectedFilter.addEventListener("change", (e) => {
      callback(e.target.value);
    });
  }
  renderAllCountries(countries) {
    document.querySelector(".search-result").classList.add("hidden");
    document.querySelector("main").classList.remove("hidden");
    this.parentElement.innerHTML = "";
    Array.from(countries).forEach((country) => {
      this.parentElement.innerHTML += this.generateAllMarkup(country);
    });
  }
  renderResult(country) {
    document.querySelector("main").classList.add("hidden");

    const resultContainer = document.querySelector(".search-result");
    resultContainer.classList.remove("hidden");
    resultContainer.innerHTML = "";
    resultContainer.innerHTML += this.generateResultMarkup(country);
  }
  backHandler() {
    document.querySelector(".back-container").addEventListener("click", (e) => {
      e.preventDefault();
      document.location.hash = "";
      main.classList.toggle("hidden");
      searchResult.classList.toggle("hidden");
    });
  }
  generateAllMarkup(country) {
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
  getNativeName(nativeName, cur = "") {
    const [_, obj] = Object.entries(nativeName)[0];
    if (cur === "cur") return obj.name;
    if (cur === "lang") return obj.split(",");
    return obj.common;
  }
  generateResultMarkup(country) {
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
            <p><span class="key">Native Name</span>: ${this.getNativeName(
              country.name.nativeName
            )}</p>
            <p><span class="key">Population</span>: ${country.population}</p>
            <p><span class="key">Region</span>: ${country.region}</p>
            <p><span class="key">Sub Region</span>: ${
              country.subregion ? country.subregion : "None"
            }</p>
            <p><span class="key">Capital</span>: ${country.capital}</p>
            <p><span class="key">Top Level Domain</span>: ${country.tld[0]}</p>
            <p><span class="key">Currencies</span>: ${this.getNativeName(
              country.currencies,
              "cur"
            )}</p>
            <p><span class="key">Languages</span>: ${this.getNativeName(
              country.languages,
              "lang"
            )}</p>
          </div>
          <div class="country-borders">
            <div class="key">Border Countries:</div>
            ${this.generateBorders(country.borders)}
          </div>
        </div>
      </div>
    `;
  }
  generateBorders(borders) {
    if (!borders) return `<div class="boxing">NONE</div>`;
    let html = ``;
    borders.forEach(
      (border) =>
        (html += ` <a href="#${border}"><div class="boxing">${border}</div></a>`)
    );
    return html;
  }
  handlers(event) {
    window.addEventListener("hashchange", event);
    window.addEventListener("load", event);
  }
}

export default new View();
