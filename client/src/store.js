// store.js
import axios from 'axios';
import { writable } from 'svelte/store';


export const hospitals = writable([]);
export const patients = writable([]);
export const appointments = writable([]);

// Function to fetch data and update the store
const fetchDataAndSetStore = async (url, store) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    store.set(data);
  } catch (error) {
    console.error(error);
  }
};

// Fetch hospitals data and update the hospitals store
fetchDataAndSetStore('http://127.0.0.1:3000/api/users/hospital', hospitals);

// Fetch patients data and update the patients store
fetchDataAndSetStore('http://127.0.0.1:3000/api/users/patients', patients);

// Fetch appointments data and update the appointments store
fetchDataAndSetStore('http://127.0.0.1:3000/api/users/appointments', appointments);
