import { useState } from "react";

export default function SearchIssuedBooks() {
  const [rfid, setRfid] = useState("");
  const [user, setUser] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setRfid(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated search results (replace with actual API call)
    setTimeout(() => {
      if (rfid === "123456") {
        setUser({ name: "John Doe" });
        setIssuedBooks([
          { id: 1, title: "The Great Gatsby", issueDate: "2025-02-01", returnDate: "2025-03-01" },
          { id: 2, title: "1984", issueDate: "2025-01-15", returnDate: "2025-02-15" },
        ]);
      } else {
        setUser(null);
        setIssuedBooks([]);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Search Form Section - Placed at the top */}
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
        ) : (
          <div>
            {user ? (
              <div>
                <h2 className="text-3xl text-center mb-4">{user.name}</h2>
                <ul className="space-y-4">
                  {issuedBooks.map((book) => (
                    <li
                      key={book.id}
                      className="bg-gray-700 p-4 rounded-md shadow-md flex justify-between items-center hover:bg-gray-600 transition-colors"
                    >
                      <div>
                        <h3 className="text-xl font-semibold">{book.title}</h3>
                        <p className="text-gray-400">Issued: {book.issueDate}</p>
                        <p className="text-gray-400">Return: {book.returnDate}</p>
                      </div>
                      <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-300">
                        Returned
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center text-white">No records found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
