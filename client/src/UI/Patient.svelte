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

  // Function to display patient details
  function showPatientDetails(patient) {
    selectedPatient = patient;
  }

  // Function to close patient details
  function closeDetails() {
    selectedPatient = null;
  }
</script>

<main class="dashboard">
  {#if selectedPatient}
    <!-- Render the PatientDetails component to display patient details -->
    <PatientDetails
      patientData={selectedPatient}
      on:closeDetails={() => closeDetails()}
    />
  {:else}
    <div class="search-container ">
      <input type="text" placeholder="Search" bind:value={query} />
    </div>
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
          {#each subscribedPatients.filter((p) => p.name
              .toLowerCase()
              .includes(query.toLowerCase())) as patient}
            <!-- Instead of on:click, use the showPatientDetails function to display patient details -->
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
  {/if}
</main>

<style>
  /* Overall page styles */

  body {
    font-family: "Open Sans", sans-serif;
    color: #333;
  }

  .dashboard {
    max-width: 1100px;
    margin: 50px auto;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
  }

  /* Typography */

  h1,
  h2,
  h3 {
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

  /* No patients text */

  .no-patients {
    text-align: center;
    font-style: italic;
    color: #777;
    margin-top: 20px;
  }
  h1 {
    font-size: 32px;
    text-align: center;
    color: #3b5998;
  }

  h2 {
    font-size: 24px;
    color: #3b5998;
  }

  /* Table */

  .table {
    width: 100%;
    margin: 30px 0;
    border-radius: 10px;
    overflow: hidden;
  }

  .table th,
  .table td {
    padding: 15px;
  }

  .table th {
    background: #3b5998;
    color: #fff;
    text-align: left;
  }

  .table tbody tr:hover {
    background: #f5f5f5;
  }

  /* No Patients */

  .no-patients {
    text-align: center;
    margin-top: 50px;
    color: #555;
  }
  .search-container  {
    /* padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px; */
    position: relative;
  }
  input {
    position: absolute;
    right: 10px;padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  

  .search-container input:focus {
    outline: none;
    border-color: #3b5998;
  }

</style>
