const state = {};

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
export async function getAll() {
  const data = await getJSON(`https://restcountries.com/v3.1/all`);

  //
  // !!!! Removing Israel !!!!!
  //
  return data.filter((el) => el.name.common !== "Israel");
}

export async function getCountry(ccn3) {
  const country = await getJSON(`https://restcountries.com/v3.1/alpha/${ccn3}`);
  return country[0];
}
