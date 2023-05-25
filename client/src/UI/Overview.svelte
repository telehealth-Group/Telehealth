<script>
    import { onMount } from "svelte";
  
    import Dashboard from "./Dashboard.svelte";
    import Patient from "./Patient.svelte";
    import Doctor from "./Doctor.svelte";
    import Appointment from "./Appointment.svelte";
  
    let activeSection = "Doctors";
  
    const handleSectionChange = (section) => {
      activeSection = section;
    };
  
    // Trigger the handleSectionChange function with the activeSection value
    // when the component mounts to ensure a valid section is selected initially
    onMount(() => {
      handleSectionChange(activeSection);
    });
  </script>
  
  <main>
    <nav class="vertical--header">
      <ul>
        <li class:selected={activeSection === "Dashboard"}>
          <button on:click={() => handleSectionChange("Dashboard")}>Dashboard</button>
        </li>
        <li class:selected={activeSection === "Doctors"}>
          <button on:click={() => handleSectionChange("Doctors")}>Doctors</button>
        </li>
        <li class:selected={activeSection === "Patients"}>
          <button on:click={() => handleSectionChange("Patients")}>Patients</button>
        </li>
        <li class:selected={activeSection === "Appointment"}>
          <button on:click={() => handleSectionChange("Appointment")}>Appointment</button>
        </li>
        <li class:selected={activeSection === "Settings"}>
          <button on:click={() => handleSectionChange("Settings")}>Settings</button>
        </li>
        <li class:selected={activeSection === "Reports"}>
          <button on:click={() => handleSectionChange("Reports")}>Reports</button>
        </li>
      </ul>
    </nav>
  
    <section>
      {#if activeSection === "Dashboard"}
        <Dashboard />
      {:else if activeSection === "Patients"}
        <Patient />
      {:else if activeSection === "Doctors"}
        <Doctor />
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
  