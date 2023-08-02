<!-- HospitalDetails.svelte -->
<script>
  // @ts-ignore
  import CreateAppointment from "./CreateAppointment.svelte";
  import axios from "axios";
  import { afterUpdate, createEventDispatcher } from "svelte";
  export let hospital;
  export let user;
  const dispatch = createEventDispatcher();
  let rating = 1;
  let comment = "";
  let submitMessage =''
  
  function closeDetails() {
    dispatch("closeDetails");
  }
  function hasBlackBorder(rating) {
    return rating < 5;
  }
  let showCreateAppointment = false;

  function toggleCreateAppointment() {
    showCreateAppointment = !showCreateAppointment;
  }


async function addReview() {
  const requestData = {
    hospital: hospital._id,
    user: user.user._id,
    rating: rating,
    review: comment,
  };
  try {
    const response = await axios.post("http://127.0.0.1:3000/api/review", requestData);
    const newReview = {
      user: {
        name: user.user.name,
      },
      rating: rating,
    };
    hospital.reviews.push(newReview);
    console.log("Review added successfully:", response.data);

    submitMessage = "Review submitted successfully!";
  } catch (error) {
    console.error("Error adding review:", error);
    submitMessage = "Failed to submit review. Please try again later.";
  }
}

 


</script>

{#if showCreateAppointment}
<CreateAppointment {user} {hospital} close={() => (showCreateAppointment = false)} />
{:else}
<button
  class="create-appointment-button"
  on:click={toggleCreateAppointment}
>
  <i class="fas fa-calendar-plus" /> Create Appointment
</button>
{/if}

{#if !showCreateAppointment} 
<main>
  <nav class="navbar">
    <button class="back-button" on:click={closeDetails}>
      <i class="fas fa-arrow-left" />
    </button>
  </nav>

  {#if hospital}
    <div id="patientDashboardContainer" />
    <div class="hero-section">
      <h1>Welcome to {hospital.name}</h1>
      <p>Providing Quality Healthcare Services</p>
    </div>
    <div class="hospital-details-container">
       <h4>Services</h4>
      <p class="services-info">
        {#each hospital.services as service}
          <div class="service-box">
            <i class="fas fa-stethoscope" />
            <h4>{service}</h4>
          </div>
        {/each}
      </p>

       <h4>Specialitys</h4>
      <div class="specialities-grid">
        {#each hospital.specialities as speciality}
          <div class="speciality-box">
            <i class="fas fa-certificate" />
            <h4>{speciality}</h4>
          </div>
        {/each}
      </div>
      <!-- Doctors Section -->
      <div class="doctors-section">
        {#if hospital.doctor}
        <h4>Doctors</h4>
        <div class="doctors-grid-container">
          <div class="doctors-grid">
            {#each hospital.doctors as doctor}
              <div class="doctor">
                <div class="profile-icon">
                  <div class="circle">
                    <i class="fas fa-user-md" />
                  </div>
                </div>
                <div class="doctor-info">
                  <p><strong>Name:</strong> {doctor.name}</p>
                  <p><strong>Speciality:</strong> {doctor.specialization}</p>
                  <p>
                    <strong>Rating:</strong>{" "}
                    {#each Array(5) as _, index}
                      <i
                        class="fas fa-star {hasBlackBorder(doctor.rating) &&
                        index === 4
                          ? 'black-border'
                          : ''}"
                      />
                    {/each}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </div>
        {/if}
      </div>

      <!-- Reviews Section -->
      <div class="reviews-section">
         <h4>Reviews</h4>
        <div class="reviews-container">
          <div class="reviews-grid">
            {#if hospital.reviews}
            {#each hospital.reviews as review}
              <div class="review">
                <div class="profile-icon">
                  <div class="circle">
                    <i class="fas fa-user" />
                  </div>
                </div>
                <div class="review-content">
                  <p>{review.user.name}</p>
                  <p>
                    <strong>Rating:</strong>{" "}
                    {#each Array(5) as _, index}
                      <i class="fas fa-star {hasBlackBorder(review.rating) &&
                        index >= review.rating
                        ? 'black-border'
                        : ''}"
                      />
                    {/each}
                  </p>
                </div>
              </div>
            {/each}
            {/if}
          </div>
        </div>

        <!-- Form to add a new review -->
      <div class="review-form">
    <form on:submit|preventDefault={addReview}>
      <h4>Add a Review</h4>

      <label for="rating">Rating</label>
      <input
        type="number"
        id="rating"
        min="1"
        max="5"
        required
        bind:value={rating}
      />

      <label for="comment">Comment</label>
      <textarea
        id="comment"
        rows="4"
        required
        bind:value={comment}
      ></textarea>

      <button type="submit" class="custom-button">Submit Review</button>
      {#if submitMessage}
    <p>{submitMessage}</p>
  {/if}
    </form>
  </div>

      </div>
    </div>
  {:else}
    <p>No location information available.</p>
  {/if}

</main>
{/if}
<style>
  /* General Styling */
  .create-appointment-button {
    background-color: #007bff;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: absolute;
    right: 30px;
    top: 120px;
    margin-right: 90px;
    margin-top: 20px;
  }

  .create-appointment-button:hover {
    background-color: #0056b3;
  }
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }

  /* Hero Section Styling */
  .hero-section {
    background-color: #274247;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-align: center;
  }

  .hero-section h1 {
    font-size: 36px;
    margin-bottom: 16px;
  }

  .hero-section p {
    font-size: 18px;
    margin: 0;
  }
  nav {
    background-color: #274247;
    color: #ffffff;
    padding: 50px 0;
  }
  .hospital-details-container {
    width: 90%;
    margin: 20px auto;
    background-color: transparent;
    border-radius: 4px;
    text-align: center;
  }
  .reviews-section {
    margin-top: 20px;
    text-align: left;
  }

  .review {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 40px;
    width: 33%;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    margin: 10px;
  }

  .review p {
    margin: 0;
    margin-bottom: 5px;
  }

  .review p:first-child {
    font-weight: bold;
  }

  .reviews-container {
    overflow-x: auto;
    white-space: nowrap;
    margin-bottom: 20px;
  }
  .reviews-container::-webkit-scrollbar {
    display: none;
  }
  .doctors-section {
    margin-top: 40px;
    overflow-x: auto;
  }

  .doctors-grid-container {
    display: flex;
    overflow-x: scroll;
    margin-bottom: 20px;
    justify-content: space-between;
  }

  .doctors-grid {
    display: flex;
    flex-wrap: nowrap;
    gap: 30px;
    justify-content: space-between;
    padding: 20px 0px;
  }

  .doctor {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 60px 20px; 
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    align-items: center; /* Vertically center the content */
    width: 350px;
    display: flex;
  }

  .profile-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    border-radius: 50%;
    background-color: #e9e9e9;
    margin: 0 0 30px 100px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
  }

  .profile-icon i {
    font-size: 34px;
    color: #15a7dd;
  }
h4{
  font-size: 20px;
}
  .doctor-info {
    flex: 1;
  }

  .doctor-info p {
    margin: 0;
    margin-bottom: 5px;
  }

  .doctor-info p:first-child {
    font-weight: bold;
  }

  .doctor-info p:last-child {
    font-size: 14px;
    color: #666;
  }

  /* Custom Scrollbar Styling */
  .doctors-grid-container::-webkit-scrollbar {
    width: 10px; /* Width of the scrollbar */
    height: 4px; /* Width of the scrollbar */
    display: none;
  }

  .doctors-grid-container::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color of the scrollbar track */
    border-radius: 5px; /* Rounded corners */
  }

  .doctors-grid-container::-webkit-scrollbar-thumb {
    background: #888; /* Color of the scrollbar thumb */
    border-radius: 5px; /* Rounded corners */
  }

  .doctors-grid-container::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color of the scrollbar thumb on hover */
  }
 

  .specialities-grid,
  .services-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 30px;
    text-align: center;
    margin: 40px 0;
  }

  .service-box,
  .speciality-box {
    padding: 60px;
    border-radius: 8px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
  }

  .service-box h4,
  .speciality-box h4 {
    margin-bottom: 10px;
    color: #274247;
  }

  .service-box p,
  .speciality-box p {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    margin-bottom: 5px;
  }

  .service-box i,
  .speciality-box i {
    font-size: 44px;
    color: #15a7dd;
    margin-bottom: 10px;
  }

  .reviews-section {
    margin-top: 40px;
    /* Add some extra top margin for better separation */
  }

  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    text-align: center;
  }

  .profile-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #e9e9e9;
    margin-right: 20px;
    margin-left: 0;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
  }

  .profile-icon i {
    font-size: 34px;
    color: #15a7dd;
  }

  .review-content {
    flex: 1;
  }
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #333;
}
  .review-content p {
    margin-bottom: 10px;
    line-height: 1.4;
  }

  .review-content p:first-child {
    font-size: 18px;
    font-weight: bold;
    color: #274247;
  }

  .review-content p:last-child {
    font-size: 14px;
    color: #666;
  }

  .fas.fa-star {
    color: #ffc107; /* Change the star color to yellow */
  }

  form {
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    max-width: 500px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    margin: auto;
    text-align: left;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #274247;
  }

  label {
    font-weight: bold;
    margin-bottom: 8px;
    color: #274247;
  }

  input,
  textarea {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
  }

  textarea {
    resize: none;
  }

  button[type="submit"] {
    background-color: #274247;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button[type="submit"]:hover {
    background-color: #1a2d38;
  }
  .reviews-section {
    margin-top: 20px;
    text-align: center;
  }

  .reviews-container {
    overflow-x: scroll; /* Enable horizontal scrolling */
    margin-bottom: 60px;
    margin-top: 60px;
    
  }

  .reviews-grid {
    display: flex; /* Use flexbox for the grid */
    flex-wrap: nowrap; /* Prevent items from wrapping to new lines */
    gap: 10px; /* Add spacing between reviews */
    
  }
  .fas.fa-star.black-border {
    color: #e5dfdf; /* Change the star color to black */
  }

  .back-button {
    background-color: #007bff;
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    outline: none;
    position: absolute;
    top: 120px;
    margin-top: 20px;
    margin-left: 5px;
    /* margin-top: 40px; */
  }

  .back-button:hover {
    background-color: #ff0202;
  }

  .back-button:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
</style>
