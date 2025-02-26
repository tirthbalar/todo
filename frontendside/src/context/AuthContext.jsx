import { createContext, useState, useContext } from 'react';
import axiosInstance from '../axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials, redirect) => {
    try {
      const { data } = await axiosInstance.post('/login', credentials);
      setUser(data);
      if (redirect) redirect();  // ✅ Call redirect function
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };
  
  

  const logout = async (redirect) => {
    await axiosInstance.post('/logout');
    setUser(null);
    if (redirect) redirect('/login'); // Redirect after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
