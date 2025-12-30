import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaWhatsapp } from 'react-icons/fa';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null); // Track which order is expanded
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const q = query(
          collection(db, 'orders'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );

        const unsubOrders = onSnapshot(q, (snapshot) => {
          const userOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          }));
          setOrders(userOrders);
          setLoading(false);
        });

        return () => unsubOrders();
      } else {
        navigate('/auth');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusInfo = (status) => {
    const steps = [
      { key: 'pending', label: 'Pending Confirmation', color: 'bg-gray-500' },
      { key: 'confirmed', label: 'Confirmed', color: 'bg-purple-600' },
      { key: 'in-progress', label: 'Shopping / In Progress', color: 'bg-yellow-600' },
      { key: 'en-route', label: 'Rider En Route', color: 'bg-blue-600' },
      { key: 'delivered', label: 'Delivered', color: 'bg-green-600' },
    ];
    return steps.find(s => s.key === status) || steps[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFDAB9] to-white dark:from-[#8B4513] dark:to-gray-900 flex items-center justify-center">
        <p className="text-2xl text-[#FF8C00] font-bold">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFDAB9] to-white dark:from-[#8B4513] dark:to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <h1 className="text-4xl font-bold text-[#FF8C00]">
            Welcome back, {user?.email.split('@')[0]}!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Logout
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-[#FF8C00]">Your Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl">
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
              No orders yet — let's fix that!
            </p>
            <Link
              to="/market"
              className="bg-[#FF8C00] hover:bg-[#FFA500] text-white px-10 py-5 rounded-full text-xl font-bold transition shadow-lg transform hover:scale-105"
            >
              Start Shopping Now
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status || 'pending');
              const steps = ['pending', 'confirmed', 'in-progress', 'en-route', 'delivered'];
              const currentIndex = steps.indexOf(order.status || 'pending');
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500"
                >
                  {/* Order Header - Clickable */}
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm text-gray-500">Order ID: {order.id.slice(0, 10)}</p>
                      <h3 className="text-2xl font-bold text-[#FF8C00]">
                        {order.type.replace('home-', '').replace('office-', '').replace('-', ' ').toUpperCase()} ERRAND
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Placed: {order.createdAt.toLocaleDateString()} • {order.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className={`px-6 py-3 rounded-full text-white font-bold text-lg ${statusInfo.color}`}>
                        {statusInfo.label}
                      </div>
                      {isExpanded ? <FaChevronUp className="text-2xl text-[#FF8C00]" /> : <FaChevronDown className="text-2xl text-[#FF8C00]" />}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-6 pb-8">
                      {/* Progress Tracker */}
                      <div className="my-8">
                        <div className="flex items-center justify-between relative">
                          {steps.map((step, idx) => {
                            const stepInfo = getStatusInfo(step);
                            const isCompleted = idx <= currentIndex;
                            const isCurrent = idx === currentIndex;

                            return (
                              <div key={idx} className="flex-1 text-center relative">
                                {idx > 0 && (
                                  <div className={`absolute top-6 left-[-50%] w-full h-2 ${isCompleted ? 'bg-[#FF8C00]' : 'bg-gray-300'} rounded-full`} />
                                )}
                                <div className={`relative z-10 w-14 h-14 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg transition-all
                                  ${isCompleted ? 'bg-[#FF8C00]' : 'bg-gray-400'}
                                  ${isCurrent ? 'ring-8 ring-[#FFDAB9] scale-125 shadow-2xl' : ''}
                                `}>
                                  {isCompleted && idx < steps.length - 1 ? '✓' : idx + 1}
                                </div>
                                <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">{stepInfo.label}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Order Details Grid */}
                      <div className="grid md:grid-cols-2 gap-6 mt-8 text-gray-700 dark:text-gray-300">
                        <div>
                          <p className="font-semibold text-[#FF8C00]">Delivery Address</p>
                          <p>{order.address}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#FF8C00]">Contact</p>
                          <p>Phone: {order.phone}</p>
                          <p>WhatsApp: {order.whatsapp}</p>
                        </div>
                      </div>

                      {/* Items List */}
                      {Array.isArray(order.items) && order.items.length > 0 && (
                        <div className="mt-6">
                          <p className="font-semibold text-[#FF8C00] mb-3">Items ({order.items.length})</p>
                          <ul className="space-y-2">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                {typeof item === 'object' ? item.name || item.dish : item}
                                {item.qty && ` — Qty: ${item.qty}`}
                                {item.notes && ` — Notes: ${item.notes}`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {order.description && (
                        <div className="mt-6">
                          <p className="font-semibold text-[#FF8C00]">Special Instructions</p>
                          <p className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-2">{order.description}</p>
                        </div>
                      )}

                      {/* Contact Support Button */}
                      <a
                        href={`https://wa.me/2348000000000?text=Hi%20ErrandMe!%20Regarding%20my%20order%20${order.id.slice(0, 8)}...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold transition shadow-lg"
                      >
                        <FaWhatsapp className="text-2xl" />
                        Chat About This Order
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;