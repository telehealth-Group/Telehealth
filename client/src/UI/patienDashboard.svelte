<script>
  // @ts-nocheck

  import { hospitals, appointments } from '../store.js';

  // Assume hospitals is an array of hospital objects

  // Function to filter hospitals based on search query
  console.log($hospitals);
  let searchQuery = '';
</script>

<div class="container">
  <input type="text" class="search-input" bind:value={searchQuery} placeholder="Search hospitals" />

  <div class="hospital-grid">
    {#each $hospitals.hospitals as hospital}
      <div class="hospital-item">
        <h3 class="hospital-name">{hospital.name}</h3>
        <div class="hospital-details">
          <div class="hospital-info">
            <span class="info-label">Phone:</span>
            <span class="info-value">{hospital.phoneNumber}</span>
          </div>
          <div class="hospital-info">
            <span class="info-label">Email:</span>
            <span class="info-value">{hospital.email}</span>
          </div>
          <div class="hospital-info">
            <span class="info-label">Services:</span>
            <span class="info-value">{hospital.services.join(', ')}</span>
          </div>
          <div class="hospital-info">
            <span class="info-label">Specialities:</span>
            <span class="info-value">{hospital.specialities.join(', ')}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .search-input {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 2px solid #ddd;
    font-size: 18px;
    transition: border-color 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: #5c6ac4;
  }

  .hospital-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
  }

  .hospital-item {
    background-color: #f5f5f5;
    border-radius: 6px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .hospital-item:hover {
    transform: translateY(-5px);
  }

  .hospital-name {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
  }

  .hospital-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-top: 20px;
  }

  .hospital-info {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .info-label {
    font-weight: 500;
    width: 80px;
    color: #777;
  }

  .info-value {
    flex-grow: 1;
    color: #333;
  }
</style>
