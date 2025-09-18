import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
    import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import im from "../image/Booking.png"
import im2 from "../image/admin1.png"
import im3 from "../image/home.png"
function Report() {
  const [roomData, setRoomData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const reportRef = useRef();

  const generatePDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Hotel_Booking_System_Report.pdf");
    });
  };
  const fetchData = async () => {
    try {
      // ✅ Halkan waxaad soo qaadaysaa xogta rooms
      const resRooms = await axios.get("https://hotel-1-kdj9.onrender.com/read/product");
      setRoomData(resRooms.data);

      // ✅ Halkan waxaad soo qaadaysaa xogta news
      const resNews = await axios.get("https://hotel-1-kdj9.onrender.com/read/New");
      setNewsData(resNews.data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Sample: waxaan sameyn doonaa taariikh + tirada
  // Halkan waxaad ku hagaajin kartaa in xogta ka timaado DB uu leeyahay "createdAt" si loo isticmaalo taariikhaha
  const chartData = [
    { date: "06/07", Rooms: 10, News: 3 },
    { date: "07/07", Rooms: 25, News: 5 },
    { date: "08/07", Rooms: 20, News: 7 },
    { date: "09/07", Rooms: 28, News: 4 },
    { date: "10/07", Rooms: 15, News: 6 },
    { date: "11/07", Rooms: 22, News: 8 },
    { date: "12/07", Rooms: 40, News: 9 },
  ];

  return (<>
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Rooms & News Overview</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
          <Legend />

          {/* ✅ Rooms Line */}
          <Line type="monotone" dataKey="Rooms" stroke="#22c55e" strokeWidth={3} />

          {/* ✅ News Line */}
          <Line type="monotone" dataKey="News" stroke="#3b82f6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>





 
    <div className="p-4">
      <div ref={reportRef} className="bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">Hotel Booking System Report</h1>
        
        <h2 className="font-semibold mt-2">Introduction</h2>
        <p>This project is a Hotel Booking System developed by Aisha, Sihaam, and Hodan. The system allows customers to book rooms easily while administrators manage bookings efficiently.</p>

        <h2 className="font-semibold mt-2">Objectives</h2>
        <ul className="list-disc ml-6">
          <li>Simple and user-friendly system</li>
          <li>Digitalize room booking</li>
          <li>Admin full control over data</li>
        </ul>

        <h2 className="font-semibold mt-2">Tools & Technologies</h2>
        <p>MERN Stack: MongoDB, Express.js, React.js, Node.js. GitHub for collaboration.</p>

        <h2 className="font-semibold mt-2">System Features</h2>
        <ul className="list-disc ml-6">
          <li>User registration & login</li>
          <li>Room booking (single, double, deluxe)</li>
          <li>Admin dashboard</li>
          <li>View & cancel bookings</li>
          <li><b>Note:</b> Payment integration is planned for the future.</li>
        </ul>

        <h2 className="font-semibold mt-2">Team Collaboration</h2>
        <p>Aisha, Sihaam, Hodan worked together using GitHub to manage frontend, backend, and database tasks.</p>

        <h2 className="font-semibold mt-2">Screenshots</h2>
        <p>Add your screenshots below:</p>
        <img src={im3} alt="Homepage" className="my-2" />
        <img src={im} alt="Booking Page" className="my-2" />
        <img src={im2} alt="Admin Dashboard" className="my-2" />

        <h2 className="font-semibold mt-2">Future Enhancements</h2>
        <ul className="list-disc ml-6">
          <li>Add payment gateway</li>
          <li>Expand system for larger hotels</li>
          <li>Improve UI/UX</li>
        </ul>

        <h2 className="font-semibold mt-2">Conclusion</h2>
        <p>The system successfully simplifies hotel booking and management. The team gained strong full-stack development experience and plans to enhance the project further.</p>
      </div>

      <button
        onClick={generatePDF}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download PDF
      </button>
    </div>
  


 </> );
}

export default Report;
