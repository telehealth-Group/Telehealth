<!-- AppointmentDetails.svelte -->
<script>
  // @ts-nocheck
  export let appointment;
  import { createEventDispatcher } from "svelte";
  import axios from "axios"; // Import Axios library

  const dispatch = createEventDispatcher();

  export let role;
  let isUpdating = false;
  let isCanceling = false;
  let updatedStatus = appointment.status;

  // Function to close the appointment details view
  function closeDetails() {
    // Emit a custom event to notify the parent component
    dispatch("closeDetails");
  }

  // Function to handle the appointment update
  async function updateAppointment() {
    try {
      isUpdating = true;
      const response = await axios.patch(`http://127.0.0.1:3000/api/users/updateAppointment/${appointment._id}`, {
        status: updatedStatus,
      });
      if (response.status === 200) {
        appointment.status = updatedStatus;
        isUpdating = false;
      } else {
        throw new Error("Failed to update appointment.");
      }
    } catch (error) {
      console.error(error);
      isUpdating = false;
    }
  }

  // Function to handle the appointment cancellation
  async function cancelAppointment() {
    try {
      isCanceling = true;
      const response = await axios.patch(`http://127.0.0.1:3000/api/users/cancelAppointment/${appointment._id}`);
      if (response.status === 204) {
        appointment.status = "canceled";
        isCanceling = false;
      } else {
        throw new Error("Failed to cancel appointment.");
      }
    } catch (error) {
      console.error(error);
      isCanceling = false;
    }
  }
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
      {#if isUpdating || isCanceling}
        <p>Updating...</p>
      {:else}
        {#if appointment.status === "upcoming"}
          <p>Upcoming</p>
          {#if role === 'patient' || role === "doctor"}
          <button on:click={cancelAppointment}>Cancel Appointment</button>
          {/if}
        {:else}
          <p>Canceled</p>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  .medical-history {
    background: #f0f8ff;
    padding: 20px;
    border-radius: 5px;
  }
  .appointment-details {
    /* max-width: 600px; */
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .date,
  .hospital,
  .patient,
  .doctor,
  .description,
  .status {
    background: #f2f2f2;
    padding: 10px;
    border-radius: 5px;
  }

  .close {
    background: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .close:hover {
    background: #c0392b;
  }

  .close:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffa69e;
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
    background: #274247;
    color: #fff;
    padding: 20px;
  }

  .header h1 {
    margin: 0;
  }

  /* Section styles */

  .date,
  .hospital,
  .patient,
  .doctor,
  .description,
  .status {
    padding: 20px;
    margin-bottom: 20px;
  }

  .date {
    background: #ffd699;
  }

  .hospital {
    background: #c2f8ff;
  }

  .patient {
    background: #fff2cc;
  }

  .doctor {
    background: #d1e8f4;
  }

  .description {
    background: #f0f8ff;
  }

  .status {
    background: #d6f5d6;
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

  /* Cancel Button Style */
  button {
    background: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s ease;
    margin-top: 10px;
  }

  button:hover {
    background: #c0392b;
  }

  button:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffa69e;
  }
</style>
