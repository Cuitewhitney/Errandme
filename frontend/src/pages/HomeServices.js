import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebase';

const HomeServices = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState('cleaning');

  const navigate = useNavigate();

  const submit = async () => {
  if (!auth.currentUser) {
    alert('Please sign in to place an order!');
    navigate('/auth');
    return;
  }

  try {
    // Save to Firebase
    await addDoc(collection(db, 'orders'), {
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
      type: 'home-' + serviceType,
      description,
      name,
      address,
      phone,
      whatsapp,
      status: 'pending',
      createdAt: serverTimestamp()
    });

   
    await axios.post('/submit', { 
      name, 
      address, 
      phone, 
      whatsapp, 
      description, 
      type: 'home-' + serviceType
     });

    navigate('/success');
  } catch (error) {
    console.error(error);
    alert('Error placing order. Please try again.');
  }
};

  // Carousel images showcasing home services
  const carouselImages = [
    { src: 'https://images.unsplash.com/photo-1556912172-3b1f8d3e3e0f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80', title: 'Professional Deep Cleaning' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80', title: 'Spotless Living Rooms' },
    { src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80', title: 'Kitchen & Bathroom Shine' },
    { src: 'https://images.unsplash.com/photo-1600565193348-f74bd86c6e2c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80', title: 'Post-Construction Cleanup' },
    { src: 'https://images.unsplash.com/photo-1558618664-9c1e0e427e2f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80', title: 'Move-In / Move-Out Service' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFDAB9] to-white dark:from-[#8B4513] dark:to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#FF8C00]">
          Professional Home Services
        </h1>
        <p className="text-center text-lg md:text-xl mb-12 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          Let us take care of your home with expert cleaning and maintenance services. 
          Reliable, thorough, and tailored to your needs — enjoy a sparkling clean space without the stress!
        </p>

        {/* Carousel Showcase */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <Carousel
            autoPlay
            infiniteLoop
            interval={4000}
            showThumbs={false}
            showStatus={false}
            transitionTime={800}
          >
            {carouselImages.map((img, idx) => (
              <div key={idx} className="relative h-96 md:h-[500px]">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h2 className="text-3xl md:text-5xl font-bold text-white text-center px-4">
                    {img.title}
                  </h2>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Service Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div 
            onClick={() => setServiceType('cleaning')}
            className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl cursor-pointer transition transform hover:-translate-y-3 ${serviceType === 'cleaning' ? 'ring-4 ring-[#FF8C00] scale-105' : ''}`}
          >
            <div className="text-6xl mb-4 text-center">✨</div>
            <h3 className="text-2xl font-bold text-center mb-3">Home Cleaning</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Regular or deep cleaning for apartments, houses, and offices
            </p>
          </div>

          <div 
            onClick={() => setServiceType('fumigation')}
            className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl cursor-pointer transition transform hover:-translate-y-3 ${serviceType === 'fumigation' ? 'ring-4 ring-[#FF8C00] scale-105' : ''}`}
          >
            <div className="text-6xl mb-4 text-center">🛡️</div>
            <h3 className="text-2xl font-bold text-center mb-3">Fumigation & Pest Control</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Safe and effective treatment against insects and rodents
            </p>
          </div>

          <div 
            onClick={() => setServiceType('other')}
            className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl cursor-pointer transition transform hover:-translate-y-3 ${serviceType === 'other' ? 'ring-4 ring-[#FF8C00] scale-105' : ''}`}
          >
            <div className="text-6xl mb-4 text-center">🔧</div>
            <h3 className="text-2xl font-bold text-center mb-3">Other Home Help</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Laundry, organizing, minor repairs — just tell us what you need
            </p>
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#FF8C00]">
            Request Your Home Service
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-lg font-semibold mb-2 text-[#FF8C00]">Service Type</label>
              <select 
                className="border-2 border-[#FF8C00] p-4 w-full rounded-xl focus:ring-4 focus:ring-[#FF8C00] focus:border-transparent"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                <option value="cleaning">Home Cleaning</option>
                <option value="fumigation">Fumigation & Pest Control</option>
                <option value="laundry">Laundry Service</option>
                <option value="organizing">Home Organizing</option>
                <option value="other">Other (Describe Below)</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 text-[#FF8C00]">Tell Us What You Need</label>
              <textarea
                className="border-2 border-[#FF8C00] p-4 w-full h-32 rounded-xl focus:ring-4 focus:ring-[#FF8C00] focus:border-transparent resize-none"
                placeholder="e.g., 3-bedroom apartment deep clean, weekly service, focus on kitchen and bathrooms..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <label className="block text-lg font-semibold mb-2 text-[#FF8C00]">Your Full Name</label>
              <input className="border-2 border-[#FF8C00] p-4 w-full rounded-xl focus:ring-4 focus:ring-[#FF8C00]" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-[#FF8C00]">Delivery Address</label>
              <input className="border-2 border-[#FF8C00] p-4 w-full rounded-xl focus:ring-4 focus:ring-[#FF8C00]" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-[#FF8C00]">Phone Number</label>
              <input className="border-2 border-[#FF8C00] p-4 w-full rounded-xl focus:ring-4 focus:ring-[#FF8C00]" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-[#FF8C00]">WhatsApp Number</label>
              <input className="border-2 border-[#FF8C00] p-4 w-full rounded-xl focus:ring-4 focus:ring-[#FF8C00]" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            </div>
          </div>

          <button
            onClick={submit}
            className="mt-12 bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-full text-xl font-bold w-full transition shadow-2xl transform hover:scale-105"
          >
            Submit Home Service Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeServices;