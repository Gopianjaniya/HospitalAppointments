import axios from 'axios';

const backendUrl = 'http://localhost:3000';

const seedData = async () => {
  try {
    console.log('--- Seeding Initial Data ---');

    // Seed Doctor
    console.log('Registering Test Doctor...');
    await axios.post(`${backendUrl}/api/user/register`, {
      name: 'Dr. Smith',
      username: 'doctor123',
      password: 'password123',
      role: 'doctor'
    });
    console.log('Doctor Created: doctor123 / password123');

    // Seed Patient
    console.log('Registering Test Patient...');
    await axios.post(`${backendUrl}/api/user/register`, {
      name: 'John Doe',
      username: 'patient123',
      password: 'password123',
      role: 'patient'
    });
    console.log('Patient Created: patient123 / password123');

    console.log('\n--- Seeding Complete! ---');
    console.log('You can now login with these credentials.');
  } catch (err) {
    console.error('Seeding failed (Users might already exist):', err.response?.data?.message || err.message);
  }
};

seedData();
