import { useState, useEffect } from "react";
import axios from "axios";
import AddBook from "./AddBook"; // Import the AddBook form
import { Link } from "react-router-dom";

export default function SearchBook() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null); // Track book being edited

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/book/");
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredBooks(
      query.length > 0
        ? books.filter(
            (book) =>
              book.bookName.toLowerCase().includes(query.toLowerCase()) ||
              book.author.toLowerCase().includes(query.toLowerCase())
          )
        : books
    );
  };

  const handleEditClick = (book) => {
    setEditingBook(book); // Set the book data to edit
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Show the edit form if a book is selected, otherwise show search */}
      {editingBook ? (
        <AddBook bookToEdit={editingBook} setEditingBook={setEditingBook} />
      ) : (
        <>
          {/* Search Form */}
          <div className="flex justify-center items-center p-6 bg-gray-800">
            <div className="w-full max-w-lg relative">
              <h2 className="text-3xl text-center mb-4">Search for a Book</h2>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Enter book title or author"
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="p-6 hide mt-1 h-[550px] overflow-y-auto">
            {loading ? (
              <div className="text-center text-white text-lg">
                Loading books...
              </div>
            ) : filteredBooks.length > 0 ? (
              <ul className="space-y-4">
                {filteredBooks.map((book) => (
                  <li
                    key={book._id}
                    className="bg-gray-700 p-4 rounded-md shadow-md hover:bg-gray-600 transition-colors flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{book.bookName}</h3>
                      <p className="text-gray-400">{book.author}</p>
                      <p className="text-gray-400">Shelf: {book.section}</p>
                      <p className="text-gray-400">
                        Available: {book.quantity}
                      </p>
                    </div>
                    <Link to={`/edit/${book._id}`}>
                      <button className="w-full sm:w-auto px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
                        Edit
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-white">No books found.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
