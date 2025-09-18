import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaMinus, FaPlus, FaBed } from "react-icons/fa";

function Cart() {
  const [bookingData, setBookingData] = useState([]);
  const [profile, setProfile] = useState(null);

  const roomPrices = { single: 50, double: 100, family: 200 };

  // Fetch Products (localStorage)
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("products")) || [];
    const update = getData.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
      maxQuantity: item.quantity || 5,
      roomType: item.roomType || "single",
      checkIn: item.checkIn || "",
      checkOut: item.checkOut || "",
      nights: item.nights || 0,
    }));
    setBookingData(update);
  }, []);

  // Fetch Profile (Reminder)
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) setProfile(savedProfile);

    const handleProfileUpdate = () => {
      const updatedProfile = JSON.parse(localStorage.getItem("profile"));
      setProfile(updatedProfile);
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
  }, []);

  // Delete Profile
  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      localStorage.removeItem("profile");
      setProfile(null);
    }
  };

  // Get customer from localStorage
  const getCustomer = localStorage.getItem("customer");
  let customerOrder = "";
  if (getCustomer) {
    try {
      customerOrder = JSON.parse(getCustomer)?.data?.customer?.name || "";
    } catch (err) {
      console.log("Customer parse error:", err);
    }
  }

  // Handle Date Change
  const handleDateChange = (id, type, value) => {
    setBookingData((data) =>
      data.map((room) => {
        if (room._id === id) {
          let checkIn = room.checkIn;
          let checkOut = room.checkOut;

          if (type === "checkIn") checkIn = value;
          if (type === "checkOut") checkOut = value;

          let nights = 0;
          if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);

            if (end <= start) {
              alert("❌ Check-out must be after check-in");
              checkOut = "";
            } else {
              const differenceInTime = end.getTime() - start.getTime();
              nights = differenceInTime / (1000 * 3600 * 24);
              if (nights > 90) {
                alert("❌ Booking cannot exceed 90 nights.");
                checkOut = "";
                nights = 0;
              }
            }
          }
          return { ...room, checkIn, checkOut, nights };
        }
        return room;
      })
    );
  };

  // Handle Booking
  const handleBooking = async (room) => {
    if (!customerOrder) {
      alert("Please login first!");
      return;
    }
    if (!room.checkIn || !room.checkOut || room.nights <= 0) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    try {
      const res = await axios.post("https://hotel-1-kdj9.onrender.com/create/order", {
        customer: customerOrder,
        checkIn: room.checkIn,
        checkOut: room.checkOut,
        nights: room.nights,
        products: [{ productId: room._id, quantity: room.quantity, roomType: room.roomType }],
      });

      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert(`✅ Booking successful for ${room.name}`);
        const updated = bookingData.filter((item) => item._id !== room._id);
        localStorage.setItem("products", JSON.stringify(updated));
        setBookingData(updated);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Server error while booking.");
    }
  };

  // Delete Room
  const handleDelete = (id) => {
    const updated = bookingData.filter((item) => item._id !== id);
    localStorage.setItem("products", JSON.stringify(updated));
    setBookingData(updated);
  };

  // Increment / Decrement Quantity
  const handleIncrement = (id) => {
    setBookingData((data) =>
      data.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity < item.maxQuantity ? item.quantity + 1 : item.quantity }
          : item
      )
    );
  };
  const handleDecrement = (id) => {
    setBookingData((data) =>
      data.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
      )
    );
  };

  return (
    <>
      {/* Profile Section */}
      {profile && (
        <div className="bg-purple-50 p-4 rounded-lg mb-6 relative">
          <h3 className="text-lg font-bold text-purple-700">Reminder</h3>
          <p className="text-gray-800 font-semibold"><strong>Name:</strong> {profile.name}</p>
          <p className="text-gray-600"><strong>Room:</strong> {profile.desc}</p>
          <button
            onClick={handleDeleteProfile}
            className="absolute top-2 right-2 bg-purple-300 hover:bg-purple-400 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      )}

      {/* Bookings Section */}
      <div className="bg-gray-50 min-h-screen p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <FaBed className="text-purple-600" /> Your Bookings
          </h3>

          {bookingData.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No bookings yet</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-600 text-sm">
                  <th className="py-3">ROOM DETAILS</th>
                  <th className="text-center">BOOKING</th>
                  <th>TYPE</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {bookingData.map((room) => {
                  const pricePerNight = roomPrices[room.roomType] || 50;
                  return (
                    <motion.tr key={room._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="border-b hover:bg-gray-50 transition text-sm">
                      <td className="py-4 flex items-center gap-4">
                        <img src={`https://hotel-1-kdj9.onrender.com/allImages/${room.prImage}`} alt={room.name} className="w-20 h-16 object-cover rounded-lg shadow-sm" />
                        <div>
                          <h3 className="font-semibold text-gray-800">{room.name}</h3>
                          <p className="text-xs text-purple-600">Hotel Room</p>
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => handleDelete(room._id)} className="flex items-center gap-1 bg-purple-300 hover:bg-purple-400 text-red-500 hover:text-red-700 text-xs mt-2 px-2 py-1 rounded">
                              <FaTrash /> Remove
                            </button>
                            <input type="date" value={room.checkIn} onChange={(e) => handleDateChange(room._id, "checkIn", e.target.value)} className="border p-1 rounded text-xs" />
                            <input type="date" value={room.checkOut} onChange={(e) => handleDateChange(room._id, "checkOut", e.target.value)} className="border p-1 rounded text-xs" />
                          </div>
                        </div>
                      </td>

                      <td className="text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <button onClick={() => handleDecrement(room._id)} className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"><FaMinus /></button>
                          <span className="px-2 font-medium">{room.quantity}</span>
                          <button onClick={() => handleIncrement(room._id)} className="px-2 py-1 border rounded bg-purple-600 text-white hover:bg-purple-700"><FaPlus /></button>
                        </div>
                      </td>

                      <td>
                        <select value={room.roomType} onChange={(e) => setBookingData((data) => data.map((item) => (item._id === room._id ? { ...item, roomType: e.target.value } : item)))} className="border rounded p-1 text-sm">
                          <option value="single">Single - ${roomPrices.single}</option>
                          <option value="double">Double - ${roomPrices.double}</option>
                          <option value="family">Family - ${roomPrices.family}</option>
                        </select>
                      </td>

                      <td className="font-semibold text-gray-700">
                        ${pricePerNight * room.nights * room.quantity || 0}
                        <button onClick={() => handleBooking(room)} className="mt-2 ml-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded text-xs">Book Now</button>
                        {room.nights > 0 && <p className="text-xs text-gray-500 mt-1">Nights: {room.nights}</p>}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>
    </>
  );
}
export default Cart;
