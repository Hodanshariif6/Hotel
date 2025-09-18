import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("customer");
  const navigate = useNavigate();

  async function handleInsert(e) {
    e.preventDefault();

    const url =
      active === "customer"
        ? "https://hotel-1-kdj9.onrender.com/login/customer"
        : "https://hotel-1-kdj9.onrender.com/login/admin";

    const payload = { email, password };
    console.log("➡️ Sending to:", url, "Payload:", payload);

    try {
      const res = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Response:", res.data);

      toast.success(`${active} login successfully`);
      localStorage.setItem(
        active === "customer" ? "customer" : "admin",
        JSON.stringify(res.data) // save only res.data
      );

      setTimeout(() => navigate(active === "customer" ? "/" : "/dashboard"), 1500);
    } catch (error) {
      console.error("❌ Login error:", error.response?.data || error.message);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Email ama password waa khalad"
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {/* Switch Tabs */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setActive("customer")}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              active === "customer"
                ? "bg-blue-600 text-white shadow-lg"
                : "border border-gray-400 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setActive("admin")}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              active === "admin"
                ? "bg-blue-600 text-white shadow-lg"
                : "border border-gray-400 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {active === "customer" ? "Customer Login" : "Admin Login"}
        </h2>

        {/* Form */}
        <form onSubmit={handleInsert} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white font-semibold 
                       hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            {active === "customer" ? "Login as Customer" : "Login as Admin"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;
