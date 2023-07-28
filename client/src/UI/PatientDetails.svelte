<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let patientData;

  function closeDetails() {
    dispatch("closeDetails");
  }

  let selectedTab = null;
  let newDiagnosis = "";

  function toggleTab(tab) {
    selectedTab = selectedTab === tab ? null : tab;
  }

  function addDiagnosis(key) {
    if (newDiagnosis) {
      // Check if the medical history entry exists
      if (!patientData.medicalHistory.hasOwnProperty(key)) {
        patientData.medicalHistory[key] = newDiagnosis;
      } else {
        patientData.medicalHistory[key] += `, ${newDiagnosis}`;
      }
      // Clear the input field after adding the diagnosis
      newDiagnosis = "";
    }
  }
</script>

<main class="patient-details" style="background: #fff;">

  <div class="header" style="background: #6d98c8;">
    <h2><i class="fas fa-user-injured"></i> {patientData.name}</h2>
    
    <button class="close-btn" on:click={closeDetails}>
       <i class="fas fa-times"></i>
    </button>

  </div>

  <div class="patient-info" style="background: #f5f5f5;">
    <p><i class="fas fa-envelope"></i> <span>Email:</span> {patientData.email}</p>
    <p><i class="fas fa-phone"></i> <span>Phone:</span> {patientData.phone || "N/A"}</p>
    <p><i class="fas fa-venus-mars"></i> <span>Sex:</span> {patientData.gender || "N/A"}</p>
    <p><i class="fas fa-birthday-cake"></i> <span>Age:</span> {patientData.age || "N/A"}</p>
  </div>

  <h3><i class="fas fa-file-medical"></i> Medical History</h3>

  <div class="medical-history">

    {#each Object.entries(patientData.medicalHistory) as [key, value]}
      
      <div class="tab">
      
        <h4 
          class="tab-header"
          class:active={selectedTab === key}
          on:click={() => toggleTab(key)}
        >
          {key}
        </h4>

        {#if selectedTab === key}
        
          <p class="tab-content">
            {value || "N/A"}  
          </p>
        
          {#if key === "diagnosticTestsResults"}
          
            <div class="add-diagnosis">
              <input type="text" bind:value={newDiagnosis} placeholder="Add Diagnosis">
              <button on:click={() => addDiagnosis(key)}>
                <i class="fas fa-plus-circle"></i> Add
              </button>
            </div>
            
          {/if}
          
        {/if}
        
      </div>
      
    {/each}

  </div>

</main>

<style>

  .patient-details {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .header {
    display: flex; 
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  .patient-details {
    background: #f0f5ff; 
  }
  
  .close-btn {
    color: #6d5dfc;
  }
  
  .tab-header {
    border-bottom-color: #aac0ff;
  }
  
  .tab-header.active {
    border-color: #3b67d6;
  }
  h2 {
    margin: 0;
    font-size: 2rem;
  }

  .close-btn {
    background: none;
    border: none;
    color: #555;
    font-size: 1.25rem;
  }

  .patient-info {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 0.25rem;
    margin-bottom: 1rem;    
  }

  span {
    font-weight: bold;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .medical-history {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1rem;
  }

  .tab {
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    padding: 1rem;
  }

  .tab-header {
    margin: 0 0 0.5rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
  }
  
  .tab-header.active {
    border-color: #007bff;
  }

  .tab-content {
    font-size: 0.9rem;
  }
  .close-btn {
    color: #396E94; cursor: pointer;
  }

  .tab-header {
    border-bottom-color: #d2c7b8;
  }
  
  .tab-header.active {
    border-color: #7F4A2E;
  }
  .add-diagnosis {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .add-diagnosis input {
    flex: 1;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
  }

  .add-diagnosis button {
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .add-diagnosis button:hover {
    background-color: #0056b3;
  }.close-btn {
  color: #fff; 
}

.tab-header {
  border-bottom-color: #b3cde0;
}

.tab-header.active {
  border-color: #045881; 
}.header {
  background: #6d98c8;
  padding: 1rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;  
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  transition: color 0.2s;
  cursor: pointer;
}

.close-btn:hover {
  color: #ddd;
}

.patient-info {
  background: #f5f5f5;
  padding: 1rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  display: flex;justify-content: space-between;
}

.info-item {
  flex: 1; 
  text-align: center; justify-content: space-between;
}

.info-item i {
  font-size: 1.5rem;
  color: #6d98c8;
  margin-bottom: 0.5rem;
}

.medical-history {
  max-width: 800px;
  margin: 0.1rem auto;
}

.tab {
  background: transparent;
  border: none;
  padding: 0;padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1),  
              0 1px 2px 0 rgba(0,0,0,0.06);
  margin-bottom: 1.5rem;
}

.tab-header {
  position: relative;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;  
}

.tab-header::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background: #6d98c8;
  transition: width 0.3s; 
}

.tab-header.active::after {
  width: 100%;
} 

.tab-content {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.add-diagnosis {
  max-width: 500px;
  margin-top: 2rem;  
}
</style>