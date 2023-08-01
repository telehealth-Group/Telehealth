<!-- AddHospital.svelte -->
<script>
    import axios from "axios";
    // @ts-ignore
    import { onMount } from "svelte";
  
    let password = "";
    let passwordConfirm = "";
  
    // Function to handle the form submission and send the POST request
    function handleSubmit(event) {
      event.preventDefault();
  
      // Check if the password and password confirmation match
      if (password !== passwordConfirm) {
        alert("Password and Password Confirmation do not match!");
        return;
      }
  
      const form = event.target;
      const formData = new FormData(form);
  
      const hospitalData = {
        name: formData.get("name"),
        phoneNumber: formData.get("phoneNumber"),
        email: formData.get("email"),
        locations: [
          {
            type: "Point",
            coordinates: [
              // @ts-ignore
              parseFloat(formData.get("longitude")),
              // @ts-ignore
              parseFloat(formData.get("latitude")),
            ],
            address: formData.get("address"),
            description: formData.get("description"),
          },
        ],
        // @ts-ignore
        services: formData.get("services").split(",").map((service) => service.trim()),
        // @ts-ignore
        specialities: formData.get("specialities").split(",").map((speciality) => speciality.trim()),
        doctors: [],
        active: true,
        password: password,
        passwordConfirm: passwordConfirm
      };
  console.log(hospitalData);
      axios
        .post("http://127.0.0.1:3000/api/users/hospital/", hospitalData)
        .then((response) => {
            console.log(response);
          // Handle the successful response here
          console.log("Hospital added successfully!");
          console.log(response.data);
          form.reset(); // Clear form fields after successful submission
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error adding hospital:", error);
        });
    }
  </script>
  
  <div class="container">
    <!-- Hospital Form -->
    <form on:submit={handleSubmit}>
      <div class="form-group">
        <label for="name">Hospital Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="form-group">
        <label for="latitude">Latitude</label>
        <input type="number" id="latitude" name="latitude" step="any" required />
      </div>
      <div class="form-group">
        <label for="longitude">Longitude</label>
        <input type="number" id="longitude" name="longitude" step="any" required />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input type="text" id="address" name="address" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" rows="3" required></textarea>
      </div>
      <div class="form-group">
        <label for="services">Services (separated by commas)</label>
        <input type="text" id="services" name="services" required />
      </div>
      <div class="form-group">
        <label for="specialities">Specialities (separated by commas)</label>
        <input type="text" id="specialities" name="specialities" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" bind:value={password} required />
      </div>
      <div class="form-group">
        <label for="passwordConfirm">Confirm Password</label>
        <input type="password" id="passwordConfirm" name="passwordConfirm" bind:value={passwordConfirm} required />
      </div>
      <button type="submit" class="custom-button">
        <i class="fas fa-hospital"></i> Add Hospital
      </button>
    </form>
  </div>
  
  <style>
    /* ... (existing style content) ... */
  
    /* Add custom styles for the form */
    form {
      max-width: 500px;
      margin: 0 auto;
    }
  
    .form-group {
      margin-bottom: 20px;
    }
  
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
  
    input,
    textarea {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 16px;
    }
  
    textarea {
      resize: vertical;
    }
  
    /* Style the Add Hospital button */
    .custom-button {
      background-color: #6C5CE7;
      color: #ffffff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
      cursor: pointer;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
    }
  
    .custom-button:hover {
      background-color: #593de6;
    }
  
    .custom-button:focus {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
  
    /* Style the Font Awesome icon within the button */
    .custom-button i {
      margin-right: 8px;
    }
    </style>