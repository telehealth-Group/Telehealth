<script>
  // @ts-nocheck

  import { onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { patients } from "../store.js"; // Assuming you have stores for patients and doctors
  
  export let close;
  let selectedDoctorName = "";
  let selectedTimeSlot = "";  // New state variable to control the visibility of the payment page
  let paymentMethod = "";
  let showPayment = false;
  let showAppointmentConfirmation = false;

  // Data to populate the form
  let selectedDoctor = null; // Updated to store the selected doctor object
  let selectedSlot = null;
  let date = new Date(); // Initialize with the current date
  let showModal = false;
  
  
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
      showAppointmentConfirmation = true
      showPaymentPage = false
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
  
  // Function to handle doctor selection
  function selectDoctor(index) {
    selectedDoctor = subscribedDoctors[index];
  }
  
  // New state variable to control the visibility of the modal
  
  // Function to show the modal
  function showDoctorDetails() {
    showModal = true;
  }
  
  // Function to hide the modal
  function hideDoctorDetails() {
    showModal = false;
  }

  // Function to handle clicks outside the modal
  function handleClickOutside(event) {
    if (!event.target.closest(".modal-content")) {
      hideDoctorDetails();
    }
  }
  
  // Add event listener to the document
  document.addEventListener("click", handleClickOutside);
  

  
  // Function to show the payment page
  function showPaymentPage() {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
    
    // Show the payment page
    showPayment = true;
  }
  
  // New state variable to control the visibility of the appointment confirmation page
  
  // Function to handle the "Checkout" button click
  // function handleCheckout() {
  //   if (!selectedSlot) {
    //     alert("Please select a time slot.");
    //     return;
  //   }

  //   if (!paymentMethod) {
  //     alert("Please select a payment method.");
  //     return;
  //   }

  //   // Show the appointment confirmation page
  //   showAppointmentConfirmation = true;
  // }
  
  // Function to handle the "Make Appointment" button click in the appointment confirmation page
  function handleMakeAppointment() {
    // Add the logic to confirm and make the appointment here
    // For example, you can save the appointment details to a database or another store

    // Close the Create Appointment view after confirmation
    closeCreateAppointment();
  }
  
  // Function to go back to the time slot selection step
  function goBackToTimeSlotSelection() {
    showPayment = false;
  }
  
  // New state variable to store the selected payment method
  
  function handleCheckout() {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
  
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
  
    // Update the selectedDoctorName and selectedTimeSlot variables
    selectedDoctorName = selectedDoctor
    selectedTimeSlot = selectedSlot;
  
    // Show the appointment confirmation page
    showAppointmentConfirmation = true;
    showPaymentPage = false
  }
  console.log(showAppointmentConfirmation);
  console.log(selectDoctor);
  // Function to handle the "Checkout" button click
</script>

<div class="create-appointment-container">
  <h2>Create Appointment</h2>
  {#if !showDoctors}
    <!-- Step 1: Select Doctor -->
    <form class="content-container">
      <label for="doctor">Select Doctor:</label>
      <div class="doctor-boxes">
        {#each subscribedDoctors as doctor, index}
          {#if index < 18}
          <!-- Display 18 doctors (3 rows of 6 doctors each) -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              class="doctor-box"
              class:selected={selectedDoctor === doctor}
              on:click={() => {
                selectDoctor(index);
                showDoctorDetails();
              }}
            >
              <i class="fas fa-user-md" />
              <span class="doctor-name">{doctor.name}</span>
              <span class="spec">{doctor.specialization}</span>
            </div>
          {/if}
        {/each}
      </div>

      <div class="button-container">
        <button type="button" on:click={goToNextStep}>Next</button>
        <button class="cancel-button" on:click={close}>Cancel</button>
      </div>
    </form>
  {:else}
    <!-- Step 2: Select Time Slot -->
    {#if !showPayment}
      <form on:submit|preventDefault={submitAppointment}>
        <label for="time">Select Time Slot:</label>
        <div class="time-slot-grid">
          <!-- Afternoon Button -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="time-slot-button afternoon-button"
            on:click={() => (selectedSlot = "Afternoon")}
            class:selected={selectedSlot === "Afternoon" ||
              isSlotUnavailable("Afternoon")}
            disabled={isSlotUnavailable("Afternoon")}
          >
            <i class="fas fa-sun" />
            <span>Afternoon</span>
          </div>
          <!-- Evening Button -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="time-slot-button evening-button"
            on:click={() => (selectedSlot = "Evening")}
            class:selected={selectedSlot === "Evening" ||
              isSlotUnavailable("Evening")}
            disabled={isSlotUnavailable("Evening")}
          >
            <i class="fas fa-moon" />
            <span>Evening</span>
          </div>
        </div>

        <div class="button-container">
          <button type="button" on:click={showPaymentPage}>Next</button>
          <button type="button" on:click={goBackToDoctorsSelection}>Back</button
          >
        </div>
      </form>
    {/if}
  {/if}
  <!-- ... Previous code ... -->

  {#if showPayment && !showAppointmentConfirmation }
    <div class="payment-page content">
      <form on:submit|preventDefault>
        <div class="payment-form">
          <div class="payment-forming">
            <h3>Payment Page</h3>
            <!-- Billing Details -->
            <form on:submit|preventDefault={handleCheckout}>
              <div class="form-group flex-container">
                <div class="flex-item">
                  <label for="name">Name:</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div class="flex-item">
                  <label for="email">Email Address:</label>
                  <input type="email" id="email" name="email" required />
                </div>
              </div>

              <!-- Shipping Info -->
              <div class="form-group flex-container">
                <div class="flex-item">
                  <label for="address">Address:</label>
                  <input type="text" id="address" name="address" required />
                </div>
                <div class="flex-item">
                  <label for="zipcode">Zipcode:</label>
                  <input type="text" id="zipcode" name="zipcode" required />
                </div>
              </div>
              <div class="form-group flex-container">
                <div class="flex-item">
                  <label for="city">City:</label>
                  <input type="text" id="city" name="city" required />
                </div>
                <div class="flex-item">
                  <label for="country">Country:</label>
                  <input type="text" id="country" name="country" required />
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="form-group flex-container">
                <label for="paymentMethod">Payment Method:</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  required
                  bind:value={paymentMethod}
                >
                  <option value="" disabled selected
                    >Select a payment method</option
                  >
                  <option value="creditCard">Credit Card</option>
                  <option value="eMoney">Tele-birr</option>
                  <option value="cashOnDelivery">Cash on Delivery</option>
                </select>
              </div>

              <!-- Payment Details (Credit Card) -->
              {#if paymentMethod === "creditCard"}
                <div class="form-group">
                  <label for="creditCard">Credit Card Number:</label>
                  <input
                    type="text"
                    id="creditCard"
                    name="creditCard"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="cardExpiry">Card Expiry Date:</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="cvv">CVV:</label>
                  <input type="text" id="cvv" name="cvv" required />
                </div>
              {/if}

              <!-- Payment Details (E-Money) -->
              {#if paymentMethod === "eMoney"}
                <div class="form-group">
                  <label for="eMoney">Telebirr-PhoneNumber:</label>
                  <input type="text" id="eMoney" name="eMoney" required />
                </div>
              {/if}

              <!-- Payment Details (Cash on Delivery) -->
              {#if paymentMethod === "cashOnDelivery"}
                <p>
                  No additional payment details required for Cash on Delivery.
                </p>
              {/if}
            </form>
          </div>
          <!-- </div> -->
          <div class="order-form">
            <div class="order-summary">
              <h4>Order Summary</h4>
              <!-- Display the order items and their prices here -->
              <!-- Replace this with actual order summary data -->
              <p>gas fee: $2</p>
              <p>Total: $27</p>
            </div>
            <div class="terms-and-conditions">
              <input type="checkbox" id="agreeTerms" required />
              <label for="agreeTerms">
                I agree to the
                <a href="/terms-and-conditions" target="_blank"
                  >Terms and Conditions</a
                >
              </label>
            </div>

            <div class="button-container">
              <button type="submit" on:click={submitAppointment}>Checkout</button>
              <button type="button" on:click={goBackToTimeSlotSelection}
                >Back</button
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  {/if}

  <!-- ... Previous code ... -->

  <!-- ... Previous code ... -->

{#if showAppointmentConfirmation}
<!-- Appointment Confirmation Page -->
<div class="appointment-confirmation show">
  <h3>Appointment Confirmation</h3>
  {#if selectedDoctor && selectedSlot}
    <p>
      Appointment with {selectedDoctor.name} on {date.toDateString()} at {selectedSlot}
      has been confirmed.
    </p>
  {:else}
    <p>Appointment details missing.</p>
  {/if}
  <button type="button" on:click={close}>Close</button>
</div>
{/if}

</div>

<style>
  .payment-form {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  /* CSS styles remain unchanged */

  .doctor-boxes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
  }

  .doctor-box {
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    width: 100px; /* Set the width to 100px */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .doctor-box:hover {
    background-color: #f2f2f2;
  }

  .doctor-box.selected {
    background-color: #274247;
    color: #fff;
  }

  /* Additional styles for doctor boxes */
  .doctor-boxes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
    /* max-width: 630px; Limit to 6 doctors in a row */
  }

  .doctor-box {
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    width: calc(100% / 6 - 10px); /* Adjust the width for 6 doctors in a row */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 5px;
  }

  .doctor-box:hover {
    background-color: #f2f2f2;
  }

  .doctor-box.selected {
    background-color: #274247;
    color: #fff;
  }

  /* Additional styles for icons */
  i.fas {
    font-size: 24px;
    margin-bottom: 5px;
    color: #007bff;
  }

  /* Additional styles for Step 2 */
  form:not(:first-child) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .time-slot-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    max-width: 400px;
    margin: 0 auto;
  }

  /* Additional styles for buttons */
  button[type="button"],
  button[type="submit"] {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  button[type="button"] {
    background-color: #d9534f; /* Bootstrap's danger color */
  }

  button[type="submit"] {
    background-color: #5cb85c; /* Bootstrap's success color */
  }

  button[type="button"]:hover,
  button[type="submit"]:hover {
    background-color: #c9302c; /* Hover color for danger button */
  }

  .cancel-button {
    display: block;
    margin: 0 auto;
  }

  /* General styles for the container */
  .create-appointment-container {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    max-width: 800px;
    margin: 0 auto;
  }
  .doctor-name {
    /* max-width: 80px; Limit the width of the doctor name */
    /* white-space: nowrap; Prevent line breaks */
    overflow: hidden; /* Hide overflowing text */
    text-overflow: ellipsis; /* Show ellipsis (...) for truncated text */
    margin-bottom: 5px; /* Add some space below the name */
  }

  .doctor-boxes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
    max-width: 810px; /* Limit to 6 doctors in a row with 10px gap */
  }

  .doctor-box {
    padding: 15px;
    border: 1px solid #ccc;
    cursor: pointer;
    width: calc(
      100% / 6 - 10px
    ); /* Adjust the width for 6 doctors in a row with 10px gap */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 5px;
  }

  .doctor-box:hover {
    background-color: #f2f2f2;
  }

  .doctor-box.selected {
    background-color: #274247;
    color: #fff;
  }

  /* Additional styles for icons */
  i.fas {
    font-size: 24px;
    margin-bottom: 5px;
    color: #007bff;
  }

  /* Additional styles for Step 2 */
  form:not(:first-child) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .time-slot-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    max-width: 400px;
    margin: 0 auto;
  }

  /* Additional styles for buttons */
  button[type="button"],
  button[type="submit"] {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  button[type="button"] {
    background-color: #d9534f; /* Bootstrap's danger color */
  }

  button[type="submit"] {
    background-color: #5cb85c; /* Bootstrap's success color */
  }

  button[type="button"]:hover,
  button[type="submit"]:hover {
    background-color: #c9302c; /* Hover color for danger button */
  }

  .cancel-button {
    display: block;
    margin: 0 auto;
  }

  /* General styles for the container */
  .create-appointment-container {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    max-width: 800px;
    margin: 0 auto;
  }

  /* Additional styles for button container */
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .button-container button {
    flex: 1;
    margin-left: 30px;
  }
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .button-container button {
    flex: 1;
    margin: 0;
  }

  /* Additional styles for cancel button */
  .cancel-button {
    display: block;
    padding: 10px 20px;
    background-color: #ccc;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .cancel-button:hover {
    background-color: #999; /* Darker background on hover */
  }

  .doctor-boxes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    /* justify-content: center; Center the doctor boxes horizontally */
    /* max-width: 100%; Use the whole page width */
  }

  .doctor-box {
    /* padding: 20px;  */
    border: 1px solid #ccc;
    cursor: pointer;
    width: calc(
      100% / 6 - 10px
    ); /* Adjust the width for 6 doctors in a row with 10px gap */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 5px;
  }

  /* Updated styles to use the whole page width */
  .doctor-box {
    padding: 10px 80px; /* Increase the padding for more space */
    width: calc(
      100% / 6 - 20px
    ); /* Adjust the width for 6 doctors in a row with increased padding */
  }

  .spec {
    white-space: nowrap;
    /* font-size: 13px; */
  }
  /* Additional styles for Step 2 */
  form:not(:first-child) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .time-slot-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Adjusted to 2 columns */
    grid-gap: 10px;
    max-width: 400px;
    margin: 0 auto;
  }

  /* Additional styles for time slot buttons */
  .time-slot-button {
    padding: 15px 20px; /* Adjusted padding for more space */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 16px; /* Adjusted font size */
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }

  .time-slot-button:hover {
    background-color: #f2f2f2;
  }

  .time-slot-button.selected {
    background-color: #274247;
    color: #fff;
  }

  /* Additional styles for icons */
  i.fas {
    font-size: 24px;
    margin-right: 10px; /* Increased margin for better spacing between icon and text */
  }

  /* Additional styles for buttons */
  button[type="button"],
  button[type="submit"] {
    padding: 12px 25px; /* Adjusted padding for more prominent buttons */
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 16px; /* Adjusted font size */
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  /* Styles for the afternoon button */
  .afternoon-button {
    background-color: #ff9800; /* Orange color for the afternoon button */
  }

  /* Styles for the evening button */
  .evening-button {
    background-color: #9c27b0; /* Purple color for the evening button */
  }

  .cancel-button:hover {
    background-color: #999; /* Darker background on hover */
  }

  /* Additional styles for the payment page */
  .payment-page {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .payment-page h3 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  .form-group label {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .form-group input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .form-group input[type="checkbox"] {
    margin-top: 5px;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .button-container button {
    padding: 12px 25px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .button-container button:last-child {
    background-color: #d9534f;
  }

  .button-container button:hover {
    background-color: #0056b3;
  }

  .button-container button:last-child:hover {
    background-color: #c9302c;
  }

  /* Responsive styles for the payment page */
  @media screen and (max-width: 480px) {
    .payment-page {
      max-width: 100%;
    }
  }

  /* Additional styles for button container */
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .button-container button {
    flex: 1;
    margin: 0;
  }

  /* Additional styles for cancel button */
  .cancel-button {
    display: block;
    padding: 10px 20px;
    background-color: #ccc;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .cancel-button:hover {
    background-color: #999; /* Darker background on hover */
  }

  /* ... Previous styles ... */

  /* Additional styles for payment methods select */
  .form-group select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  /* Additional styles for payment details inputs */
  /* .form-group input[type="text"] {
    width: 100%;
  } */

  /* Additional styles for order summary */
  .order-summary {
    margin-top: 20px;
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }

  .order-summary h4 {
    margin-bottom: 10px;
  }

  .order-summary ul {
    list-style: none;
    padding-left: 0;
  }

  .order-summary ul li {
    margin-bottom: 5px;
  }

  /* Additional styles for terms and conditions checkbox */
  .terms-and-conditions {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  .terms-and-conditions a {
    color: #007bff;
    text-decoration: none;
  }

  /* Additional styles for checkout button */
  .button-container button[type="submit"] {
    background-color: #5cb85c;
  }

  /* Additional styles for the content container */
  .content-container {
    display: flex;
    gap: 20px;
  }

  /* Adjust the width of the content to fit the available space */
  .content {
    flex: 1;
  }

  /* Additional styles for order summary */
  .order-summary {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
  }

  /* Payment page container */
  .payment-page {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Page title */
  .payment-page h3 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  /* Form groups */
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  /* Labels */
  .form-group label {
    font-size: 16px;
    margin-bottom: 5px;
  }

  /* Inputs */
  .form-group input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  /* Checkboxes */
  .form-group input[type="checkbox"] {
    margin-top: 5px;
  }

  /* Button container */
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  /* Buttons */
  .button-container button {
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  /* Primary button */
  .button-container button:first-child {
    background-color: #007bff;
  }

  /* Secondary button */
  .button-container button:last-child {
    background-color: #d9534f;
  }

  /* Hover effects */
  .button-container button:hover {
    background-color: #0056b3;
  }

  .button-container button:last-child:hover {
    background-color: #c9302c;
  }

  /* Responsive styles */
  @media screen and (max-width: 480px) {
    .payment-page {
      max-width: 100%;
    }
  }

  .form-group.flex-container {
    display: flex;
    gap: 20px;
    flex-direction: row;
  }

  .form-group.flex-container .flex-item {
    flex: 1;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .button-container button {
    padding: 12px 25px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .button-container button:last-child {
    background-color: #d9534f;
  }

  .button-container button:hover {
    background-color: #0056b3;
  }

  .button-container button:last-child:hover {
    background-color: #c9302c;
  }

  .appointment-confirmation {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    margin: 20px auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .appointment-confirmation h3 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .appointment-confirmation p {
    margin-bottom: 20px;
  }

  /* Additional styles for the close button */
  .appointment-confirmation button {
    padding: 12px 25px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .appointment-confirmation button:hover {
    background-color: #0056b3;
  }
</style>