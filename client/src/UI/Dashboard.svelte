<script>
    let doctorsCount = 10;
    let appointmentsCount = 25;
    let patientsCount = 50;
    let revenue = 5000;
  
    let upcomingAppointments = [
      {
        patientName: "John Doe",
        appointmentTime: "2023-05-26 10:00 AM",
        doctorName: "Dr. Smith",
      },
      {
        patientName: "Jane Smith",
        appointmentTime: "2023-05-27 02:30 PM",
        doctorName: "Dr. Johnson",
      },
      {
        patientName: "Michael Johnson",
        appointmentTime: "2023-05-28 09:45 AM",
        doctorName: "Dr. Davis",
      },
    ];
  
    let newPatients = [
      { patientName: "Emily Wilson", registrationDate: "2023-05-15" },
      { patientName: "Robert Anderson", registrationDate: "2023-05-20" },
      { patientName: "Sophia Roberts", registrationDate: "2023-05-22" },
    ];
  </script>
  
  <div class="container">
    <h1>Dashboard</h1>
  
    <div class="summary">
      <div class="summary-item">
        <h2>{doctorsCount}</h2>
        <p>Doctors</p>
      </div>
      <div class="summary-item">
        <h2>{appointmentsCount}</h2>
        <p>Appointments</p>
      </div>
      <div class="summary-item">
        <h2>{patientsCount}</h2>
        <p>Patients</p>
      </div>
    </div>
  
    <div class="revenue">
      <h2>Revenue</h2>
      <h2>${revenue}</h2>
    </div>
  
    <!-- Upcoming Appointments -->
    <div class="dashboard-item">
      <h2>Upcoming Appointments</h2>
      <ul>
        {#each upcomingAppointments as appointment}
          <li>
            <div class="patient-info">
              <div>
                <span class="patient-name">{appointment.patientName}</span>
                <span class="appointment-time">{appointment.appointmentTime}</span>
              </div>
              <div>
                <span class="doctor-name">Doctor: {appointment.doctorName}</span>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  
    <!-- New Patients -->
    <div class="dashboard-item">
      <h2>New Patients</h2>
      <ul>
        {#each newPatients as patient}
          <li>
            <div class="patient-info">
              <div>
                <span class="patient-name">{patient.patientName}</span>
                <span class="registration-date">Registered on: {patient.registrationDate}</span>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  
    <!-- Add more dashboard items here as needed -->
  </div>
  
  <style>
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  
    h1 {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  
    .summary {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }
  
    .summary-item {
      flex: 1;
      padding: 20px;
      background-color: #f7f7f7;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
  
    .summary-item h2 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    .summary-item p {
      font-size: 16px;
      color: #777;
      margin-bottom: 0;
    }
  
    .revenue {
      text-align: center;
      margin-bottom: 40px;
    }
  
    .revenue h2 {
      font-size: 36px;
      font-weight: bold;
      color: #1abc9c;
      margin: 0;
    }
  
    .dashboard-item {
      margin-bottom: 40px;
    }
  
    .dashboard-item h2 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #333;
    }
  
    .dashboard-item ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
  
    .dashboard-item li {
      margin-bottom: 10px;
      background-color: #fff;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
    }
  
    .dashboard-item li:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .dashboard-item .patient-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .dashboard-item .patient-name {
      font-weight: bold;
      color: #333;
    }
  
    .dashboard-item .appointment-time {
      color: #777;
      font-size: 14px;
    }
  
    .dashboard-item .doctor-name {
      color: #777;
      font-size: 14px;
    }
  
    @media (max-width: 600px) {
      .summary {
        flex-direction: column;
      }
  
      .summary-item {
        margin-bottom: 20px;
      }
    }
  
    @media (max-width: 400px) {
      h1 {
        font-size: 24px;
      }
  
      .summary-item h2 {
        font-size: 20px;
      }
  
      .summary-item p {
        font-size: 14px;
      }
  
      .revenue h2 {
        font-size: 28px;
      }
  
      .dashboard-item h2 {
        font-size: 20px;
      }
  
      .dashboard-item li {
        padding: 10px;
      }
  
      .dashboard-item .patient-name {
        font-size: 16px;
      }
  
      .dashboard-item .appointment-time,
      .dashboard-item .doctor-name {
        font-size: 12px;
      }
    }
  </style>
  