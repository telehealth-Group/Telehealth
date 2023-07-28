<!-- CreateAppointment.svelte -->
<script>
    import { onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";
    import { patients } from "../store.js"; // Assuming you have stores for patients and doctors
  
    export let close;
  
    // Data to populate the form
    let selectedDoctor = "";
    let selectedTimeSlot = "";
    let date = "";
  
    const dispatch = createEventDispatcher();
  
    // Function to close the Create Appointment view
    function closeCreateAppointment() {
      dispatch("closeCreateAppointment");
    }
  
    // Function to handle form submission
    function submitAppointment() {
      // Handle the logic to submit the appointment details here
      // For example, you can save the appointment details to a database or another store
      console.log("Appointment details submitted:");
      console.log("Doctor: ", selectedDoctor);
      console.log("Date: ", date);
      console.log("Time Slot: ", selectedTimeSlot);
  
      // Close the Create Appointment view after submission
      closeCreateAppointment();
    }
  
    // Subscribe to the patients store to get the list of doctors
    let subscribedDoctors = [];
    const unsubscribePatients = patients.subscribe((value) => {
      subscribedDoctors = value.data.users.filter((user) => user.role === "doctor");
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
  </script>
  
  <div class="create-appointment-container">
    <h2>Create Appointment</h2>
    <form on:submit|preventDefault={submitAppointment}>
      <label for="doctor">Select Doctor:</label>
      <select id="doctor" bind:value={selectedDoctor}>
        <option value="" disabled>Select a doctor</option>
        {#each subscribedDoctors as doctor}
          <option value={doctor.name}>{doctor.name} - {doctor.specialization}</option>
        {/each}
      </select>
  
      <label for="date">Select Date:</label>
      <input type="date" id="date" bind:value={date} required />
  
      <label for="time">Select Time Slot:</label>
      <select id="time" bind:value={selectedTimeSlot}>
        <option value="" disabled>Select a time slot</option>
        {#each timeSlots as timeSlot}
          <option value={timeSlot}>{timeSlot}</option>
        {/each}
      </select>
  
      <button type="submit">Submit Appointment</button>
    </form>
  
    <button class="cancel-button" on:click={close}>
      Cancel
    </button>
  </div>

  <style>
     .create-appointment-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    margin-top: 40px;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #274247;
  }

  label {
    font-weight: bold;
    margin-bottom: 8px;
    color: #274247;
  }

  select,
  input[type="date"] {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
  }

  button[type="submit"],
  .cancel-button {
    background-color: #274247;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button[type="submit"]:hover,
  .cancel-button:hover {
    background-color: #1a2d38;
  }
  </style>