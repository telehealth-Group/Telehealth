<!-- HospitalDetails.svelte -->
<script>
  // @ts-ignore
  import CreateAppointment from "./CreateAppointment.svelte";
  import { onDestroy } from "svelte";
  import { patients } from "../store.js";

  import { createEventDispatcher } from "svelte";
  export let hospital;
  export let close;
  let subscribedDoctors = [];

  const dispatch = createEventDispatcher();
  // Function to close the appointment details view
  function closeDetails() {
    // Emit a custom event to notify the parent component
    dispatch("closeDetails");
  }

  function createAppointment() {
    // Handle the logic to create a new appointment here
    // For example, you could show a form to select a doctor and time slot
    // and save the appointment details to the database or a store
    console.log("Creating a new appointment...");
  }

  const unsubscribePatients = patients.subscribe((value) => {
    // @ts-ignore
    subscribedDoctors = value.data.users.filter(
      (user) => user.role === "doctor"
    );
  });

  onDestroy(() => {
    unsubscribePatients();
  });

  let isLocationsArray = Array.isArray(hospital.locations);

  // Dummy reviews data (you can replace this with actual data from your store or API)
  let reviews = [
    { id: 1, author: "John Doe", rating: 4, comment: "Great hospital!" },
    { id: 2, author: "Jane Smith", rating: 5, comment: "Excellent service!" },
    {
      id: 3,
      author: "Mike Johnson",
      rating: 3,
      comment: "Average experience.",
    },
  ];

  // Function to add a new review
  let newReview = {
    author: "",
    rating: 1,
    comment: "",
  };

  function addReview() {
    // Validate the new review (you can add more complex validation if needed)
    if (newReview.author.trim() === "" || newReview.comment.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    // Push the new review into the reviews array
    reviews = [
      ...reviews,
      {
        id: reviews.length + 1,
        author: newReview.author,
        rating: newReview.rating,
        comment: newReview.comment,
      },
    ];

    // Clear the form fields for the next review
    newReview = {
      author: "",
      rating: 1,
      comment: "",
    };
  }
  function hasBlackBorder(rating) {
    return rating < 5;
  }
  // State to control whether the CreateAppointment component should be rendered
  let showCreateAppointment = false;

  // Function to toggle the CreateAppointment component
  function toggleCreateAppointment() {
    showCreateAppointment = !showCreateAppointment;
  }
</script>

{#if showCreateAppointment}
<CreateAppointment close={() => (showCreateAppointment = false)} />
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
    <!-- Navigation Bar -->
    <button class="back-button" on:click={closeDetails}>
      <i class="fas fa-arrow-left" />
    </button>
    <div class="navbar-container">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/services">Services</a>
      <a href="/contact">Contact</a>
    </div>
  </nav>

  {#if isLocationsArray}
    <!-- Container for PatientDashboard component -->
    <div id="patientDashboardContainer" />
    <div class="hero-section">
      <h1>Welcome to {hospital.name}</h1>
      <p>Providing Quality Healthcare Services</p>
    </div>
    <div class="hospital-details-container">
      <p>services</p>
      <p class="services-info">
        {#each hospital.services as service}
          <div class="service-box">
            <i class="fas fa-stethoscope" />
            <h4>{service}</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        {/each}
      </p>

      <p>Specialities</p>
      <div class="specialities-grid">
        {#each hospital.specialities as speciality}
          <div class="speciality-box">
            <i class="fas fa-certificate" />
            <h4>{speciality}</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        {/each}
      </div>
      <!-- Doctors Section -->
      <div class="doctors-section">
        <h4>Doctors</h4>
        <div class="doctors-grid-container">
          <div class="doctors-grid">
            {#each subscribedDoctors as doctor}
              <div class="doctor">
                <div class="profile-icon">
                  <div class="circle">
                    <i class="fas fa-user-md" />
                  </div>
                </div>
                <div class="doctor-info">
                  <p><strong>Name:</strong> {doctor.name}</p>
                  <p><strong>Speciality:</strong> {doctor.specialization}</p>
                  <p><strong>Experience:</strong> {doctor.experience} years</p>
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
      </div>

      <!-- Reviews Section -->
      <div class="reviews-section">
        <div class="reviews-container">
          <div class="reviews-grid">
            {#each reviews as review}
              <div class="review">
                <div class="profile-icon">
                  <div class="circle">
                    <i class="fas fa-user" />
                  </div>
                </div>
                <div class="review-content">
                  <p><strong>Author:</strong> {review.author}</p>
                  <p>
                    <strong>Rating:</strong>{" "}
                    {#each Array(5) as _, index}
                      <i
                        class="fas fa-star {hasBlackBorder(review.rating) &&
                        index === 4
                          ? 'black-border'
                          : ''}"
                      />
                    {/each}
                  </p>
                  <p><strong>Comment:</strong> {review.comment}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Form to add a new review -->
        <form on:submit|preventDefault={addReview}>
          <h4>Add a Review</h4>
          <label for="author">Author</label>
          <input
            type="text"
            id="author"
            bind:value={newReview.author}
            required
          />

          <label for="rating">Rating</label>
          <input
            type="number"
            id="rating"
            bind:value={newReview.rating}
            min="1"
            max="5"
            required
          />

          <label for="comment">Comment</label>
          <textarea
            id="comment"
            bind:value={newReview.comment}
            rows="4"
            required
          />

          <button type="submit" class="custom-button">Submit Review</button>
        </form>
      </div>
    </div>
  {:else}
    <p>No location information available.</p>
  {/if}

  <footer class="footer">
    <div class="footer-container">
      <!-- Footer Navigation Links -->
      <div class="footer-left">
        <h4>Navigation</h4>
        <div class="navbar-container">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
      </div>

      <!-- Hospital Name -->

      <!-- Social Icons -->
      <div class="footer-right">
        <div class="social-icons">
          <!-- Email with icon -->
          <!-- svelte-ignore a11y-missing-content -->
          <a
            href="mailto:contact@yourhospital.com"
            title="Email Us"
            class="fa fa-envelope"
          />

          <!-- Phone with icon -->
          <!-- svelte-ignore a11y-missing-content -->
          <a href="tel:+1234567890" title="Call Us" class="fa fa-phone" />

          <!-- Facebook with icon -->
          <!-- svelte-ignore a11y-missing-content -->
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a href="#" title="Facebook" class="fab fa-facebook" />

          <!-- Twitter with icon -->
          <!-- svelte-ignore a11y-missing-content -->
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a href="#" title="Twitter" class="fab fa-twitter" />

          <!-- Instagram with icon -->
          <!-- svelte-ignore a11y-missing-content -->
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a href="#" title="Instagram" class="fab fa-instagram" />
        </div>
      </div>
    </div>
    <div class="footer-center">
      <p>&copy; 2023 {hospital.name}. All rights reserved.</p>
    </div>
  </footer>
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
    opacity: 0.6;
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

  /* Navigation Bar Styling */
  nav {
    background-color: #274247;
    color: #ffffff;
    padding: 50px 0;
  }

  .navbar-container {
    max-width: 100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }

  .navbar a {
    color: #ffffff;
    text-decoration: none;
    padding: 8px 16px;
  }

  /* Hospital Details Styling */
  .hospital-details-container {
    width: 90%;
    /* max-width: 1000px; */
    margin: 20px auto;
    /* padding: 20px; */
    background-color: transparent;
    border-radius: 4px;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
    text-align: center;
  }

  /* Reviews Section Styling */
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
  /* Doctors Section Styling */
  /* Doctors Section Styling */
  .doctors-section {
    margin-top: 40px;
    overflow-x: auto; /* Enable horizontal scrolling */
  }

  .doctors-grid-container {
    display: flex; /* Create a flex container */
    overflow-x: scroll; /* Enable horizontal scrolling for the flex container */
    margin-bottom: 20px; /* Add some bottom margin for better separation */
    justify-content: space-between;
  }

  .doctors-grid {
    display: flex; /* Use flexbox for the grid */
    flex-wrap: nowrap; /* Prevent items from wrapping to new lines */
    gap: 30px; /* Add spacing between doctors */
    justify-content: space-between;
    padding: 20px 0px;
  }

  .doctor {
    /* flex: 0 0 auto; Ensure the doctors don't grow or shrink */
    /* min-width: 300px; Set a minimum width for each doctor card */
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 60px 20px; 
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    display: flex; /* Align items horizontally */
    align-items: center; /* Vertically center the content */
    width: 380px;
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
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
  }

  .profile-icon i {
    font-size: 34px;
    color: #15a7dd;
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
  /* Contact Us Section Styling */

  /* Footer Styling */
  footer {
    background-color: #274247;
    color: #ffffff;
    padding: 20px 0;
    text-align: center;
  }

  .footer-container {
    max-width: 960px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer p {
    margin: 0;
  }

  .social-icons {
    font-size: 24px;
  }

  .social-icons a {
    color: #ffffff;
    margin-right: 10px;
    text-decoration: none;
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
    /* background-color: #274247; */
    /* background-color: #fff; */
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
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
  }

  .profile-icon i {
    font-size: 34px;
    color: #15a7dd;
  }

  .review-content {
    flex: 1;
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
    text-align: left;
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
  .footer-left a {
    color: #ffffff;
    text-decoration: none;
    padding: 8px 8px;
  }
  .footer-left {
    display: flex;
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
    opacity: 0.6;
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
