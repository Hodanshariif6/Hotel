"use client";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Footer } from "../components/One-time-use/Footer";

export default function Contact() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // Scroll progress bar
  const { scrollYProgress } = useScroll();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || comment.trim() === "") return;

    setComments([...comments, { id: Date.now(), name, text: comment }]);
    setName("");
    setComment("");
  };

  const commentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };




     const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    localStorage.setItem("customerData", JSON.stringify(formData));

    alert("Form submitted successfully! ✅");

    // Clear form after submission
    setFormData({ name: "", email: "", message: "" });
  };
  return (<>
  <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        
        {/* LEFT SIDE - Image and Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Top Image */}
          <img
            src="https://i.pinimg.com/474x/05/d1/b3/05d1b323eb3133ddf49e45ca19579821.jpg" // Ku dar sawirka folder public/images
            alt="Center"
            className="w-full h-56 object-cover"
          />
          
          <div className="p-6 space-y-5">
            <h3 className="text-2xl font-bold text-gray-800">Visit Our Center</h3>

            {/* Address */}
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <FiMapPin className="text-red-500 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Address</p>
                <p className="text-gray-600">Hodan, Taleex</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FiPhone className="text-green-500 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Phone</p>
                <p className="text-gray-600">123-HOTEL</p>
                <p className="text-gray-600">123-5437</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FiMail className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Email</p>
                <p className="text-gray-600">horyaal55@gmail.com</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <FiClock className="text-yellow-500 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Hours</p>
                <p className="text-gray-600">24hr</p>
              </div>
            </div>
          </div>
        </motion.div>

   {/* RIGHT SIDE - Contact Form */}
<motion.form
  onSubmit={handleSubmit2}
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-3xl mx-auto"
>
  {/* Title */}
  <h2 className="text-4xl font-extrabold -mt-40 mb-10 text-center text-gray-800">
    Get In Touch
  </h2>

  {/* Name Input */}
  <div className="mb-6">
  
    <div className="relative">
     
      <input
        type="text"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
        className="w-[40%] p-4 pl-12 border -ml-50 mt-4 border-gray-300 rounded-xl shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-pink-400 
                   transition duration-300 placeholder-gray-400 text-lg hover:border-pink-400"
        required
      />
    </div>
  </div>

  {/* Email Input */}
  <div className="mb-6">
    
    <div className="relative">
      {/* <span className="absolute left-4 top-4 text-gray-400">
        <i className="fas fa-envelope"></i>
      </span> */}
      <input
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={handleChange}
        className="w-[300%]  p-4 pl-12 border border-gray-300 rounded-xl shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-pink-400 
                   transition duration-300 placeholder-gray-400 text-lg hover:border-pink-400"
        required
      />
    </div>
  </div><br></br>

  {/* Message Textarea */}
  <div className="mb-8">
    {/* <label className="block text-gray-600 text-sm font-medium mb-2">
      Message
    </label> */}
    <div className="relative">
      {/* <span className="absolute left-4 top-4 text-gray-400">
        <i className="fas fa-comment-dots"></i>
      </span> */}
      <textarea
        name="message"
        placeholder="Write your message here..."
        value={formData.message}
        onChange={handleChange}
        className="w-[500%] mt-80 -ml-20 p-4 pl-12 border border-gray-300 rounded-xl shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-pink-400 
                   transition duration-300 placeholder-gray-400 resize-none text-lg hover:border-pink-400"
        rows="5"
        required
      ></textarea>
    </div>
  </div>

  {/* Submit Button */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type="submit"
    className="w-full mt-[130%] bg-gradient-to-r from-pink-500 to-green-400 text-white 
               py-4 rounded-xl font-semibold text-lg shadow-lg hover:opacity-90 
               transition duration-300 transform hover:-translate-y-1"
  >
    Send Message
  </motion.button>
</motion.form>

      </div>
    </div>




















    <div className="relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4 z-0">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-md"
          >
            Submit
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Reviews</h2>


        {/* -------- Scrollable Div -------- */}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {comments.map((c) => (
            <motion.div
              key={c.id}
              variants={commentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="font-bold text-purple-600 text-lg">{c.name}</h3>
              <p className="text-gray-700 mt-1">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
  </>);
}
