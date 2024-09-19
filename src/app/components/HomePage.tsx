'use client'
import { useState, useEffect } from 'react';
import { Creepster } from 'next/font/google';
import backgroundImg from './IlS2ZfmO.jpg';
import { FaUserSecret } from 'react-icons/fa';

const creepster = Creepster({
  weight: ['400'],
  subsets: ['latin'],
});

export default function HomePage() {
  // State for the correct password, error messages, and admin panel status
  const [inputPassword, setInputPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [adminAccess, setAdminAccess] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [correctPassword, setCorrectPassword] = useState('Peter'); // Default password

  // Admin access password
  const adminAccessPassword = 'whap';


  // Load the password from localStorage if window is available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPassword = localStorage.getItem('escapeRoomPassword') || 'Peter';
      setCorrectPassword(storedPassword);
    }
  }, []);

  // Function to check the entered user password
  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === correctPassword) {
      setPasswordMessage('Correct password!');
      setSecretCode('The Lockbox code is: 4562');
      clearMessages();
    } else {
      setPasswordMessage('Incorrect password');
      setSecretCode('');
      clearMessages();
    }
  };

  // Function to handle admin password changes
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminAccess) {
      if (newPassword) {
        localStorage.setItem('escapeRoomPassword', newPassword);
        setCorrectPassword(newPassword); // Update local state
        setPasswordMessage('Password changed successfully.');
        setSecretCode('');
        setNewPassword('');
        setShowAdminPanel(false);
        setAdminAccess(false); // Close the admin panel after changing password
        clearMessages();
      } else {
        setAdminMessage('Please enter a new password.');
        clearMessages();
      }
    } else {
      setAdminMessage('Unauthorized: Admin access required.');
      clearMessages();
    }
  };

  // Admin access handler
  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === adminAccessPassword) {
      setAdminAccess(true);
      setAdminMessage('');
      setAdminPassword('');
    } else {
      setAdminMessage('Incorrect admin access password.');
      clearMessages();
    }
  };

  const clearMessages = () => {
    setTimeout(() => {
      setPasswordMessage('');
      setAdminMessage('');
    }, 3000); // Clear messages after 3 seconds
  };


  return (
    <div
      className={`min-h-screen flex justify-center items-center bg-mad-scientist-bg text-white ${creepster.className}`}
      style={{ backgroundImage: `url(${backgroundImg.src})`, backgroundSize: 'cover' }}
    >
      <div className="text-center p-8 bg-mad-scientist-bg rounded-lg shadow-lg border border-mad-scientist-green">
        <h2 className="text-4xl mb-4 text-mad-scientist-green">Dr. Heinrich's Lair</h2>
        <p>Enter the password to escape the Mad Scientist!</p>

        {/* User password input */}
        <form onSubmit={handleSubmitPassword} className="mb-4">
        <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Enter password"
            className="bg-transparent border-b-2  border-mad-scientist-green text-white p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-mad-scientist-green transition-all duration-300"
            required
          />
        <button
          type="submit"
          className="bg-mad-scientist-green text-mad-scientist-bg px-6 py-2 mt-4 hover:bg-mad-scientist-purple"
        >
          Submit
        </button>
        </form>

        {/* User error message */}
        <p className={`mb-4 text-center ${passwordMessage.includes('Incorrect') ? 'text-red-500' : 'text-green-500'}`}>
          {passwordMessage}
        </p>
        {secretCode && <p className=" text-center text-mad-scientist-green">{secretCode}</p>}
        </div>

        {/* Admin Panel */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="text-mad-scientist-green hover:text-mad-scientist-purple"
          >
            <FaUserSecret size={32} />
          </button>

          {/* Admin panel content */}
          {showAdminPanel &&  (
            <div className="p-4 bg-mad-scientist-bg border border-mad-scientist-green rounded-lg mt-2">
              <form onSubmit={handleAdminAccess} className="mb-4">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="bg-transparent w-full border-b-2 border-mad-scientist-green text-white p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-mad-scientist-green transition-all duration-300"
                placeholder="Enter admin password"
                required
              />
              <button
                type="submit"
                className="bg-mad-scientist-purple w-full text-white px-6 py-2 hover:bg-mad-scientist-green transition-all duration-300"
              >
                Grant Access
              </button>

              {/* Admin error message */}
              <p className={`mt-4 text-center ${adminMessage.includes('Incorrect') ? 'text-red-500' : 'text-green-500'}`}>
              {adminMessage}
            </p>
              </form>

              {adminAccess && (
            <form onSubmit={handleChangePassword}>
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="bg-transparent w-full border-b-2 border-mad-scientist-green text-white p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-mad-scientist-green transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="bg-mad-scientist-purple w-full text-white px-6 py-2 hover:bg-mad-scientist-green transition-all duration-300"
              >
                Change Password
              </button>
              <p className={`mt-4 text-center ${adminMessage.includes('changed') ? 'text-green-500' : 'text-red-500'}`}>
                {adminMessage}
              </p>
            </form>
          )}
            </div>
          )}
        </div>
      </div>
    
  );
}



