import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Slidebar() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [topcustomers, setTopCustomers] = useState([]);

  const handleTopCustomers = () => {
    axios.get("https://hotel-1-kdj9.onrender.com/getTopCustomer/order").then((res) => {
      setTopCustomers(res.data);
    });
  };

  const handleGetIncome = () => {
    axios.get("https://hotel-1-kdj9.onrender.com/getIncome/order").then((res) => {
      setTotalIncome(res.data[0].totalIncome);
    });
  };

  useEffect(() => {
    handleGetIncome();
    handleTopCustomers();
  }, []);

  // ✅ Total orders oo laga helayo topcustomers
  const totalOrders = topcustomers.reduce(
    (sum, customer) => sum + customer.totalOrders,
    0
  );

  return (
    <div className="p-6 space-y-6">
      {/* Cards Section */}
      <div className="flex gap-6">
        {/* Total Income Card */}
        <div className="shadow-lg rounded-2xl p-6 w-60 bg-gradient-to-r from-pink-500 to-purple-700">
          <h2 className="text-lg font-semibold text-white">Total Income</h2>
          <h3 className="text-3xl font-bold text-white">${totalIncome}</h3>
        </div>

        {/* Total Orders Card */}
        <div className="shadow-lg rounded-2xl p-6 w-60 bg-gradient-to-r from-pink-500 to-purple-700">
          <h2 className="text-lg font-semibold text-white">Total Booking</h2>
          <h3 className="text-3xl font-bold text-white">{totalOrders}</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="shadow-lg rounded-2xl p-6 bg-gradient-to-r from-pink-500 to-purple-700">
        <h2 className="text-lg font-semibold text-white mb-4">Top Customers</h2>
        <table className="table-auto border-collapse w-full text-white">
          <thead>
            <tr className="bg-black/30 text-sm">
              <th className="border px-4 py-2 text-left">Customer</th>
              <th className="border px-4 py-2 text-center">Booking</th>
              <th className="border px-4 py-2 text-right">Spent</th>
            </tr>
          </thead>
          <tbody>
            {topcustomers.map((items, index) => (
              <tr
                key={index}
                className="hover:bg-black/20 transition duration-200"
              >
                <td className="border px-4 py-2">{items.customer}</td>
                <td className="border px-4 py-2 text-center">
                  {items.totalOrders}
                </td>
                <td className="border px-4 py-2 text-right">
                  ${items.totalSpent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Section */}
      <div className="shadow-lg rounded-2xl p-6 bg-white">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Top Customers Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={topcustomers}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="customer" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="totalSpent" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Slidebar;
