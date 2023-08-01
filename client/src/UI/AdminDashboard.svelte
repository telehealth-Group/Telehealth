<!-- HospitalDashboard.svelte -->
<script>
  export let data;
  import { createEventDispatcher } from "svelte";
  import AppointmentDetailsModal from "./AppointmentDetails.svelte";

  const dispatch = createEventDispatcher();

  function closeDetails() {
    dispatch("closeDetails");
  }

  let hospital = data.user;
  let totalDoctors = 0;
  let totalAppointments = 0;
  let appointmentList = [];

  // Calculate total doctors and appointments
  if (hospital.doctors && hospital.doctors.length > 0) {
    totalDoctors = hospital.doctors.length;
  }

  if (hospital.appointments && hospital.appointments.length > 0) {
    totalAppointments = hospital.appointments.length;
    appointmentList = hospital.appointments;
  }

  let showAppointmentDetails;

  function viewAppointmentDetails(appointment) {
    showAppointmentDetails = appointment;
  }

  // Function to close the appointment details view
  function closeAppointmentDetails() {
    showAppointmentDetails = null;
  }
</script>

<main>
  <h1>{hospital.name} Dashboard</h1>

  <section class="grid-section">
    <div class="grid-item">
      <h2>Total Doctors</h2>
      <p>{totalDoctors}</p>
    </div>
    <div class="grid-item">
      <h2>Total Appointments</h2>
      <p>{totalAppointments}</p>
    </div>
  </section>

  <section class="appointment-section">
    <h2>Appointments</h2>
    {#each hospital.appointments as appointment}
      <div class="appointment-card">
        <div class="card-header">
          <h3>Date & Time</h3>
          <p>{new Date(appointment.dateTime).toLocaleString()}</p>
        </div>

        <div class="card-body">
          <div class="appointment-info">
            <h3>Patient</h3>
            <p>{appointment.patient ? appointment.patient.name : 'N/A'}</p>
          </div>

          <div class="appointment-info">
            <h3>Doctor</h3>
            <p>{appointment.doctor ? appointment.doctor.name : 'N/A'}</p>
          </div>

          <div class="appointment-info">
            <h3>Hospital</h3>
            <p>{appointment.hospital ? appointment.hospital.name : 'N/A'}</p>
          </div>
        </div>

        <div class="card-actions">
          <button on:click={() => viewAppointmentDetails(appointment)}>View Details</button>
        </div>
      </div>
    {/each}
  </section>

  {#if showAppointmentDetails}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal-overlay" on:click={closeAppointmentDetails}>
      <AppointmentDetailsModal appointment={showAppointmentDetails} role="admin" on:closeDetails={closeAppointmentDetails} />
    </div>
  {/if}

  <!-- Add other sections here with appropriate class names -->

</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    margin-bottom: 20px;
    font-size: 28px;
  }
  .grid-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 10px;
    background-color: #f5f5f5; /* Light gray background */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .grid-item {
    text-align: center;
    padding: 20px;
    border-radius: 5px;
    background-color: #ffffff; /* White background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #333; /* Dark gray text color */
  }

  .grid-item:nth-child(odd) {
    background-color: #7e7a7b; /* Pink background for odd grid items */
    color: #ffffff; /* White text color for odd grid items */
  }

  .grid-item:nth-child(even) {
    background-color:  #7e7a7b; /* Blue background for even grid items */
    color: #ffffff; /* White text color for even grid items */
  }

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin: 0;
  }

  .grid-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }

  .grid-item {
    border: 1px solid #ccc;
    padding: 20px;
    text-align: center;
  }

  .grid-item h2 {
    margin-bottom: 10px;
  }

  .appointment-section {
    margin-bottom: 30px;
  }

  .appointment-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .card-header {
    background: #494b4c;
    color: #fff;
    padding: 10px;
  }

  .card-header h3 {
    font-size: 16px;
    margin: 0;
    text-transform: uppercase;
  }

  .card-header p {
    font-size: 14px;
    margin: 0;
  }

  .card-body {
    padding: 15px;
  }

  .appointment-info {
    margin-bottom: 15px;
  }

  .appointment-info h3 {
    font-size: 14px;
    margin: 0;
    text-transform: uppercase;
    color: #555;
  }

  .appointment-info p {
    font-size: 16px;
    margin: 0;
  }

  .card-actions {
    padding: 10px;
    text-align: right;
    background: #f2f2f2;
  }

  .card-actions button {
    background: #66696a;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .card-actions button:hover {
    background: #2980b9;
  }

  .card-actions button:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffa69e;
  }
</style>
