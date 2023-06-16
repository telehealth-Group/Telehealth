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

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
/>


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
        <th><i class="fas fa-id-badge" style="color: #377dff;"></i> ID</th>
        <th><i class="fas fa-user" style="color: #ff68b6;"></i> Patient</th>
        <th><i class="fas fa-user-md" style="color: #00c4b2;"></i> Doctor</th>
        <th><i class="fas fa-calendar-alt" style="color: #ff901f;"></i> Date</th>
        <th><i class="fas fa-clock" style="color: #00b37e;"></i> Time</th>
        <th><i class="fas fa-hourglass" style="color: #f9423a;"></i> Duration</th>
        <th><i class="fas fa-sticky-note" style="color: #8353d4;"></i> Notes</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredAppointments as appointment}
        <tr>
          <td><span class="icon"><i class="fas fa-id-badge" style="color: #377dff;"></i></span>{appointment.id}</td>
          <td><span class="icon"><i class="fas fa-user" style="color: #ff68b6;"></i></span>{appointment.patient}</td>
          <td><span class="icon"><i class="fas fa-user-md" style="color: #00c4b2;"></i></span>{appointment.doctor}</td>
          <td><span class="icon"><i class="fas fa-calendar-alt" style="color: #ff901f;"></i></span>{appointment.date}</td>
          <td><span class="icon"><i class="fas fa-clock" style="color: #00b37e;"></i></span>{appointment.time}</td>
          <td><span class="icon"><i class="fas fa-hourglass" style="color: #f9423a;"></i></span>{appointment.duration}</td>
          <td><span class="icon"><i class="fas fa-sticky-note" style="color: #8353d4;"></i></span>{appointment.notes}</td>
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
    animation: fade-in 0.5s ease-in-out;
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

  .icon {
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
