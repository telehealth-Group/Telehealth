<script>
  // @ts-nocheck

  export let appointments = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Smith",
      date: "2023-06-01",
      time: "10:00 AM",
      duration: "30 minutes",
      notes: "Follow-up appointment",
    },
    {
      id: 2,
      patient: "Jane Smith",
      doctor: "Dr. Johnson",
      date: "2023-06-02",
      time: "2:00 PM",
      duration: "1 hour",
      notes: "Initial consultation",
    },
    {
      id: 3,
      patient: "Michael Brown",
      doctor: "Dr. Williams",
      date: "2023-06-03",
      time: "9:30 AM",
      duration: "45 minutes",
      notes: "Routine check-up",
    },
    {
      id: 4,
      patient: "Emily Davis",
      doctor: "Dr. Anderson",
      date: "2023-06-04",
      time: "11:00 AM",
      duration: "30 minutes",
      notes: "Blood test results",
    },
    {
      id: 5,
      patient: "Daniel Johnson",
      doctor: "Dr. Thompson",
      date: "2023-06-05",
      time: "3:30 PM",
      duration: "1 hour",
      notes: "Physical examination",
    },
    {
      id: 6,
      patient: "Olivia Wilson",
      doctor: "Dr. Martinez",
      date: "2023-06-06",
      time: "10:30 AM",
      duration: "45 minutes",
      notes: "Medication review",
    },
    {
      id: 7,
      patient: "William Lee",
      doctor: "Dr. Taylor",
      date: "2023-06-07",
      time: "2:30 PM",
      duration: "30 minutes",
      notes: "Follow-up appointment",
    },
    {
      id: 8,
      patient: "Sophia Garcia",
      doctor: "Dr. Rodriguez",
      date: "2023-06-08",
      time: "4:00 PM",
      duration: "1 hour",
      notes: "Initial consultation",
    },
    {
      id: 9,
      patient: "James Clark",
      doctor: "Dr. Moore",
      date: "2023-06-09",
      time: "11:30 AM",
      duration: "45 minutes",
      notes: "Routine check-up",
    },
    {
      id: 10,
      patient: "Ava Lewis",
      doctor: "Dr. Harris",
      date: "2023-06-10",
      time: "9:00 AM",
      duration: "30 minutes",
      notes: "Follow-up appointment",
    },
    // Add more appointments here...
  ];

  let searchQuery = "";
  let filteredAppointments = [];

  function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase();
    filterAppointments();
  }

  function filterAppointments() {
    filteredAppointments = appointments.filter(
      (appointment) =>
        appointment.patient.toLowerCase().includes(searchQuery) ||
        appointment.doctor.toLowerCase().includes(searchQuery) ||
        appointment.date.includes(searchQuery) ||
        appointment.id.toString().includes(searchQuery)
    );
  }
  filterAppointments();
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
  <table class="appointments-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Date</th>
        <th>Time</th>
        <th>Duration</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredAppointments as appointment}
        <tr>
          <td>{appointment.id}</td>
          <td>{appointment.patient}</td>
          <td>{appointment.doctor}</td>
          <td>{appointment.date}</td>
          <td>{appointment.time}</td>
          <td>{appointment.duration}</td>
          <td>{appointment.notes}</td>
        </tr>
      {/each}
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

  .appointments-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .appointments-table th,
  .appointments-table td {
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .appointments-table th:nth-child(1),
  .appointments-table td:nth-child(1) {
    width: 5%;
  }

  .appointments-table th:nth-child(2),
  .appointments-table td:nth-child(2) {
    width: 15%;
  }

  .appointments-table th:nth-child(3),
  .appointments-table td:nth-child(3) {
    width: 15%;
  }

  .appointments-table th:nth-child(4),
  .appointments-table td:nth-child(4) {
    width: 10%;
  }

  .appointments-table th:nth-child(5),
  .appointments-table td:nth-child(5) {
    width: 10%;
  }

  .appointments-table th:nth-child(6),
  .appointments-table td:nth-child(6) {
    width: 10%;
  }

  .appointments-table th:nth-child(7),
  .appointments-table td:nth-child(7) {
    width: 35%;
  }
</style>
