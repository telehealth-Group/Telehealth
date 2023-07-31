<!-- Appointments.svelte -->
<script>
  // @ts-nocheck
  import { appointments } from "../store.js";
  import { hospitals } from "../store.js"; // Import the hospitals store
  import { onDestroy } from "svelte";

  export let role 

  import AppointmentDetails from "./AppointmentDetails.svelte";
  import PatientDashboard from "./PatientDashboard.svelte"; // Import the PatientDashboard component

  let subscribedAppointments = [];
  let selectedAppointment = null;
  let isCreatingAppointment = false; // Add a flag to track if we are creating a new appointment

  // Subscribe to the appointments store
  const unsubscribe = appointments.subscribe((value) => {
    console.log(value.data);
    subscribedAppointments = value.data.appointments;
  });

  // Unsubscribe from the store when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });

  // Function to display appointment details
  function showAppointmentDetails(appointment) {
    selectedAppointment = appointment;
  }

  // Function to close appointment details
  function closeDetails() {
    selectedAppointment = null;
  }

  // Function to open the CreateAppointment component
  function openCreateAppointment() {
    isCreatingAppointment = true;
  }
  // Function to close the CreateAppointment component
  function closeCreateAppointment() {
    isCreatingAppointment = false;
  }
</script>

<main class="appointments">
  <h1 class="title">Appointments</h1>

  <!-- Button to create a new appointment -->
  {#if !isCreatingAppointment}
    <button class="new-appointment-button" on:click={() => openCreateAppointment()}>New Appointment</button>
  {:else}
    <!-- Render the CreateAppointment component when isCreatingAppointment is true -->
    <PatientDashboard on:closeCreateAppointment={() => closeCreateAppointment()} />
  {/if}

  {#if !selectedAppointment && !isCreatingAppointment}
    {#if subscribedAppointments.length > 0}
      <table class="appointments-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Hospital</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each subscribedAppointments as appointment}
            <tr class="appointment-row" on:click={() => showAppointmentDetails(appointment)}>
              <td>{new Date(appointment.dateTime).toLocaleString()}</td>
              <!-- Add a conditional check before accessing the 'name' property -->
              <td>{#if appointment.hospital}{appointment.hospital.name}{/if}</td>
              <td>
                <button class="view-button">
                  <i class="fas fa-eye"></i> View Details
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="no-appointments">No appointments found.</p>
    {/if}
  {/if}

  {#if selectedAppointment && !isCreatingAppointment}
    <!-- Render AppointmentDetails component with the selected appointment -->
    <AppointmentDetails {role}
      appointment={selectedAppointment}
      on:closeDetails={() => closeDetails()}
    />
  {/if}
</main>
<style>
  /* Overall page styles */
  /* Add your styles here */

  .appointments {
    max-width: 1100px;
    margin: 50px auto;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
  }

  /* Typography */

  .title {
    font-size: 24px;
    margin-bottom: 16px;
    text-align: center;
  }

  .no-appointments {
    text-align: center;
    font-style: italic;
    color: #777;
    margin-top: 20px;
  }

  /* Table */

  .appointments-table {
    width: 100%;
    border-collapse: collapse;
  }

  .appointments-table th,
  .appointments-table td {
    padding: 15px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  .appointments-table th {
    background: #f5f5f5;
  }

  .appointment-row:hover {
    background: #f9f9f9;
    cursor: pointer;
  }

  /* Buttons */

  .new-appointment-button {
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
    margin-bottom: 20px;
  }

  .new-appointment-button:hover {
    background-color: #45a049;
  }

  .new-appointment-button:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  .view-button {
    padding: 8px 12px;
    font-size: 14px;
    background-color: #60aec2;
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .view-button i {
    margin-right: 8px;
  }

  .view-button:hover {
    background-color: #e6ecee;
    color: black;
  }.appointments {
    max-width: 1100px;
    margin: 50px auto;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
  }

  /* Typography */

  .title {
    font-size: 24px;
    margin-bottom: 16px;
    text-align: center;
  }

  .no-appointments {
    text-align: center;
    font-style: italic;
    color: #777;
    margin-top: 20px;
  }

  /* Table */

  .appointments-table {
    width: 100%;
    border-collapse: collapse;
  }

  .appointments-table th,
  .appointments-table td {
    padding: 15px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  .appointments-table th {
    background: #f5f5f5;
  }

  .appointment-row:hover {
    background: #f9f9f9;
    cursor: pointer;
  }

  /* Buttons */

  .new-appointment-button {
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
    margin-bottom: 20px;
  }

  .new-appointment-button:hover {
    background-color: #45a049;
  }

  .new-appointment-button:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  .view-button {
    padding: 8px 12px;
    font-size: 14px;
    background-color: #60aec2;
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .view-button i {
    margin-right: 8px;
  }

  .view-button:hover {
    background-color: #e6ecee;
    color: black;
  }
</style>
