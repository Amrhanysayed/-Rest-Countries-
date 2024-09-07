export const state = {};

/**
 * Initial function to store all countries in the state object
 */
export async function stateInit() {
  state.countries = await getJSON(`https://restcountries.com/v3.1/all`);
}

/**
 * Helper fetching function
 * @param {URL} url
 * @returns {Promise<object>}
 */
async function getJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Something went wrong");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * Returns all countries with the query properties if exist
 * @param {string | null} filter
 * @param {string | null} search
 * @returns {Array<object>}
 */
export function getAll(filter, search) {
  const data = state.countries;

  if ((!filter || filter === "All") && !search) {
    return data.filter((el) => el.name.common !== "Israel");
  } else if (filter && !search) {
    return data.filter(
      (el) => el.name.common !== "Israel" && el.continents[0] === filter
    );
  } else if (filter && search && filter !== "All") {
    return data.filter(
      (el) =>
        el.name.common !== "Israel" &&
        el.continents[0] === filter &&
        el.name.common.toLowerCase().startsWith(search.toLowerCase())
    );
  } else {
    return data.filter(
      (el) =>
        el.name.common !== "Israel" &&
        el.name.common.toLowerCase().startsWith(search.toLowerCase())
    );
  }
}

/**
 *
 * @param {number} code
 * @returns {object}
 */
export function getCountry(code) {
  if (!Number.isNaN(+code)) {
    return state.countries.find((el) => el.ccn3 == code);
  }
  return state.countries.find((el) => el.cca3 == code);
  // return await getJSON(`https://restcountries.com/v3.1/alpha/${code}`);
}
