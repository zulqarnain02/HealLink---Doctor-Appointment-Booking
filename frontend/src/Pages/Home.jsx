import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon, UserGroupIcon, CalendarDaysIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/doctors');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden pt-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
                  Your Health, Our Priority
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  Book appointments with trusted doctors and manage your healthcare seamlessly.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:justify-start justify-center">
                  <button
                    onClick={handleBookAppointment}
                    className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-white font-medium shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => navigate('/doctors')}
                    className="inline-flex items-center justify-center rounded-full border border-indigo-200 px-6 py-3 text-indigo-700 hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
                  >
                    View Doctors
                  </button>
                </div>
              </div>
              <div className="relative mx-auto md:mx-0">
                <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-violet-500 p-[2px] shadow-xl">
                  <div className="h-full w-full rounded-2xl overflow-hidden bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop"
                      alt="Healthcare consultation"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-3 -left-3 h-16 w-16 rounded-full bg-indigo-500/20 blur-xl" />
                <div className="absolute -top-3 -right-3 h-16 w-16 rounded-full bg-violet-500/20 blur-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">Our Services</h2>
            <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
              Comprehensive care designed to help you stay healthy at every stage.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard
                icon={<HeartIcon className="h-6 w-6 text-indigo-600" />}
                title="General Checkups"
                description="Routine exams to monitor and improve your overall wellness."
              />
              <ServiceCard
                icon={<UserGroupIcon className="h-6 w-6 text-indigo-600" />}
                title="Pediatric Care"
                description="Compassionate care for children from infancy through adolescence."
              />
              <ServiceCard
                icon={<ShieldCheckIcon className="h-6 w-6 text-indigo-600" />}
                title="Women’s Health"
                description="Specialized services in gynecology and prenatal support."
              />
              <ServiceCard
                icon={<CalendarDaysIcon className="h-6 w-6 text-indigo-600" />}
                title="Dental Services"
                description="From routine cleanings to advanced dental procedures."
              />
            </div>
          </div>
        </section>

        {/* Doctors Callout */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-semibold text-gray-900">Meet Our Doctors</h3>
                <p className="mt-3 text-gray-600">
                  Experienced specialists dedicated to providing the highest quality care.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/doctors')}
                    className="rounded-full bg-indigo-600 px-5 py-3 text-white font-medium shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
                  >
                    Find a Doctor
                  </button>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
                    alt="Doctors group"
                    className="h-64 w-full object-cover sm:h-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">What Patients Say</h3>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <TestimonialCard
                quote="The booking process was effortless and the care was excellent."
                author="Sarah J."
              />
              <TestimonialCard
                quote="My child loves their pediatrician here. We always feel heard and supported."
                author="Mark R."
              />
              <TestimonialCard
                quote="Wonderful prenatal care. The team was patient, kind, and knowledgeable."
                author="Jessica T."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function ServiceCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 ring-1 ring-indigo-100">
        {icon}
      </div>
      <h4 className="mt-4 text-lg font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <p className="text-gray-700">“{quote}”</p>
      <p className="mt-4 text-sm font-medium text-gray-500">— {author}</p>
    </div>
  );
}

export default Home;
