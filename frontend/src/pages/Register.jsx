import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [customerName, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("customer");

  const navigate = useNavigate();

  async function handleInsert(e) {
    e.preventDefault();

    const url =
      active === "customer"
        ? "https://hotel-1-kdj9.onrender.com/create/customer"
        : "https://hotel-1-kdj9.onrender.com/create/admin";

    const payload =
      active === "customer"
        ? { name: customerName, phone, email, password }
        : { name: customerName, email, password };

    console.log("➡️ Register to:", url, "Payload:", payload);

    try {
      const res = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Register Response:", res.data);

      toast.success(`${active} registered successfully`);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("❌ Register error:", error.response?.data || error.message);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Invalid registration data"
      );
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <div className="flex justify-center gap-8 mb-6">
          <button
            onClick={() => setActive("customer")}
            className={`px-12 py-3 rounded-2xl ${
              active === "customer"
                ? "bg-purple-500 text-white"
                : "border-2 border-black text-black"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setActive("admin")}
            className={`px-12 py-3 rounded-2xl ${
              active === "admin"
                ? "bg-purple-500 text-white"
                : "border-2 border-black text-black"
            }`}
          >
            Admin
          </button>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight mb-4">Register</h2>

        <form onSubmit={handleInsert} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {active === "customer" ? "Customer Name" : "Admin Name"}
            </label>
            <input
              value={customerName}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full rounded-xl text-black border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-xl border text-black border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {active === "customer" && (
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border text-black border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-xl border text-black border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gray-900 px-4 py-2 text-white font-medium hover:bg-black"
          >
            {active === "customer"
              ? "Register Customer"
              : "Register Admin"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Register;
