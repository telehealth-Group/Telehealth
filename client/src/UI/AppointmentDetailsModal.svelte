<!-- AppointmentDetails.svelte -->
<script>
  // @ts-nocheck
  export let appointment;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  
  // Function to close the appointment details view
  function closeDetails() {
    // Emit a custom event to notify the parent component
    dispatch("closeDetails");
  }
  
  export let role;
</script>
<div class="appointment-details">
  <div class="header">
    <h1>Appointment Details</h1>
    <button class="close" on:click={closeDetails}>Close</button>
  </div>

  <div class="details">
    <div class="date">
      <h3>Date & Time</h3>
      <p>{new Date(appointment.dateTime).toLocaleString()}</p>
    </div>

    <div class="hospital">
      <h3>Hospital</h3>
      <p>{appointment.hospital ? appointment.hospital.name : 'N/A'}</p>
    </div>

    <div class="patient">
      <h3>Patient</h3>

      {#if appointment.patient}
        <p>{appointment.patient.name}</p>

        {#if role === "doctor" && appointment.patient.medicalHistory}
          <div class="medical-history">
            <h3>Medical History</h3>
            <p><strong>Family Medical History:</strong> {appointment.patient.medicalHistory.familyMedicalHistory}</p>
            <p><strong>Medications:</strong> {appointment.patient.medicalHistory.medications}</p>
            <p><strong>Immunizations:</strong> {appointment.patient.medicalHistory.immunizations}</p>
            <p><strong>Social History:</strong> {appointment.patient.medicalHistory.socialHistory}</p>
            <p><strong>Health Risk Factors:</strong> {appointment.patient.medicalHistory.healthRiskFactors}</p>
            <p><strong>Review of Systems:</strong> {appointment.patient.medicalHistory.reviewOfSystems}</p>
            <p><strong>Physical Examination Findings:</strong> {appointment.patient.medicalHistory.physicalExaminationFindings}</p>
            <p><strong>Diagnostic Test Results:</strong> {appointment.patient.medicalHistory.diagnosticTestsResults}</p>
            <p><strong>General Medical History:</strong> {appointment.patient.medicalHistory.generalMedicalHistory}</p>
          </div>
        {/if}
      {:else}
        <p>N/A</p>
      {/if}
    </div>

    {#if appointment.doctor}
      <div class="doctor">
        <h3>Doctor</h3>
        <p>{appointment.doctor.name}</p>

        {#if appointment.doctor.specialization}
          <p>Specialization: {appointment.doctor.specialization}</p>
        {/if}
      </div>
    {:else}
      <div class="doctor">
        <h3>Doctor</h3>
        <p>N/A</p>
      </div>
    {/if}

    {#if appointment.description}
      <div class="description">
        <h3>Description</h3>
        <p>{appointment.description}</p>
      </div>
    {/if}

    <div class="status">
      <h3>Status</h3>
      {#if appointment.status === "completed"}
        <p>Completed</p>
      {:else if appointment.status === "upcoming"}
        <p>Upcoming</p>
      {:else if appointment.status === "canceled"}
        <p>Canceled</p>
      {:else}
        <p>N/A</p>
      {/if}
    </div>
  </div>
</div>


<!-- AppointmentDetails.svelte -->
<!-- ... Your existing script and HTML code ... -->

<style>
  .medical-history {
    background: #f8f8f8; /* Light gray */
    padding: 20px;
    border-radius: 5px;
  }
  .appointment-details {
    width: 800px; 
    height: 400px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #355c7d; /* Dark blue */
    color: #fff;
    padding: 20px;
    border-radius: 10px 10px 0 0;
  }

  .details {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }


  .close {
    background: #e2dddd; /* Red */
    color: #1a1818;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .close:hover {
    background: #737070; /* Darker red */
  }

  .close:focus {
    outline: none;
    box-shadow: 0 0 0 2px #848080;
  }

  body {
    font-family: Arial, sans-serif;
    color: #333;
  }

  .appointment-details {
    border: 1px solid #ddd;
  }

  /* Header */

  .header {
    background: #274247; /* Darker blue */
    color: #fff;
    padding: 20px;
  }

  .header h1 {
    margin: 0;
  }

  /* Text */

  h3 {
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.8;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
  }
</style>
