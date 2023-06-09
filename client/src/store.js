// Import the required dependencies
import { writable } from 'svelte/store';
import axios from 'axios';

// Create writable stores for hospitals, patients, and doctors
export const hospitals = writable([]);
export const patients = writable([]);
export const doctors = writable([]);

// Function to fetch data and update the store
const fetchDataAndSetStore = async (url, store) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    store.set(data);
  } catch (error) {
    console.error(error);
  }
};

// Fetch hospitals data and update the hospitals store
fetchDataAndSetStore('http://127.0.0.1:3000/api/hospital', hospitals);

// Fetch patients data and update the patients store
fetchDataAndSetStore('http://127.0.0.1:3000/api/patients', patients);

// Fetch doctors data and update the doctors store
fetchDataAndSetStore('http://127.0.0.1:3000/api/doctors', doctors);
