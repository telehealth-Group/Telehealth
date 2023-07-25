<script>
  export let user;
  let newName = user.name;
  let newEmail = user.email;
  let currentPassword = "";
  let newPassword = "";
  let newPasswordConfirm = "";
  let passwordError = "";
    let darkMode = false;

  let loading = false;

  async function updateName() {
    loading = true; // Show loading indicator
    try {
      const updatedProfile = {
        ...user,
        name: newName,
      };
      // Simulate API call success with a delay (replace this with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the user object with the updated profile
      user = updatedProfile;
    } catch (error) {
      console.error("Error updating name:", error);
    } finally {
      loading = false; // Hide loading indicator
    }
  }

  async function updateEmail() {
    loading = true; // Show loading indicator
    try {
      const updatedProfile = {
        ...user,
        email: newEmail,
      };
      // Simulate API call success with a delay (replace this with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the user object with the updated profile
      user = updatedProfile;
    } catch (error) {
      console.error("Error updating email:", error);
    } finally {
      loading = false; // Hide loading indicator
    }
  }

  async function updatePassword() {
    loading = true; // Show loading indicator
    // Perform validation
    if (newPassword !== newPasswordConfirm) {
      passwordError = "New password and confirmation do not match";
      loading = false; // Hide loading indicator
      return;
    }

    try {
      const updatedProfile = {
        ...user,
      };
      // Simulate API call success with a delay (replace this with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the user object with the updated profile
      user = updatedProfile;

      // Reset the password fields after successful update
      currentPassword = "";
      newPassword = "";
      newPasswordConfirm = "";
      passwordError = "";
    } catch (error) {
      console.error("Error updating password:", error);
    } finally {
      loading = false; // Hide loading indicator
    }
  }
</script>

<main class="profile">
  <div class="profile__header">
    <div class="profile__picture">
      <img src="profile.jpg" alt="Profile Picture" />

      <button class="profile__picture-edit">
        <i class="fas fa-camera" />
      </button>
    </div>

    <h2 class="profile__name">{user.name}</h2>
  </div>

  <h3>Patient Profile</h3>

  <form on:submit|preventDefault={updateEmail}>
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" bind:value={newName} />

      <button class="btn-edit" on:click={updateName}>
        <i class="fas fa-user-edit" /> Update Name
      </button>
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" bind:value={newEmail} />

      <button class="btn-edit" on:click={updateEmail}>
        <i class="fas fa-envelope" /> Update Email
      </button>
    </div>

    <div class="form-group">
      <label>Current Password</label>
      <input
        type="password"
        class="form-control"
        bind:value={currentPassword}
      />
    </div>

    <div class="form-group">
      <label>New Password</label>
      <input type="password" class="form-control" bind:value={newPassword} />
    </div>

    <div class="form-group">
      <label>Confirm New Password</label>
      <input
        type="password"
        class="form-control"
        bind:value={newPasswordConfirm}
      />
      {#if passwordError}
        <p class="error">{passwordError}</p>
      {/if}
    </div>

    <button class="btn-primary" on:click={updatePassword}>
      <i class="fas fa-lock" /> Update Password
    </button>
  </form>

  <!-- Loading Indicator -->
  {#if loading}
    <div class="loading-indicator">
      <div class="loading" />
    </div>
  {/if}
  <div class="toggle-container">
    <label for="darkModeToggle" class="toggle-label">
      <input
        type="checkbox"
        id="darkModeToggle"
        bind:checked={darkMode}
        on:change={toggleDarkMode}
      />
      <div class="toggle-button" />
    </label>
    <span class="toggle-text">Toggle Dark Mode</span>
  </div>
</main>

<style>
  :root {
    --primary: #007bff;
    --text: #333;

    --spacing-xs: 10px;
    --spacing-sm: 20px;
    --spacing-md: 30px;
    --spacing-lg: 40px;
  }

  /* Global Styles */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    background: #f1f5f9;
    color: var(--text);
  }

  h1,
  h2,
  h3 {
    margin: 0;
  }

  /* Profile Styles */

  .profile {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--spacing-lg);
    background: #fff;
    border-radius: 10px;
  }

  .profile__header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }

  .profile__picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid var(--primary);
    overflow: hidden;
    position: relative;
    margin-right: var(--spacing-md);
  }

  .profile__picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile__picture-edit {
    position: absolute;
    bottom: 0;
    right: 0;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
  }

  .profile__picture-edit:hover {
    background: #0062cc;
  }

  .profile__name {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }

  /* Form Styles */

  form {
    max-width: 400px;
    margin: var(--spacing-lg) auto 0;
  }

  .form-group {
    margin-bottom: var(--spacing-sm);
  }

  .form-group label {
    display: block;
    margin-bottom: var(--spacing-xs);
  }

  .form-control {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
  }

  .btn-edit {
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-edit:hover {
    background: #0062cc;
  }

  .btn-primary {
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: var(--spacing-sm);
  }

  .btn-primary:hover {
    background: #0062cc;
  }
  /* Dark mode styles */
  body.dark-mode {
    background-color: #1a1a1a;
    color: #fff;
  }

  /* Toggle styles */
  .toggle-container {
    display: flex;
    align-items: center;
    margin-top: var(--spacing-md);
  }

  .toggle-label {
    display: inline-block;
    position: relative;
    margin-right: var(--spacing-md);
  }

  .toggle-label input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-button {
    width: 40px;
    height: 20px;
    background-color: #ccc;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
  }

  .toggle-button:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.2s;
  }

  input[type="checkbox"]:checked + .toggle-button:before {
    transform: translateX(20px);
  }

  .toggle-text {
    font-size: 14px;
    color: var(--text);
  }

  /* Icon Styles */

  .fas {
    margin-right: var(--spacing-xs);
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #eee;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
  }
  button:focus {
    outline: 2px solid var(--primary);
  }

  /* Animations */
  .profile__picture {
    transition: transform 0.2s;
  }

  .profile__picture:hover {
    transform: scale(1.05);
  }

  /* Dark mode */
  body.dark-mode {
    background: #1a1a1a;
    color: #fff;
  }

  /* Loading indicator */
  .loading::after {
    content: "";
    display: inline-block;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    border: 5px solid;
    border-color: #fff #fff #fff transparent;
    animation: load 1s linear infinite;
  }

  @keyframes load {
    to {
      transform: rotate(360deg);
    }
  }

  /* Mobile */
  @media (max-width: 600px) {
    .profile {
      padding: var(--spacing-md);
    }

    .profile__header {
      flex-direction: column;
    }

    .profile__picture {
      align-self: center;
      margin: 0 0 var(--spacing-md) 0;
    }
  }

  input:focus {
    outline: none;
    border-color: var(--primary);
  }
  @media (max-width: 600px) {
    .profile {
      padding: var(--spacing-md);
    }

    .profile__header {
      flex-direction: column;
    }

    .profile__picture {
      align-self: center;
      margin: 0 0 var(--spacing-md) 0;
    }
  }

  .loading-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 999;
  }

  .loading {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
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
