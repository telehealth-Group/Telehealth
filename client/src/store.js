import { writable } from "svelte/store";

export const hospitals = writable([]);
export const appointments = writable([]);
export const patients = writable([]);

export async function fetchData(url, type) {
  try {
    const response = await fetch(url);
    const { data } = await response.json();

    // Update the correct store based on the provided type
    if (type === "hospitals") {
      hospitals.update((currentItems) => [...currentItems, ...data]);
    } else if (type === "appointments") {
      appointments.update((currentItems) => [...currentItems, ...data]);
    } else if (type === "patients") {
      patients.update((currentItems) => [...currentItems, ...data]);
    }
  } catch (error) {
    console.error(error);
  }
}

fetchData("http://127.0.0.1:3000/api/users/hospital/", hospitals);
fetchData("http://127.0.0.1:3000/api/users/appointment/", hospitals);
fetchData("http://127.0.0.1:3000/api/users/paitent/", appointments);