<!-- patients.svelte -->
<script>
  // @ts-nocheck
  import { patients } from "../store.js";
  import { onDestroy } from "svelte";

  let subscribedPatients = [];
  let selectedPatient = null;
  let query = '';

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

  // Function to display patient details in the modal
  function showPatientDetails(patient) {
    selectedPatient = patient;
  }

  // Function to close the modal
  function closeModal() {
    selectedPatient = null;
  }
</script>

<main class="dashboard">
  <input 
  type="text"
  placeholder="Search patients..."
  bind:value={query}
/>
  <h1 class="title">Patients Dashboard</h1>

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
        {#each subscribedPatients.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase())) as patient}
        
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

  {#if selectedPatient}
    <div class="modal">
      <div class="modal-content">
        <h2>{selectedPatient.name}</h2>

        <p><strong>Email:</strong> {selectedPatient.email}</p>
        <p><strong>Phone:</strong> {selectedPatient.phone || "N/A"}</p>
        <p><strong>Sex:</strong> {selectedPatient.gender || "N/A"}</p>
        <p><strong>Age:</strong> {selectedPatient.age || "N/A"}</p>

        <h3>Medical History</h3>
        <table class="medical-history-table">
          <tbody>
            <tr>
              <td><strong>Family Medical History:</strong></td>
              <td>{selectedPatient.medicalHistory.familyMedicalHistory || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Medications:</strong></td>
              <td>{selectedPatient.medicalHistory.medications || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Immunizations:</strong></td>
              <td>{selectedPatient.medicalHistory.immunizations || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Social History:</strong></td>
              <td>{selectedPatient.medicalHistory.socialHistory || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Health Risk Factors:</strong></td>
              <td>{selectedPatient.medicalHistory.healthRiskFactors || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Review of Systems:</strong></td>
              <td>{selectedPatient.medicalHistory.reviewOfSystems || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Physical Examination Findings:</strong></td>
              <td>{selectedPatient.medicalHistory.physicalExaminationFindings || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Diagnostic Tests Results:</strong></td>
              <td>{selectedPatient.medicalHistory.diagnosticTestsResults || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>General Medical History:</strong></td>
              <td>{selectedPatient.medicalHistory.generalMedicalHistory || "N/A"}</td>
            </tr>
          </tbody>
        </table>

        <span class="close" on:click={closeModal}>&times;</span>
      </div>
    </div>
  {/if}
</main>

<style>
/* Overall page styles */

body {
  font-family: 'Open Sans', sans-serif;
  color: #333;
}

.dashboard {
  max-width: 1100px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  width: 100%;
}

/* Typography */

h1, h2, h3 {
  font-weight: 600;  
}

h1 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
}

h2 {
  font-size: 24px;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 15px;
}

/* Table */

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

/* Modal */

.modal {
  position: fixed;
  top: 30px; 
  left: 340px;
  right: 0;
  bottom: 0;
  z-index: 999;
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);  
  max-width: 1000px;
  position: relative;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 1.5rem;
  }

.close:hover {
  color: #333;
}

.modal-content h2 {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;  
}

.medical-history-table {
  width: 100%;
  border-collapse: collapse; 
}

.medical-history-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

/* No patients text */

.no-patients {
  text-align: center;
  font-style: italic;
  color: #777;
  margin-top: 20px;
}
</style>
