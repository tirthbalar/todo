import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ModalForm from "./components/ModalForm";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import { AuthProvider, useAuth } from "./context/AuthContext";
import axiosInstance from "./axiosConfig";
import Login from "./components/login";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchClients = async () => {
    try {
      const response = await axiosInstance.get("/clients");
      setTableData(response.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleSubmit = async (newClientData) => {
    try {
      let response;
      if (modalMode === "add") {
        response = await axiosInstance.post("/clients", newClientData);
        setTableData((prevData) => [...prevData, response.data]);
      } else {
        response = await axiosInstance.put(
          `/clients/${clientData.id}`,
          newClientData
        );
        setTableData((prevData) =>
          prevData.map((client) =>
            client.id === clientData.id ? response.data : client
          )
        );
      }
      setIsOpen(false);
    } catch (err) {
      console.error("Error handling client:", err);
    }
  };

  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <TableList
        setTableData={setTableData}
        tableData={tableData}
        handleOpen={handleOpen}
        searchTerm={searchTerm}
      />
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        clientData={clientData}
      />
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
