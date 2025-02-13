import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddBook() {
  const [formData, setFormData] = useState({
    bookName: "",
    rfid: "",
    author: "",
    quantity: "",
    section: "",
    publication: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.137.142:5500/ws"); // Adjust the WebSocket URL as needed

    socket.onmessage = (event) => {
      const rfidData = event.data;
      setFormData((prevData) => ({
        ...prevData,
        rfid: rfidData,
      }));
      setScanning(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormData({
      bookName: "",
      rfid: "",
      author: "",
      quantity: "",
      section: "",
      publication: "",
    });
    setScanning(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/book/add",
        formData
      );
      setMessage({ text: response.data.message, type: "success" });
      handleReset();
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Failed to add book",
        type: "error",
      });
    }

    setTimeout(() => setMessage({ text: "", type: "" }), 1400);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {message.text && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white text-center z-50 transition-all duration-500 ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-center items-center p-6 bg-gray-800">
        <div className="w-full max-w-lg relative">
          <h2 className="text-3xl text-center mb-4">Add Book</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label htmlFor="bookName" className="block text-sm text-white mb-2">
                Book Name
              </label>
              <input
                type="text"
                id="bookName"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                placeholder="Enter book name"
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

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
                placeholder="Waiting for RFID scan..."
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm text-white mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm text-white mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            {/* Section Field */}
            <div>
              <label htmlFor="section" className="block text-sm text-white mb-2">
                Section
              </label>
              <input
                type="text"
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="Enter section"
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Publication Field */}
            <div>
              <label htmlFor="publication" className="block text-sm text-white mb-2">
                Publication
              </label>
              <input
                type="text"
                id="publication"
                name="publication"
                value={formData.publication}
                onChange={handleChange}
                placeholder="Enter publication"
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex justify-between space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2 bg-gray-700 text-white rounded-md focus:outline-none hover:bg-gray-600"
              >
                Reset
              </button>

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
