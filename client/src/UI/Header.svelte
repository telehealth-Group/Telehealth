<script>
// @ts-nocheck
import axios from "axios";
  export let role;
  export let name
  let showDropdown = false;

  function dropHandler() {
    showDropdown = !showDropdown;
  }

  async function logoutHandler() {
    try {
      await axios.get('http://127.0.0.1:3000/api/users/logout');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
 }

</script>

<section class="header">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <nav>
    <i class="fas fa-medkit"></i>
    <h3>Telehealth</h3>
  </nav>

 
  <div class="nav--button-group">
    <button class="nav--button-dropdown" on:click={dropHandler}>
      Hi {name} 🙋‍♀️ Welcome <i class="fas fa-chevron-down"></i>
    </button>
    {#if showDropdown}
      <div class="dropdown-content">
        <button class="dropdown-item" on:click={logoutHandler}>Logout</button>
      </div>
    {/if}
  </div>
</section>

<style>
    section.header {
    padding: 10px 30px 30px 20px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    position: fixed; /* Add fixed positioning */
    top: 0; /* Stick the header to the top */
    left: 0; /* Ensure the header starts from the left */
    right: 0; /* Extend the header to the right */
    z-index: 999; /* Ensure the header stays above other content */
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
    color: rgb(31, 136, 171);
  }

  .nav--button-dropdown {
    padding: 1rem;
    border-radius: 5px;
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
