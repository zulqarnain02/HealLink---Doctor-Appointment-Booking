import React, { useEffect, useState } from "react";
import { apiurl } from "../api/axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  // console.log(appointments);
  const [userRole, setUserRole] = useState(null); // To store the user's role
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        // Fetch user profile
        const profileResponse = await fetch(`${apiurl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await profileResponse.json();
        setUserRole(userData.role); // Store the user's role

        // Fetch appointments based on role
        const appointmentsResponse = await fetch(
          `${apiurl}/api/appointments?role=${userData.role}&name=${userData.fullName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData);
      } catch (err) {
        setError(err.message || "Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const updateStatus = async (appointmentId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${apiurl}/api/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update status to ${newStatus}`);
      }

      // Update the state with the updated appointment
      const updatedAppointment = await response.json();
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? updatedAppointment.appointment
            : appointment
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.message || `Failed to update status to ${newStatus}`);
    }
  };

  const handlePayment = async (appointmentId, consultationFee, doctorName) => {
    // console.log(appointmentId);
    // console.log(consultationFee);
    // console.log(doctorName);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiurl}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({appointmentId, consultationFee, doctorName }),
      });
  
      if (!response.ok) {
        throw new Error("Payment failed");
      }
  
      // Remove the appointment or update the state after payment
      const updatedAppointments = await response.json();
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
  
      alert("Payment successful!");

    } catch (err) {
      console.error(err);
      alert(err.message || "Payment failed");
    }
  };


  if (loading) {
    return (
      <div className="pt-12 p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="h-6 w-40 rounded bg-gray-200 animate-pulse" />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
                <div className="mt-3 h-3 w-2/3 rounded bg-gray-200 animate-pulse" />
                <div className="mt-3 h-16 w-full rounded bg-gray-100 animate-pulse" />
                <div className="mt-4 flex items-center justify-between">
                  <div className="h-8 w-24 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-8 w-24 rounded-full bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 p-6 min-h-screen">
        <div className="max-w-2xl mx-auto rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          <p className="font-semibold">Error</p>
          <p className="mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-12 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Appointments</h1>
        {appointments.length > 0 ? (
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <li
                key={appointment._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Dr. {appointment.doctorName}</h3>
                    <p className="mt-0.5 text-sm text-gray-600">Patient: {appointment.patientName}</p>
                  </div>
                  <StatusPill status={appointment.status} />
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Row label="Booked" value={new Date(appointment.dateOfBooking).toLocaleDateString()} />
                  <Row label="Date" value={new Date(appointment.dateOfAppointment).toLocaleDateString()} />
                  <Row label="Time" value={appointment.slot} />
                  <Row label="Amount" value={`₹${appointment.paidAmount}`} />
                </div>

                {userRole === "Doctor" && appointment.status === "Pending" && (
                  <div className="mt-5 flex gap-3">
                    <button
                      className="flex-1 rounded-full bg-emerald-600 px-4 py-2 text-white font-medium shadow hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      onClick={() => updateStatus(appointment._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="flex-1 rounded-full bg-rose-600 px-4 py-2 text-white font-medium shadow hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                      onClick={() => updateStatus(appointment._id, "Cancelled")}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {userRole === "Patient" && appointment.status === "Approved" && (
                  <button
                    className="mt-5 w-full rounded-full bg-indigo-600 px-4 py-2 text-white font-medium shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    onClick={() =>
                      handlePayment(
                        appointment._id,
                        appointment.paidAmount,
                        appointment.doctorName
                      )
                    }
                  >
                    Pay ₹{appointment.paidAmount}
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const styles =
    status === "Pending"
      ? "bg-amber-100 text-amber-800 ring-amber-200"
      : status === "Cancelled"
      ? "bg-rose-100 text-rose-800 ring-rose-200"
      : "bg-emerald-100 text-emerald-800 ring-emerald-200";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles}`}>
      {status}
    </span>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
