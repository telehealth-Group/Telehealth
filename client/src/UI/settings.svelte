<script>
  export let user;
  import axios from "axios";
  let newName = user.name;
  let newEmail = user.email;
  let currentPassword = "";
  let newPassword = "";
  let newPasswordConfirm = "";
  let passwordError = "";
  let loading = false;

  async function updateName() {
    loading = true; // Show loading indicator
     try {
      const updatedProfile = {
        ...user,
        name: newName,
      };
      console.log(user)
      const response = await axios.patch(`http://127.0.0.1:3000/api/users/updateOne/${user.user._id}`, updatedProfile);
  
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
      const response = await fetch(`http://127.0.0.1:3000/api/users/updateOne/${user.user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error('Failed to update email');
      }

      user = updatedProfile;
    } catch (error) {
      console.error("Error updating email:", error);
    } finally {
      loading = false; // Hide loading indicator
    }
  }

 async function updatePassword() {
  loading = true; 
  if (newPassword !== newPasswordConfirm) {
    passwordError = "New password and confirmation do not match";
    loading = false; // Hide loading indicator
    return;
  }

  try {
    const updatedProfile = {
      ...user,
      passwordCurrent: currentPassword, // Add the current password to the payload
      password: newPassword,
      passwordConfirm: newPasswordConfirm,
    };
    const response = await fetch(`http://127.0.0.1:3000/api/users/updatemypassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    });

    if (!response.ok) {
      throw new Error('Failed to update password');
    }

    user = updatedProfile;
    currentPassword = "";
    newPassword = "";
    newPasswordConfirm = "";
    passwordError = "";
  } catch (error) {
    console.error("Error updating password:", error);
  } finally {
    loading = false;
  }
}

</script>

<main class="profile">
  <div class="profile__header">
    <div class="profile__picture">
      <span class="user-icon-container">
        <i class="fas fa-user user-icon" />
      </span>
    
      <input type="file" id="fileInput" style="display: none" accept="image/*" />
      <label for="fileInput" class="profile__picture-edit">
        <i class="fas fa-camera" />
      </label>
    </div>

    <h2 class="profile__name">{user.user.name}</h2>
  </div>

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

  <!-- Loading Indicator -->
  {#if loading}
    <div class="loading-indicator">
      <div class="loading" />
    </div>
  {/if}
</main> 

<style>
.profile {
  max-width: 800px; /* Increased width for the settings */
  margin: 50px auto;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Open Sans',
}

h1, h2, h3 {
  font-family: 'Montserrat', sans-serif;
}
label {
  font-size: 20px;
  font-weight: 500;
}
.profile__header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 50px;
}

.user-icon-container {
  position: relative;
  width: 120px; /* Increased size for the user icon */
  height: 120px;
  border-radius: 50%;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.user-icon {
  font-size: 60px; /* Increased size for the user icon */
  color: #333;
  
}

.profile__picture-edit {
  position: absolute;
  bottom: 8px; /* Adjusted position for the edit icon */
  right: 8px;
  background-color: #44484c;
  color: #fff;
  padding: 6px; /* Adjusted padding for the edit icon */
  border-radius: 50%;
  cursor: pointer;
}

.profile__name {
  font-size: 30px; 
  margin-left: 20px;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  background: linear-gradient(to right, #845EC2, #d7a6c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
}

/* Form styles */
.form-group {
  margin-bottom: 30px; 
  width: 600px;
}

.form-control {
  width: 100%;
  padding: 14px; /* Increased padding for better readability */
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #404346;
}

.btn-edit,
.btn-primary {
  margin-top: 10px;
  padding: 14px 20px; /* Increased padding for buttons */
  background-color: #4547488b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #28a745;
  margin-top: 20px; /* Increased margin between the password section and the button */
}

.error {
  color: #dc3545;
  margin-top: 10px; 
   font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-style: italic;
}

/* Animation delays */
.form-group:nth-child(1) {
  animation-delay: 0s;
}

.form-group:nth-child(2) {
  animation-delay: 0.1s;  
}

.form-group:nth-child(3) {
  animation-delay: 0.2s;
}

/* Loading indicator styles */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.loading {
  border: 5px solid #ccc;
  border-top-color: #4285f4;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}


/* Add fade in animation when component loads */
.profile {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1; 
  }
}

/* Add slide up animation to form groups */
.form-group {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Loading indicator spin animation */  
.loading {
  border: 5px solid #ccc;
  border-top-color: #4285f4;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>
