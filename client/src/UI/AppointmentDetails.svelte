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
        <p>{appointment.hospital.name}</p>
      </div>
  
      <div class="patient">
        <h3>Patient</h3>
        {#if appointment.patient}
          <p>{appointment.patient.name}</p>
        {:else} 
          <p>N/A</p>
        {/if}
      </div>
  
      {#if appointment.doctor}
      <div class="doctor">
        <h3>Doctor</h3>
        <p>{appointment.doctors.name}</p>
  
        {#if appointment.doctors.specialty}
         <p>Specialty: {appointment.doctor.specialty}</p>
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
        {:else if appointment.status === "scheduled"}
          <p>Scheduled</p>
        {:else if appointment.status === "canceled"} 
          <p>Canceled</p>
        {:else}
          <p>N/A</p>
        {/if}
      </div>
  
    </div>
  
  </div>
  
  
  <style>
  
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
  </style>