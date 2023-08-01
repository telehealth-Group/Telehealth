<script>
  export let user;

  import axios from "axios";

  // Create a local variable to store the filtered doctors
  let searchQuery = "";
  let filteredDoctors = user.user.doctors; // Initialize with all doctors
  // Variables to store new doctor data
  let newDoctorData = {
    name: "",
    specialization: "",
    email: "",
    phone: "",
    password: "",
  };
  // Function to handle search input changes
  function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase();
    filterDoctors();
  }

  // Function to filter doctors based on the search query and role
  function filterDoctors() {
    filteredDoctors = user.user.doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchQuery) ||
        doctor.specialization.toLowerCase().includes(searchQuery) ||
        doctor.email.toLowerCase().includes(searchQuery) ||
        doctor.phone.toLowerCase().includes(searchQuery)
    );
  }

  // Function to add a new doctor
  async function addDoctor() {
    try {
      const newDoctor = {
        name: newDoctorData.name,
        specialization: newDoctorData.specialization,
        email: newDoctorData.email,
        phone: newDoctorData.phone,
        password: newDoctorData.password,
      };
      console.log(newDoctor);
      
      const response = await axios.post(
        "http://127.0.0.1:3000/api/users/hospital/createDoctor",
        newDoctor
      );

      console.log(response);

      if (response.status === 201) {
        const doctorData = response.data;
        user.user.doctors.push(doctorData);
        filterDoctors();

        // Clear the new doctor data object for the next addition
        newDoctorData = {
          name: "",
          specialization: "",
          email: "",
          phone: "",
          password: "",
        };
      } else {
        // Handle error case
        console.error("Failed to add the doctor.");
      }
    } catch (error) {
      console.error("Failed to add the doctor.", error);
    }
  }

  // Function to delete a doctor
  let doctorToDelete; // Variable to store the doctor to be deleted

  function openDeleteModal(doctor) {
    doctorToDelete = doctor;
    showDeleteModal = true;
  }

  function closeDeleteModal() {
    showDeleteModal = false;
  }

  async function confirmDelete() {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:3000/api/users/hospital/deleteDoctor/${doctorToDelete._id}`,
        { role: "delete" }
      );

      if (response.status === 200) {
        user.user.doctors = user.user.doctors.filter(
          (d) => d._id !== doctorToDelete._id
        );
        filterDoctors();
        closeDeleteModal(); // Close the modal after successful deletion
      } else {
        // Handle error case
        console.error("Failed to delete the doctor.");
      }
    } catch (error) {
      console.error("Failed to delete the doctor.", error);
    }
  }

  // Variables to control the modals
  let showDeleteModal = false;
  let showAddModal = false;

  // Function to show the add modal
  function showAddDoctorModal() {
    showAddModal = true;
  }

  // Function to hide the add modal
  function hideAddDoctorModal() {
    showAddModal = false;
  }

  // Function to handle form submission and add a new doctor
  function submitAddModal() {
    // Perform validation if needed

    // Add the new doctor
    user.user.doctors = [...user.user.doctors, newDoctorData];

    // Close the modal
    hideAddDoctorModal();
  }

  $: filterDoctors();

  // Svelte reactive statement to update filteredDoctors whenever the user prop changes
  $: {
    filteredDoctors = user.user.doctors;
    filterDoctors();
  }
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
    <button class="add-button" on:click={showAddDoctorModal}>
      <i class="fas fa-plus" />
    </button>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredDoctors as doctor}
            <tr>
              <td><i class="fas fa-user-md" /> {doctor.name}</td>
              <td><i class="fas fa-stethoscope" /> {doctor.specialization}</td>
              <td><i class="fas fa-envelope" /> {doctor.email}</td>
              <td><i class="fas fa-phone" /> {doctor.phone}</td>
              <td>
                <button
                  class="delete-button"
                  on:click={() => openDeleteModal(doctor)}
                >
                  <i class="fas fa-trash-alt" />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="no-patients">No doctors found.</p>
    {/if}
  </div>

  <!-- Delete Doctor Modal -->
  {#if showDeleteModal}
    <div class="modal-background">
      <div class="modal-content">
        <h2>Delete Doctor</h2>
        <p>Are you sure you want to delete the doctor?</p>
        <div class="modal-buttons">
          <button type="button" on:click={confirmDelete}>Yes</button>
          <button type="button" on:click={closeDeleteModal}>No</button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Add Doctor Modal -->
  {#if showAddModal}
    <div class="modal-background">
      <div class="modal-content">
        <h2>Add Doctor</h2>
        <form on:submit|preventDefault={submitAddModal}>
          <label>
            Name:
            <input type="text" bind:value={newDoctorData.name} />
          </label>
          <label>
            Specialization:
            <input type="text" bind:value={newDoctorData.specialization} />
          </label>
          <label>
            Email:
            <input type="email" bind:value={newDoctorData.email} />
          </label>
          <label>
            Password: <!-- New password field -->
            <input type="password" bind:value={newDoctorData.password} />
          </label>
          <label>
            Phone:
            <input type="tel" bind:value={newDoctorData.phone} />
          </label>
          <div class="modal-buttons">
            <button type="submit" on:click={addDoctor}>Add</button>
            <!-- Call addDoctor function on click -->
            <button type="button" on:click={hideAddDoctorModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
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

  /* No Doctors */

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

  .search-container button {
    background: #3b5998;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
  }

  .search-container button i {
    margin-right: 5px;
  }

  .search-container .add-button {
    background: #3b5998;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
  }

  .search-container .add-button i {
    margin-right: 5px;
  }

  .table .delete-button {
    /* background: #e74c3c; */
    color: red;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 18px;
    cursor: pointer;
  }

  .table .delete-button i {
    margin-right: 5px;
    font-size: 20px; /* Make the delete icon bigger */
  }

  /* Modal styles */
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  .modal-content h2 {
    margin-bottom: 15px;
    text-align: center;
    color: #3b5998;
  }

  .modal-content p {
    margin-bottom: 20px;
    text-align: center;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .modal-buttons button {
    margin: 0 10px;
    background-color: #3b5998;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
  }

  /* Modal styles */
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    /* flex-direction: column; */
    align-items: center; /* Center content horizontally */
    justify-content: center;
  }

  .modal-content h2 {
    margin-bottom: 15px;
    text-align: center;
    color: #3b5998;
  }

  .modal-content p {
    margin-bottom: 20px;
    text-align: center;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .modal-buttons button {
    margin: 0 10px;
    background-color: #3b5998;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
  }

  /* Modal styles */
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999; /* Ensure the modal is displayed on top of other elements */
  }

  .modal-content {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .modal-content h2 {
    margin-bottom: 15px;
    text-align: center;
    color: #3b5998;
    font-size: 24px;
  }

  .modal-content p {
    margin-bottom: 20px;
    text-align: center;
    color: #666;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .modal-buttons button {
    margin: 0 10px;
    background-color: #3b5998;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .modal-buttons button:hover {
    background-color: #2c4560; /* Darker shade on hover */
  }

  /* Add Doctor Modal Form */

  .modal-content form label {
    display: block;
    margin-bottom: 15px;
    color: #3b5998;
    font-weight: bold;
  }

  .modal-content form input[type="text"],
  .modal-content form input[type="email"],
  .modal-content form input[type="tel"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }

  .modal-content form input[type="text"]:focus,
  .modal-content form input[type="email"]:focus,
  .modal-content form input[type="tel"]:focus {
    border-color: #3b5998;
  }

  .modal-content form .modal-buttons {
    margin-top: 30px;
  }

  /* Modal Icons */

  .modal-content .input-icon {
    position: absolute;
    top: 40%;
    right: 10px;
    transform: translateY(-50%);
    color: #aaa;
  }

  .modal-content .input-icon svg {
    font-size: 20px;
  }

  .modal-buttons .add-button {
    background-color: #00a95c;
  }

  .modal-buttons .add-button:hover {
    background-color: #008c4e; /* Darker shade on hover */
  }

  /* Custom Close Button */

  .modal-content .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px;
    font-size: 20px;
    color: #666;
    cursor: pointer;
  }

  .modal-content .close-button:hover {
    color: #3b5998;
  }
</style>
