import {
  FaBook,
  FaCheckCircle,
  FaExchangeAlt,
  FaLayerGroup,
} from "react-icons/fa";

function Dashboard({ books, onNavigate }) {
  const totalTitles = books.length;

  const totalCopies = books.reduce(
    (sum, book) => sum + Number(book.quantity || 0),
    0
  );

  const issuedCopies = books.reduce(
    (sum, book) => sum + Number(book.issued || 0),
    0
  );

  const availableCopies = totalCopies - issuedCopies;

  const stats = [
    {
      title: "Total Titles",
      value: totalTitles,
      icon: <FaBook />,
      color: "purple",
    },
    {
      title: "Total Copies",
      value: totalCopies,
      icon: <FaLayerGroup />,
      color: "blue",
    },
    {
      title: "Available Copies",
      value: availableCopies,
      icon: <FaCheckCircle />,
      color: "green",
    },
    {
      title: "Issued Copies",
      value: issuedCopies,
      icon: <FaExchangeAlt />,
      color: "orange",
    },
  ];

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Manage your library books in one place.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => onNavigate("add")}
        >
          + Add New Book
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div className={`stat-icon ${stat.color}`}>
              {stat.icon}
            </div>

            <div>
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="welcome-card">
        <div>
          <h2>Welcome to BookManager!</h2>
          <p>
            Add books, view book details, update records,
            and issue books to students.
          </p>

          <button
            className="secondary-button"
            onClick={() => onNavigate("books")}
          >
            View All Books
          </button>
        </div>

        <FaBook className="welcome-icon" />
      </div>
    </section>
  );
}

export default Dashboard;