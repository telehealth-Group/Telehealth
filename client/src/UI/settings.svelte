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
      const response = await fetch('http://127.0.0.1:3000/api/users/updateOne', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error('Failed to update email');
      }

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
      const response = await fetch('http://127.0.0.1:3000/api/users/updatemypassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

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


      <!-- svelte-ignore a11y-label-has-associated-control -->
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
}

/* Profile header */
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
  font-size: 30px; /* Increased font size for the name */
  margin-left: 20px;
}

/* Form styles */
.form-group {
  margin-bottom: 30px; 
  display: flex;
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
  margin-top: 10px; /* Adjusted margin for better alignment */
}


/* Loading indicator styles */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.loading {
  border: 3px solid #007bff;
  border-top: 3px solid transparent;
  border-radius: 50%;
  width: 25px;
  height: 25px;
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
