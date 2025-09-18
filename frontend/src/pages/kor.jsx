function Midlle(){
    return  <div className="bg-white mt-5 mb-12">
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Unforgettable Memories
        </h2>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2">
          Unparalleled Comfort
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Experience a blend of luxury and relaxation in our exclusive hotel.
          Each room is crafted with elegance, offering you the ultimate comfort
          and unforgettable memories.
        </p>
        <button className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-full shadow hover:bg-gray-700 transition">
          Read More
        </button>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 md:px-20 ">
        <div className="rounded-t-full overflow-hidden shadow-lg">
          <img
            src={img2}
            alt="Room 1"
            className="w-full h-[350px] object-cover"
          />
        </div>
        <div className="rounded-t-full h-[400px] overflow-hidden shadow-lg">
          <img
            src={img5}
            alt="Room 2"
            className="w-full h-[350px] object-cover"
          />
        </div>
        <div className="rounded-t-full overflow-hidden shadow-lg">
          <img
            src={img1}
            alt="Room 3"
            className="w-full h-[350px] object-cover"
          />
        </div>
      </div>


     
    </div>
}
export default Midlle