<!-- appointments.svelte -->
<script>
  // @ts-nocheck
  import { appointments } from "../store.js";
  import { onDestroy } from "svelte";
  

  let subscribedAppointments = [];
  let selectedAppointment = null;

  // Subscribe to the appointments store
  const unsubscribe = appointments.subscribe((value) => {
    subscribedAppointments = value.data.appointments;
  });

  // Unsubscribe from the store when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });

  // Function to display appointment details in the modal
  function showAppointmentDetails(appointment) {
    selectedAppointment = appointment;
  }

  // Function to close the modal
  function closeModal() {
    selectedAppointment = null;
  }
</script>

<main class="appointments">

  <h1>Appointments Dashboard</h1>

  {#if subscribedAppointments.length > 0}

    <table class="appointments-table">
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Hospital</th>
        </tr>  
      </thead>

      <tbody>
        {#each subscribedAppointments as appointment}
          <tr class="appointment-row" on:click={() => showAppointmentDetails(appointment)}>
            <td>{new Date(appointment.dateTime).toLocaleString()}</td>
            <td>{appointment.hospital.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>

  {:else}

    <p class="no-appointments">No appointments found.</p>
  
  {/if}

  {#if selectedAppointment}

    <div class="appointment-modal">
      <div class="modal-content">
        <div class="close" on:click={closeModal}>&#10005;</div>
        <h2>Appointment Details</h2>
        
        <p>Date & Time: {new Date(selectedAppointment.dateTime).toLocaleString()}</p>
        
        <p>Hospital: {selectedAppointment.hospital.name}</p>
        
        {#if selectedAppointment.patient}
          <p>Patient: {selectedAppointment.patient.name}</p>
        {:else}
          <p>Patient: N/A</p>  
        {/if}

      </div>
    </div>
  {/if}

</main>


<style>

  /* Layout */

  .appointments {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Typography */

  h1 {
    text-align: center;
    margin-bottom: 30px; 
  }

  .no-appointments {
    text-align: center;
    font-style: italic;
    color: #777;
  }

  /* Table */

  .appointments-table {
    width: 100%;
    border-collapse: collapse;
  }

  .appointments-table th,
  .appointments-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
  }

  .appointment-row:hover {
    background: #f5f5f5;
    cursor: pointer;
  }

  /* Modal */

  .appointment-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background: white;
    padding: 40px;
    border-radius: 5px;
    width: 500px;
    position: relative;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .modal-content h2 {
    margin-bottom: 15px;
  }

  .modal-content p {
    margin-bottom: 10px;
  }

</style>