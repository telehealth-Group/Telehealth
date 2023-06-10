<script>
    import { hospitals, appointments, patients } from '../store.js';
  
    let subscribedHospitals = [];
  
    // Subscribe to the hospitals store
    hospitals.subscribe(value => {
      subscribedHospitals = value; // Assuming value.data contains the array of hospitals
    });
  </script>
  
  <h1>Hospitals</h1>
  <ul>
    {#each $hospitals as hospital}
      <li>{hospital.name}</li>
    {/each}
  </ul>
  