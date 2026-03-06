import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen ">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white">
        <marquee
          class="text-blue-950 text-l font-bold"
          scrollamount="8"
        >
          Your trusted platform to book doctors and healthcare services online — convenient, reliable, and stress-free.
        </marquee>
        <h1 className="text-2xl font-bold text-blue-600"></h1>

        <div className="flex gap-4">

          <Link to="/login">
            <button className="text-gray-500 font-bold px-4 py-2 rounded-lg">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className=" text-gray-600  px-4 py-2 rounded-lg font-bold">
              Signup
            </button>
          </Link>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-50 via-white to-cyan-50">

        <h1 className="text-7xl un font-bold text-blue-950 mb-6">
          Welcome to Schedula
        </h1>


        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Book a Doctor's Appointment in seconds with Schedula.
          Say goodbye to endless phone calls and long queues.
          Book doctors' appointments, video consultations,
          ambulance service, manage medical records, and more.
        </p>
        

      </section>

      {/* Services Section */}

      <section className="px-10 py-16 bg-white">

        <h2 className="text-3xl font-bold text-center mb-12">
          Our Services
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              Doctor Appointments
            </h3>
            <p className="text-gray-600">
              Book appointments with trusted doctors easily.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              Video Consultation
            </h3>
            <p className="text-gray-600">
              Consult doctors online from your home.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              Ambulance Service
            </h3>
            <p className="text-gray-600">
              Emergency ambulance booking when needed.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              Medical Records
            </h3>
            <p className="text-gray-600">
              Securely manage all your medical records.
            </p>
          </div>

        </div>

      </section>

      {/* Partners Section */}

      <section className="py-16 px-10">

        <h2 className="text-3xl font-bold text-center mb-12">
          Our Partners
        </h2>

        <div className="flex justify-center gap-16 flex-wrap items-center">

          <img src="/images/aiims.jpeg" alt="partner" className="h-20" />
          <img src="/images/cims.png" alt="partner" className="h-20" />
          <img src="/images/apollo.jpeg" alt="partner" className="h-20" />
          <img src="/images/balaji.jpeg" alt="partner" className="h-20" />


        </div>

      </section>

    </div>
  );

};

export default LandingPage;