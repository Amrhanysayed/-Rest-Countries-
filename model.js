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
export async function getAll(filter, search) {
  const data = await getJSON(`https://restcountries.com/v3.1/all`);
  console.log(data);
  if (!filter && !search)
    return data.filter((el) => el.name.common !== "Israel");
  //
  else if (filter && !search)
    return data.filter(
      (el) => el.name.common !== "Israel" && el.continents[0] === filter
    );
  else {
    return data.filter(
      (el) =>
        el.name.common !== "Israel" &&
        el.name.common.toLowerCase().startsWith(search.toLowerCase())
    );
  }
}

export async function getCountry(ccn3) {
  const country = await getJSON(`https://restcountries.com/v3.1/alpha/${ccn3}`);
  return country[0];
}
