<script>
    // Import any necessary dependencies or data
  
    // Example data for doctors
    const doctors = [
      {
        id: 1,
        name: "Dr. John Doe",
        specialty: "Cardiology",
        appointments: [
            {
        id: 1,
        patientName: "Jane Smith",
        appointmentDate: "2023-06-10",
        appointmentTime: "09:00 AM",
        status: "Upcoming",
        diagnosis: null,
        medication: null,
      },
      {
        id: 2,
        patientName: "John Doe",
        appointmentDate: "2023-06-11",
        appointmentTime: "02:30 PM",
        status: "Completed",
        diagnosis: "Arrhythmia",
        medication: "Metoprolol",
      },
      {
        id: 3,
        patientName: "John Doe",
        appointmentDate: "2023-06-11",
        appointmentTime: "02:30 PM",
        status: "Completed",
        diagnosis: "Hypertension",
        medication: "Lisinopril",
      },
      {
        id: 4,
        patientName: "John Doe",
        appointmentDate: "2023-06-11",
        appointmentTime: "02:30 PM",
        status: "Completed",
        diagnosis: "Coronary artery disease",
        medication: "Aspirin",
      },
      {
        id: 5,
        patientName: "John Doe",
        appointmentDate: "2023-06-11",
        appointmentTime: "02:30 PM",
        status: "Completed",
        diagnosis: "Heart failure",
        medication: "Lasix",
      },
      {
        id: 6,
        patientName: "John Doe",
        appointmentDate: "2023-06-11",
        appointmentTime: "02:30 PM",
        status: "Completed",
        diagnosis: "Angina",
        medication: "Nitroglycerin",
      },
      {
        id: 7,
        patientName: "Jane Smith",
        appointmentDate: "2023-06-10",
        appointmentTime: "09:00 AM",
        status: "Upcoming",
        diagnosis: null,
        medication: null,
      },
      {
        id: 8,
        patientName: "Jane Smith",
        appointmentDate: "2023-06-10",
        appointmentTime: "09:00 AM",
        status: "Upcoming",
        diagnosis: null,
        medication: null,
      },
      {
        id: 9,
        patientName: "Jane Smith",
        appointmentDate: "2023-06-10",
        appointmentTime: "09:00 AM",
        status: "Upcoming",
        diagnosis: null,
        medication: null,
      },
      {
        id: 10,
        patientName: "Jane Smith",
        appointmentDate: "2023-06-10",
        appointmentTime: "09:00 AM",
        status: "Upcoming",
        diagnosis: null,
        medication: null,
      },
      {
        id: 11,
        patientName: "Jane Smith",
        appointmentDate: "2023-06-10",
        appointmentTime: "09:00 AM",
        status: "Upcoming",
        diagnosis: null,
        medication: null,
      },
      {
        id: 12,
        patientName: "Jane Smith",
        appointmentDate: "2023-06-10",
        appointmentTime: "09:00 AM",
        status: "Completed",
        diagnosis: "High cholesterol",
        medication: "Statins",
      },
          // Add more appointments as needed
        ],
      },
      // Add more doctors as needed
    ];
  </script>
  
  <div class="container">
    <!-- <h1>Doctor Dashboard</h1> -->
    {#each doctors as doctor}
      <div class="doctor-card">
        <h2>{doctor.name}</h2>
        <p>Specialty: {doctor.specialty}</p>
  
        <div class="appointment-section">
          <h3>Upcoming Appointments</h3>
          <div class="appointment-grid">
            {#each doctor.appointments.filter(appointment => appointment.status === "Upcoming") as appointment}
              <div class="appointment-card">
                <div class="appointment-details">
                  <p class="patient-name">{appointment.patientName}</p>
                  <p class="appointment-time">
                    <i class="far fa-clock"></i> {appointment.appointmentTime}
                  </p>
                  <p class="appointment-date">
                    <i class="far fa-calendar"></i> {appointment.appointmentDate}
                  </p>
                  <p class="diagnosis">
                    <i class="fas fa-notes-medical"></i> Diagnosis: {appointment.diagnosis}
                  </p>
                </div>
                <button class="complete-button">Mark as Completed</button>
              </div>
            {/each}
          </div>
        </div>
  
        <div class="appointment-section">
          <h3>Completed Appointments</h3>
          <div class="appointment-grid">
            {#each doctor.appointments.filter(appointment => appointment.status === "Completed") as appointment}
              <div class="appointment-card">
                <div class="appointment-details">
                  <p class="patient-name">{appointment.patientName}</p>
                  <p class="appointment-time">
                    <i class="far fa-clock"></i> {appointment.appointmentTime}
                  </p>
                  <p class="appointment-date">
                    <i class="far fa-calendar"></i> {appointment.appointmentDate}
                  </p>
                  <p class="diagnosis">
                    <i class="fas fa-notes-medical"></i> Diagnosis: {appointment.diagnosis}
                  </p>
                  <p class="medication">
                    <i class="fas fa-prescription"></i> Medication: {appointment.medication}
                  </p>
                </div>
                <button class="view-details-button">View Details</button>
              </div>
            {/each}
          </div>
        </div>
  
        <!-- Add more sections as needed -->
  
      </div>
    {/each}
  </div>
  
  <style>
    /* Add your custom styles here */
  
    .container {
      width: 100%;
      margin: 0 auto;
      padding: 0;
    }
  
    .doctor-card {
      background-color: #f5f5f5;
      border-radius: 4px;
      padding: 20px;
      margin-bottom: 20px;
    }
  
    /* h1 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    } */
  
    h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
  
    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }
  
    .appointment-section {
      margin-bottom: 20px;
    }
  
    .appointment-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 20px;
    }
  
    .appointment-card {
      background-color: #ffffff;
      border-radius: 4px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  
    .appointment-details {
      flex: 1;
    }
  
    .patient-name {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 5px;
    }
  
    .appointment-time,
    .appointment-date,
    .diagnosis,
    .medication {
      font-size: 14px;
      margin-bottom: 5px;
    }
  
    .complete-button,
    .view-details-button {
      background-color: #007bff;
      color: #ffffff;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
  
    .complete-button {
      margin-left: 10px;
    }
  </style>
