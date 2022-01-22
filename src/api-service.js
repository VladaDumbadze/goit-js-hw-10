

const BASE_URL = "https://restcountries.com/v3.1/";

function fetchCountries(name) {
    const url = `${BASE_URL}/name/${name}`;
    const FILTER = '?fields=name,capital,population,flags,languages';
    return fetch(`${url}${FILTER}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  
};

export default { fetchCountries };
