<script>
// @ts-nocheck

  import { hospitals, patients } from "../store.js";
  
let hospital = $hospitals.data.hospitals
    let doctorsCount = 10;
    let appointmentsCount = 25;
    let patientsCount = 50;
    let revenue = 5000;
  
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
        <div class="icon-container">
          <span class="icon">👩‍⚕️</span>
        </div>
        <div class="summary-info">
          <h2>{hospital.length}</h2>
          <p>Doctors</p>
        </div>
      </div>
      <div class="summary-item">
        <div class="icon-container">
          <span class="icon">🏥</span>
        </div>
        <div class="summary-info">
          <h2>{patientsCount}</h2>
          <p>Patients</p>
        </div>
      </div>
      <div class="summary-item">
        <div class="icon-container">
          <span class="icon">💰</span>
        </div>
        <div class="summary-info">
          <h2>${revenue}</h2>
          <p>Revenue</p>
        </div>
      </div>
    </div>
  
    <div class="dashboard-item">
      <h2>Hospitals</h2>
      <ul class="appointment-list">
        {#each hospital as appointment}
          <li class="appointment-item">
            <div class="patient-info">
              <div class="patient-name">{appointment.name}</div>
              <div class="appointment-details">
                <div class="icon-container">
                  <span class="icon">👨‍⚕️</span>
                </div>
                <div class="doctor-name">{appointment.services}</div>
              </div>
              <div class="appointment-time">{appointment.phoneNumber}</div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
    
  
    <div class="dashboard-item">
      <h2>New Patients</h2>
      <ul class="patient-list">
        {#each newPatients as patient}
          <li class="patient-item">
            <div class="patient-info">
              <div class="patient-name">{patient.patientName}</div>
              <div class="patient-details">
                <div class="icon-container">
                  <span class="icon">📅</span>
                </div>
                <div class="registration-date">{patient.registrationDate}</div>
                <div class="icon-container">
                  <span class="icon">🎂</span>
                </div>
                <div class="patient-age">{patient.age}</div>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
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
      color: #333;
    }
  
    .summary {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }
  
    .summary-item {
      display: flex;
      align-items: center;
      padding: 20px;
      background-color: #f7f7f7;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-right: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .icon {
      font-size: 24px;
    }
  
    .summary-info {
      flex: 1;
    }
  
    .summary-item h2 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
      color: #333;
    }
  
    .summary-item p {
      font-size: 16px;
      color: #777;
      margin-bottom: 0;
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
  
    .appointment-list,
    .patient-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
  
    .appointment-item,
    .patient-item {
      margin-bottom: 10px;
      background-color: #fff;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
    }
  
    .appointment-item:hover,
    .patient-item:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .patient-info {
      display: flex;
      align-items: center;
    }
  
    .patient-name,
    .doctor-name,
    .appointment-time,
    .registration-date,
    .patient-age {
      color: #333;
      font-size: 16px;
      margin-bottom: 5px;
    }
  
    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f7f7f7;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
  
    .icon {
      font-size: 16px;
    }
    .dashboard-item .patient-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 4px;
    background-color: #f7f7f7;
    transition: background-color 0.3s ease;
  }

  .dashboard-item .patient-info:hover {
    background-color: #ebebeb;
  }

  .patient-name {
    font-weight: bold;
    color: #333;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .registration-date {
    color: #777;
    font-size: 14px;
    margin-bottom: 0;
  }


  .dashboard-item .patient-info:hover {
    background-color: #ebebeb;
  }

  .patient-name {
    font-weight: bold;
    color: #333;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .appointment-details {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1abc9c;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  .icon-container svg {
    fill: #fff;
    width: 16px;
    height: 16px;
  }

  .appointment-time,
  .doctor-name {
    color: #777;
    font-size: 14px;
    margin-bottom: 0;
  }
  .patient-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 3 0px;
    padding-right: 1rem;
  }

  @media (max-width: 600px) {
    /* ... previous media queries ... */

    .dashboard-item .patient-info {
      flex-direction: column;
      padding: 15px;
    }

    .patient-name,
    .appointment-details,
    .appointment-time,
    .doctor-name {
      font-size: 14px;
    }

    .icon-container {
      width: 24px;
      height: 24px;
      margin-bottom: 10px;
    }

    .icon-container svg {
      width: 12px;
      height: 12px;
    }
  }

  @media (max-width: 400px) {
    /* ... previous media queries ... */

    .patient-name,
    .appointment-details,
    .appointment-time,
    .doctor-name {
      font-size: 12px;
    }

    .icon-container {
      width: 20px;
      height: 20px;
      margin-bottom: 8px;
    }

    .icon-container svg {
      width: 10px;
      height: 10px;
    }
  }
  </style>
  
