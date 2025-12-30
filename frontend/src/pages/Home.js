import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUtensils, FaBriefcase, FaBroom, FaCheckCircle, FaClock, FaShieldAlt } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebase';

const Home = () => {
  return (
    <div>
    {/* Services Carousel (Scrolling Images with Services Overlay) */}
      <div className="max-w-6xl mx-auto my-12 px-4">
        {/* <h2 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">Our Services in Action</h2> */}
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          showThumbs={false}
          showStatus={false}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          <div className="relative">
            <img src="/image/local-market.jpg" alt="local market" />
            <div className="absolute inset-0 items-center justify-center bg-black bg-opacity-40 py-60">
              {/* <Link to="/market" className="text-white text-3xl font-bold hover:underline">Office Support – Efficient & Reliable</Link> */}
              <h1 className="text-4xl text-white md:text-6xl font-bold mb-6">
                Welcome to ErrandMe – Your Go-To Errand Partner!
              </h1>
              <p className="text-xl text-white md:text-2xl mb-8 max-w-3xl mx-auto">
                Discover convenience at your fingertips. From fresh market hauls to delicious meals and home services, we've got you covered. Shop smart, save time, and enjoy hassle-free deliveries.
              </p>
              <Link to="/market" className="bg-[#FF8C00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FFA500] transition inline-block">
                Explore Now
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src="/image/grocery-shopping.jpeg" alt="Market Errands" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <Link to="/market" className="text-white text-3xl font-bold hover:underline">Market Errands – Fresh & Fast</Link>
            </div>
          </div>
          <div className="relative">
            <img src="/image/food-delivery.jpg" alt="Food Delivery" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <Link to="/food" className="text-white text-3xl font-bold hover:underline">Food Delivery – Hot & Delicious</Link>
            </div>
          </div>
          <div className="relative">
            <img src="/image/office-assistant.jpg" alt="Office Support" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <Link to="/office" className="text-white text-3xl font-bold hover:underline">Office Support – Efficient & Reliable</Link>
            </div>
          </div>
          <div className="relative">
            <img src="/image/home-cleaning.jpg" alt="Home Services" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <Link to="/home" className="text-white text-3xl font-bold hover:underline">Home Services – Spotless & Convenient</Link>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Featured Products Section (Like Temu – Attractive Product Grid) */}
      <div className="max-w-6xl mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">Discover Popular Items – Add to Your Errand List!</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { img: '/image/fresh-produce.jpg', title: 'Fresh Tomatoes', price: '₦500/kg' },
            { img: '/image/rice.jpg', title: 'Premium Rice', price: '₦2,000/bag' },
            { img: '/image/chicken.jpg', title: 'Chicken', price: '₦3,000/kg' },
            { img: '/image/jollof.jpeg', title: 'Jollof Rice', price: '₦1,500/plate' },
            { img: '/image/pizza.jpg', title: 'Pepperoni Pizza', price: '₦4,000' },
            { img: '/image/cleaning.jpg', title: 'Home Cleaning Kit', price: '₦2,500' },
          ].map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-[#FF8C00] font-bold">{product.price}</p>
                <Link to="/market" className="text-sm text-blue-600 hover:underline">Add to List</Link>
              </div>
            </div>
          ))}
        </div>
        {/* line 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-5">
          {[
            { img: '/image/fresh-produce.jpg', title: 'Fresh Tomatoes', price: '₦500/kg' },
            { img: '/image/rice.jpg', title: 'Premium Rice', price: '₦2,000/bag' },
            { img: '/image/chicken.jpg', title: 'Chicken', price: '₦3,000/kg' },
            { img: '/image/jollof.jpeg', title: 'Jollof Rice', price: '₦1,500/plate' },
            { img: '/image/pizza.jpg', title: 'Pepperoni Pizza', price: '₦4,000' },
            { img: '/image/cleaning.jpg', title: 'Home Cleaning Kit', price: '₦2,500' },
          ].map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-[#FF8C00] font-bold">{product.price}</p>
                <Link to="/market" className="text-sm text-blue-600 hover:underline">Add to List</Link>
              </div>
            </div>
          ))}
        </div>

        {/* line 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-5">
          {[
            { img: '/image/fresh-produce.jpg', title: 'Fresh Tomatoes', price: '₦500/kg' },
            { img: '/image/rice.jpg', title: 'Premium Rice', price: '₦2,000/bag' },
            { img: '/image/chicken.jpg', title: 'Chicken', price: '₦3,000/kg' },
            { img: '/image/jollof.jpeg', title: 'Jollof Rice', price: '₦1,500/plate' },
            { img: '/image/pizza.jpg', title: 'Pepperoni Pizza', price: '₦4,000' },
            { img: '/image/cleaning.jpg', title: 'Home Cleaning Kit', price: '₦2,500' },
          ].map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-[#FF8C00] font-bold">{product.price}</p>
                <Link to="/market" className="text-sm text-blue-600 hover:underline">Add to List</Link>
              </div>
            </div>
          ))}
        </div>

        {/* line 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-5">
          {[
            { img: '/image/fresh-produce.jpg', title: 'Fresh Tomatoes', price: '₦500/kg' },
            { img: '/image/rice.jpg', title: 'Premium Rice', price: '₦2,000/bag' },
            { img: '/image/chicken.jpg', title: 'Chicken', price: '₦3,000/kg' },
            { img: '/image/jollof.jpeg', title: 'Jollof Rice', price: '₦1,500/plate' },
            { img: '/image/pizza.jpg', title: 'Pepperoni Pizza', price: '₦4,000' },
            { img: '/image/cleaning.jpg', title: 'Home Cleaning Kit', price: '₦2,500' },
          ].map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-[#FF8C00] font-bold">{product.price}</p>
                <Link to="/market" className="text-sm text-blue-600 hover:underline">Add to List</Link>
              </div>
            </div>
          ))}
        </div>

        {/* line 5 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-5">
          {[
            { img: '/image/fresh-produce.jpg', title: 'Fresh Tomatoes', price: '₦500/kg' },
            { img: '/image/rice.jpg', title: 'Premium Rice', price: '₦2,000/bag' },
            { img: '/image/chicken.jpg', title: 'Chicken', price: '₦3,000/kg' },
            { img: '/image/jollof.jpeg', title: 'Jollof Rice', price: '₦1,500/plate' },
            { img: '/image/pizza.jpg', title: 'Pepperoni Pizza', price: '₦4,000' },
            { img: '/image/cleaning.jpg', title: 'Home Cleaning Kit', price: '₦2,500' },
          ].map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-[#FF8C00] font-bold">{product.price}</p>
                <Link to="/market" className="text-sm text-blue-600 hover:underline">Add to List</Link>
              </div>
            </div>
          ))}
        </div>

        {/* line 6 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-5">
          {[
            { img: '/image/fresh-produce.jpg', title: 'Fresh Tomatoes', price: '₦500/kg' },
            { img: '/image/rice.jpg', title: 'Premium Rice', price: '₦2,000/bag' },
            { img: '/image/chicken.jpg', title: 'Chicken', price: '₦3,000/kg' },
            { img: '/image/jollof.jpeg', title: 'Jollof Rice', price: '₦1,500/plate' },
            { img: '/image/pizza.jpg', title: 'Pepperoni Pizza', price: '₦4,000' },
            { img: '/image/cleaning.jpg', title: 'Home Cleaning Kit', price: '₦2,500' },
          ].map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-[#FF8C00] font-bold">{product.price}</p>
                <Link to="/market" className="text-sm text-blue-600 hover:underline">Add to List</Link>
              </div>
            </div>
          ))}
        </div>

        {/* line 7 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-5">
          {[
            { img: '/image/fresh-produce.jpg', title: 'Fresh Tomatoes', price: '₦500/kg' },
            { img: '/image/rice.jpg', title: 'Premium Rice', price: '₦2,000/bag' },
            { img: '/image/chicken.jpg', title: 'Chicken', price: '₦3,000/kg' },
            { img: '/image/jollof.jpeg', title: 'Jollof Rice', price: '₦1,500/plate' },
            { img: '/image/pizza.jpg', title: 'Pepperoni Pizza', price: '₦4,000' },
            { img: '/image/cleaning.jpg', title: 'Home Cleaning Kit', price: '₦2,500' },
          ].map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-[#FF8C00] font-bold">{product.price}</p>
                <Link to="/market" className="text-sm text-blue-600 hover:underline">Add to List</Link>
              </div>
            </div>
          ))}
        </div>

        {/* line 8 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-5">
          {[
            { img: '/image/fresh-produce.jpg', title: 'Fresh Tomatoes', price: '₦500/kg' },
            { img: '/image/rice.jpg', title: 'Premium Rice', price: '₦2,000/bag' },
            { img: '/image/chicken.jpg', title: 'Chicken', price: '₦3,000/kg' },
            { img: '/image/jollof.jpeg', title: 'Jollof Rice', price: '₦1,500/plate' },
            { img: '/image/pizza.jpg', title: 'Pepperoni Pizza', price: '₦4,000' },
            { img: '/image/cleaning.jpg', title: 'Home Cleaning Kit', price: '₦2,500' },
          ].map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-[#FF8C00] font-bold">{product.price}</p>
                <Link to="/market" className="text-sm text-blue-600 hover:underline">Add to List</Link>
              </div>
            </div>
          ))}
        </div>

        {/* line 9 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-5">
          {[
            { img: '/image/fresh-produce.jpg', title: 'Fresh Tomatoes', price: '₦500/kg' },
            { img: '/image/rice.jpg', title: 'Premium Rice', price: '₦2,000/bag' },
            { img: '/image/chicken.jpg', title: 'Chicken', price: '₦3,000/kg' },
            { img: '/image/jollof.jpeg', title: 'Jollof Rice', price: '₦1,500/plate' },
            { img: '/image/pizza.jpg', title: 'Pepperoni Pizza', price: '₦4,000' },
            { img: '/image/cleaning.jpg', title: 'Home Cleaning Kit', price: '₦2,500' },
          ].map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-[#FF8C00] font-bold">{product.price}</p>
                <Link to="/market" className="text-sm text-blue-600 hover:underline">Add to List</Link>
              </div>
            </div>
          ))}
        </div>

        {/* line 10 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 my-5">
          {[
            { img: '/image/fresh-produce.jpg', title: 'Fresh Tomatoes', price: '₦500/kg' },
            { img: '/image/rice.jpg', title: 'Premium Rice', price: '₦2,000/bag' },
            { img: '/image/chicken.jpg', title: 'Chicken', price: '₦3,000/kg' },
            { img: '/image/jollof.jpeg', title: 'Jollof Rice', price: '₦1,500/plate' },
            { img: '/image/pizza.jpg', title: 'Pepperoni Pizza', price: '₦4,000' },
            { img: '/image/cleaning.jpg', title: 'Home Cleaning Kit', price: '₦2,500' },
          ].map((product, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={product.img} alt={product.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-[#FF8C00] font-bold">{product.price}</p>
                <Link to="/market" className="text-sm text-blue-600 hover:underline">Add to List</Link>
              </div>
            </div>
          ))}
        </div>
        <Link to="/market" className="bg-[#FF8C00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FFA500] transition inline-block ">
          See more
        </Link>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-black dark:text-white">Why Choose ErrandMe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
              <FaCheckCircle className="text-5xl text-[#FF8C00] mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Verified Runners</h3>
              <p className="text-gray-600 dark:text-gray-400">All our errand runners are background-checked.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
              <FaClock className="text-5xl text-[#FF8C00] mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Same-Day Service</h3>
              <p className="text-gray-600 dark:text-gray-400">Most errands completed within hours.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
              <FaShieldAlt className="text-5xl text-[#FF8C00] mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Secure & Transparent</h3>
              <p className="text-gray-600 dark:text-gray-400">You approve final cost before any payment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-black dark:text-white">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <p className="italic">"ErrandMe saved me hours! Fresh groceries delivered perfectly."</p>
              <p className="mt-4 font-semibold">- Aisha, Gwarinpa Abuja</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <p className="italic">"Best food delivery in town. Always hot and on time!"</p>
              <p className="mt-4 font-semibold">- Chinedu, lugbe, Abuja</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <p className="italic">"Professional cleaning service. My home sparkles!"</p>
              <p className="mt-4 font-semibold">- Fatima, Jahi, Abuja</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {['How do payments work?', 'How long until delivery?', 'Can I track my errand?'].map((q, i) => (
              <details key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer">
                <summary className="font-semibold">{q}</summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400">We contact you via WhatsApp/call to confirm items and agree on total cost before any payment.</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;