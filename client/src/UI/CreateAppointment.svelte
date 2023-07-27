<!-- CreateAppointment.svelte -->
<script>
  // @ts-nocheck
  import { createEventDispatcher } from "svelte";
  import { hospitals } from "../store.js";
  import { onDestroy } from "svelte";


  let subscribedHospitals = [];
  const unsubscribeHospitals = hospitals.subscribe((value) => {
    subscribedHospitals = value.data.hospitals;
  });

  // Unsubscribe from the hospitals store when the component is destroyed
  onDestroy(() => {
    unsubscribeHospitals();
  });

  const dispatch = createEventDispatcher();

    let selectedHospital = subscribedHospitals[0]; // Set the default selected hospital


  export let hospital;
  // Function to close the CreateAppointment component
  function close() {
    dispatch("closeCreateAppointment");
  }

  // Function to handle form submission (example only, adjust as needed)
  function handleSubmit(event) {
    event.preventDefault();

    // Collect form data and create a new appointment object
    const formData = new FormData(event.target);
    const newAppointment = {
      dateTime: selectedDate, // Use the selectedDate as the appointment's date and time
      hospital: {
        name: formData.get("hospitalName"),
        // Add hospital details as needed
      },
      // Add more appointment details as needed
    };

    // Emit a custom event to notify the parent component about the new appointment
    dispatch("createAppointment", newAppointment);

    // Close the CreateAppointment component after creating the appointment
    close();
  }

  // Array of available dates (example only, adjust based on your actual implementation)
  const availableDates = [
    "2023-07-23T12:00:00",
    "2023-07-24T10:00:00",
    "2023-07-25T14:30:00",
    "2023-07-26T11:45:00",
    "2023-07-27T09:15:00",
    "2023-07-28T13:00:00",
    "2023-07-29T16:00:00",
    "2023-07-30T10:30:00",
    "2023-07-31T15:15:00",
    "2023-08-01T14:00:00",
    "2023-08-02T12:30:00",
    "2023-08-03T11:00:00",
    // Add more available dates here
  ];

  let selectedDate = null;

  // Function to select a date from the grid
  function selectDate(date) {
    selectedDate = date;
  }
</script>

<main class="create-appointment">
  <h2>Create Appointment</h2>

  <form on:submit={handleSubmit}>
    <div class="date-grid">
      {#each availableDates as date}
        <button
          class:activeDate={selectedDate === date}
          on:click={() => selectDate(date)}
        >
          {new Date(date).toLocaleString()}
        </button>
      {/each}
    </div>

    <label>
      Hospital Name:
      <input type="text" name="hospitalName" required />
    </label>

    <!-- Add more form fields for other appointment details as needed -->

    <div class="button-container">
      <button type="submit">Create</button>
      <button type="button" on:click={close}>Cancel</button>
    </div>
  </form>
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
</style>
