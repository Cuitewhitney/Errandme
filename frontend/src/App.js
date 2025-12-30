import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import MarketErrands from './pages/MarketErrands';
import CookedFood from './pages/CookedFood';
import OfficeErrands from './pages/OfficeErrands';
import HomeServices from './pages/HomeServices';
import Success from './pages/Success';
import Admin from './pages/Admin';
import { FaHome, FaEnvelope, FaShoppingCart, FaUtensils, FaBriefcase, FaBroom, FaBars, FaTimes, FaSun, FaMoon, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaFacebookF, FaInstagram, FaTwitter, } from 'react-icons/fa';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';  

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Auth code
  const [user, setUser] = useState(null);

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return unsubscribe;
}, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 dark:bg-black text-white p-4 fixed w-full top-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" ><img src='/image/logo2.png' alt='logo' /></Link>
        
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-yellow-400"
          >
            {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>

          {/* login */}

          <div className="flex items-center space-x-4">
           {user ? (
            <>
              <Link to="/dashboard" className="text-white hover:underline font-semibold">
                My Orders
              </Link>
              <button onClick={() => signOut(auth)} className="text-white hover:underline">
                Logout
              </button>
            </>
         ) : (
           <Link to="/auth" className="bg-[#FF8C00] text-white px-6 py-3 rounded-full hover:bg-[#FFA500] font-semibold">
             Sign In
           </Link>
        )}
      </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/market" className="hover:underline">Market Errand</Link>
            <Link to="/food" className="hover:underline">Food Delivery</Link>
            <Link to="/office" className="hover:underline">Office Errand</Link>
            <Link to="/home" className="hover:underline">Home Cleaning</Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/market" className="block py-2 hover:bg-blue-700 dark:hover:bg-blue-800 px-4 rounded">Market Errands</Link>
          <Link to="/food" className="block py-2 hover:bg-blue-700 dark:hover:bg-blue-800 px-4 rounded">Food Delivery</Link>
          <Link to="/office" className="block py-2 hover:bg-blue-700 dark:hover:bg-blue-800 px-4 rounded">Office Errands</Link>
          <Link to="/home" className="block py-2 hover:bg-blue-700 dark:hover:bg-blue-800 px-4 rounded">Home Services</Link>
        </div>
      )}
    </nav>
      {/* Main Content */}
      <div className="pt-16 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<MarketErrands />} />
          <Route path="/food" element={<CookedFood />} />
          <Route path="/office" element={<OfficeErrands />} />
          <Route path="/home" element={<HomeServices />} />
          <Route path="/success" element={<Success />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

      {/* Footer */}

      <footer className="bg-gray-900 dark:bg-black text-white py-12 mt-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
    
    {/* About / Brand */}
    <div>
      <h2 className="text-2xl font-bold mb-4">ErrandMe</h2>
      <p className="text-gray-400">
        Your trusted partner for market runs, food delivery, office errands, and home services. Fast, reliable, and affordable across Nigeria.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-3 text-gray-400">
        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
        <li><Link to="/market" className="hover:text-white transition">Market Errands</Link></li>
        <li><Link to="/food" className="hover:text-white transition">Food Delivery</Link></li>
        <li><Link to="/office" className="hover:text-white transition">Office Services</Link></li>
        <li><Link to="/home" className="hover:text-white transition">Home Services</Link></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
      <ul className="space-y-3 text-gray-400">
        <li className="flex items-center">
          <FaMapMarkerAlt className="mr-3 text-green-500" />
          F01 PathField Mall, 4th Ave, Gwarinpa, Abuja, Nigeria
        </li>
        <li className="flex items-center">
          <FaPhone className="mr-3 text-green-500" />
          +234 813 923 3967
        </li>
        <li className="flex items-center">
          <FaWhatsapp className="mr-3 text-green-500" />
          +234 706 388 5732
        </li>
        <li className="flex items-center">
          <FaEnvelope className="mr-3 text-green-500" />
          sambissyltd@gmail.com
        </li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
      <div className="flex space-x-5 text-3xl">
        <a href="https://facebook.com/errandme" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
          <FaFacebookF />
        </a>
        <a href="https://instagram.com/errandme" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
          <FaInstagram />
        </a>
        <a href="https://twitter.com/errandme" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
          <FaTwitter />
        </a>
        <a href="https://wa.me/2347063885732" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
          <FaWhatsapp />
        </a>
      </div>
    </div>
  </div>

  <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
    © 2025 ErrandMe. All rights reserved.
  </div>
</footer>

{/* Floating WhatsApp Chat Button */}
<a
  href="https://wa.me/2347063885732?text=Hi%20ErrandMe!%20I'd%20like%20to%20place%20an%20errand%20request."
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl z-50 flex items-center space-x-3 transition transform hover:scale-110"
>
  <FaWhatsapp className="text-3xl" />
  <span className="hidden sm:inline font-semibold">Chat with Us</span>
</a>
    </div>
  );
}

export default App;