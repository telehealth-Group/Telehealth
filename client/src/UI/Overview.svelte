<script>
  // @ts-nocheck
  import Dashboard from "./Dashboard.svelte";
  import Patient from "./Patient.svelte";
  import Doctor from "./Doctor.svelte";
  import Appointment from "./Appointment.svelte";

  let activeSession = "Dashboard";

  let handleSessionChange = (session) => {
    activeSession = session;
    console.log(activeSession);
  };
</script>

<main>
  <nav class="vertical--header">
    <ul>
      <li>
        <button onclick={handleSessionChange("Dashboard")}>Dashboard</button>
      </li>
      <li class:selected={activeSession === "Doctors"}>
        <button onclick={handleSessionChange("Doctors")}>Doctors</button>
      </li>
      <li>
        <button onclick={handleSessionChange('Patients')}>Patients</button>
      </li>
      <li>
        <button onclick={handleSessionChange('Appointment')}>Appointment</button
        >
      </li>
      <li>
        <button onclick={handleSessionChange('Setting')}>Setting</button>
      </li>
      <li>
        <button onclick={handleSessionChange('Reports')}>Reports</button>
      </li>
    </ul>
  </nav>

  <section>
    {#if activeSession === "Dashboard"}
      <Dashboard />
    {:else if activeSession === "Patient"}
      <Patient />
    {:else if activeSession === "Doctors"}
      <Doctor />
    {:else if activeSession === "Appointment"}
      <Appointment />
    {/if}
  </section>
</main>

<style>
  main {
    display: flex;
    height: 100vh;
  }
  .vertical--header {
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
    width: 200px;
    text-align: left;
  }

  button:hover {
    background-color: #f0f0f0;
    color: #555;
  }

  button:focus {
    outline: none;
  }
</style>
