import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiurl } from "../api/axios";

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Close modal when clicking outside of modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-900/60 backdrop-blur"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 max-h-[80vh] overflow-auto">
        <button
          className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 ring-1 ring-black/10 hover:bg-white"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          ×
        </button>
        {children}
        <div className="mt-6 flex justify-end">
          <button
            className="rounded-full bg-indigo-600 px-5 py-2 text-white shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DoctorsList = () => {
  const [userData, setUserData] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBookModalOpen, setBookModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    selectedDate: "",
    selectedSlot: "",
  });
  const [error, setError] = useState(null); // Added state for error handling
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiurl + "/api/doctors")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      try {
        const response = await fetch(`${apiurl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleKnowDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
    setBookModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setBookModalOpen(false);
    setSelectedDoctor(null);
    setAppointmentDetails({ selectedDate: "", selectedSlot: "" });
  };

  const handleSlotSelection = (slot) => {
    setAppointmentDetails((prevState) => ({
      ...prevState,
      selectedSlot: slot,
    }));
  };

  const handleDateChange = (e) => {
    setAppointmentDetails((prevState) => ({
      ...prevState,
      selectedDate: e.target.value,
    }));
  };

  const handleBooking = () => {
    const { selectedDate, selectedSlot } = appointmentDetails;
    const appointmentData = {
      patientId: userData._id,
      patientName: userData.fullName,
      doctorName: selectedDoctor.fullName,
      dateOfBooking: new Date(),
      dateOfAppointment: selectedDate,
      slot: selectedSlot,
      paidAmount: selectedDoctor.consultationFee,
    };
    fetch(apiurl + "/api/Bookappointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Appointment booked successfully!");
        closeModal();
      })
      .catch((error) => console.error("Error booking appointment:", error));
  };

  // Helper to get initials for avatar placeholder
  const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.charAt(0) || "";
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    return (first + last).toUpperCase();
  };

  return (
    <div className="pt-12 p-6 flex-grow min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
        Available Doctors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-semibold ring-2 ring-white shadow">
                <span>{getInitials(doctor.fullName || "Doctor")}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Specialist in</p>
                <h2 className="text-lg font-semibold text-gray-900">{doctor.specialization}</h2>
                <p className="text-gray-800">Dr. {doctor.fullName}</p>
              </div>
            </div>
            <p className="mt-3 line-clamp-3 text-gray-600">{doctor.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Consultation Fee</span>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
                ₹{doctor.consultationFee}
              </span>
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                className="flex-1 rounded-full bg-indigo-600 px-4 py-2 text-white font-medium shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                onClick={() => handleBookNow(doctor)}
                type="button"
              >
                Book Now
              </button>
              <button
                className="flex-1 rounded-full border border-indigo-200 px-4 py-2 text-indigo-700 hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                onClick={() => handleKnowDoctor(doctor)}
                type="button"
              >
                Know Your Doctor
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* // Modal for displaying doctor details (Know Your Doctor) */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedDoctor && (
          <div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-semibold">
                {getInitials(selectedDoctor.fullName || "Doctor")}
              </div>
              <div>
                <h2 className="text-xl font-bold">Dr. {selectedDoctor.fullName}</h2>
                <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="Gender" value={selectedDoctor.gender} />
              <InfoRow label="DOB" value={new Date(selectedDoctor.dateOfBirth).toLocaleDateString()} />
              <InfoRow label="Experience" value={`${selectedDoctor.yearsOfExperience} years`} />
              <InfoRow label="Clinic" value={selectedDoctor.clinicName} />
              <InfoRow label="Address" value={selectedDoctor.clinicAddress} />
              <InfoRow label="Fee" value={`₹${selectedDoctor.consultationFee}`} />
            </div>

            <div className="mt-4">
              <p className="text-gray-700">{selectedDoctor.description}</p>
            </div>

            {/* Availability */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Availability</h3>
              <div className="mt-2">
                {selectedDoctor.availability.length === 0 ? (
                  <p className="text-gray-600">No availability provided.</p>
                ) : (
                  selectedDoctor.availability.map((availability, index) => (
                    <div key={index} className="mt-4">
                      <p className="font-semibold text-gray-800">{availability.day}:</p>
                      {availability.slots.length === 0 ? (
                        <p className="text-gray-600">No available slots</p>
                      ) : (
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {availability.slots.map((slot, idx) => (
                            <div key={idx} className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700">
                              {slot.start} - {slot.end}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Modal for booking appointment */}
      <Modal isOpen={isBookModalOpen} onClose={closeModal}>
        {selectedDoctor && (
          <div>
            <h2 className="text-xl font-bold mb-2">
              Book Appointment with Dr. {selectedDoctor.fullName}
            </h2>
            <p>
              <strong>Specialization:</strong> {selectedDoctor.specialization}
            </p>
            <p>
              <strong>Consultation Fee:</strong> ₹
              {selectedDoctor.consultationFee}
            </p>

            <div className="mt-4">
              <label htmlFor="appointmentDate" className="block text-gray-600">
                Select Appointment Date
              </label>
              <input
                type="date"
                id="appointmentDate"
                className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                onChange={handleDateChange}
              />

              {appointmentDetails.selectedDate && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    Available Slots on {appointmentDetails.selectedDate}
                  </h3>
                  <div className="mt-2">
                    {selectedDoctor.availability
                      .filter(
                        (avail) =>
                          avail.day ===
                          new Date(
                            appointmentDetails.selectedDate
                          ).toLocaleString("en-us", { weekday: "long" })
                      )
                      .map((availability) =>
                        availability.slots.length === 0 ? (
                          <p key={availability.day}>
                            No available slots for the selected day.
                          </p>
                        ) : (
                          <div key={availability.day}>
                            {availability.slots.map((slot, idx) => (
                              <label key={idx} className="flex items-center gap-2 rounded-md border border-gray-200 p-2 hover:bg-gray-50 cursor-pointer">
                                <input
                                  type="radio"
                                  id={`slot-${idx}`}
                                  name="slot"
                                  value={`${slot.start} - ${slot.end}`}
                                  onChange={() =>
                                    handleSlotSelection(
                                      `${slot.start} - ${slot.end}`
                                    )
                                  }
                                />
                                <span>{slot.start} - {slot.end}</span>
                              </label>
                            ))}
                          </div>
                        )
                      )}
                  </div>
                </div>
              )}

              {appointmentDetails.selectedSlot && (
                <div className="mt-4">
                  <button
                    className="rounded-full bg-indigo-600 px-5 py-2 text-white shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    onClick={handleBooking}
                  >
                    Book
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

function InfoRow({ label, value }) {
  return (
    <div className="rounded-md border border-gray-200 p-3">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-gray-800">{value}</p>
    </div>
  );
}

export default DoctorsList;
