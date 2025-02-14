import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Assuming the Navbar component is in this path
import SearchBook from "./Components/SearchBook";
import AddUser from "./Components/AddUser";
import AddBook from "./Components/AddBook";
import EditBook from "./Components/EditBook";
import IssueBook from "./Components/IssueBook";
import ReturnBook from "./Components/ReturnBook";
import IssueHistory from "./Components/IssueHistory";

function App() {
  return (
    <>
      {/* The Navbar is rendered on every page */}
      <Navbar />

      {/* Define your routes */}
      <Routes>
        <Route path="/" element={<SearchBook />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="/issue-book" element={<IssueBook />} />
        <Route path="/return-book" element={<ReturnBook />} />
        <Route path="/issue-history" element={<IssueHistory />} />
      </Routes>
    </>
  );
}

export default App;
