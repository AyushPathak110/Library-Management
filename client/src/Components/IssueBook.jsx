import React, { useState, useEffect } from "react";
import axios from "axios";

export default function IssueBook() {
  const [formData, setFormData] = useState({
    userRfid: "",
    bookRfid: "",
    issueDate: "",
    returnDate: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [scanningUser, setScanningUser] = useState(true);
  const [scanningBook, setScanningBook] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.137.142:5500/ws");

    socket.onmessage = (event) => {
      const rfidData = event.data;
      if (scanningUser) {
        setFormData((prevData) => ({ ...prevData, userRfid: rfidData }));
        setScanningUser(false);
        setScanningBook(true);
      } else if (scanningBook) {
        setFormData((prevData) => ({ ...prevData, bookRfid: rfidData }));
        setScanningBook(false);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [scanningUser, scanningBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      userRfid: "",
      bookRfid: "",
      issueDate: "",
      returnDate: "",
    });
    setScanningUser(true);
    setScanningBook(false);
    setMessage({ text: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userRfid || !formData.bookRfid || !formData.issueDate) {
      setMessage({ text: "Please fill in all required fields.", type: "error" });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/update-issued-books/${formData.userRfid}`,
        {
          bookId: formData.bookRfid,
          issueDate: formData.issueDate,
          returnDate: formData.returnDate || null,
        }
      );

      setMessage({ text: "Book issued successfully!", type: "success" });
      handleReset();
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "Failed to issue book.", type: "error" });
    }

    setTimeout(() => setMessage({ text: "", type: "" }), 1400);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {message.text && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white text-center z-50 transition-all duration-500 ${message.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-center items-center p-6 bg-gray-800">
        <div className="w-full max-w-lg relative">
          <h2 className="text-3xl text-center mb-4">Issue Book</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm text-white mb-2">User RFID</label>
              <input
                type="text"
                name="userRfid"
                value={formData.userRfid}
                onChange={handleChange}
                placeholder="Scan user's RFID.."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm text-white mb-2">Book RFID</label>
              <input
                type="text"
                name="bookRfid"
                value={formData.bookRfid}
                onChange={handleChange}
                placeholder="Scan Book's RFID.."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Return Date (Optional)</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex justify-between space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              >
                Reset
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
              >
                Issue Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
