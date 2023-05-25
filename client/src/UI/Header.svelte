<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let role = 'user';
  const dispatch = createEventDispatcher();

  let isLogoutBoxVisible = false;

  function handleLogout() {
    isLogoutBoxVisible = true;
  }

  function handleConfirmLogout() {
    // Perform logout logic here
    // ...

    // Dispatch an event to notify parent components
    dispatch('logout');
  }

  onMount(() => {
    function handleClickOutside(event) {
      if (event.target.closest('.logout-box')) return;
      isLogoutBoxVisible = false;
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<section class="header">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <div class="logo">
    <i class="fas fa-medkit"></i>
    <h3>Telehealth</h3>
  </div>
  {#if role === 'admin' || role === 'user' || role === 'doctor'}
    <div class="user-section">
      <span class="username" on:click={handleLogout}>John Doe</span>
      {#if isLogoutBoxVisible}
        <div class="logout-box">
          <p>Are you sure you want to logout?</p>
          <button on:click={handleConfirmLogout}>Logout</button>
        </div>
      {/if}
    </div>
  {/if}
</section>

<style>
  section.header {
    border: 1px solid #000;
    padding: 20px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo i {
    font-size: 24px;
  }

  .logo h3 {
    margin: 0;
    font-size: 20px;
  }

  .user-section {
    position: relative;
    cursor: pointer;
  }

  .username {
    font-size: 18px;
    font-weight: bold;
  }

  .logout-box {
    position: absolute;
    top: 30px;
    right: 0;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .logout-box p {
    margin: 0;
    margin-bottom: 10px;
  }

  .logout-box button {
    padding: 6px 12px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
