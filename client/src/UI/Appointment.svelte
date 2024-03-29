<script>
  // @ts-nocheck
  import { onDestroy, onMount } from "svelte";

  export let role;
  export let user;

  import AppointmentDetails from "./AppointmentDetails.svelte";

  let selectedAppointment = null;
  let isCreatingAppointment = false;

  onDestroy(() => {
    // You don't need to unsubscribe as there's no store anymore
  });

  function showAppointmentDetails(appointment) {
    selectedAppointment = appointment;
  }
  // console.log(user.user.PatientAppointments);
  function closeDetails() {
    selectedAppointment = null;
  }
  
  function formatDateAndTime(dateTime) {
    return new Date(dateTime).toLocaleString();
  }

  function logAppointments() {
    console.log("User Details:", user.user.appointments);
    if (user && user.user.PaitentAppointments && user.user.PaitentAppointments.length > 0) {
      console.log("User's Appointments:");
      for (const appointment of user.user.PaitentAppointments) {
        console.log("Confirmation:", appointment.confirmation);
        console.log("Date & Time:", formatDateAndTime(appointment.dateTime));
        console.log("Doctor Name:", appointment.doctor?.name || "N/A");
        console.log("Hospital Name:", appointment.hospital?.name || "N/A");
        console.log("Patient Name:", appointment.patient?.name || "N/A");
        console.log("Status:", appointment.status);
        console.log("-------");
      }
    } else {
      console.log("No appointments found.");
    }
  }

  // Call the logAppointments() function
  $:{
    logAppointments();
  }

  // Reactive declaration for the filtered appointments based on the user role
  function filterAppointments() {
    filteredAppointments = role === "admin"
      ? user?.user.appointments?.filter((appointment) => appointment.hospital?.active)
      : role === "doctor"
      ? user?.user.DoctorAppointments?.filter((appointment) => appointment.hospital?.active)
      : role === "patient"
      ? user?.user.PaitentAppointments?.filter((appointment) => appointment.hospital?.active)
      : [];
  }

  // Call the filterAppointments() function when the component is mounted
  onMount(() => {
    filterAppointments();
  });
</script>

<main class="appointments">
  <h1 class="title">Appointments</h1>

  {#if role === 'admin'}
    <!-- Admin appointments table -->
    {#if user && user.user.appointments && user.user.appointments.length > 0 && !selectedAppointment}
      <table class="appointments-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Hospital</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each user.user.appointments as appointment}
            <tr class="appointment-row" on:click={() => showAppointmentDetails(appointment)}>
              <td>{formatDateAndTime(appointment.dateTime)}</td>
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
    {:else if selectedAppointment}
      <!-- Hide the table when appointment details are showing -->
    {:else}
      <p class="no-appointments">No appointments found.</p>
    {/if}
  {:else if role === 'patient'}
    <!-- Doctor appointments table -->
    {#if user && user.user.PaitentAppointments && user.user.PaitentAppointments.length > 0 && !selectedAppointment}
      <table class="appointments-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Hospital</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each user.user.PaitentAppointments as appointment}
            <tr class="appointment-row" on:click={() => showAppointmentDetails(appointment)}>
              <td>{formatDateAndTime(appointment.dateTime)}</td>
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
    {:else if selectedAppointment}
      <!-- Hide the table when appointment details are showing -->
    {:else}
      <p class="no-appointments">No appointments found.</p>
    {/if}
    {:else if role === 'doctor'}
    <!-- Doctor appointments table -->
    {#if user && user.user.DoctorAppointments && user.user.DoctorAppointments.length > 0 && !selectedAppointment}
      <table class="appointments-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Hospital</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each user.user.DoctorAppointments as appointment}
            <tr class="appointment-row" on:click={() => showAppointmentDetails(appointment)}>
              <td>{formatDateAndTime(appointment.dateTime)}</td>
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
    {:else if selectedAppointment}
      <!-- Hide the table when appointment details are showing -->
    {:else}
      <p class="no-appointments">No appointments found.</p>
    {/if}
  {/if}

  {#if selectedAppointment && !isCreatingAppointment}
    <AppointmentDetails {role} appointment={selectedAppointment} on:closeDetails={() => closeDetails()} />
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
  }

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
  }
</style>