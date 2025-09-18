import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const getCustomer = localStorage.getItem("customer");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        {/* Logo & Mobile Menu Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-3xl font-bold text-gray-800">
            HOR<span className="text-purple-500">YAAL</span>
          </h1>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl bg-purple-400 hover:bg-purple-500 text-gray-700 focus:outline-none"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 flex-1 justify-center">
  <Link to="/" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-all duration-500 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 group overflow-hidden" > <span className="relative z-10 group-hover:animate-pulse">Home</span> {/* Animated background gradient */} <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-15 transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></div> {/* Shimmer effect */} <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div> {/* Floating particles effect */} <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transform -translate-x-1/2 -translate-y-1/2"></div> <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200"></div> <div className="absolute bottom-1/4 left-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-400"></div> </Link>
       <Link to="/about" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-all duration-500 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 group overflow-hidden" > <span className="relative z-10 group-hover:animate-pulse">About</span> {/* Animated background gradient */} <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-15 transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></div> {/* Shimmer effect */} <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div> {/* Floating particles effect */} <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transform -translate-x-1/2 -translate-y-1/2"></div> <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200"></div> <div className="absolute bottom-1/4 left-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-400"></div> </Link>      
       <Link to="/contact" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-all duration-500 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 group overflow-hidden" > <span className="relative z-10 group-hover:animate-pulse">Contact</span> {/* Animated background gradient */} <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-15 transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></div> {/* Shimmer effect */} <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div> {/* Floating particles effect */} <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transform -translate-x-1/2 -translate-y-1/2"></div> <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200"></div> <div className="absolute bottom-1/4 left-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-400"></div> </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {getCustomer ? (
            <>
              <h1 className="text-2xl font-bold bg-purple-500 w-10 h-10 rounded-full text-white flex items-center justify-center">
                {JSON.parse(getCustomer).data?.customer.name[0]}
              </h1>
              <button
                onClick={handleLogOut}
                className="px-2 py-2 border-2 border-blue-500 text-black rounded-md"
              >
                Log-Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-2 py-2 bg-gray-400 text-black rounded-md">Login</button>
              </Link>
              <Link to="/register">
                <button className="px-2 py-2 bg-blue-500 text-white rounded-md">Register</button>
              </Link>
            </>
          )}
          <Link to="/carts">
            <button className="px-4 py-2 bg-[#5facc0] hover:bg-[#4aa1b7]  text-white rounded-md flex items-center gap-2">
               <i className="fa-solid fa-calendar-check"></i>  Booking
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 flex flex-col gap-4">
<Link to="/" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-all duration-500 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 group overflow-hidden" > <span className="relative z-10 group-hover:animate-pulse">Home</span> {/* Animated background gradient */} <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-15 transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></div> {/* Shimmer effect */} <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div> {/* Floating particles effect */} <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transform -translate-x-1/2 -translate-y-1/2"></div> <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200"></div> <div className="absolute bottom-1/4 left-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-400"></div> </Link>
       <Link to="/about" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-all duration-500 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 group overflow-hidden" > <span className="relative z-10 group-hover:animate-pulse">About</span> {/* Animated background gradient */} <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-15 transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></div> {/* Shimmer effect */} <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div> {/* Floating particles effect */} <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transform -translate-x-1/2 -translate-y-1/2"></div> <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200"></div> <div className="absolute bottom-1/4 left-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-400"></div> </Link>      
       <Link to="/contact" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-all duration-500 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 group overflow-hidden" > <span className="relative z-10 group-hover:animate-pulse">Contact</span> {/* Animated background gradient */} <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-15 transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"></div> {/* Shimmer effect */} <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div> {/* Floating particles effect */} <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transform -translate-x-1/2 -translate-y-1/2"></div> <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200"></div> <div className="absolute bottom-1/4 left-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-400"></div> </Link>

          {getCustomer ? (
            <button
              onClick={handleLogOut}
              className="px-2 py-2 bg-red-500 text-white rounded-md w-full"
            >
              Log-Out
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="px-2 py-2 bg-gray-400 text-black rounded-md w-full">Login</button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button className="px-2 py-2 bg-blue-500 text-white rounded-md w-full">Register</button>
              </Link>
            </>
          )}

          <Link to="/carts" onClick={() => setMenuOpen(false)}>
            <button className="px-4 py-2 bg-[#5facc0] text-white rounded-md flex items-center gap-2 w-full">
           <i className="fa-solid fa-calendar-check"></i>  Booking
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
