<script>
  import axios from "axios";
  import { createEventDispatcher } from "svelte";
  let isLoading = false;
  let dispatcher = createEventDispatcher();
  let email = "";
  let password = "";
  let data;
  let errorMessage = "";

  async function login() {
    isLoading = true;
    errorMessage = "";
    let requestData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/users/login",
        requestData
      );
      data = response.data.data;
      dispatcher("dataReceived", data);
      console.log(response);
    } catch (error) {
      errorMessage = error.response.data.message;
    }
  }
</script>

<div class="container">
  <div class="content">
    <div class="login-container">
      <div class="login-form">
        <h2>Login</h2>
        {#if errorMessage}
          <p class="error-message">{errorMessage}</p>
        {/if}
        <label for="email">Email</label>
        <input type="text" id="username" bind:value={email} />
        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password} />
        <button on:click={login}>Login</button>
        {#if isLoading}
          <div class="loading-spinner" />
        {/if}
      </div>
      <div class="additional">
        <div class="forgot-password">Forgot Password</div>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <div class="register">
          <a href="#" on:click={() => dispatcher("signup")}>Sign Up</a>
        </div>
      </div>
    </div>
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
    width: 100%;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .login-form {
    max-width: 400px;
    width: 100%;
  }

  .login-form h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .login-form label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .login-form input[type="text"],
  .login-form input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .login-form button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .login-form button:hover {
    background-color: #45a049;
  }

  .login-form .error-message {
    color: red;
    margin-top: 10px;
  }

  .additional {
    display: flex;
    justify-content: space-evenly;
    margin-top: 10px;
    font-size: 14px;
  }

  .forgot-password {
    color: #999;
    cursor: pointer;
    margin-right: 100px;
  }

  .register a {
    text-decoration: none;
    color: #4caf50;
  }

  .loading-spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin: 20px auto; /* Adjust the margin as needed */
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
