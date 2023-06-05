<script>
// @ts-nocheck

    import { hospitals, appointments } from '../store.js';
  
    // export let hospitalss = [];
    // export let appointment = [];
  
    // hospitals.subscribe(value => {
    //   set(hospitalss, value);
    // });

    console.log(hospitals)
  </script>
  
  <div class="grid-container">
    <!-- {#each $hospitalss as hospital}
      <div class="grid-item">
        <h3>{hospital.name}</h3>
        <p>{hospital.email}</p>
        <p>{hospital.phoneNumber}</p>
        <p>{hospital.locations[0].address}</p>
        <ul>
          {#each hospital.services as service}
            <li>{service}</li>
          {/each}
        </ul>
        <ul>
          {#each hospital.specialities as speciality}
            <li>{speciality}</li>
          {/each}
        </ul>
      </div>
    {/each} -->
  </div>
  
  
  <style>
    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px;
    }
  
    .grid-item {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    h3 {
      font-size: 20px;
      margin-bottom: 10px;
    }
  
    p {
      margin: 5px 0;
    }
  
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  
    li {
      margin-bottom: 5px;
    }
  </style>
  