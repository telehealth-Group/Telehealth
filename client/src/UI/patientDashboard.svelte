<script>
  // @ts-nocheck
  import HospitalDetails from "./HospitalDetails.svelte";
  import { hospitals } from "../store.js";
  import { patients } from "../store.js";
  import { onDestroy } from "svelte";

  let subscribedHospitals = [];
  let subscribedDoctors = [];
  let selectedDoctor = null;
  let query = "";

  let selectedHospital = null;

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
  })

  // Function to handle the "View Details" button click event (to show the hospital details)
  function showHospitalDetails(hospital) {
    selectedHospital = hospital;
  }

  // Function to handle the "Close" button click event (to go back to the hospital list)
  function closeDetails() {
    selectedHospital = null;
  }
</script>

<div class="container">
  {#if selectedHospital === null}
    <!-- Show the hospital list -->
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
                <button
                  class="custom-button"
                  on:click={() => showHospitalDetails(hospital)}
                >
                  View Details
                </button>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="no-hospitals">No hospitals found.</p>
    {/if}
  {/if}

</div>

{#if selectedHospital !== null}
  <!-- Render HospitalDetails component with the selected hospital -->
  <HospitalDetails hospital={selectedHospital} />
{/if}

<style>
  .container {
    width: auto;
    margin: 0 auto;
    padding: 0;
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
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
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

  .custom-button {
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
  }

  .custom-button:hover {
    background-color: #45a049;
  }

  .custom-button:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  .custom-button:disabled {
    background-color: #bcbcbc;
    cursor: not-allowed;
  }

  .no-hospitals {
    text-align: center;
    font-size: 16px;
    margin-top: 20px;
  }
</style>
