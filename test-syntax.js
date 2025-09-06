// Test file for Tailwind Themes syntax highlighting
// Try different themes to see how these elements look!

import React from 'react';
import { useState, useEffect } from 'react';

/**
 * Sample React component to test syntax highlighting
 * @param {Object} props - Component propertiesw
 * @returns {JSX.Element} The rendered component
 */
const TailwindThemeTest = ({ initialCount = 0, className = "default" }) => {
  // State management
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Constants and variables
  const API_URL = 'https://api.example.com/users';
  const MAX_RETRIES = 3;
  let retryCount = 0;

  // Effect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        
        // Retry logic
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          setTimeout(fetchData, 1000 * retryCount);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Event handlers
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  // Helper functions
  const formatCount = (num) => {
    return num.toLocaleString();
  };

  const getCounterClass = () => {
    if (count > 10) return 'text-green-500';
    if (count < 0) return 'text-red-500';
    return 'text-blue-500';
  };

  // Render component
  return (
    <div className={`p-6 max-w-md mx-auto ${className}`}>
      <h1 className="text-2xl font-bold mb-4">
        Tailwind Theme Test Component
      </h1>
      
      <div className="space-y-4">
        {/* Counter Section */}
        <div className="text-center">
          <p className="text-lg mb-2">Current Count:</p>
          <span className={`text-3xl font-bold ${getCounterClass()}`}>
            {formatCount(count)}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 justify-center">
          <button 
            onClick={handleDecrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={isLoading}
          >
            -
          </button>
          
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            disabled={isLoading}
          >
            Reset
          </button>
          
          <button 
            onClick={handleIncrement}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={isLoading}
          >
            +
          </button>
        </div>

        {/* Users List */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Users:</h2>
          {isLoading ? (
            <p className="text-gray-500 italic">Loading users...</p>
          ) : users.length > 0 ? (
            <ul className="space-y-1">
              {users.map((user, index) => (
                <li key={user.id || index} className="p-2 bg-gray-100 rounded">
                  <span className="font-medium">{user.name}</span>
                  {user.email && (
                    <span className="text-gray-600 ml-2">({user.email})</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Export default
export default TailwindThemeTest;

// Named exports
export { TailwindThemeTest };

// Example usage with different themes:
/*
  Try these themes and see how the syntax highlighting looks:
  - Tailwind Blue Dark (classic and professional)
  - Tailwind Emerald Light (fresh and modern)
  - Tailwind Purple Dark (creative and inspiring)
  - Tailwind Rose Light (soft and elegant)
  - Tailwind Slate Dark (minimal and clean)
*/
