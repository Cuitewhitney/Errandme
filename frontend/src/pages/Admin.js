import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaCheck, FaTruck, FaShoppingBag, FaClock, FaUser } from 'react-icons/fa';

const Admin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/requests'); // Will work on localhost and production
        // Sort by newest first
        const sorted = res.data.sort((a, b) => 
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        );
        setRequests(sorted);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock className="text-gray-600" />;
      case 'confirmed': return <FaCheck className="text-purple-600" />;
      case 'in-progress': return <FaShoppingBag className="text-yellow-600" />;
      case 'en-route': return <FaTruck className="text-blue-600" />;
      case 'delivered': return <FaCheck className="text-green-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-4 py-2 rounded-full font-bold text-white flex items-center gap-2 w-fit";
    switch (status) {
      case 'pending': return `${base} bg-gray-600`;
      case 'confirmed': return `${base} bg-purple-600`;
      case 'in-progress': return `${base} bg-yellow-600`;
      case 'en-route': return `${base} bg-blue-600`;
      case 'delivered': return `${base} bg-green-600`;
      default: return `${base} bg-gray-600`;
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-2xl text-gray-900 font-bold">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Manage all customer requests • Total: <span className="font-bold">{requests.length}</span> orders
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl">
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              No requests yet. When customers place orders, they'll appear here!
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {requests.map((req) => (
              <div
                key={req.id || req._id}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all hover:shadow-3xl"
              >
                {/* Header with Status & Date */}
                <div className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] p-6 text-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-2xl font-bold flex items-center gap-3">
                        <FaUser />
                        {req.name || 'Anonymous Customer'}
                      </h3>
                      <p className="text-lg opacity-90">
                        Order placed: {formatDate(req.createdAt)}
                      </p>
                    </div>
                    <div className={getStatusBadge(req.status || 'pending')}>
                      {getStatusIcon(req.status || 'pending')}
                      {(req.status || 'pending').replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-xl font-bold text-[#FF8C00] mb-4">Service Type</h4>
                      <p className="text-lg capitalize">
                        {req.type.replace('home-', '').replace('office-', '').replace('-', ' ')}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-[#FF8C00] mb-4">Delivery Address</h4>
                      <p className="text-lg">{req.address || 'Not provided'}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-[#FF8C00] mb-4">Contact</h4>
                      <p>Phone: {req.phone || 'N/A'}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <FaWhatsapp className="text-green-600 text-2xl" />
                        <a
                          href={`https://wa.me/${req.whatsapp.replace(/[^\d]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 font-bold hover:underline"
                        >
                          {req.whatsapp || 'N/A'}
                        </a>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-[#FF8C00] mb-4">Customer Email</h4>
                      <p className="text-lg">{req.userEmail || 'Guest'}</p>
                    </div>
                  </div>

                  {/* Items / Description */}
                  {(req.items || req.description) && (
                    <div>
                      <h4 className="text-xl font-bold text-[#FF8C00] mb-4">
                        {Array.isArray(req.items) ? `Items (${req.items.length})` : 'Request Details'}
                      </h4>
                      {Array.isArray(req.items) && req.items.length > 0 ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {req.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl"
                            >
                              <p className="font-semibold">
                                {typeof item === 'object' ? item.name || item.dish : item}
                              </p>
                              {item.qty && <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.qty}</p>}
                              {item.price && <p className="text-sm text-gray-600 dark:text-gray-400">Price: ₦{item.price}</p>}
                              {item.notes && <p className="text-sm italic mt-1">"{item.notes}"</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl text-lg">
                          {req.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Quick Actions Footer */}
                <div className="bg-gray-50 dark:bg-gray-900 px-8 py-6 flex justify-end">
                  <a
                    href={`https://wa.me/${req.whatsapp.replace(/[^\d]/g, '')}?text=Hi%20${req.name}%2C%20your%20${req.type}%20request%20has%20been%20received!%20We'll%20confirm%20details%20shortly.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition shadow-lg"
                  >
                    <FaWhatsapp className="text-2xl" />
                    Contact Customer
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;