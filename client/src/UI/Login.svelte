<script>
    import axios from 'axios'
    import { createEventDispatcher } from 'svelte';
    let dispacher = createEventDispatcher();
    let email = "";
    let password = "";
    export let data 
   let errorMessage = "";
  
   async function login() {
     let data ={
        email:email,
        password:password
     }
      try {
          const response = await axios.post('http://127.0.0.1:3000/api/users/login', data)
          data = response.data
          dispacher('dataReceived', data);

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
          <input type="text" id="username" bind:value="{email}" />
          <label for="password">Password</label>
          <input type="password" id="password" bind:value="{password}" />
          <button on:click="{login}">Login</button>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    /* Styles from previous code */
  
    .content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f2f2f2;
      width: 100%;
    }
  
    .login-form {
      max-width: 400px;
      padding: 20px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  </style>
  