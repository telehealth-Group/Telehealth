<!-- PatientDetails.svelte
<script>
    // @ts-nocheck
    export let patient;
  
    // Function to close the patient details view
    function closeDetails() {
      patient = null;
    }
  </script>
  
  <main class="dashboard">
    {#if patient !== null}
      <!-- Display the selected patient's details -->
      <!-- <div class="patient-details">
        <div class="header">
          <h2>{patient.name}</h2>
          <button class="close-button" on:click={closeDetails}>
            <i class="fas fa-times"></i>
          </button>
        </div>
  
        <div class="patient-info">
          <div class="patient-item">
            <i class="fas fa-envelope"></i>
            <p>{patient.email}</p>
          </div>
          <div class="patient-item">
            <i class="fas fa-phone"></i>
            <p>{patient.phone || "N/A"}</p>
          </div>
          <div class="patient-item">
            <i class="fas fa-venus-mars"></i>
            <p>{patient.gender || "N/A"}</p>
          </div>
          <div class="patient-item">
            <i class="fas fa-birthday-cake"></i>
            <p>{patient.age || "N/A"}</p>
          </div>
        </div>
  
        <!-- Medical History -->
        <!-- <div class="medical-history">
          <h3>Medical History</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Family Medical History:</strong></td>
                <td>{patient.medicalHistory.familyMedicalHistory || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Medications:</strong></td>
                <td>{patient.medicalHistory.medications || "N/A"}</td>
              </tr> -->
              <!-- <tr>
                <td><strong>Immunizations:</strong></td>
                <td>{patient.medicalHistory.immunizations || "N/A"}</td>
              </tr>
              <!-- Add more medical history details here as needed -->
              <!-- <tr>
                <td><strong>Diagnoses:</strong></td>
                <td>{patient.medicalHistory.diagnoses || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Allergies:</strong></td>
                <td>{patient.medicalHistory.allergies || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Surgeries:</strong></td> -->
                <!-- <td>{patient.medicalHistory.surgeries || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Medical Conditions:</strong></td>
                <td>{patient.medicalHistory.medicalConditions || "N/A"}</td>
              </tr>
              <!-- Add more medical history details here as needed -->
            <!-- </tbody>
          </table> --> -->
        <!-- </div>
      </div> --> -->
    <!-- {/if}
  </main> --> -->
  
  <!-- <style> -->
    <!-- /* Overall page styles */
    /* Add your styles here */
  
    .dashboard {
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;
      min-height: 100vh;
      background-color: #f7f7f7;
      font-family: 'Open Sans', sans-serif;
      color: #333;
    }
  
    .patient-details {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      padding: 30px;
      max-width: 800px;
      width: 100%;
    }
  
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 20px;
    }
  
    .header h2 {
      font-size: 32px;
      font-weight: bold;
      color: #333;
    }
  
    .close-button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 24px;
      color: #999;
      transition: color 0.2s ease-in-out;
    }
  
    .close-button:hover {
      color: #333;
    }
  
    .patient-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
      margin-bottom: 20px;
      width: 100%;

    }
  
    .patient-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #333;
    }
  
    .patient-item i {
      margin-right: 10px;
    }
  
    .medical-history {
      margin-bottom: 20px;
    }
  
    .medical-history h3 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #333;
    }
  
    .medical-history table {
      width: 100%;
      border-collapse: collapse;
    }
  
    .medical-history td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
      color: #333;
    }
  
    .medical-history td:first-child {
      font-weight: bold;
    } -->
  <!-- </style> --> 



  <!-- Patient.svelte -->
<script>
    // @ts-nocheck
    import { patients } from "../store.js";
    import { onDestroy } from "svelte";
    import PatientDetails from "./PatientDetails.svelte";
  
    let subscribedPatients = [];
    let selectedPatient = null;
    let query = "";
  
    // Subscribe to the patients store
    const unsubscribe = patients.subscribe((value) => {
      subscribedPatients = value.data.users.filter(
        (user) => user.role === "patient"
      );
    });
  
    // Unsubscribe from the store when the component is destroyed
    onDestroy(() => {
      unsubscribe();
    });
  
    // Function to display patient details below the patient list
    function showPatientDetails(patient) {
      selectedPatient = patient;
    }
  
    // Function to close the patient details view
    function closeDetails() {
      selectedPatient = null;
    }
  </script>
  
  <main class="dashboard">
    <input type="text" placeholder="Search patients..." bind:value={query} />
    <h1 class="title">Patients Dashboard</h1>
  
    {#if selectedPatient === null}
      {#if subscribedPatients.length > 0}
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
  
          <tbody>
            {#each subscribedPatients.filter((p) =>
              p.name.toLowerCase().includes(query.toLowerCase())
            ) as patient}
              <tr class="row" on:click={() => showPatientDetails(patient)}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone || "N/A"}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <p class="no-patients">No patients found.</p>
      {/if}
    {:else}
      <!-- Display the selected patient's details -->
      <PatientDetails patient={selectedPatient} />
  
      <button class="close-button" on:click={closeDetails}>Close</button>
    {/if}
  </main>
  
  <style>
    /* Overall page styles */
    /* Add your styles here */
  
    /* .dashboard {
      max-width: 1100px;
      margin: 50px auto;
      padding: 0;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      width: 100%;
    }
  
    /* Typography */
  
    /* .title {
      font-size: 32px;
      text-align: center;
      margin-bottom: 40px;
      font-weight: 600;
    }
  
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
    }
  
    .table th,
    .table td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  
    .table th {
      background: #f5f5f5;
    }
  
    .table tbody tr:hover {
      background: #f9f9f9;
      cursor: pointer;
    }
  
    /* No patients text */
  
    /* .no-patients {
      text-align: center;
      font-style: italic;
      color: #777;
      margin-top: 20px; */
    /* } */
  
    /* Close button for patient details */
  
    /* .close-button {
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
      margin-top: 20px; */ 
    /* } */
  
    /* .close-button:hover {
      background-color: #45a049;
    }
  
    .close-button:focus {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    } */ 
  /* </style> */
  
  