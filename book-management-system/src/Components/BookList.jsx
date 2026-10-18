import { useMemo, useState } from "react";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaExchangeAlt,
} from "react-icons/fa";

function BookList({
  books,
  onView,
  onEdit,
  onDelete,
  onIssue,
}) {
  const [search, setSearch] = useState("");

  const filteredBooks = useMemo(() => {
    const term = search.trim().toLowerCase();

    return books.filter((book) =>
      [
        book.title,
        book.author,
        book.category,
        book.isbn,
      ].some((value) =>
        String(value || "").toLowerCase().includes(term)
      )
    );
  }, [books, search]);

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Book List</h1>
          <p>View and manage all registered books.</p>
        </div>

        <span className="book-count">
          {filteredBooks.length} book(s)
        </span>
      </div>

      <div className="table-card">
        <div className="search-box">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, author, category, or ISBN..."
          />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Category</th>
                <th>ISBN</th>
                <th>Available</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((book) => {
                const available =
                  Number(book.quantity) - Number(book.issued);

                return (
                  <tr key={book.id}>
                    <td>
                      <strong>{book.title}</strong>
                    </td>

                    <td>{book.author}</td>

                    <td>
                      <span className="category-badge">
                        {book.category}
                      </span>
                    </td>

                    <td>{book.isbn}</td>

                    <td>{available}</td>

                    <td>
                      <span
                        className={
                          available > 0
                            ? "status-badge available"
                            : "status-badge issued"
                        }
                      >
                        {available > 0
                          ? "Available"
                          : "Fully Issued"}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="icon-button view"
                          title="View details"
                          onClick={() => onView(book)}
                        >
                          <FaEye />
                        </button>

                        <button
                          className="icon-button edit"
                          title="Edit book"
                          onClick={() => onEdit(book)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="icon-button issue"
                          title="Issue book"
                          disabled={available <= 0}
                          onClick={() => onIssue(book)}
                        >
                          <FaExchangeAlt />
                        </button>

                        <button
                          className="icon-button delete"
                          title="Delete book"
                          disabled={book.issued > 0}
                          onClick={() => onDelete(book.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredBooks.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default BookList;