<script>
    export let hospital;
    export let close;
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
  </script>
  
  <!-- HospitalDetails.svelte -->
  <nav class="navbar">
    <!-- Navigation Bar -->
    <div class="navbar-container">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/services">Services</a>
      <a href="/contact">Contact</a>
    </div>
  </nav>
  
  {#if isLocationsArray}
    <div class="hero-section">
      <h1>Welcome to {hospital.name}</h1>
      <p>Providing Quality Healthcare Services</p>
    </div>
    <div class="hospital-details-container">
      <!-- <h2>{hospital.name}</h2> -->
      <!-- <p>Email: {hospital.email}</p>
        <p>Phone Number: {hospital.phoneNumber}</p> -->
      <p class="services-info">
        {#each hospital.services as service}
          <div class="service-box">
            <i class="fas fa-stethoscope" />
            <h4>{service}</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        {/each}
      </p>
  
      <!-- Specialities Grid -->
      <div class="specialities-grid">
        {#each hospital.specialities as speciality}
          <div class="speciality-box">
            <i class="fas fa-certificate" />
            <h4>{speciality}</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        {/each}
      </div>
  
      <!-- Reviews Section -->
      <div class="reviews-section">
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
                  {#each Array(review.rating) as _}
                    <i class="fas fa-star" />
                  {/each}
                </p>
                <p><strong>Comment:</strong> {review.comment}</p>
              </div>
            </div>
          {/each}
        </div>
  
        <!-- Form to add a new review -->
        <form on:submit|preventDefault={addReview}>
          <h4>Add a Review</h4>
          <label for="author">Author</label>
          <input type="text" id="author" bind:value={newReview.author} required />
  
          <label for="rating">Rating</label>
          <input type="number" id="rating" bind:value={newReview.rating} min="1" max="5" required />
  
          <label for="comment">Comment</label>
          <textarea id="comment" bind:value={newReview.comment} rows="4" required />
  
          <button type="submit" class="custom-button">Submit Review</button>
        </form>
      </div>
    </div>
  {:else}
    <p>No location information available.</p>
  {/if}
  
  <!-- Contact Us Section -->
  <!-- <section class="contact-us">
    <div class="contact-us-container">
      <h2>Contact Us</h2>
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required />
  
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
  
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4" required />
  
        <button class="custom-button">Submit</button>
      </form>
    </div>
  </section> -->
  
  <footer class="footer">
    <div class="footer-container">
      <p>&copy; 2023 {hospital.name}. All rights reserved.</p>
      <div class="social-icons">
        <!-- Email with icon -->
        <a
          href="mailto:contact@yourhospital.com"
          title="Email Us"
          class="fa fa-envelope"
        />
  
        <!-- Phone with icon -->
        <a href="tel:+1234567890" title="Call Us" class="fa fa-phone" />
  
        <!-- Facebook with icon -->
        <a href="#" title="Facebook" class="fab fa-facebook" />
  
        <!-- Twitter with icon -->
        <a href="#" title="Twitter" class="fab fa-twitter" />
  
        <!-- Instagram with icon -->
        <a href="#" title="Instagram" class="fa fa-instagram" />
      </div>
    </div>
  </footer>
  
  <style>
    /* General Styling */
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
      padding: 10px 0;
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
      width: 80%;
      max-width: 1000px;
      margin: 20px auto;
      padding: 20px;
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
      justify-content: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 20px;
      margin-bottom: 10px;
    }
  
    .review p {
      margin: 0;
      margin-bottom: 5px;
    }
  
    .review p:first-child {
      font-weight: bold;
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
      margin: 0 auto;
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
      grid-gap: 20px;
      text-align: center;
      margin: 20px 0;
    }
  
    .service-box,
    .speciality-box {
      padding: 60px;
      border-radius: 8px;
      /* background-color: #274247; */
      /* background-color: #fff; */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
      font-size: 24px;
      color: #777;
      margin-bottom: 10px;
    }
  
    .reviews-section {
      margin-top: 40px; /* Add some extra top margin for better separation */
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
    }
  
    .profile-icon i {
      font-size: 24px;
      color: #777;
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
  
    .reviews-section h3 {
      margin-bottom: 20px;
      color: #274247;
    }
    form {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    width: 500px;
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
  </style>
  