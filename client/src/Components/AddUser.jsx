import React, { useState } from "react";

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rfid: "",
    enrollment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      rfid: "",
      enrollment: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User data submitted:", formData);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Form Section */}
      <div className="flex justify-center items-center p-6 bg-gray-800">
        <div className="w-full max-w-lg relative">
          <h2 className="text-3xl text-center mb-4">Add User</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm text-white mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm text-white mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* RFID Number Field */}
            <div>
              <label htmlFor="rfid" className="block text-sm text-white mb-2">
                RFID Number
              </label>
              <input
                type="text"
                id="rfid"
                name="rfid"
                value={formData.rfid}
                onChange={handleChange}
                placeholder="Enter RFID number"
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Enrollment Number Field */}
            <div>
              <label htmlFor="enrollment" className="block text-sm text-white mb-2">
                Enrollment Number
              </label>
              <input
                type="text"
                id="enrollment"
                name="enrollment"
                value={formData.enrollment}
                onChange={handleChange}
                placeholder="Enter enrollment number"
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between space-x-4">
              {/* Reset Button */}
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2 bg-gray-700 text-white rounded-md focus:outline-none hover:bg-gray-600"
              >
                Reset
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-pink-500 text-white rounded-md focus:outline-none hover:bg-pink-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
