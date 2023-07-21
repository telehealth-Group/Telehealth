<script>
  export let doctors = [
    {
      name: "Dr. John Doe",
      specialization: "Cardiology",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      location: "New York",
    },
    {
      name: "Dr. Jane Smith",
      specialization: "Dermatology",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      location: "Los Angeles",
    },
    {
      name: "Dr. Michael Johnson",
      specialization: "Orthopedics",
      email: "michael.johnson@example.com",
      phone: "456-789-0123",
      location: "Chicago",
    },
    {
      name: "Dr. Emily Wilson",
      specialization: "Pediatrics",
      email: "emily.wilson@example.com",
      phone: "789-012-3456",
      location: "Houston",
    },
    {
      name: "Dr. David Brown",
      specialization: "Ophthalmology",
      email: "david.brown@example.com",
      phone: "012-345-6789",
      location: "San Francisco",
    },
    {
      name: "Dr. Olivia Thompson",
      specialization: "Gynecology",
      email: "olivia.thompson@example.com",
      phone: "345-678-9012",
      location: "Miami",
    },
    {
      name: "Dr. Daniel Davis",
      specialization: "Neurology",
      email: "daniel.davis@example.com",
      phone: "678-901-2345",
      location: "Seattle",
    },
    {
      name: "Dr. Sophia Miller",
      specialization: "Psychiatry",
      email: "sophia.miller@example.com",
      phone: "901-234-5678",
      location: "Boston",
    },
    {
      name: "Dr. Ethan Wilson",
      specialization: "Dentistry",
      email: "ethan.wilson@example.com",
      phone: "234-567-8901",
      location: "Dallas",
    },
    {
      name: "Dr. Ava Anderson",
      specialization: "Endocrinology",
      email: "ava.anderson@example.com",
      phone: "567-890-1234",
      location: "Atlanta",
    },
    {
      name: "Dr. Noah Martinez",
      specialization: "Allergy and Immunology",
      email: "noah.martinez@example.com",
      phone: "890-123-4567",
      location: "Denver",
    },
    {
      name: "Dr. Mia Johnson",
      specialization: "Rheumatology",
      email: "mia.johnson@example.com",
      phone: "123-456-7890",
      location: "Phoenix",
    },
    {
      name: "Dr. Alexander Davis",
      specialization: "Gastroenterology",
      email: "alexander.davis@example.com",
      phone: "987-654-3210",
      location: "Philadelphia",
    },
    {
      name: "Dr. Charlotte Wilson",
      specialization: "Pulmonology",
      email: "charlotte.wilson@example.com",
      phone: "456-789-0123",
      location: "Washington, D.C.",
    },
    // Add more doctors here...
  ];


  let searchQuery = "";
  let filteredDoctors = [];

  function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase();
    filterDoctors();
  }

  function filterDoctors() {
    filteredDoctors = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchQuery) ||
        doctor.specialization.toLowerCase().includes(searchQuery) ||
        doctor.email.toLowerCase().includes(searchQuery) ||
        doctor.phone.toLowerCase().includes(searchQuery) ||
        doctor.location.toLowerCase().includes(searchQuery)
    );
  }

  // Initially show all doctors
  filterDoctors();
</script>

<main>
  <div class="search-bar-container">
    <div class="search-bar">
      <input
        type="text"
        placeholder="Search..."
        bind:value={searchQuery}
        on:input={handleSearch}
      />
    </div>
  </div>

  <div class="table-wrapper">
    <table class="doctors-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Specialization</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {#if filteredDoctors.length === 0}
          <tr>
            <td colspan="5">No matching doctors found.</td>
          </tr>
        {:else}
          {#each filteredDoctors as doctor}
            <tr>
              <td><i class="fas fa-user-md"></i> {doctor.name}</td>
              <td><i class="fas fa-stethoscope"></i> {doctor.specialization}</td>
              <td><i class="fas fa-envelope"></i> {doctor.email}</td>
              <td><i class="fas fa-phone"></i> {doctor.phone}</td>
              <td><i class="fas fa-map-marker-alt"></i> {doctor.location}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</main>

<style>
  main {
     padding: 20px; 
  } 

  .search-bar-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .search-bar {
    display: flex;
    align-items: center;
  }

  .search-bar input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .doctors-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .doctors-table th,
  .doctors-table td {
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .doctors-table th:nth-child(1),
  .doctors-table td:nth-child(1) {
    width: 25%;
  }

  .doctors-table th:nth-child(2),
  .doctors-table td:nth-child(2) {
    width: 20%;
  }

  .doctors-table th:nth-child(3),
  .doctors-table td:nth-child(3) {
    width: 20%;
  }

  .doctors-table th:nth-child(4),
  .doctors-table td:nth-child(4) {
    width: 15%;
  }

  .doctors-table th:nth-child(5),
  .doctors-table td:nth-child(5) {
    width: 20%;
  }
</style>
