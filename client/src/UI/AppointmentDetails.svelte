<!-- AppointmentDetails.svelte -->
<script>
    // @ts-nocheck
    export let appointment;
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher()
    // Function to close the appointment details view
    function closeDetails() {
      // Emit a custom event to notify the parent component
      dispatch("closeDetails");
    }
  </script>
  
  <main class="appointment-details">
    <!-- Display the selected appointment's details -->
    <div class="appointment-details-content">
      <h2>Appointment Details</h2>
  
      <p><strong>Date & Time:</strong> {new Date(appointment.dateTime).toLocaleString()}</p>
  
      <p><strong>Hospital:</strong> {appointment.hospital.name}</p>
  
      {#if appointment.patient}
        <p><strong>Patient:</strong> {appointment.patient.name}</p>
        <!-- Add other patient details here as needed -->
      {:else}
        <p><strong>Patient:</strong> N/A</p>
      {/if}
  
      <!-- Add other appointment details here as needed -->
  
      <!-- Close button to go back to the appointments list -->
      <button class="close-button" on:click={closeDetails}>Close</button>
    </div>
  </main>
  
  <style>
    /* Overall page styles */
    /* Add your styles here */
  
    .appointment-details {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f7f7f7;
      font-family: 'Open Sans', sans-serif;
      color: #333;
    }
  
    .appointment-details-content {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      padding: 30px;
      max-width: 600px;
    }
  
    .appointment-details-content h2 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #333;
    }
  
    .appointment-details-content p {
      font-size: 16px;
      line-height: 1.5;
      margin: 5px 0;
    }
  
    .close-button {
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
      margin-top: 20px;
    }
  
    .close-button:hover {
      background-color: #45a049;
    }
  
    .close-button:focus {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
  </style>
  