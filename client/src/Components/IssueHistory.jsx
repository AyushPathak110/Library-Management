import { useState, useEffect } from "react";

export default function SearchIssuedBooks() {
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    // Fetch all users with issued books
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user"); // Update with your actual API endpoint
        const data = await response.json();
        setAllUsers(data);
        setFilteredUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search query
    const results = allUsers.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(results);
  }, [search, allUsers]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Search Input */}
      <div className="p-6 bg-gray-800 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search User by Name"
          className="w-full max-w-lg px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Display Users and Issued Books */}
      <div className="p-6 h-[600px] overflow-y-auto hide">
        {isLoading ? (
          <div className="text-center text-white">Loading...</div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="mb-8">
              <h2 className="text-3xl text-center mb-4">{user.name}</h2>
              <ul className="space-y-4">
                {user.issuedBooks.length > 0 ? (
                  user.issuedBooks.map((book) => (
                    <li
                      key={book._id}
                      className="bg-gray-700 p-4 rounded-md shadow-md flex justify-between items-center hover:bg-gray-600 transition-colors"
                    >
                      <div>
                        <h3 className="text-xl font-semibold">
                          {book.bookId.bookName}
                        </h3>
                        <p className="text-gray-400">
                          Issued: {new Date(book.issueDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-400">
                          Return: {new Date(book.returnDate).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No books issued.</p>
                )}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center text-white">No users found.</div>
        )}
      </div>

      {/* Notification Message */}
      {message.text && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white text-center z-50 transition-all duration-500 ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          } ${
            message.text
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
