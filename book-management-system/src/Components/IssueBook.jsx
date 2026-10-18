import { useState } from "react";

import { FaBook, FaUserGraduate } from "react-icons/fa";

function IssueBook({
  books,
  selectedBook,
  onIssue,
  onCancel,
}) {
  const [bookId, setBookId] = useState(
    selectedBook?.id ? String(selectedBook.id) : ""
  );

  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");

  const book = books.find(
    (item) => String(item.id) === String(bookId)
  );

  const available = book
    ? Number(book.quantity) - Number(book.issued)
    : 0;

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!book) {
      setError("Please select a book.");
      return;
    }

    if (!studentName.trim()) {
      setError("Please enter the student's name.");
      return;
    }

    if (available <= 0) {
      setError("No copies of this book are currently available.");
      return;
    }

    onIssue(book.id, studentName.trim());
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Issue Book</h1>
          <p>Assign an available book to a student.</p>
        </div>
      </div>

      <form className="form-card issue-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="bookId">
            <FaBook /> Select Book
          </label>

          <select
            id="bookId"
            value={bookId}
            onChange={(event) => setBookId(event.target.value)}
            required
          >
            <option value="">-- Select a book --</option>

            {books.map((item) => (
              <option
                key={item.id}
                value={item.id}
                disabled={item.quantity - item.issued <= 0}
              >
                {item.title} — Available:{" "}
                {item.quantity - item.issued}
              </option>
            ))}
          </select>
        </div>

        {book && (
          <div className="selected-book-info">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Category: {book.category}</p>

            <p>
              Available copies: <strong>{available}</strong>
            </p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="studentName">
            <FaUserGraduate /> Student Name
          </label>

          <input
            id="studentName"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="Enter student name"
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={!book || available <= 0}
          >
            Issue Book
          </button>
        </div>
      </form>
    </section>
  );
}

export default IssueBook;