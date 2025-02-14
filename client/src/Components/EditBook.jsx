import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditBook() {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookName: "",
    rfid: "",
    author: "",
    quantity: "",
    section: "",
    publication: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/book/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setMessage({ text: "Error fetching book details", type: "error" });
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/book/update/${id}`, formData);
      setMessage({ text: "Book updated successfully!", type: "success" });

      setTimeout(() => {
        navigate("/"); // Redirect to search page
      }, 1500);
    } catch (error) {
      setMessage({ text: "Failed to update book", type: "error" });
    }
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
          <h2 className="text-3xl text-center mb-4">Edit Book</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm text-white mb-2">Book Name</label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">RFID Number</label>
              <input
                type="text"
                name="rfid"
                value={formData.rfid}
                className="w-full px-4 py-2 text-gray-400 bg-gray-700 border border-gray-600 rounded-md"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Section</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Publication</label>
              <input
                type="text"
                name="publication"
                value={formData.publication}
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md"
                required
              />
            </div>

            <div className="flex justify-between space-x-4">
              <button
                type="button"
                onClick={() => navigate("/search")}
                className="w-full sm:w-auto px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
