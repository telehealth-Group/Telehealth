<script>
    import { hospitals } from "../store.js";
    import { onDestroy } from "svelte";
  
    let subscribedHospitals = [];
  
    // Subscribe to the hospitals store
    const unsubscribe = hospitals.subscribe((value) => {
      // @ts-ignore
      subscribedHospitals = value.data.hospitals;
    });
  
    // Unsubscribe from the store when the component is destroyed
    onDestroy(() => {
      unsubscribe();
    });
    
    // Function to get the appropriate icon and color based on the hospital's speciality
    function getSpecialityIcon(speciality) {
      switch (speciality) {
        case 'Cardiology':
          return { icon: 'fas fa-heart', color: '#FF7675' };
        case 'Dermatology':
          return { icon: 'fas fa-spa', color: '#74B9FF' };
        case 'Orthopedics':
          return { icon: 'fas fa-bone', color: '#55E6C1' };
        // Add more cases for other specialities
        default:
          return { icon: 'fas fa-hospital', color: '#CED6E0' };
      }
    }
  </script>
  
  <div class="container">
    <h1>Hospitals</h1>
    {#if subscribedHospitals.length > 0}
      <ul class="hospital-list">
        {#each subscribedHospitals as hospital}
          <li class="hospital-item">
            <div class="hospital-details">
              <div class="hospital-info">
                <p class="hospital-name">
                    <i class="fas fa-hospital" style="color: #6C5CE7"></i>
                    {hospital.name}
                  </p>
                  <p class="hospital-email">
                    <i class="far fa-envelope"></i>
                    <strong>Email:</strong> {hospital.email}
                  </p>
                  <p class="hospital-phone">
                    <i class="fas fa-phone-alt"></i>
                    <strong>Phone Number:</strong> {hospital.phoneNumber}
                  </p>
                <p class="hospital-services">
                  <strong>Services:</strong>
                  {#each hospital.services as service}
                    <span>{service}</span>
                  {/each}
                </p>
                <p class="hospital-specialities">
                  <strong>Specialities:</strong>
                  {#each hospital.specialities as speciality}
                    <!-- Speciality Icon -->
                    {#if speciality in ["Cardiology", "Dermatology", "Orthopedics"]}
                      <span style="background-color: {getSpecialityIcon(speciality).color}">
                        <i class="{getSpecialityIcon(speciality).icon}"></i>
                        {speciality}
                      </span>
                    {:else}
                      <span>
                        <i class="fas fa-hospital" style="color: #CED6E0"></i>
                        {speciality}
                      </span>
                    {/if}
                  {/each}
                </p>
                <ul class="hospital-locations">
                  {#each hospital.locations as location}
                    <li>
                      <p class="location-address">
                        <strong>Address:</strong> {location.address}
                      </p>
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="no-hospitals">No hospitals found.</p>
    {/if}
  </div>
  
  <style>
    .container {
      width: auto;
      margin: 0 auto;
      padding: 0 ;
      background-color: #f5f5f5;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    h1 {
      font-size: 24px;
      margin-bottom: 16px;
      text-align: center;
    }
  
    .hospital-list {
      list-style-type: none;
      padding: 0 20px;
      display: grid;
      grid-template-columns: repeat(3,1fr);
      grid-gap: 20px;
    }
  
    .hospital-item {
      padding: 20px;
      background-color: #ffffff;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
    }
  
    .hospital-name {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
    }
  
    .hospital-name i {
      margin-right: 8px;
      font-size: 24px;
    }
  
    .hospital-email,
    .hospital-phone {
      margin-bottom: 4px;
    }
  
    .hospital-services,
    .hospital-specialities {
      margin-bottom: 8px;
    }
  
    .hospital-services span,
    .hospital-specialities span {
      display: inline-flex;
      align-items: center;
      background-color: #f2f2f2;
      padding: 4px 8px;
      border-radius: 4px;
      margin-right: 4px;
    }
  
    .hospital-services span i,
    .hospital-specialities span i {
      margin-right: 4px;
    }
  
    .hospital-locations {
      font-weight: bold;
      margin-bottom: 8px;
      padding: 0;
      list-style-type: none;
    }
  
    .location-address {
      margin: 0;
      margin-bottom: 4px;
    }
  
    .doctors-container {
      margin-top: 20px;
    }
  
    .doctors-heading {
      font-weight: bold;
      margin-bottom: 8px;
    }
  
    .no-hospitals {
      text-align: center;
      font-size: 16px;
      margin-top: 20px;
    }
  </style>
  