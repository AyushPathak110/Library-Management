import { useState } from "react";

export default function SearchBook() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Sample book data for suggestions
  const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "1984", author: "George Orwell" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger" },
    { title: "Moby-Dick", author: "Herman Melville" },
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter books to show suggestions based on the search query
    if (query.length > 0) {
      const filteredSuggestions = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate fetching results (replace this with actual search logic)
    setTimeout(() => {
      setResults([
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
        { id: 2, title: "1984", author: "George Orwell" },
        { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" }
      ]);
      setIsLoading(false);
      setSuggestions([]); // Clear suggestions after submitting the search
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title); // Set the search query to the selected suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Search Form Section */}
      <div className="flex justify-center items-center p-6 bg-gray-800">
        <div className="w-full max-w-lg relative">
          <h2 className="text-3xl text-center mb-4">Search for a Book</h2>
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-4">
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Enter book title or author"
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {/* Search Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors duration-300"
            >
              Search
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-gray-700 text-white mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.title}
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.title} by {suggestion.author}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="p-6">
        {isLoading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <div>
            {results.length > 0 ? (
              <ul className="space-y-4">
                {results.map((book) => (
                  <li
                    key={book.id}
                    className="bg-gray-700 p-4 rounded-md shadow-md hover:bg-gray-600 transition-colors"
                  >
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-gray-400">{book.author}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-white">No results found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
