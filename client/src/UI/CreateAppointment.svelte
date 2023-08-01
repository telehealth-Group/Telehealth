<script>
  // @ts-nocheck

  import { onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { patients } from "../store.js"; 
  import axios from "axios";
  
  export let close;
  let selectedDoctorName = "";
  let selectedTimeSlot = ""; 
  let paymentMethod = "";
  let showPayment = false;
  let showAppointmentConfirmation = false;
  export let hospital;
 export let user;
  let selectedDoctor = null; // Updated to store the selected doctor object
  let selectedSlot = null;
  let date = new Date(); // Initialize with the current date
  let showModal = false;
  
  const dispatch = createEventDispatcher();
  
  function closeCreateAppointment() {
    dispatch("closeCreateAppointment");
  }

 
  let bookedDates = [];
  function isSlotUnavailable(slot) {
    return bookedDates.some(
      (booking) => booking.date === date.toDateString() && booking.slot === slot
    );
  }
  let showDoctors = false;
  function goToNextStep() {
    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }
    
    showDoctors = true;
  }
  
  function goBackToDoctorsSelection() {
    showDoctors = false;
  }
  function selectDoctor(index) {
  if (Array.isArray(hospital.doctors)) {
   selectedDoctor = hospital.doctors[index];
    console.log(selectedDoctor);
  } else {
    console.error("hospital.doctors is not an array.");
  }
}

  function showDoctorDetails() {
    showModal = true;
  }
  function hideDoctorDetails() {
    showModal = false;
  }

  function handleClickOutside(event) {
    if (!event.target.closest(".modal-content")) {
      hideDoctorDetails();
    }
  }
  
  document.addEventListener("click", handleClickOutside);
  function showPaymentPage() {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
    
    showPayment = true;
  }
  
  function goBackToTimeSlotSelection() {
    showPayment = false;
  }
  function handleCheckout() {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
  
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    selectedDoctorName = selectedDoctor
    selectedTimeSlot = selectedSlot;
  
    showAppointmentConfirmation = true;
    showPaymentPage = false
  }
  console.log(selectedDoctor)
  const submitAppointment = async () => {
    const requestBody = {
      patient: user.user._id,
      hospital: hospital._id,
      doctor: selectedDoctor._id,
      confirmation:true
      conformation: true
    };
console.log(requestBody)
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/users/createAppointment', requestBody);
      console.log('Appointment created successfully:', response.data);
    } catch (error) {
      console.error('Error creating appointment:', error.message);
    }
    showAppointmentConfirmation= true
  };
    

</script>

<div class="create-appointment-container">
  <h2>Create Appointment</h2>
  {#if !showDoctors}
    <!-- Step 1: Select Doctor -->
    <form class="content-container">
      <label for="doctor">Select Doctor:</label>
      <div class="doctor-boxes">
        <ul class="doctor-list">

  {#each hospital.doctors as doctor, index}
    <li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div 
        class="doctor-item"
        class:selected={selectedDoctor === doctor}
        on:click={() => {
          selectDoctor(index);
          showDoctorDetails();
        }}>
        <i class="fas fa-user-md" />
        <div class="info">
          <span class="doctor-name">{doctor.name}</span>
          <span class="spec">{doctor.specialization}</span>  
        </div>
      </div>

    </li>

  {/each}

</ul>
      </div>

      <div class="button-container">
        <button type="button" on:click={goToNextStep}>Next</button>
        <button class="cancel-button" on:click={close}>Cancel</button>
      </div>
    </form>
  {:else}
    <!-- Step 2: Select Time Slot -->
    {#if !showPayment}
    
          <!-- svelte-ignore a11y-click-events-have-key-events -->
      <form on:submit|preventDefault={submitAppointment}>
        <label for="time">Select Time Slot:</label>
        <div class="time-slot-grid">
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

{#if showAppointmentConfirmation}
<div class="appointment-confirmation show">
  <h3>Appointment Confirmation</h3>
  {#if selectedDoctor && selectedSlot}
    <p class="Appointment_booked">
      Appointment with {selectedDoctor.name} on {date.toDateString()} at {selectedSlot}
      has been confirmed.
    </p>
  {:else}
    <p class="Appointment_missing">Appointment details missing.</p>
  {/if}
  <button type="button" class="closebtn" on:click={close}>Done</button>
</div>
{/if}
</div>

<style>
  .doctor-boxes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
    /* max-width: 630px; Limit to 6 doctors in a row */
  }
label{
  font-size: 26;
}
 .doctor-list {
  list-style: none;
  padding: 0;
  width: 700px;
}
h2{
  text-align: center;
  color: #404445;
}
.doctor-item {
  margin-top: 10px;
  padding: 20px;
  border-bottom: 1px solid #55535363;
  background-color: #71747539;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
}

.doctor-item.selected {
  background: #5793ce;
  color: #fff;
}

.info {
  margin-left: 10px;
}

/* Other styles */
.fas {
  font-size: 28px;
  margin-bottom: 10px; 
}

.doctor-name {
  font-size: 20px;
  font-weight: 500;
  display: block;
}

.spec {
  font-size: 14px;
  color: #777;
}

  /* Additional styles for icons */
  i.fas {
    font-size: 24px;
    margin-bottom: 5px;
    color: #007bff;
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

  /* Additional styles for icons */
  i.fas {
    font-size: 24px;
    margin-bottom: 5px;
    color: #007bff;
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
    background-color: #2d2c2c; /* Bootstrap's danger color */
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
    width: 200px;
    margin:0 50px 0 50px;
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
  }

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
    background-color: #3a3835; /* Orange color for the afternoon button */
  }

  /* Styles for the evening button */
  .evening-button {
    background-color: #b9a7bc; /* Purple color for the evening button */
  }

  .cancel-button:hover {
    background-color: #999; /* Darker background on hover */
  }

 
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .button-container button {
    padding: 12px 25px;
    background-color: #313336;
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


input, select {
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  outline: none;
  border: 2px solid #ddd;
}

/* Hover Effects */

input:hover, 
select:hover {
  border-color: #5793ce;
}

 .payment-page.content {
    width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .payment-form {
    gap: 20px;
    justify-items: center;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-group label {
    font-size: 16px;
    color: #555;
    margin-bottom: 5px;
  }

  .form-group input,
  .form-group select {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }

  .form-group input:focus,
  .form-group select:focus {
    border-color: #007bff;
  }

  .order-summary {
    border: none;
    width: 300px;
    margin-left: 100px;
    margin-top: 30px;
  }

  .order-summary h4 {
    font-size: 20px;
    color: #404445;
    margin-bottom: 10px;
  }

  .order-summary p {
    font-size: 16px;
    color: #555;
    margin-bottom: 8px;
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
    outline: none;
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
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .appointment-confirmation h3 {
    font-size: 24px;
    color: #404445;
    margin-bottom: 15px;
    text-align: center;
  }

  .Appointment_booked,
  .Appointment_missing {
    font-size: 18px;
    color: #555;
    margin-bottom: 15px;
    text-align: center;
  }

  .Appointment_booked {
    color: #007bff;
    font-weight: bold;
  }

  .Appointment_missing {
    color: #d9534f;
    font-weight: bold;
  }

  .closebtn {
    display: block;
    margin: 0 auto;
    padding: 12px 25px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    outline: none;
  }

  .closebtn:hover {
    background-color: #0056b3;
  }
  /* Responsive styles for the payment page content */
  @media screen and (max-width: 768px) {
    .payment-form {
      grid-template-columns: 1fr;
    }

    .form-group.flex-container {
      flex-direction: column;
    }

    .button-container {
      flex-direction: column;
    }
  }
</style>