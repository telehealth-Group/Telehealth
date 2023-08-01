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
  export let user;

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
  });
  let showhead = true;
  // Function to handle the "View Details" button click event (to show the hospital details)
  function showHospitalDetails(hospital) {
    console.log(hospital);
    selectedHospital = hospital;
    showhead = false;
  }

  // Function to handle the "Close" button click event (to go back to the hospital list)
  function closeDetails() {
    selectedHospital = null;
    showhead = true;
  }

  // Function to handle the "Add Hospital" button click event
  function addHospital() {
    // Implement the logic to add a new hospital here
  }

  // Function to handle the "Remove Hospital" button click event
  function removeHospital(hospital) {
    // Implement the logic to remove the selected hospital here
  }
</script>

<div class="container">
    <!-- Add the "Add Hospital" icon (without the circle) -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="add-hospital-icon" on:click={addHospital}>
      <i class="fas fa-plus"></i>
    </div>
  
    {#if selectedHospital === null}
      <!-- Show the hospital list -->
      {#if subscribedHospitals.length > 0}
        <ul class="hospital-list">
          {#each subscribedHospitals as hospital}
            <li class="hospital-item">
              <div class="hospital-details">
                <div class="hospital-info">
                  <img
                    class="hospital-image"
                    src={`./src/assets/${hospital.images[0]}`}
                    alt={hospital.name}
                  />
                  <p class="hospital-name">
                    <i class="fas fa-hospital" style="color: #6C5CE7"></i>
                    {hospital.name}
                  </p>
                  <p class="hospital-phone">
                    <i class="fas fa-phone-alt" style="color: #009688"></i>
                    {hospital.phoneNumber}
                  </p>
                  <p class="hospital-rating">
                    <i class="fas fa-star" style="color: #FFD700"></i>
                    {hospital.ratingAverage} ({hospital.ratingQuantity} reviews)
                  </p>
                  <!-- Add the "Remove Hospital" icon (trash icon) -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <div class="remove-hospital-icon" on:click={() => removeHospital(hospital)}>
                    <i class="fas fa-trash"></i>
                  </div>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="no-hospitals">No hospitals found.</p>
      {/if}
    {/if}
    {#if selectedHospital !== null}
      <!-- Render HospitalDetails component with the selected hospital -->
      <HospitalDetails {user} hospital={selectedHospital} on:closeDetails={() => closeDetails()} />
    {/if}
  </div>

<style>
  .container {
    background-color: #bcbcbc62;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  .hospital-phone,
  .hospital-rating {
    font-size: 16px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }

  .hospital-phone i,
  .hospital-rating i {
    margin-right: 8px;
    font-size: 20px;
  }

  .hospital-rating i {
    color: #ffd700; /* Gold color for the star icon */
  }

  .hospital-rating {
    color: #777;
  }

  .hospital-list {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(
      3,
      calc(33.33% - 10px)
    ); /* Reduce width by 10px */
    grid-gap: 20px;
  }
  .heading-secondary {
    font-family: Georgia, serif;
  }

  .heading-tertiary {
    font-family: Verdana, sans-serif;
  }

  .paragraph {
    font-family: Helvetica, sans-serif;
  }

  .hospital-item {
    /* Decrease the width by 10px */
    width: calc(100% - 10px);
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
  .hospital-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 10px;
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
    background-color: rgb(44, 71, 56);
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    width: 350px;
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
  .hospital-item {
    animation: fadeIn 0.5s ease forwards;
  }
  .section-about {
    padding: 25rem 0;
    margin-top: -50vh;
    margin-bottom: 8vh;
  }

  /* Add other section-specific styles here */
  .u-margin-bottom-big {
    margin-bottom: 8rem !important;
  }

  .u-center-text {
    text-align: center !important;
  }

  .row {
    max-width: 114rem;
    margin: 0 auto;
  }

  .row [class^="col-"]:not(:last-child) {
    margin-right: 6rem;
  }

  .row .col-1-of-2 {
    width: calc((100% - 6rem) / 2);
  }

  .row [class^="col-"] {
    float: left;
  }

  .u-margin-bottom-small {
    margin-bottom: 1.5rem !important;
  }

  .heading-tertiary {
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .paragraph:not(:last-child) {
    margin-bottom: 3rem;
  }

  .paragraph {
    font-size: 1.6rem;
  }

  .composition {
    position: relative;
  }

  .composition__photo--p1 {
    left: 0;
    top: -2rem;
  }

  .composition__photo--p2 {
    right: 0;
    top: 2rem;
  }

  .composition__photo--p3 {
    left: 20%;
    top: 10rem;
  }

  .composition__photo {
    width: 55%;
    box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 40%);
    border-radius: 2px;
    position: absolute;
    z-index: 10;
    transition: all 0.2s;
    outline-offset: 2rem;
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

  /* Stagger animation delays */
  .hospital-item:nth-child(1) {
    animation-delay: 0s;
  }

  .hospital-item:nth-child(2) {
    animation-delay: 0.1s;
  }

  .hospital-item:nth-child(3) {
    animation-delay: 0.2s;
  }

  /* Glowing shadow on hover */
  .hospital-item:hover {
    box-shadow: 0 5px 20px rgba(252, 166, 31, 0.6);
  }
  /* Add custom styles for the add and remove hospital icons */
  .add-hospital-icon,
  .remove-hospital-icon {
    font-size: 24px;
    color: #6c5ce7;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .add-hospital-icon {
    float: right;
  }

  .remove-hospital-icon {
    float: left;
  }

  .add-hospital-icon,
  .remove-hospital-icon {
    font-size: 32px;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .add-hospital-icon {
    float: right;
  }

  .remove-hospital-icon {
    float: left;
  }
</style>
