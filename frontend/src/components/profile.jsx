import React, { useState, useEffect } from "react";
import {
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  User,
} from "lucide-react";
import axios from "axios";
import { apiurl } from "../api/axios";

const DoctorAvailability = ({ availability }) => (
  <div className="bg-white p-6 shadow-lg rounded-md mt-6">
    <h2 className="text-xl font-semibold text-gray-800">Availability</h2>
    <div className="mt-2">
      {availability.map(({ day, slots }) => (
        <div key={day} className="mb-2">
          <strong>{day}: </strong>
          {slots.length > 0
            ? slots.map((slot, index) => (
                <span key={index}>
                  {slot.start} - {slot.end}
                  {index < slots.length - 1 && ", "}
                </span>
              ))
            : "Not Available"}
        </div>
      ))}
    </div>
  </div>
);

const EditProfileModal = ({ userData, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvailabilityChange = (day, slotIndex, field, value) => {
    const updatedAvailability = [...formData.availability];
    const dayIndex = updatedAvailability.findIndex((d) => d.day === day);

    if (dayIndex !== -1) {
      updatedAvailability[dayIndex].slots[slotIndex][field] = value;
    }

    setFormData({ ...formData, availability: updatedAvailability });
  };

  const handleAddSlot = (day) => {
    const updatedAvailability = [...formData.availability];
    const dayIndex = updatedAvailability.findIndex((d) => d.day === day);

    if (dayIndex !== -1) {
      updatedAvailability[dayIndex].slots.push({ start: "", end: "" });
    }

    setFormData({ ...formData, availability: updatedAvailability });
  };

  const handleRemoveSlot = (day, slotIndex) => {
    const updatedAvailability = [...formData.availability];
    const dayIndex = updatedAvailability.findIndex((d) => d.day === day);

    if (dayIndex !== -1) {
      updatedAvailability[dayIndex].slots.splice(slotIndex, 1);
    }

    setFormData({ ...formData, availability: updatedAvailability });
  };

  const handleSubmit = async () => {
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // Close modal on clicking outside
  const handleClickOutside = (e) => {
    if (e.target.id === "modal-background") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-background"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0 bg-slate-900/60 backdrop-blur"
      onClick={handleClickOutside}
    >
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[80vh] overflow-auto rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label
              className="block text-1xl font-medium mb-1"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-1xl font-medium mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-1xl font-medium mb-1"
              htmlFor="dateOfBirth"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={
                formData.dateOfBirth ? formData.dateOfBirth.split("T")[0] : ""
              }
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              className="block text-1xl font-medium mb-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {userData.role === "Doctor" && (
            <>
              <div>
                <label
                  className="block text-1xl font-medium mb-1"
                  htmlFor="specialization"
                >
                  Specialization
                </label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-1xl font-medium mb-1"
                  htmlFor="yearsOfExperience"
                >
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-1xl font-medium mb-1"
                  htmlFor="clinicName"
                >
                  Clinic Name
                </label>
                <input
                  type="text"
                  id="clinicName"
                  name="clinicName"
                  value={formData.clinicName || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-1xl font-medium mb-1"
                  htmlFor="clinicAddress"
                >
                  Clinic Address
                </label>
                <input
                  type="text"
                  id="clinicAddress"
                  name="clinicAddress"
                  value={formData.clinicAddress || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  className="block text-1xl font-medium mb-1"
                  htmlFor="consultationFee"
                >
                  Consultation Fee
                </label>
                <input
                  type="number"
                  id="consultationFee"
                  name="consultationFee"
                  value={formData.consultationFee || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium">Availability</h3>
                {formData.availability.map(({ day, slots }) => (
                  <div key={day} className="mb-4">
                    <strong>{day}</strong>
                    {slots.map((slot, index) => (
                      <div key={index} className="flex items-center gap-2 mt-2">
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) =>
                            handleAvailabilityChange(
                              day,
                              index,
                              "start",
                              e.target.value
                            )
                          }
                          className="rounded-md border border-gray-300 px-2 py-1 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) =>
                            handleAvailabilityChange(
                              day,
                              index,
                              "end",
                              e.target.value
                            )
                          }
                          className="rounded-md border border-gray-300 px-2 py-1 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => handleRemoveSlot(day, index)}
                          className="text-rose-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddSlot(day)}
                      className="mt-2 text-indigo-600 hover:underline"
                    >
                      &nbsp;Add Slot
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <label
                  className="block text-1xl font-medium mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 h-20 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                ></textarea>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="rounded-full border border-gray-300 px-4 py-2 mr-2 hover:bg-gray-50"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-full bg-indigo-600 px-5 py-2 text-white shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            onClick={handleSubmit}
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const DoctorDescription = ({ userData }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <h2 className="text-xl font-semibold text-gray-900">
      About Dr. {userData.fullName}
    </h2>
    <p className="text-gray-600 mt-2">{userData.description}</p>
  </div>
);

const PatentCreditBalance = ({ userData }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <h2 className="text-xl font-semibold text-gray-900 text-center">
      Wallet Balance: ₹{userData.credit}
    </h2>
    <p className="text-gray-600 mt-2">{userData.description}</p>
  </div>
);

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login"; // Redirect if no token
        return;
      }
      try {
        const response = await axios.get(`${apiurl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleSaveProfile = async (updatedData) => {
    const token = localStorage.getItem("token");
    await axios.put(`${apiurl}/api/Editprofile`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserData(updatedData);
  };

  if (loading)
    return <div className="text-center text-gray-600 mt-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 mt-20">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto pt-12 p-6 min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 text-gray-900 shadow-sm">
        <div className="p-8">
          <div className="absolute top-4 right-4">
            <button
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 text-white p-2 ring-1 ring-indigo-500/30 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              onClick={() => setIsModalOpen(true)}
              aria-label="Edit profile"
              type="button"
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow ring-2 ring-indigo-200">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="mt-4 text-3xl font-semibold">
              {userData.role === "Doctor" ? `Dr. ${userData.fullName}` : userData.fullName}
            </h1>
            <p className="text-gray-600">
              {userData.specialization || "Patient"}
            </p>
          </div>
        </div>

        {/* Description Section */}
        {userData.role === "Doctor" && (
          <div className="px-8 pb-8">
            <DoctorDescription userData={userData} />
          </div>
        )}

        {/* Description Section */}
        {userData.role === "Patient" && (
          <div className="px-8 pb-8">
            <PatentCreditBalance userData={userData} />
          </div>
        )}
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <p className="flex items-center">
            <User className="mr-2 text-blue-500" />
            <strong>Full Name:&nbsp;</strong> {userData.fullName}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <p className="flex items-center">
            <Mail className="mr-2 text-green-500" />
            <strong>Email: &nbsp;</strong> {userData.email}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <p className="flex items-center">
            <Phone className="mr-2 text-purple-500" />
            <strong>Phone Number: &nbsp;</strong> {userData.phoneNumber}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <p className="flex items-center">
            <Calendar className="mr-2 text-red-500" />
            <strong>Date of Birth: &nbsp;</strong>{" "}
            {new Date(userData.dateOfBirth).toLocaleDateString()}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <p className="flex items-center">
            <MapPin className="mr-2 text-yellow-500" />
            <strong>Address:&nbsp;</strong> {userData.address}
          </p>
        </div>

        {/* Doctor-Specific Details */}
        {userData.role === "Doctor" && (
          <>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="flex items-center">
                <Briefcase className="mr-2 text-indigo-500" />
                <strong>Specialization: &nbsp;</strong>{" "}
                {userData.specialization}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="flex items-center">
                <strong>Years of Experience: &nbsp;</strong>{" "}
                {userData.yearsOfExperience}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="flex items-center">
                <strong>Clinic Name: &nbsp;</strong> {userData.clinicName}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="flex items-center">
                <strong>Clinic Address: &nbsp;</strong> {userData.clinicAddress}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="flex items-center">
                <strong>Consultation Fee: &nbsp;</strong> ₹
                {userData.consultationFee}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <DoctorAvailability availability={userData.availability || {}} />
            </div>
          </>
        )}
      </div>
      <EditProfileModal
        userData={userData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
