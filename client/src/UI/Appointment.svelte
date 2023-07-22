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
            <td>{appointment.hospital.name}</td>
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

  {#if selectedAppointment}

    <div class="appointment-modal">
      <div class="modal-content">
        <div class="close" on:click={closeModal}>
          <i class="fas fa-times-circle"></i>
        </div>
        <h2>Appointment Details</h2>
        
        <p><strong>Date & Time:</strong> {new Date(selectedAppointment.dateTime).toLocaleString()}</p>
        
        <p><strong>Hospital:</strong> {selectedAppointment.hospital.name}</p>
        
        {#if selectedAppointment.patient}
          <p><strong>Patient:</strong> {selectedAppointment.patient.name}</p>
        {:else}
          <p><strong>Patient:</strong> N/A</p>  
        {/if}

      </div>
    </div>
  {/if}

</main>


<style>
  

  /* Layout */

  .appointments {
    /* max-width: 600px; */
    margin: 0 auto;
    padding: 20px;
    width: 100%;
  }

  /* Typography */

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
    text-align: center;
  }

  .appointments-table th {
    background-color: #f2f2f2;
    font-weight: bold;
    color: #555;
  }

  .appointment-row:hover {
    background: #b3cad1;
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
    font-size: 24px;
    cursor: pointer;
    color: #555;
  }

  .close:hover {
    color: #d52d2d;
  }

  .modal-content h2 {
    margin-bottom: 15px;
  }

  .modal-content p {
    margin-bottom: 10px;
  }

  /* Buttons */

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
