<script>
// @ts-nocheck

  // You can add your script logic here
  import { onMount } from 'svelte';

  export let role = 'Doctor';
  let showDropdown = false;

  function logoutHandler() {
    showDropdown = !showDropdown;
  }

  onMount(() => {
    // Add your initialization logic here
  });
</script>

<section class="header">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <nav>
    <i class="fas fa-medkit"></i>
    <h3>Telehealth</h3>
  </nav>

  {#if role === 'Doctor'}
  <div class="nav--button-group">
    <button class="nav--button-dropdown" on:click={logoutHandler}>
      Hi Dr.Elizabeth 🙋‍♀️ Welcome <i class="fas fa-chevron-down"></i>
    </button>
    {#if showDropdown}
      <div class="dropdown-content">
        <button class="dropdown-item" onclick={logoutHandler}>Logout</button>
      </div>
    {/if}
  </div>
  {:else if role === 'Admin'}
    <div class="nav--button-group">
      <button class="nav--button-dropdown" on:click={logoutHandler}>
        Hi Mr.John Welcome <i class="fas fa-chevron-down"></i>
      </button>
      {#if showDropdown}
        <div class="dropdown-content">
          <button class="dropdown-item" onclick={logoutHandler}>Logout</button>
        </div>
      {/if}
    </div>
  {/if}
</section>

<style>
  section.header {
    padding: 10px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    text-align: center;
    border-radius: 5px;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  h3 {
    margin: 0;
    font-size: 20px; 
  }

  .nav--button-group {
    position: relative;
  }
  .nav--button-group button:hover {
    color: rgb(10, 182, 240);
  }

  .nav--button-dropdown {
    padding: 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 120px;
    padding: 8px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 4px 8px;
    background-color: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
  }
</style>
