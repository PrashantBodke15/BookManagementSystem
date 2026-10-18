import { FaArrowLeft, FaBook } from "react-icons/fa";

function BookDetails({ book, onBack, onReturn }) {
  if (!book) {
    return (
      <section className="details-card">
        <h2>Book not found</h2>

        <button className="primary-button" onClick={onBack}>
          Back to Book List
        </button>
      </section>
    );
  }

  const available = book.quantity - book.issued;

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Book Details</h1>
          <p>Complete information about this book.</p>
        </div>

        <button className="secondary-button" onClick={onBack}>
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="details-card">
        <div className="details-header">
          <div className="details-book-icon">
            <FaBook />
          </div>

          <div>
            <h2>{book.title}</h2>
            <p>By {book.author}</p>

            <span className="category-badge">
              {book.category}
            </span>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span>Book Code / ISBN</span>
            <strong>{book.isbn}</strong>
          </div>

          <div className="detail-item">
            <span>Total Copies</span>
            <strong>{book.quantity}</strong>
          </div>

          <div className="detail-item">
            <span>Available Copies</span>
            <strong>{available}</strong>
          </div>

          <div className="detail-item">
            <span>Issued Copies</span>
            <strong>{book.issued}</strong>
          </div>
        </div>

        <div className="description-section">
          <h3>Description</h3>

          <p>{book.description || "No description provided."}</p>
        </div>

        <div className="issued-section">
          <h3>Issued To Students</h3>

          {book.issuedTo?.length > 0 ? (
            <div className="issued-list">
              {book.issuedTo.map((record, index) => (
                <div className="issued-record" key={index}>
                  <div>
                    <strong>{record.student}</strong>
                    <p>Issue date: {record.date}</p>
                  </div>

                  <button
                    className="return-button"
                    onClick={() => onReturn(book.id, index)}
                  >
                    Return Book
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No students have currently issued this book.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default BookDetails;