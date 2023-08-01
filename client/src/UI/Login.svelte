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
          <div class="loading-container" class:visible={isLoading}>
          <div class="loading-spinner"/>
          <div class="loading-bg"></div>
          </div>
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
  background-image: url('../assets/telehealth.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 800px;
   display: flex;
  align-items: center; 
  justify-content: center;
}

.content {
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  width: 400px;
}

h2 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
}

label {
  display: block;
  text-transform: uppercase;
  font-size: 14px;
  color: #888;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  transition: border 0.3s ease;
  margin: 10px;
}

input:focus {
  border-color: #4caf50;
}

button {
  width: 100%;
  background: #536054;
  border: none;
  padding: 15px;
  color: #fff;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s ease; 
  margin-top: 10px;
}

button:hover {
  background: #45a049;
}

.error-message {
  text-align: center;
  color: #DC3545;
}

.additional {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 20px;
}

.forgot-password {
  color: #007bff;
  cursor: pointer;
}

.register a {
  color: #4c74af;
  text-decoration: none;
}
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
}

.loading-container.visible {
  display: flex;
}

.loading-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(160, 157, 157, 0.249); 
}
  .loading-spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin: 20px auto; /* Adjust the margin as needed */
    position: absolute;
  top: 47%; 
  left: 48%;
  transform: translateX(-50%);
  z-index: 1; 
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
