<!-- CreateAppointment.svelte -->
<script>
    // @ts-nocheck
    import { hospitals } from "../store.js";
    import CreateAppointment from "./CreateAppointment.svelte"
    import { onDestroy } from "svelte";
  
    let subscribedHospitals = [];
    const unsubscribeHospitals = hospitals.subscribe((value) => {
      subscribedHospitals = value.data.hospitals;
    });
  
    // Unsubscribe from the hospitals store when the component is destroyed
    onDestroy(() => {
      unsubscribeHospitals();
    });
  
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher();
  
    let selectedHospital = subscribedHospitals[0]; // Set the default selected hospital
    let selectedDateTime = null;
  
    // Function to close the create appointment form
    function closeForm() {
      // Emit a custom event to notify the parent component
      dispatch("closeCreateAppointment");
    }
  
    // Function to handle date selection
    function selectDate(date) {
      selectedDateTime = date;
    }
  
    // Function to create a new appointment (example only, adjust as needed)
    function createNewAppointment() {
      if (selectedDateTime && selectedHospital) {
        const newAppointment = {
          dateTime: selectedDateTime,
          hospital: selectedHospital,
          // Add more appointment details as needed
        };
  
        // Add the new appointment to the store (example only, adjust based on your actual implementation)
        // appointments.update((value) => {
        //   return { ...value, data: { ...value.data, appointments: [...value.data.appointments, newAppointment] } };
        // });
  
        // Show the details of the newly created appointment (optional)
        // showAppointmentDetails(newAppointment);
  
        // Close the form after creating the appointment
        closeForm();
      } else {
        alert("Please select both a date and a hospital before creating the appointment.");
      }
    }
  </script>
  
  <main class="create-appointment">
    <h2>Create Appointment</h2>
  
    <!-- Hospital dropdown -->
    <div class="hospital-dropdown">
      <label for="hospital">Select Hospital:</label>
      <select id="hospital" bind:value={selectedHospital}>
        {#each subscribedHospitals as hospital}
          <option value={hospital}>{hospital.name}</option>
        {/each}
      </select>
    </div>
    <!-- Date grid -->
    <div class="date-grid">
      {#each $dates as date}
        <button
          class="date-button {#if selectedDateTime === date}selected{/if}"
          on:click={() => selectDate(date)}
          disabled={!date.available}
        >
          {new Date(date.dateTime).toLocaleString()}
        </button>
      {/each}
    </div>
  
    <!-- Close button to cancel creating the appointment -->
    <button class="close-button" on:click={closeForm}>Cancel</button>
  
    <!-- Button to create a new appointment -->
    <button class="create-button" on:click={createNewAppointment}>Create Appointment</button>
  </main>
  
<style>
  /* Add your styles for the CreateAppointment component here */

  .date-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    margin: 20px 0;
  }

  .date-grid button {
    padding: 10px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #f5f5f5;
    color: #333;
  }

  .date-grid button:hover {
    background-color: #e6ecee;
  }

  .date-grid button:active {
    background-color: #60aec2;
    color: #fff;
  }

  .date-grid button.activeDate {
    background-color: #274247;
    color: #fff;
  }

  .date-grid button.activeDate:hover {
    background-color: #45a049;
  }

  /* Form styles */

  label {
    display: block;
    margin-top: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  /* Buttons */

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    margin-left: 10px;
  }

  button[type="submit"] {
    background-color: #274247;
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
  }

  button[type="submit"]:hover {
    background-color: #45a049;
  }

  button[type="submit"]:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  button[type="button"] {
    background-color: #ccc;
    color: #333;
  }

  button[type="button"]:hover {
    background-color: #e6ecee;
  }

  .create-appointment {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    max-width: 600px;
    text-align: center;
    margin: 0; /* Remove margin */
  }

  .create-appointment h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }

  /* Hospital dropdown */
  .hospital-dropdown {
    margin-bottom: 20px;
  }

  .hospital-dropdown label {
    display: block;
    margin-bottom: 5px;
  }

  .hospital-dropdown select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border-radius: 5px;
  }

  /* Date grid */
  .date-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    margin-bottom: 20px;
  }

  .date-button {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 5px;
    width: 100%;
    font-size: 14px;
    cursor: pointer;
  }

  .date-button:hover {
    background-color: #eee;
  }

  .date-button.selected {
    background-color: #6C5CE7;
    color: white;
  }

  .date-button[disabled] {
    background-color: #f7f7f7;
    color: #aaa;
    cursor: not-allowed;
  }

  /* Buttons */
  .close-button,
  .create-button {
    background-color: #274247;
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    outline: none;
  }

  .close-button {
    margin-right: 10px;
  }

  .close-button:hover,
  .create-button:hover {
    background-color: #45a049;
  }

  .close-button:focus,
  .create-button:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
</style>
