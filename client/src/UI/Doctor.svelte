<!-- Doctors.svelte -->
<script>
  // Import the required modules
  import { patients } from "../store.js";
  import { onDestroy } from "svelte";

  // Create a local variable to store the filtered doctors
  let searchQuery = "";
  let subscribedDoctors = [];
  let filteredDoctors = [];

  // Function to handle search input changes
  function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase();
    filterDoctors();
  }

  // Function to filter doctors based on the search query and role
  function filterDoctors() {
    filteredDoctors = subscribedDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchQuery) ||
        doctor.specialization.toLowerCase().includes(searchQuery) ||
        doctor.email.toLowerCase().includes(searchQuery) ||
        doctor.phone.toLowerCase().includes(searchQuery) ||
        doctor.location.toLowerCase().includes(searchQuery)
    );
  }

  // Subscribe to the patients store and update the filtered doctors
  const unsubscribePatients = patients.subscribe((value) => {
    subscribedDoctors = value.data.users.filter(
      (user) => user.role === "doctor"
    );

    // Call the function to update the filtered doctors when the data changes
    filterDoctors();
  });

  onDestroy(() => {
    unsubscribePatients();
  });
</script>

<main class="dashboard">
  <!-- Search Bar -->
  <div class="search-container">
    <input
      type="text"
      placeholder="Search..."
      bind:value={searchQuery}
      on:input={handleSearch}
    />
  </div>

  <!-- Doctors Table -->
  <div class="table-wrapper">
    <h1>Doctors Dashboard</h1>
    {#if filteredDoctors.length > 0}
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredDoctors as doctor}
            <tr>
              <td><i class="fas fa-user-md"></i> {doctor.name}</td>
              <td><i class="fas fa-stethoscope"></i> {doctor.specialization}</td>
              <td><i class="fas fa-envelope"></i> {doctor.email}</td>
              <td><i class="fas fa-phone"></i> {doctor.phone}</td>
              <td><i class="fas fa-map-marker-alt"></i> {doctor.location}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="no-patients">No matching doctors found.</p>
    {/if}
  </div>
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
    color: #3b5998;
  }

  h2 {
    font-size: 24px;
    color: #3b5998;
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
    cursor: pointer;
  }

  /* No Patients */

  .no-patients {
    text-align: center;
    margin-top: 50px;
    color: #555;
  }

  .search-container {
    position: relative;
    margin-bottom: 20px;
  }

  .search-container input {
    position: absolute;
    right: 10px;
    padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .search-container input:focus {
    outline: none;
    border-color: #3b5998;
  }
</style>
