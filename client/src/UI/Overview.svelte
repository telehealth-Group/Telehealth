<script>
  import Dashboard from "./Dashboard.svelte";
  import Patient from "./Patient.svelte";
  import Appointment from "./Appointment.svelte";
  import PatienDashboard from "./patienDashboard.svelte";

  export let role;

  export let data;
  let activeSection = "Dashboard";

  const handleSectionChange = (section) => {
    activeSection = section;
  };
  console.log(data)
</script>

<main>
  <nav class="vertical-header">
    <ul>
      <li class:selected={activeSection === "Dashboard"}>
        <button on:click={() => handleSectionChange("Dashboard")}
          >Dashboard</button
        >
      </li>
      {#if role === "doctor" || role === "admin" || role === "superAdmin"}
        <li class:selected={activeSection === "Patients"}>
          <button on:click={() => handleSectionChange("Patients")}
            >Patients</button
          >
        </li>
      {/if}
      <li class:selected={activeSection === "Appointment"}>
        <button on:click={() => handleSectionChange("Appointment")}
          >Appointment</button
        >
      </li>
      <li class:selected={activeSection === "Settings"}>
        <button on:click={() => handleSectionChange("Settings")}
          >Settings</button
        >
      </li>
    </ul>
  </nav>

  <section>
    {#if activeSection === "Dashboard"}
      {#if role === "patient"}
        <PatienDashboard />
      {:else}
        <Dashboard />
      {/if}
    {:else if activeSection === "Patients"}
      <Patient />
    {:else if activeSection === "Appointment"}
      <Appointment />
    {/if}
  </section>
</main>

<style>
  main {
    display: flex;
    height: 100vh;
  }

  .vertical-header {
    width: 200px;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 5px;
    height: inherit;
  }

  .selected {
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  button {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.3s, color 0.3s;
    width: 100%;
    text-align: left;
  }

  button:hover {
    background-color: #f0f0f0;
    color: #555;
  }

  button:focus {
    outline: none;
  }

  section {
    flex: 1;
    padding: 20px;
  }
</style>
