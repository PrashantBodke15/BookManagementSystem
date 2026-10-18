import {
  FaBook,
  FaHome,
  FaList,
  FaPlusCircle,
} from "react-icons/fa";

function Navbar({ activePage, onNavigate }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaHome />,
    },
    {
      id: "books",
      label: "Book List",
      icon: <FaList />,
    },
    {
      id: "add",
      label: "Add Book",
      icon: <FaPlusCircle />,
    },
  ];

  return (
    <header className="navbar">
      <div className="brand">
        <FaBook className="brand-icon" />
        <span>BookManager</span>
      </div>

      <nav className="nav-links">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={
              activePage === item.id
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;