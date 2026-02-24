const axios = require('axios');

const backendUrl = 'http://localhost:3000';

async function testBackend() {
  try {
    console.log('--- Starting Backend Verification ---');

    // 1. Register a Patient
    console.log('1. Registering Patient...');
    const patientRes = await axios.post(`${backendUrl}/api/user/register`, {
      name: 'Test Patient',
      username: 'patient_' + Date.now(),
      password: 'password123',
      role: 'patient'
    });
    console.log('Result:', patientRes.data.message);

    // 2. Register a Doctor
    console.log('2. Registering Doctor...');
    const doctorRes = await axios.post(`${backendUrl}/api/user/register`, {
      name: 'Dr. Test',
      username: 'doctor_' + Date.now(),
      password: 'password123',
      role: 'doctor'
    });
    console.log('Result:', doctorRes.data.message);

    // 3. Login
    console.log('3. Logging in...');
    const loginRes = await axios.post(`${backendUrl}/api/user/login`, {
      username: doctorRes.config.data.username, // Should be the dynamic one
      password: 'password123'
    });
    console.log('Result: Login Successful, Token hidden');

    // 4. Get Doctors
    console.log('4. Getting Doctors...');
    const doctorsRes = await axios.get(`${backendUrl}/api/user/doctors`);
    console.log('Doctors Count:', doctorsRes.data.doctors.length);

    console.log('--- Backend Verification Complete ---');
  } catch (err) {
    console.error('Verification failed:', err.response?.data || err.message);
  }
}

// testBackend(); // Uncomment and run with node
