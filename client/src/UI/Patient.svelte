<script>
  // @ts-nocheck

  export let patients = [
    {
      name: "John Doe",
      age: 35,
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "New York",
      gender: "Male",
      bloodType: "O+",
      allergies: "Peanuts, Penicillin",
      medicalHistory: "Hypertension, Diabetes",
    },
    {
      name: "Jane Smith",
      age: 28,
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "Los Angeles",
      gender: "Female",
      bloodType: "A-",
      allergies: "Shellfish",
      medicalHistory: "Asthma",
    },
    // Add more patients here...
    {
      name: "David Johnson",
      age: 42,
      email: "david.johnson@example.com",
      phone: "555-123-4567",
      address: "Chicago",
      gender: "Male",
      bloodType: "AB+",
      allergies: "None",
      medicalHistory: "None",
    },
    {
      name: "Emily Davis",
      age: 52,
      email: "emily.davis@example.com",
      phone: "555-987-6543",
      address: "Houston",
      gender: "Female",
      bloodType: "B+",
      allergies: "Dust, Pollen",
      medicalHistory: "High cholesterol",
    },
    {
      name: "Michael Miller",
      age: 45,
      email: "michael.miller@example.com",
      phone: "555-456-7890",
      address: "San Francisco",
      gender: "Male",
      bloodType: "O-",
      allergies: "None",
      medicalHistory: "Asthma, Migraine",
    },
    {
      name: "Olivia Wilson",
      age: 30,
      email: "olivia.wilson@example.com",
      phone: "555-321-6547",
      address: "Miami",
      gender: "Female",
      bloodType: "A+",
      allergies: "Pollen",
      medicalHistory: "Anxiety",
    },
    {
      name: "James Taylor",
      age: 62,
      email: "james.taylor@example.com",
      phone: "555-789-1234",
      address: "Dallas",
      gender: "Male",
      bloodType: "B-",
      allergies: "Peanuts, Shellfish",
      medicalHistory: "Diabetes, Hypertension",
    },
    {
      name: "Sophia Anderson",
      age: 24,
      email: "sophia.anderson@example.com",
      phone: "555-654-3210",
      address: "Seattle",
      gender: "Female",
      bloodType: "O+",
      allergies: "None",
      medicalHistory: "None",
    },
    {
      name: "Daniel Clark",
      age: 40,
      email: "daniel.clark@example.com",
      phone: "555-987-6543",
      address: "Atlanta",
      gender: "Male",
      bloodType: "AB+",
      allergies: "Pollen, Cats",
      medicalHistory: "Asthma, Allergies",
    },
    {
      name: "Isabella Rodriguez",
      age: 35,
      email: "isabella.rodriguez@example.com",
      phone: "555-456-7890",
      address: "Boston",
      gender: "Female",
      bloodType: "A-",
      allergies: "Dairy",
      medicalHistory: "None",
    },
    {
      name: "Joseph Lee",
      age: 50,
      email: "joseph.lee@example.com",
      phone: "555-321-6547",
      address: "Phoenix",
      gender: "Male",
      bloodType: "O-",
      allergies: "Pollen, Dust",
      medicalHistory: "Asthma, Hypertension",
    },
    {
      name: "Mia Baker",
      age: 29,
      email: "mia.baker@example.com",
      phone: "555-789-1234",
      address: "Denver",
      gender: "Female",
      bloodType: "B+",
      allergies: "Peanuts",
      medicalHistory: "Anxiety",
    },
    {
      name: "William Turner",
      age: 43,
      email: "william.turner@example.com",
      phone: "555-123-4567",
      address: "Philadelphia",
      gender: "Male",
      bloodType: "AB+",
      allergies: "Penicillin",
      medicalHistory: "Hypertension",
    },
    {
      name: "Ava Harris",
      age: 31,
      email: "ava.harris@example.com",
      phone: "555-987-6543",
      address: "San Diego",
      gender: "Female",
      bloodType: "A+",
      allergies: "Shellfish",
      medicalHistory: "Asthma",
    },
    {
      name: "Christopher Martinez",
      age: 39,
      email: "christopher.martinez@example.com",
      phone: "555-456-7890",
      address: "Detroit",
      gender: "Male",
      bloodType: "O+",
      allergies: "None",
      medicalHistory: "Migraine",
    },
    {
      name: "Sofia Thompson",
      age: 27,
      email: "sofia.thompson@example.com",
      phone: "555-321-6547",
      address: "Minneapolis",
      gender: "Female",
      bloodType: "B-",
      allergies: "Pollen, Cats",
      medicalHistory: "Allergies",
    },
    {
      name: "Andrew Lewis",
      age: 47,
      email: "andrew.lewis@example.com",
      phone: "555-789-1234",
      address: "Portland",
      gender: "Male",
      bloodType: "O-",
      allergies: "Dairy",
      medicalHistory: "Diabetes",
    },
    {
      name: "Scarlett Walker",
      age: 33,
      email: "scarlett.walker@example.com",
      phone: "555-123-4567",
      address: "Las Vegas",
      gender: "Female",
      bloodType: "AB+",
      allergies: "Peanuts, Shellfish",
      medicalHistory: "Hypertension",
    },
    {
      name: "Henry Hall",
      age: 58,
      email: "henry.hall@example.com",
      phone: "555-987-6543",
      address: "San Antonio",
      gender: "Male",
      bloodType: "A-",
      allergies: "Dust",
      medicalHistory: "Asthma",
    },
    {
      name: "Lily Young",
      age: 26,
      email: "lily.young@example.com",
      phone: "555-456-7890",
      address: "Orlando",
      gender: "Female",
      bloodType: "B+",
      allergies: "None",
      medicalHistory: "None",
    },
    // Add more patients here...
  ];
  let searchQuery = "";
  let filteredPatients = [];

  function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase();
    filterPatients();
  }

  function filterPatients() {
    filteredPatients = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchQuery) ||
        patient.age.toString().includes(searchQuery) ||
        patient.gender.toLowerCase().includes(searchQuery) ||
        patient.bloodType.toLowerCase().includes(searchQuery)
    );
  }
  filterPatients();
</script>

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
  <table class="patients-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Gender</th>
        <th>Blood Type</th>
        <th>Allergies</th>
        <th>Medical History</th>
      </tr>
    </thead>
    <tbody>
      {#if filteredPatients.length === 0}
        <tr>
          <td colspan="5">No matching patients found.</td>
        </tr>
        {:else}
        {#each filteredPatients as patient}
          <tr>
            <td>{patient.name}</td>
            <td>{patient.age}</td>
            <td>{patient.email}</td>
            <td>{patient.phone}</td>
            <td>{patient.address}</td>
            <td>{patient.gender}</td>
            <td>{patient.bloodType}</td>
            <td>{patient.allergies}</td>
            <td>{patient.medicalHistory}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style>
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

  .patients-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .patients-table th,
  .patients-table td {
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .patients-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .patients-table th,
  .patients-table td {
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .patients-table th:nth-child(1),
  .patients-table td:nth-child(1) {
    width: 15%;
  }

  .patients-table th:nth-child(2),
  .patients-table td:nth-child(2) {
    width: 5%;
  }

  .patients-table th:nth-child(3),
  .patients-table td:nth-child(3) {
    width: 15%;
  }

  .patients-table th:nth-child(4),
  .patients-table td:nth-child(4) {
    width: 10%;
  }

  .patients-table th:nth-child(5),
  .patients-table td:nth-child(5) {
    width: 15%;
  }

  .patients-table th:nth-child(6),
  .patients-table td:nth-child(6) {
    width: 5%;
  }

  .patients-table th:nth-child(7),
  .patients-table td:nth-child(7) {
    width: 5%;
  }

  .patients-table th:nth-child(8),
  .patients-table td:nth-child(8) {
    width: 15%;
  }

  .patients-table th:nth-child(9),
  .patients-table td:nth-child(9) {
    width: 15%;
  }
</style>
