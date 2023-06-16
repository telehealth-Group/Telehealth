<script>
  import Dashboard from "./Dashboard.svelte";
  import Patient from "./Patient.svelte";
  import Appointment from "./Appointment.svelte";
  import Doctor from "./Doctor.svelte";
  import PatienDashboard from "./patienDashboard.svelte";
  import DoctorDashboard from "./DoctorDashboard.svelte";

  export let role;

  // Define options based on role
  let options = [];
  if (role === "admin" || role === "superAdmin") {
    options = [
      { label: "Dashboard", component: Dashboard },
      { label: "Doctors", component: Doctor },
      { label: "Patients", component: PatienDashboard },
      { label: "Settings", component: 'SettingsOptions' },
      { label: "Feedbacks", component: 'ReportsOptions' },
    ];
  } else if (role === "doctor") {
    options = [
      { label: "Dashboard", component: Dashboard },
      { label: "Patients", component: PatienDashboard },
      { label: "Appointment", component: Appointment },
      { label: "Settings", component: 'SettingsOptions' },
      { label: "Feedbacks", component: 'ReportsOptions' },
    ];
  } else if (role === "patient") {
    options = [
      { label: "Dashboard", component: PatienDashboard },
      { label: "Appointment", component: Appointment },
      { label: "Settings", component: 'SettingsOptions' },
    ];
  }

  let activeOption = options[0];

  const handleOptionChange = (option) => {
    activeOption = option;
  };
</script>

<main class="flex-container">
  <nav class="vertical-header">
    <ul>
      {#each options as option}
        <li class:selected={option === activeOption}>
          <button on:click={() => handleOptionChange(option)}>{option.label}</button>
        </li>
      {/each}
    </ul>
  </nav>

  <section>
    {#if activeSection === "Dashboard"}
      {#if role === "patient"}
        <h1>Not build yet</h1>
        <PatienDashboard/>
      {:else}
        <Dashboard />
      {/if}
    {:else if activeSection === "Doctors"}
      <Doctor />
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

  /* Sidebar navigation */
  .vertical-header {
    width: 200px;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 5px;
    height: 100%;
    box-sizing: border-box;
  }

  .vertical-header ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .vertical-header li {
    margin-bottom: 0.5rem;
  }

  .vertical-header button {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.3s, color 0.3s;
    width: 100%;
    text-align: left;
  }

  .vertical-header button:hover {
    background-color: #f0f0f0;
    color: #555;
  }

  .vertical-header button:focus {
    outline: none;
  }

  .vertical-header li.selected button {
    font-weight: bold;
  }

  /* Section content */
  .flex-item {
    flex: 1;
    padding: 20px;
    background-color: #ffffff;
    box-sizing: border-box;
  }
</style>





