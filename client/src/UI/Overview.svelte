<script>
  import Dashboard from "./Dashboard.svelte";
  import Patient from "./Patient.svelte";
  import Appointment from "./Appointment.svelte";
  import PatientDashboard from "./patientDashboard.svelte";
  import Doctor from "./Doctor.svelte";
  import DoctorDashboard from "./DoctorDashboard.svelte";
  import Settings from "./settings.svelte";

  export let role;
  export let user;
  console.log(user, "from overview");

  let activeSection = "Dashboard";

  const handleSectionChange = (section) => {
    activeSection = section;
  };
</script>

<main>
  <nav class="vertical-header">
    <ul>
      <!-- <li>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <nav>
          <h3 class="logo">Telehealth<i class="fas fa-medkit" /></h3>
        </nav>
      </li> -->
      <li class:selected={activeSection === "Dashboard"}>
        <button on:click={() => handleSectionChange("Dashboard")}
          >🏠 Dashboard</button
        >
      </li>
      {#if role === "admin" || role === "superAdmin"}
        <li class:selected={activeSection === "Doctors"}>
          <button on:click={() => handleSectionChange("Doctors")}
            >👨‍⚕️ Doctors</button
          >
        </li>
      {/if}
      {#if role === "doctor" || role === "admin" || role === "superAdmin"}
        <li class:selected={activeSection === "Patients"}>
          <button on:click={() => handleSectionChange("Patients")}
            >👥 Patients</button
          >
        </li>
      {/if}
      {#if role === "doctor" || role === "admin" || role === "patient"}
        <li class:selected={activeSection === "Appointment"}>
          <button on:click={() => handleSectionChange("Appointment")}
            >📅 Appointment</button
          >
        </li>
      {/if}
      <li class:selected={activeSection === "Settings"}>
        <button on:click={() => handleSectionChange("Settings")}
          >⚙️ Settings</button
        >
      </li>
      {#if role === "admin" || role === "superAdmin" || role === "doctor"}
        <li class:selected={activeSection === "Reports"}>
          <button on:click={() => handleSectionChange("Reports")}
            >📊 Reports</button
          >
        </li>
      {/if}
    </ul>
  </nav>

  <section class="section-content">
    {#if activeSection === "Dashboard"}
      {#if role === "patient"}
        <PatientDashboard />
      {:else if role === "doctor"}
        <DoctorDashboard />
      {:else}
        <Dashboard />
      {/if}
    {:else if activeSection === "Doctors"}
      <Doctor />
    {:else if activeSection === "Patients"}
      <Patient />
    {:else if activeSection === "Appointment"}
      <Appointment />
    {:else if activeSection === "Settings"}
      <Settings {user}/>
    {/if}
  </section>
</main>

<style>
  main {
    display: flex;
    height: 100vh;
  }

  /* Updated styles for the fixed sidebar */
  .vertical-header {
    width: 200px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
    height: inherit;
    flex-shrink: 0;
    position: fixed; /* Add fixed positioning */
    top: 0; /* Ensure the sidebar starts from the top */
    bottom: 0; /* Extend the sidebar to the bottom */
    left: 0; /* Stick the sidebar to the left */
    display: block;
    margin-top: 88px;
    z-index: 1000;
  }

  .section-content {
    width: calc(
      100% - 200px
    ); /* Adjust the width to accommodate the fixed sidebar */
    margin-left: 200px; /* Add left margin to create space for the sidebar */
    /* padding: 20px; */
    background-color: #ffffff;
    box-sizing: border-box;
    overflow-y: auto; /* Add scrollbar for content overflow */
    margin-top: 80px;
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

  .vertical-header li.selected button {
    font-weight: bold;
  }
</style>
