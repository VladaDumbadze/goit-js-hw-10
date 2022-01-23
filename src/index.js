import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import API from './api-service';
import CTR from './countries-name-flags.hbs';
import CTRinf from './inf-countries.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
    coutries: document.querySelector(".country-list"),
    searchForm: document.getElementById("search-box"),
    info: document.querySelector('.country-info'),

};

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
  console.log(form)
    const search = refs.searchForm.value;
    API.fetchCountries(search.trim())
        .then(renderCounries)
        .catch(error => {
            console.log(error)
            Notiflix.Notify.failure("Oops, there is no country with that name")
        })
        // .finally(() => form.reset());
};

function renderCounries(name) {
    if (name.length > 15) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        return 
    }
    if (name.length > 2 && name.length < 10) {
        const list = CTR(name);
        refs.coutries.innerHTML = list;
       console.log(list);
    }
    if (name.length === 1) {
        console.log(name);
        const markup = CTRinf(name[0]);
        refs.info.innerHTML = markup;
        return
    }
    
   const markup = name.map(element => {return CTR(element);}).join('');
    
    refs.info.innerHTML = markup;
    
    console.log(name);
    console.log(markup);
    
    
};