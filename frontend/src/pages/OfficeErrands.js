import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebase';

const OfficeErrands = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState('document-delivery');

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
      type: 'office-' + serviceType,
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
      type: 'office-' + serviceType
     });

    navigate('/success');
  } catch (error) {
    console.error(error);
    alert('Error placing order. Please try again.');
  }
};

  // Carousel images showcasing office errands
  const carouselImages = [
    { src: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100065100574902', title: 'Secure Document Delivery' },
    { src: 'https://www.dhl.com/discover/adobe/dynamicmedia/deliver/dm-aid--368f9530-8c3a-41b5-9f95-f43473ce2823/the-safest-way-to-mail-important-documents-1920x998.jpg?preferwebp=true&quality=82', title: 'Professional Courier Services' },
    { src: 'https://www.trios.com/uploads/2022/06/What-Qualifications-Do-You-Need-to-be-an-Administrative-Assistant.jpg', title: 'Skilled Office Assistants' },
    { src: 'https://blog.herzing.ca/hubfs/time%20management%20admin.jpg', title: 'Efficient Office Support' },
    { src: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1180055022372412', title: 'Office Supplies Delivery' },
    { src: 'https://chamanlawfirm.com/wp-content/uploads/2024/09/SemivarianceMeaningFormulasandCalculationsGettyImages-1598549989-8a9f862c2362495aaca28aa5b59435ad.webp', title: 'Corporate Business Meetings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFDAB9] to-white dark:from-[#8B4513] dark:to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#FF8C00]">
          Reliable Office Errands & Support
        </h1>
        <p className="text-center text-lg md:text-xl mb-12 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          Focus on your business while we handle the rest. From urgent document delivery to hiring trusted office assistants and supplying essentials — fast, professional, and discreet.
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
            onClick={() => setServiceType('document-delivery')}
            className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl cursor-pointer transition transform hover:-translate-y-3 ${serviceType === 'document-delivery' ? 'ring-4 ring-[#FF8C00] scale-105' : ''}`}
          >
            <div className="text-6xl mb-4 text-center">📄🚀</div>
            <h3 className="text-2xl font-bold text-center mb-3">Document Delivery</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Same-day pickup & delivery of contracts, parcels, and important files across the city
            </p>
          </div>

          <div 
            onClick={() => setServiceType('assistant-hire')}
            className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl cursor-pointer transition transform hover:-translate-y-3 ${serviceType === 'assistant-hire' ? 'ring-4 ring-[#FF8C00] scale-105' : ''}`}
          >
            <div className="text-6xl mb-4 text-center">👔💼</div>
            <h3 className="text-2xl font-bold text-center mb-3">Hire Office Assistant</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Temporary or permanent vetted assistants for admin, reception, or support roles
            </p>
          </div>

          <div 
            onClick={() => setServiceType('other')}
            className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl cursor-pointer transition transform hover:-translate-y-3 ${serviceType === 'other' ? 'ring-4 ring-[#FF8C00] scale-105' : ''}`}
          >
            <div className="text-6xl mb-4 text-center">📦✨</div>
            <h3 className="text-2xl font-bold text-center mb-3">Other Office Errands</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Supplies delivery, bank runs, printing, or any business task — just ask!
            </p>
          </div>
        </div>

        {/* Request Form – Beautiful & Styled */}
        <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#FF8C00]">
            Request Office Support
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-lg font-semibold mb-2 text-[#FF8C00]">Service Type</label>
              <select 
                className="border-2 border-[#FF8C00] p-4 w-full rounded-xl focus:ring-4 focus:ring-[#FF8C00] focus:border-transparent"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                <option value="document-delivery">Document Delivery</option>
                <option value="assistant-hire">Hire Office Assistant</option>
                <option value="supplies">Office Supplies Delivery</option>
                <option value="bank-run">Bank / Payment Runs</option>
                <option value="other">Other (Describe Below)</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 text-[#FF8C00]">Describe Your Need</label>
              <textarea
                className="border-2 border-[#FF8C00] p-4 w-full h-32 rounded-xl focus:ring-4 focus:ring-[#FF8C00] focus:border-transparent resize-none"
                placeholder="e.g., Deliver contract to client in VI by 2pm, or need a receptionist for 2 weeks..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <label className="block text-lg font-semibold mb-2 text-[#FF8C00]">Your Full Name / Company</label>
              <input className="border-2 border-[#FF8C00] p-4 w-full rounded-xl focus:ring-4 focus:ring-[#FF8C00]" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-[#FF8C00]">Office / Delivery Address</label>
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
            Submit Office Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficeErrands;