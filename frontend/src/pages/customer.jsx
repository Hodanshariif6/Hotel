import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Customer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Retrieve data from localStorage
    const savedData = JSON.parse(localStorage.getItem("customerData"));
    if (savedData) {
      setData(savedData);
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>No customer data available. Please fill out the form.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Customer Info</h2>
        <p className="mb-2">
          <strong>Name:</strong> {data.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Message:</strong> {data.message}
        </p>
      </motion.div>
    </div>
  );
}
