import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import BookForm from "./Components/BookForm";
import BookList from "./Components/BookList";
import BookDetails from "./Components/BookDetails";
import IssueBook from "./Components/IssueBook";

const initialBooks = [
  {
    id: 1,
    title: "Java Programming",
    author: "Herbert Schildt",
    category: "Programming",
    isbn: "ISBN001",
    quantity: 5,
    issued: 2,
    description: "A book covering Java programming fundamentals.",
    issuedTo: [
      { student: "Rahul Patil", date: "2026-10-15" },
      { student: "Amit Sharma", date: "2026-10-16" },
    ],
  },
  {
    id: 2,
    title: "React for Beginners",
    author: "John Smith",
    category: "Web Development",
    isbn: "ISBN002",
    quantity: 4,
    issued: 1,
    description: "Learn React components, props, state, and hooks.",
    issuedTo: [
      { student: "Priya Joshi", date: "2026-10-17" },
    ],
  },
];

function App() {
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem("books");

      return savedBooks === null
        ? initialBooks
        : JSON.parse(savedBooks);
    } catch {
      return initialBooks;
    }
  });

  const [activePage, setActivePage] = useState("dashboard");
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  function addBook(book) {
    const newBook = {
      ...book,
      id: Date.now(),
      issued: 0,
      issuedTo: [],
    };

    setBooks((previousBooks) => [...previousBooks, newBook]);
    setActivePage("books");
  }

  function updateBook(updatedBook) {
    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );

    setEditingBook(null);
    setActivePage("books");
  }

  function deleteBook(id) {
    const book = books.find((item) => item.id === id);

    if (book?.issued > 0) {
      alert("This book cannot be deleted while it is issued.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks((previousBooks) =>
        previousBooks.filter((book) => book.id !== id)
      );
    }
  }

  function viewBook(book) {
    setSelectedBook(book);
    setActivePage("details");
  }

  function editBook(book) {
    setEditingBook(book);
    setActivePage("add");
  }

  function issueBook(bookId, studentName) {
    setBooks((previousBooks) =>
      previousBooks.map((book) => {
        if (book.id !== bookId) {
          return book;
        }

        if (book.quantity - book.issued <= 0) {
          return book;
        }

        return {
          ...book,
          issued: book.issued + 1,
          issuedTo: [
            ...(book.issuedTo || []),
            {
              student: studentName,
              date: new Date().toISOString().slice(0, 10),
            },
          ],
        };
      })
    );

    setActivePage("books");
  }

  function returnBook(bookId, studentIndex) {
    setBooks((previousBooks) =>
      previousBooks.map((book) => {
        if (book.id !== bookId) {
          return book;
        }

        const issuedTo = [...(book.issuedTo || [])];

        issuedTo.splice(studentIndex, 1);

        return {
          ...book,
          issued: Math.max(0, book.issued - 1),
          issuedTo,
        };
      })
    );
  }

  function renderPage() {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            books={books}
            onNavigate={setActivePage}
          />
        );

      case "add":
        return (
          <BookForm
            book={editingBook}
            books={books}
            onAdd={addBook}
            onUpdate={updateBook}
            onCancel={() => {
              setEditingBook(null);
              setActivePage("books");
            }}
          />
        );

      case "books":
        return (
          <BookList
            books={books}
            onView={viewBook}
            onEdit={editBook}
            onDelete={deleteBook}
            onIssue={(book) => {
              setSelectedBook(book);
              setActivePage("issue");
            }}
          />
        );

      case "details":
        return (
          <BookDetails
            book={books.find(
              (book) => book.id === selectedBook?.id
            )}
            onBack={() => setActivePage("books")}
            onReturn={returnBook}
          />
        );

      case "issue":
        return (
          <IssueBook
            books={books}
            selectedBook={selectedBook}
            onIssue={issueBook}
            onCancel={() => setActivePage("books")}
          />
        );

      default:
        return (
          <Dashboard
            books={books}
            onNavigate={setActivePage}
          />
        );
    }
  }

  return (
    <div className="app">
      <Navbar
        activePage={activePage}
        onNavigate={(page) => {
          setEditingBook(null);
          setActivePage(page);
        }}
      />

      <main className="main-content">
        {renderPage()}
      </main>

      <footer className="footer">
        <p>Book Management System © 2026</p>
      </footer>
    </div>
  );
}

export default App;