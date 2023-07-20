<!-- patients.svelte -->
<script>
  // @ts-nocheck
  import { patients } from "../store.js";
  import { onDestroy } from "svelte";

  let subscribedPatients = [];

  // Subscribe to the patients store
  const unsubscribe = patients.subscribe((value) => {
    subscribedPatients = value.data.users.filter((user) => user.role === "patient");
  });

  // Unsubscribe from the store when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="container">
  <h1>Patients List</h1>
  {#if subscribedPatients.length > 0}
    <ul class="patient-list">
      {#each subscribedPatients as patient}
        <li class="patient-item">
          <div class="patient-details">
            <p class="patient-name">
              {patient.name}
            </p>
            <p class="patient-info">
              <strong>Email:</strong> {patient.email}
            </p>
            <p class="patient-info">
              <strong>Phone:</strong> {patient.phone || "N/A"}
            </p>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="no-patients">No patients found.</p>
  {/if}
</div>

<style>
  .container {
    width: auto;
    margin: 0 auto;
    padding: 0 ;
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
    grid-template-columns: repeat(3,1fr);
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
</style>