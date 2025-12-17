import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components";

export default function Profile() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);

  // ✅ NEW: inline success message
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    skill: "",
    location: "",
  });

  // ✅ Load data from Signup (localStorage)
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 🔗 Backend integration placeholder
  const saveProfile = async () => {
    try {
      /*
      await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      */

      // Update localStorage for now
      localStorage.setItem("userProfile", JSON.stringify(profile));

      // ✅ Inline success message
      setMessage("Profile updated successfully");
      setIsEditing(false);

      // Auto hide message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP NAV */}
      <header className="bg-white border-b">
        <div className="px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo size={36} textColor="#2563eb" />
            <span
              className="cursor-pointer text-gray-600 hover:text-blue-600"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              {profile.name?.charAt(0) || "U"}
            </div>
            <span>{profile.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-1">Account Settings</h1>
        <p className="text-gray-600 mb-8">
          Manage your profile details and security.
        </p>

        {/* ✅ INLINE MESSAGE */}
        {message && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-green-100 text-green-700">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PROFILE CARD */}
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 flex items-center justify-center text-3xl font-bold">
              {profile.name?.charAt(0) || "U"}
            </div>
            <h3 className="mt-4 font-semibold">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.email}</p>

            <span className="inline-block mt-3 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
              Volunteer
            </span>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
            {/* Tabs */}
            <div className="border-b px-6 flex gap-6">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 ${
                  activeTab === "details"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
              >
                Personal Details
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`py-4 ${
                  activeTab === "security"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
              >
                Security
              </button>
            </div>

            <div className="p-6">
              {/* PERSONAL DETAILS */}
              {activeTab === "details" && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Your Information</h3>

                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <input
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full mt-1 px-4 py-3 border rounded-lg ${
                          !isEditing && "bg-gray-100"
                        }`}
                      />
                    </div>

                    {/* Email always non-editable */}
                    <div>
                      <label className="text-sm font-medium">Email Address</label>
                      <input
                        value={profile.email}
                        disabled
                        className="w-full mt-1 px-4 py-3 border rounded-lg bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Skill</label>
                      <input
                        name="skill"
                        value={profile.skill}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full mt-1 px-4 py-3 border rounded-lg ${
                          !isEditing && "bg-gray-100"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <input
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full mt-1 px-4 py-3 border rounded-lg ${
                          !isEditing && "bg-gray-100"
                        }`}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <button
                      onClick={saveProfile}
                      className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                      Save Changes
                    </button>
                  )}
                </>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Change Password</h3>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Update Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
