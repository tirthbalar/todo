import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NavBar({ onOpen, onSearch }) {

  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    onSearch(event.target.value); // Call the onSearch callback with the input value
  };

  return (
    <>
  <div className="navbar bg-base-100 shadow-md p-4 flex justify-between items-center">
    {/* Left Side: Logo */}
    <div className="navbar-start">
      <a className="text-2xl font-semibold ">Clients</a>
    </div>

    {/* Center: Search Bar */}
    <div className="navbar-center">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search clients..."
          onChange={handleSearchChange}
          className="input input-bordered rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 w-64 max-w-md px-4 py-2"
        />
      </div>
    </div>

    {/* Right Side: Add Client & Logout Buttons */}
    <div className="navbar-end flex gap-4">
      <button
        onClick={onOpen}
        className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition shadow-md"
      >
        Add Client
      </button>

      <button
        onClick={handleLogout}
        className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition shadow-md"
      >
        Logout
      </button>
    </div>
  </div>
</>

  );
}
