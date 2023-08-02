<script>
// @ts-nocheck
import axios from "axios";
 export let user;
const doctor = user.user;
let isCanceling = false;
 function moveCompletedAppointment(appointment) {
    doctor.DoctorAppointments = doctor.DoctorAppointments.filter((appt) => appt._id !== appointment._id);
    doctor.DoctorAppointments.push(appointment);
  }
async function completAppointment(appointment) {
    try {
      isCanceling = true;
      const response = await axios.patch(`http://127.0.0.1:3000/api/users/completeAppointment/${appointment._id}`);
      if (response.status === 204) {
        console.log(response)
        appointment.status = "completed";
        moveCompletedAppointment(appointment); 
        isCanceling = false;
      } else {
        throw new Error("Failed to complete appointment.");
      }
    } catch (error) {
      console.error(error);
      isCanceling = false;
    }
  }
</script>


<div class="container">
  <p style="margin: 20px; width: 20%; margin: auto; text-align: center; margin-bottom: 10px; border: 2px solid blue; border-radius: 10px; font-weight: bold; padding: 20px;">UPCOMING APPOINTMENTS</p>
  
  <div class="upcoming-appointments">
    {#each doctor.DoctorAppointments.filter(appointment => appointment.status === "upcoming") as appointment}
      <div class="appointment-card">
        <div class="appointment-details">
          {#if appointment.patient}
            <p class="patient-name">{appointment.patient.name}</p>
          {:else}
            <p class="patient-name">N/A</p>
          {/if}
          <p class="appointment-time">
            <i class="far fa-clock"></i> {appointment.dateTime}
          </p>
          <p class="appointment-date">
            <i class="far fa-calendar"></i> {appointment.dateTime}
          </p>
          <p class="diagnosis">
            <i class="fas fa-notes-medical"></i> Diagnosis: {appointment.patient?.medicalhistory?.diagnosticTestsResults || 'N/A'}
          </p>
        </div>
        <button class="complete-button" on:click="{() => completAppointment(appointment)}">Mark as Completed</button>
      </div>
    {/each}
  </div>
</div>

<div class="appointment-section">
  <!-- Completed Appointments -->
  <h3>Completed Appointments</h3>
  <div class="appointment-grid">
    {#each doctor.DoctorAppointments.filter(appointment => appointment.status === "completed") as appointment}
      <div class="appointment-card">
        <div class="appointment-details">
          {#if appointment.patient}
            <p class="patient-name">{appointment.patient.name}</p>
          {:else}
            <p class="patient-name">N/A</p>
          {/if}
          <p class="appointment-time">
            <i class="far fa-clock"></i> {appointment.dateTime}
          </p>
          <p class="appointment-date">
            <i class="far fa-calendar"></i> {appointment.dateTime}
          </p>
          <p class="diagnosis">
            <i class="fas fa-notes-medical"></i> Diagnosis: {appointment.diagnosis || 'N/A'}
          </p>
          <p class="medication">
            <i class="fas fa-prescription"></i> Medication: {appointment.medication || 'N/A'}
          </p>
        </div>
        <button class="view-details-button">View Details</button>
      </div>
    {/each}
  </div>
</div>



<style>
  /* Add your custom styles here */

  .container {
    width: 100%;
    margin: 0 auto;
    padding: 0;
  }

  .appointment-card {
    background-color: #f8f8f8;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    /* Set the width of each appointment card */
    width: 100%;
    align-items: center;
  }

  .appointment-details {
    flex: 1;
    margin-bottom: 10px;
  }

  .patient-name {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .appointment-time,
  .appointment-date,
  .diagnosis,
  .medication {
    font-size: 14px;
    margin-bottom: 5px;
  }

  /* Styles for the buttons */
  .complete-button,
  .view-details-button {
    background-color: #2c6a97;
    color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Center the "Mark as Completed" button */
  .complete-button {
    margin-left: auto;
    display: block;
  }

  /* Styles for the Completed Appointments section */
  .appointment-section {
    margin-bottom: 20px;
  }

  /* Styles for the grid layout */
  .appointment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-gap: 20px;
  }

  /* Styles for the h3 heading */
  .appointment-section h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  /* Add a media query to change the grid layout for smaller screens */
  @media (max-width: 768px) {
    .appointment-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    /* Adjust the number of columns in the upcoming-appointments grid for smaller screens */
    .upcoming-appointments {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }

  /* Additional styles for the upcoming appointments */
  .upcoming-appointments {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-gap: 20px;
  }

  /* Custom colors and icons */
  .complete-button {
    background-color: #002750;
  }

  .complete-button svg {
    margin-right: 5px;
  }

  .view-details-button {
    background-color: #002750;
  }

  .view-details-button svg {
    margin-right: 5px;
  }

  /* Styles for the diagnosis icon */
  .diagnosis i {
    margin-right: 5px;
    color: #ffc107;
  }

  /* Styles for the medication icon */
  .medication i {
    margin-right: 5px;
    color: #dc3545;
  }

  /* Styles for the calendar icon */
  .appointment-date i {
    margin-right: 5px;
    color: #007bff;
  }

  /* Styles for the clock icon */
  .appointment-time i {
    margin-right: 5px;
    color: #17a2b8;
  }
  /* Overall container */
.container {
  /* max-width: 1200px;  */
  margin: 0 auto;
  padding: 20px;
}

/* Appointment cards */
.appointment-card {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 30px 60px;
  margin-bottom: 20px;
}

/* Patient name */  
.patient-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Appointment details */
.appointment-detail {
  font-size: 14px;
  margin-bottom: 5px;  
}
.appointment-detail i {
  margin-right: 5px;
  color: #6c757d; /* icon color */
}

/* Action buttons */
.action-btn {
  background: #007bff;
  border: none;
  color: #fff;
  padding: 10px 15px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.action-btn:hover {
  background: #0062cc;
}

/* Upcoming appointments */
.upcoming-appointments .appointment-card {
  display: flex; 
  align-items: center;
}
.upcoming-appointments .action-btn {
  margin-left: auto;
}

/* Completed appointments grid */  
.completed-appointments {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

/* Section headers */
.section-header {
  font-size: 18px;
  margin-bottom: 10px;
}

/* Media queries */
@media (max-width: 600px) {
  .completed-appointments {
    grid-template-columns: 1fr;
  }
}
/* Card background */
.appointment-card {
  background: #f5f5f5; 
  box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
}
.appointment-card:hover {
  box-shadow: 2px 2px 20px rgba(0,0,0,0.2);
}

/* Action buttons */
.action-btn {
  background: #4285F4; /* Google blue */
  box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  transition: background 0.3s ease;  
}
.action-btn:hover {
  background: #185ABC; 
}

/* Icons */
.appointment-detail i {
  color: #4285F4;
  transition: transform 0.3s ease;  
}
.appointment-detail:hover i {
  transform: scale(1.2) rotate(10deg);
}

/* Add animation on completed cards */
.completed-appointments .appointment-card {
  animation: fadeIn 0.5s ease forwards;
}
.appointment-card {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: lightblue;
}

/* New hover effect */
.appointment-card:hover {
  background: lightblue;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2); 
  transform: translateY(-20px);
}

/* Action button */
.action-btn {
  background: #4285F4;
  transition: background 0.3s ease;
}

.action-btn:hover {
  background: #185ABC;
}

/* Icon */
.appointment-detail i { 
  transition: transform 0.3s ease;
}

.appointment-detail:hover i {
  transform: scale(1.2) rotate(-10deg);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
