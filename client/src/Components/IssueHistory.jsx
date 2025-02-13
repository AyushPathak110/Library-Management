import { useState } from "react";
import axios from "axios";

export default function SearchIssuedBooks() {
  const [rfid, setRfid] = useState("");
  const [user, setUser] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchChange = (e) => {
    setRfid(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      // Fetch user details
      const userResponse = await axios.get(`http://localhost:8080/api/user/${rfid}`);
      setUser(userResponse.data);

      // Fetch issued books
      const booksResponse = await axios.get(`http://localhost:8080/api/issued/${rfid}`);
      setIssuedBooks(booksResponse.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setUser(null);
      setIssuedBooks([]);
      setError(err.response?.data?.message || "Failed to fetch data. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Search Form Section */}
      <div className="p-6 bg-gray-800 flex justify-center">
        <div className="w-full max-w-lg relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-4">
            <input
              type="text"
              value={rfid}
              onChange={handleSearchChange}
              placeholder="Enter User RFID Number"
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Search Results */}
      <div className="p-6">
        {isLoading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : user ? (
          <div>
            <h2 className="text-3xl text-center mb-4">{user.name}</h2>
            <ul className="space-y-4">
              {issuedBooks.length > 0 ? (
                issuedBooks.map((book) => (
                  <li
                    key={book._id}
                    className="bg-gray-700 p-4 rounded-md shadow-md flex justify-between items-center hover:bg-gray-600 transition-colors"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{book.title}</h3> {/* ✅ Shows book title */}
                      <p className="text-gray-400">Issued: {new Date(book.issueDate).toLocaleDateString()}</p>
                      <p className="text-gray-400">Return: {new Date(book.returnDate).toLocaleDateString()}</p>
                    </div>
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-300">
                      Returned
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-400">No issued books found.</p>
              )}
            </ul>
          </div>
        ) : (
          <div className="text-center text-white">No records found.</div>
        )}
      </div>
    </div>
  );
}
