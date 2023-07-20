<script>
// @ts-nocheck

  export let role;
  export let name
  let showDropdown = false;

  function logoutHandler() {
    showDropdown = !showDropdown;
  }
  console.log(role)

</script>

<section class="header">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <nav>
    <i class="fas fa-medkit"></i>
    <h3>Telehealth</h3>
  </nav>

  {#if role === 'doctor'}
  <div class="nav--button-group">
    <button class="nav--button-dropdown" on:click={logoutHandler}>
      Hi Dr.{name} 🙋‍♀️ Welcome <i class="fas fa-chevron-down"></i>
    </button>
    {#if showDropdown}
      <div class="dropdown-content">
        <button class="dropdown-item" onclick={logoutHandler}>Logout</button>
      </div>
    {/if}
  </div>
  {:else}
    <div class="nav--button-group">
      <button class="nav--button-dropdown" on:click={logoutHandler}>
        Hi {name} 🙋‍♀️ Welcome<i class="fas fa-chevron-down"></i>
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
    padding: 10px 30px 30px 20px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
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
