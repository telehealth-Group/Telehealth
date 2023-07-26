<script>
  import axios from "axios";
  import { createEventDispatcher } from "svelte";

  let dispatcher = createEventDispatcher();
  let name = "";
  let phone = "";
  let email = "";
  let password = "";
  let passwordConfirmation = "";
  let age = null;
  let gender = "";
  export let data;
  async function signUp() {
    const userData = {
      name: name,
      phone: phone,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      age: age,
      gender: gender
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/users/signUp",
        userData
      );
      data = response.data.data
      // Handle success, redirect or show success message
      dispatcher("signUpDataReceived", data);
    } catch (error) {
      console.log(error.response.data.message);
      // Handle error, display error message
    }
  }
</script>

<div class="container">
  <div class="signup-form">
    <h2>Create an Account</h2>
    <label for="name">Name</label>
    <input type="text" id="name" bind:value={name} />

    <label for="phone">Phone</label>
    <input type="text" id="phone" bind:value={phone} />

    <label for="email">Email</label>
    <input type="text" id="email" bind:value={email} />

    <label for="password">Password</label>
    <input type="password" id="password" bind:value={password} />

    <label for="passwordConfirmation">Confirm Password</label>
    <input
      type="password"
      id="passwordConfirmation"
      bind:value={passwordConfirmation}
    />

    <label for="age">Age</label>
    <input type="number" id="age" bind:value={age} />

    <label for="gender">Gender</label>
    <select id="gender" bind:value={gender}>
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <button on:click={signUp}>Sign Up</button>
  </div>
</div>

<style>
  /* Styles from previous code */

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f2f2f2;
  }

  .signup-form {
    width: 500px;
    padding: 20px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .signup-form h2 {
    margin: 0;
    font-size: 24px;
    text-align: center;
    color: #333;
  }

  .signup-form label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }

  .signup-form input[type="text"],
  .signup-form input[type="password"],
  .signup-form input[type="number"],
  .signup-form select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .signup-form input#address {
    margin-bottom: 10px; /* Add space between address field and sign-up button */
  }

  .signup-form button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .signup-form button:hover {
    background-color: #45a049;
  }
</style>
