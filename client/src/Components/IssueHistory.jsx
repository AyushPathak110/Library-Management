import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchIssuedBooks() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(""); // Clear previous errors

      try {
        // Fetch all users and their issued books
        const response = await axios.get("http://localhost:8080/api/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to fetch data. Please try again.");
      }

      setIsLoading(false);
    };

    fetchUsers();
  }, []); // Fetch data once when the component mounts

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Results Section */}
      <div className="p-6">
        {isLoading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : users.length > 0 ? (
          <div>
            <h2 className="text-3xl text-center mb-4">All Users and Issued Books</h2>
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user._id} className="bg-gray-700 p-4 rounded-md shadow-md">
                  <h3 className="text-2xl font-semibold">{user.name}</h3>
                  <ul className="space-y-2 mt-2">
                    {user.issuedBooks && user.issuedBooks.length > 0 ? (
                      user.issuedBooks.map((book) => (
                        <li
                          key={book._id}
                          className="bg-gray-600 p-3 rounded-md shadow-md flex justify-between items-center hover:bg-gray-500 transition-colors"
                        >
                          <div>
                            <h4 className="text-xl font-semibold">{book.title}</h4>
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
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center text-white">No users found.</div>
        )}
      </div>
    </div>
  );
}
