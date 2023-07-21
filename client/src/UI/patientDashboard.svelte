<script>
  // @ts-nocheck
  import { hospitals } from "../store.js";
  import { patients } from "../store.js";
  import { onDestroy } from "svelte";

  let subscribedHospitals = [];
  let subscribedDoctors = [];
  let selectedDoctor = null;
  let query = "";

  let selectedHospital = null;
  let showForm = false;
  let dateTime = "";

  // Subscribe to the hospitals store
  const unsubscribeHospitals = hospitals.subscribe((value) => {
    subscribedHospitals = value.data.hospitals;
  });

  // Subscribe to the patients store
  const unsubscribePatients = patients.subscribe((value) => {
    subscribedDoctors = value.data.users.filter(
      (user) => user.role === "doctor"
    );
  });

  // Unsubscribe from the stores when the component is destroyed
  onDestroy(() => {
    unsubscribeHospitals();
    unsubscribePatients();
  });

  // Function to get the appropriate icon and color based on the hospital's speciality
  function getSpecialityIcon(speciality) {
    switch (speciality) {
      case "Cardiology":
        return { icon: "fas fa-heart", color: "#FF7675" };
      case "Dermatology":
        return { icon: "fas fa-spa", color: "#74B9FF" };
      case "Orthopedics":
        return { icon: "fas fa-bone", color: "#55E6C1" };
      // Add more cases for other specialities
      default:
        return { icon: "fas fa-hospital", color: "#CED6E0" };
    }
  }

  function showAppointmentForm(hospitalId) {
    selectedHospital = subscribedHospitals.find(
      (hospital) => hospital._id === hospitalId
    );
    showForm = true;
  }

  // Function to handle the "Next" button click event (to show the list of doctors)
  function showDoctorList() {
    // Set the filtered doctors to the selected hospital
    selectedHospital.doctors = subscribedDoctors;
    showForm = false; // Hide the appointment form
  }

  // Function to close the modals
  function closeModal() {
    selectedHospital = null;
    showForm = false;
  }
</script>

<div class="container">
  <h1>Hospitals</h1>
  {#if subscribedHospitals.length > 0}
    <ul class="hospital-list">
      {#each subscribedHospitals as hospital}
        <li class="hospital-item">
          <div class="hospital-details">
            <div class="hospital-info">
              <p class="hospital-name">
                <i class="fas fa-hospital" style="color: #6C5CE7" />
                {hospital.name}
              </p>
              <p class="hospital-email">
                <i class="far fa-envelope" />
                <strong>Email:</strong>
                {hospital.email}
              </p>
              <p class="hospital-phone">
                <i class="fas fa-phone-alt" />
                <strong>Phone Number:</strong>
                {hospital.phoneNumber}
              </p>
              <p class="hospital-services">
                <strong>Services:</strong>
                {#each hospital.services as service}
                  <span>{service}</span>
                {/each}
              </p>
              <p class="hospital-specialities">
                <strong>Specialities:</strong>
                {#each hospital.specialities as speciality}
                  <!-- Speciality Icon -->
                  {#if speciality in ["Cardiology", "Dermatology", "Orthopedics"]}
                    <span
                      style="background-color: {getSpecialityIcon(speciality)
                        .color}"
                    >
                      <i class={getSpecialityIcon(speciality).icon} />
                      {speciality}
                    </span>
                  {:else}
                    <span>
                      <i class="fas fa-hospital" style="color: #CED6E0" />
                      {speciality}
                    </span>
                  {/if}
                {/each}
              </p>
              <ul class="hospital-locations">
                {#each hospital.locations as location}
                  <li>
                    <p class="location-address">
                      <strong>Address:</strong>
                      {location.address}
                    </p>
                  </li>
                {/each}
              </ul>
              <button on:click={() => showAppointmentForm(hospital._id)}
                >Make Appointment</button
              >
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="no-hospitals">No hospitals found.</p>
  {/if}
</div>

{#if showForm}
  <!-- Appointment Modal -->
  <div class="modal visible">
    <div class="modal-content">
      <h2>Make Appointment</h2>
      <form on:submit|preventDefault={showDoctorList}>
        <label>
          Date & Time:
          <input type="datetime-local" bind:value={dateTime} required />
        </label>
        <!-- Add other appointment form fields here as needed -->
        <button type="submit">Next</button>
      </form>
      <button on:click={closeModal}>Close</button>
    </div>
  </div>
{/if}

{#if selectedHospital !== null && !showForm}
  <!-- Doctors Modal -->
  <div class="modal visible">
    <div class="modal-content">
      <h2>Doctors at {selectedHospital.name}</h2>
      {#if selectedHospital.doctors.length > 0}
        <ul class="doctor-list">
          {#each selectedHospital.doctors as doctor}
            <li>
              <p class="doctor-name">{doctor.name}</p>
              <p class="doctor-speciality">
                Speciality: {doctor.specialization}
              </p>
            </li>
          {/each}
        </ul>
      {:else}
        <p>No doctors found at {selectedHospital.name}</p>
      {/if}
      <button on:click={closeModal}>Close</button>
    </div>
  </div>
{/if}

<style>
  .container {
    width: auto;
    margin: 0 auto;
    padding: 0;
    background-color: #f5f5f5;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 24px;
    margin-bottom: 16px;
    text-align: center;
  }

  .hospital-list {
    list-style-type: none;
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  .hospital-item {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
  }

  .hospital-name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }

  .hospital-name i {
    margin-right: 8px;
    font-size: 24px;
  }

  .hospital-email,
  .hospital-phone {
    margin-bottom: 4px;
  }

  .hospital-services,
  .hospital-specialities {
    margin-bottom: 8px;
  }

  .hospital-services span,
  .hospital-specialities span {
    display: inline-flex;
    align-items: center;
    background-color: #f2f2f2;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 4px;
  }

  .hospital-services span i,
  .hospital-specialities span i {
    margin-right: 4px;
  }

  .hospital-locations {
    font-weight: bold;
    margin-bottom: 8px;
    padding: 0;
    list-style-type: none;
  }

  .location-address {
    margin: 0;
    margin-bottom: 4px;
  }

  .doctors-container {
    margin-top: 20px;
  }

  .doctors-heading {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .no-hospitals {
    text-align: center;
    font-size: 16px;
    margin-top: 20px;
  }
  .appointment-form {
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .appointment-form h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .appointment-form form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .appointment-form label {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
  }

  .appointment-form input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
  }

  .appointment-form button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #6c5ce7;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .appointment-form button:hover {
    background-color: #4a37b3;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.3s;
  }

  .modal-content {
    width: 80%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    position: relative;
  }

  .modal h2 {
    font-size: 24px;
    margin-bottom: 16px;
    text-align: center;
  }

  .modal-content form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .modal-content label {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
  }

  .modal-content input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
  }

  .modal-content button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #6c5ce7;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .modal-content button:hover {
    background-color: #4a37b3;
  }

  .modal.visible {
    visibility: visible;
    opacity: 1;
  }

  /* Styling for the list of doctors modal */
  .doctor-list {
    list-style-type: none;
    padding: 0;
  }

  .doctor-list li {
    border-bottom: 1px solid #ddd;
    padding: 8px;
  }

  .doctor-name {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .doctor-speciality {
    color: #555;
  }

  .modal-content button {
    margin-top: 16px;
    align-self: flex-end;
  }
</style>
