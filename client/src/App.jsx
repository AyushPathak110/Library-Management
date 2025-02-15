import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SearchBook from "./Components/SearchBook";
import AddUser from "./Components/AddUser";
import AddBook from "./Components/AddBook";
import EditBook from "./Components/EditBook";
import IssueBook from "./Components/IssueBook";
import IssueHistory from "./Components/IssueHistory";
import ReturnBook from "./Components/ReturnBook";

function App() {
  const ws = useRef(null); 

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.137.34:5500/ws");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = async (event) => {
      const bookId = event.data;
      console.log("Received book ID:", bookId);

      try {
        const response = await fetch(`http://localhost:8080/api/user/check-book/${bookId}`);
        const result = await response.json();

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify(result.status));
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <>
      <Navbar />
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

