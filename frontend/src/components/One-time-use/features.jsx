import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Footer } from "./Footer";
import HotelFacilities from "../../pages/middle";

function Features() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");

  // Fetch Products by Category
  const handleReadData = () => {
    axios
      .post("http://localhost:5000/read/product", { category })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    handleReadData();
  }, [category]);

  // Save product to localStorage
  const handleLocalStorage = (product) => {
    const newData = JSON.parse(localStorage.getItem("products")) || [];
    const existId = newData.some(
      (item) => String(item._id) === String(product._id)
    );
    if (!existId) {
      newData.push(product);
      localStorage.setItem("products", JSON.stringify(newData));
    }
  };

  // Initialize AOS animation
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

   useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);


  const [showModal, setShowModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const handleOpenModal = (product) => {
  setSelectedProduct(product);
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
  setSelectedProduct(null);
};

  return (
    <>
      {/* ========== FEATURES / HOTEL BOOKING SECTION ========== */}
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Title */}
        <h2
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
          style={{ textShadow: "4px 2px 6px rgba(0, 0, 0, 0.4)" }}
        >
          HOTEL BOOKING
        </h2>

        {/* Scrollable Container */}
        <div className="flex overflow-x-auto gap-6 pb-4">
          {data.map((items, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white w-[300px] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={`http://localhost:5000/allImages/${items.prImage}`}
                  alt={items.name}
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                />
                {/* Status Badge */}
                <span
                  className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    items.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {items.status}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 truncate">
                    {items.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {items.desc}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-purple-600 font-bold text-sm">
                    ${items.price}
                  </p>
        <button
  onClick={() => handleOpenModal(items)}
  className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 transition"
>
  View Details
</button>
                  <button
                    onClick={() => handleLocalStorage(items)}
                    disabled={items.status !== "Available"}
                    className={`${
                      items.status === "Available"
                        ? "px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded hover:bg-purple-600 transition"
                        : "px-3 py-1 bg-gray-300 text-gray-600 text-xs font-semibold rounded cursor-not-allowed line-through"
                    }`}
                  >
                    Book
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      {/* </div> */}



 {showModal && selectedProduct && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] md:w-[500px] rounded-lg shadow-lg p-6 relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-white bg-purple-400 hover:bg-purple-500 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {selectedProduct.name}
        </h2>

        <img
          src={`http://localhost:5000/allImages/${selectedProduct.prImage}`}
          alt={selectedProduct.name}
          className="w-full h-40 object-cover rounded mb-4"
        />

        <p className="text-sm text-gray-600 mb-2"><strong>Category:</strong> {selectedProduct.category}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Price:</strong> ${selectedProduct.price}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Short Description:</strong> {selectedProduct.desc}</p>
        <p className="text-sm text-gray-600"><strong>Detail:</strong><br /> {selectedProduct.detail}</p>
      </div>
    </div>
  )}
</div>





      {/* ========== GALLERY SECTION ========== */}
      <section id="gallery" className="sm:pl-[80px] py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Title */}
          <h2
            data-aos="fade-up"
            className="font-bold text-center text-4xl text-gray-800"
          >
            Our Beautiful Hotel Gallery
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="gallery-subtitle text-center text-gray-600 mt-4"
          >
            Discover the elegance of our hotel rooms, pools, and luxurious spaces
          </p>

          {/* Gallery Grid */}
          <div className="gallery-grid mt-12">
            {/* Large Featured Image */}
            <div className="gallery-item large" data-aos="zoom-in">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury Pool Area"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>SWIMMING POOL</h4>
                <p className="text-gray-300">
                  Relax and refresh with our luxury pool
                </p>
              </div>
            </div>

            {/* Standard Images */}
            <div
              className="gallery-item"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Deluxe Hotel Room"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>DELUXE ROOM</h4>
                <p className="text-gray-300">Comfort and luxury combined</p>
              </div>
            </div>

            <div
              className="gallery-item"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="https://i.pinimg.com/1200x/58/8d/dc/588ddc3680336379944d5f05f319460d.jpg"
                alt="Sea View Room"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>SEA VIEW</h4>
                <p className="text-gray-300">Rooms with stunning ocean views</p>
              </div>
            </div>

            <div
              className="gallery-item"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Conference Hall"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>CONFERENCE HALL</h4>
                <p className="text-gray-300">Spacious halls for your events</p>
              </div>
            </div>

            <div
              className="gallery-item"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <img
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Fine Dining"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>FINE DINING</h4>
                <p className="text-gray-300">
                  Delicious meals prepared by top chefs
                </p>
              </div>
            </div>

            {/* Tall Image */}
            <div
              className="gallery-item tall"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <img
                src="https://i.pinimg.com/736x/91/26/7f/91267f7c0d820b7abbeab9bda4993178.jpg"
                alt="Spa and Relaxation"
                className="object-cover w-full h-full"
              />
              <div className="gallery-overlay">
                <h4>SPA CENTER</h4>
                <p>Unwind with our premium spa services</p>
              </div>
            </div>
          </div>
        </div>
      </section>







    <HotelFacilities/>


 <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-6 py-12 gap-8">
        
        {/* Left: Video */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full md:w-72 h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="video/hotel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>

          
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-6"
            data-aos="fade-up"
          >
            Welcome to <span className="text-purple-600">Horyaal Hotel</span>
          </h2>

          <p
            className="text-gray-600 text-lg leading-relaxed mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Experience a world of elegance and comfort at our luxury hotel.
            Enjoy breathtaking views, world-class service, and unforgettable
            moments. Whether you're here for leisure, business, or events, we
            ensure your stay is nothing short of perfect.
          </p>

          {/* Features in grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: "🏨 Deluxe Rooms",
                desc: "Our rooms are designed to provide ultimate comfort with king-sized beds, modern interiors, and stunning views.",
              },
              {
                title: "🍽 Fine Dining",
                desc: "Savor world-class dishes crafted by our expert chefs, offering a variety of cuisines in a beautiful atmosphere.",
              },
              {
                title: "💆 Spa & Wellness",
                desc: "Relax and rejuvenate with our premium spa treatments, including massages, saunas, and more.",
              },
              {
                title: "🎉 Events & Conferences",
                desc: "Host your weddings, events, or conferences in our spacious and modern event halls.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          
        </motion.div>
      </div>
    </section>
<Footer/>
    </>
  );
}

export default Features;
