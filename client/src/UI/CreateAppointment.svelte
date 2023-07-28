CreateAppointment.svelte
<script>
  import { onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { patients } from "../store.js"; // Assuming you have stores for patients and doctors

  export let close;

  // Data to populate the form
  let selectedDoctor = "";
  let selectedSlot = null;
  let date = new Date(); // Initialize with the current date

  const dispatch = createEventDispatcher();

  // Function to close the Create Appointment view
  function closeCreateAppointment() {
    dispatch("closeCreateAppointment");
  }

  // Function to handle form submission
  function submitAppointment() {
    // Check if the selected date and slot are available
    const isSlotAvailable = !bookedDates.some(
      (booking) =>
        booking.date === date.toDateString() && booking.slot === selectedSlot
    );

    if (!isSlotAvailable) {
      alert(
        "The selected date and time slot are not available. Please choose another date or time slot."
      );
      return;
    }

    // If the slot is available, add it to the bookedDates list
    bookedDates = [
      ...bookedDates,
      { date: date.toDateString(), slot: selectedSlot },
    ];

    // Handle the logic to submit the appointment details here
    // For example, you can save the appointment details to a database or another store
    console.log("Appointment details submitted:");
    console.log("Doctor: ", selectedDoctor);
    console.log("Date: ", date.toDateString());
    console.log("Time Slot: ", selectedSlot);

    // Close the Create Appointment view after submission
    closeCreateAppointment();
  }

  // Subscribe to the patients store to get the list of doctors
  let subscribedDoctors = [];
  const unsubscribePatients = patients.subscribe((value) => {
    subscribedDoctors = value.data.users.filter(
      (user) => user.role === "doctor"
    );
  });

  // Unsubscribe from the patients store when the component is destroyed
  onDestroy(() => {
    unsubscribePatients();
  });

  // Dummy time slots data (you can replace this with actual data from your store or API)
  let timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  // List of booked dates and time slots
  let bookedDates = [];
  function isSlotUnavailable(slot) {
    return bookedDates.some(
      (booking) => booking.date === date.toDateString() && booking.slot === slot
    );
  }

  // Add a new variable to control the step of the form
  let showDoctors = false;

  // Function to handle the "Next" button click
  function goToNextStep() {
    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }

    // Show the doctors and time slots step
    showDoctors = true;
  }

  // Function to handle the "Back" button click
  function goBackToDoctorsSelection() {
    // Hide the doctors and time slots step and go back to the doctors selection step
    showDoctors = false;
  }
</script>

<div class="create-appointment-container">
  <h2>Create Appointment</h2>
  {#if !showDoctors}
    <!-- Step 1: Select Doctor -->
    <form>
      <label for="doctor">Select Doctor:</label>
      <select id="doctor" bind:value={selectedDoctor}>
        <option value="" disabled>Select a doctor</option>
        {#each subscribedDoctors as doctor}
          <option value={doctor.name}
            >{doctor.name} - {doctor.specialization}</option
          >
        {/each}
      </select>

      <button type="button" on:click={goToNextStep}>Next</button>
    </form>
  {:else}
    <!-- Step 2: Select Time Slot -->
    <form on:submit|preventDefault={submitAppointment}>
      <!-- Date selection input removed as we use the current date -->

      <button type="button" on:click={goBackToDoctorsSelection}>Back</button>
      <label for="time">Select Time Slot:</label>
      <div class="time-slot-grid">
        {#each timeSlots as timeSlot}
          <input
            type="button"
            value={timeSlot}
            on:click={() => (selectedSlot = timeSlot)}
            class:selected={selectedSlot === timeSlot ||
              isSlotUnavailable(timeSlot)}
            disabled={isSlotUnavailable(timeSlot)}
          />
        {/each}
      </div>

      <button type="submit">Make Appointment Now</button>
    </form>
  {/if}

  <button class="cancel-button" on:click={close}>Cancel</button>
</div>

<style>
  /* CSS styles remain unchanged */

  .time-slot-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    margin-top: 10px;
  }

  .time-slot-grid input[type="button"] {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
    cursor: pointer;
  }

  .time-slot-grid input[type="button"]:hover {
    background-color: #f2f2f2;
  }

  .time-slot-grid input[type="button"].selected {
    background-color: #274247;
    color: #fff;
  }
  form label {
    margin-bottom: 5px;
  }

  form input,
  form select {
    margin-bottom: 15px;
  }
  select#doctor {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .time-slot-grid input[type="button"]:hover {
    background-color: #ddd;
  }
  .time-slot-grid input[type="button"].selected {
    background-color: #007bff;
    color: #fff;
  }
  button[type="submit"] {
    padding: 10px 15px;
  }
  .cancel-button {
    display: block;
    margin: 0 auto;
  }
  .create-appointment-container {
    padding: 20px;
  }  .time-slot-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    margin-top: 10px;
  }

  .time-slot-grid input[type="button"] {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
    cursor: pointer;
  }

  .time-slot-grid input[type="button"]:hover {
    background-color: #f2f2f2;
  }

  .time-slot-grid input[type="button"].selected {
    background-color: #274247;
    color: #fff;
  }
  form label {
    margin-bottom: 5px;
  }

  form input,
  form select {
    margin-bottom: 15px;
  }
  select#doctor {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .time-slot-grid input[type="button"]:hover {
    background-color: #ddd;
  }
  .time-slot-grid input[type="button"].selected {
    background-color: #007bff;
    color: #fff;
  }
  button[type="submit"] {
    padding: 10px 15px;
  }
  .cancel-button {
    display: block;
    margin: 0 auto;
  }
  .create-appointment-container {
    padding: 20px;
  }
</style>