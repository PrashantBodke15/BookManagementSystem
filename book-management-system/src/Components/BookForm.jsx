import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  author: "",
  category: "",
  isbn: "",
  quantity: 1,
  description: "",
};

function BookForm({ book, books, onAdd, onUpdate, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);

  const [error, setError] = useState("");

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        category: book.category || "",
        isbn: book.isbn || "",
        quantity: book.quantity ?? 1,
        description: book.description || "",
      });
    } else {
      setFormData(emptyForm);
    }

    setError("");
  }, [book]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const quantity = Number(formData.quantity);

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.category.trim() ||
      !formData.isbn.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      setError("Quantity must be a positive whole number.");
      return;
    }

    const duplicateISBN = books.some(
      (item) =>
        item.isbn.trim().toLowerCase() ===
          formData.isbn.trim().toLowerCase() &&
        item.id !== book?.id
    );

    if (duplicateISBN) {
      setError("A book with this ISBN already exists.");
      return;
    }

    if (book && quantity < book.issued) {
      setError(
        `Quantity cannot be less than issued copies (${book.issued}).`
      );
      return;
    }

    const cleanedBook = {
      ...formData,
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category.trim(),
      isbn: formData.isbn.trim(),
      quantity,
    };

    if (book) {
      onUpdate({
        ...book,
        ...cleanedBook,
      });
    } else {
      onAdd(cleanedBook);
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>{book ? "Edit Book" : "Add New Book"}</h1>
          <p>
            {book
              ? "Update the book information."
              : "Enter the details of the new book."}
          </p>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Book Title *</label>

            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author Name *</label>

            <input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>

            <input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Programming"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="isbn">ISBN / Book Code *</label>

            <input
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter unique book code"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Total Copies *</label>

            <input
              id="quantity"
              name="quantity"
              type="number"
              min={book ? book.issued : 1}
              step="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter book description"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button type="submit" className="primary-button">
            {book ? "Update Book" : "Save Book"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookForm;