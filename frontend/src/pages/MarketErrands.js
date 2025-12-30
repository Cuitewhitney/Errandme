import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const MarketErrands = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [items, setItems] = useState([]); 
  const [newItem, setNewItem] = useState({ name: '', qty: '', price: '' });

  const navigate = useNavigate();

  const addItem = (preName = '') => {
    const itemName = preName || newItem.name;
    if (itemName.trim()) {
      setItems([...items, { name: itemName.trim(), qty: newItem.qty || 1, price: newItem.price || '' }]);
      setNewItem({ name: '', qty: '', price: '' });
    }
  };

  const submit = async () => {
    if (!auth.currentUser) {
      alert('Please sign in to place an order!');
      navigate('/auth');
      return;
    }

    if (items.length === 0) {
      alert('Please add at least one item to your list.');
      return;
    }

    try {
      // Save order to Firebase
      await addDoc(collection(db, 'orders'), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        type: 'market',
        items,
        name,
        address,
        phone,
        whatsapp,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // Send notification to backend (email/WhatsApp)
      await axios.post('/submit', { name, address, phone, whatsapp, items, type: 'market' });

      navigate('/success');
    } catch (error) {
      console.error('Error submitting market request:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const categories = [
    {
      title: 'Fresh Vegetables & Fruits',
      items: [
        { name: 'Tomatoes (Basket)', img: '/image/tomato.jpeg' },
        { name: 'Onions (Bag)', img: '/image/onions.jpg' },
        { name: 'Pepper (Basket)', img: '/image/pepper.jpg' },
        { name: 'Ugwu / Pumpkin Leaves', img: '/image/ugwu.jpeg' },
        { name: 'Plantain (Bunch)', img: '/image/plantain.jpg' },
        { name: 'Waterleaf', img: '/image/waterleaf.jpg' },
      ],
    },
    {
      title: 'Protein (Meat & Fish)',
      items: [
        { name: 'Chicken (Full)', img: '/image/boiler-chicken.jpg' },
        { name: 'Beef (1kg)', img: '/image/beef.png' },
        { name: 'Goat Meat (1kg)', img: '/image/goat-meat.jpeg' },
        { name: 'Tilapia Fish (Large)', img: '/image/tilapia.jpg' },
        { name: 'Mackerel (Titus)', img: '/image/titus.jpg' },
        { name: 'Stock Fish', img: '/image/stock-fish.jpg' },
      ],
    },
    {
      title: 'Raw Food & Grains',
      items: [
        { name: 'Rice (50kg Bag)', img: '/image/rice.jpg' },
        { name: 'Beans (50kg)', img: '/image/Beans.jpg' },
        { name: 'Garri (50kg)', img: '/image/garri.jpg' },
        { name: 'Yam Flour (Poundo)', img: '/image/yam-flour.jpg' },
        { name: 'Semovita (10kg)', img: '/image/semovita.png' },
        { name: 'Yam Tubers', img: '/image/raw-food.jpg' },
      ],
    },
    {
      title: 'Cooking Oils & Spices',
      items: [
        { name: 'Vegetable Oil (5L)', img: '/image/veg-oil.png' },
        { name: 'Palm Oil (5L)', img: '/image/palm-oil.jpg' },
        { name: 'Maggi Cubes (Pack)', img: '/image/maggi.jpg' },
        { name: 'Ground Spices (Pack)', img: '/image/spices.webp' },
        { name: 'Curry & Thyme', img: '/image/curry.jpeg' },
        { name: 'Salt (Bag)', img: '/image/salt.jpg' },
      ],
    },
    {
      title: 'Drinks & Beverages',
      items: [
        { name: 'Coca-Cola (Pet)', img: '/image/coca.jpg' },
        { name: 'Maltina (Can)', img: '/image/maltina.png' },
        { name: 'Eva Water (Pack)', img: '/image/Eva.jpg' },
        { name: 'Peak Milk (Tin)', img: '/image/peak.jpg' },
        { name: 'Hollandia Yoghurt', img: '/image/hollandia.png' },
        { name: 'Five Alive Juice', img: '/image/five-alive.jpg' },
      ],
    },
    {
      title: 'Household Essentials',
      items: [
        { name: 'Omo Detergent (1kg)', img: '/image/Detergent.jpg' },
        { name: 'Morning Fresh', img: '/image/morning-fresh.png' },
        { name: 'Harpic Toilet Cleaner', img: '/image/harpic.jpg' },
        { name: 'Dettol Antiseptic', img: '/image/dettol.png' },
        { name: 'Air Freshener', img: '/image/air-wick.jpg' },
        { name: 'Tissue Paper (Pack)', img: '/image/tissue.jpg' },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fresh Market Errands – Just Like Going Yourself!
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
            Browse real market categories, tap any item to add it with quantity and your preferred price. 
            We’ll buy exactly what you want and deliver fresh to your door.
          </p>
        </div>

        {/* Categories Grid – Jumia Style */}
        {categories.map((category, catIdx) => (
          <div key={catIdx} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 border-b-4 border-[#FF8C00] pb-3 inline-block">
              {category.title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => addItem(item.name)}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 hover:ring-4 hover:ring-[#FF8C00]"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white font-bold text-center w-full p-3">Add to List</p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-semibold text-sm md:text-base">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Shopping List & Checkout */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Your Shopping List ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h2>

          {items.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg py-12">
              Your list is empty. Start adding items from above!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={idx} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Qty: {item.qty} {item.price && `• ₦${item.price}`}
                      </p>
                    </div>
                    <button
                      onClick={() => setItems(items.filter((_, i) => i !== idx))}
                      className="text-red-600 hover:text-red-700 font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Add Custom Item</h3>
                <input
                  type="text"
                  placeholder="Item name (e.g., Special Seasoning)"
                  className="border-2 border-[#FF8C00] p-4 w-full rounded-xl focus:ring-4 focus:ring-[#FF8C00]"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Quantity"
                    className="border-2 border-[#FF8C00] p-4 rounded-xl focus:ring-4 focus:ring-[#FF8C00]"
                    value={newItem.qty}
                    onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Estimated Price (optional)"
                    className="border-2 border-[#FF8C00] p-4 rounded-xl focus:ring-4 focus:ring-[#FF8C00]"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  />
                </div>
                <button
                  onClick={() => addItem()}
                  className="bg-[#FF8C00] hover:bg-[#FFA500] text-white px-8 py-4 rounded-full font-bold w-full transition shadow-lg"
                >
                  Add Custom Item
                </button>
              </div>
            </div>
          )}

          {/* User Details */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Details</h3>
              <input className="border-2 border-[#FF8C00] p-4 w-full rounded-xl mb-4 focus:ring-4 focus:ring-[#FF8C00]" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="border-2 border-[#FF8C00] p-4 w-full rounded-xl mb-4 focus:ring-4 focus:ring-[#FF8C00]" placeholder="Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Info</h3>
              <input className="border-2 border-[#FF8C00] p-4 w-full rounded-xl mb-4 focus:ring-4 focus:ring-[#FF8C00]" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input className="border-2 border-[#FF8C00] p-4 w-full rounded-xl mb-4 focus:ring-4 focus:ring-[#FF8C00]" placeholder="WhatsApp Number" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            </div>
          </div>

          <button
            onClick={submit}
            disabled={items.length === 0}
            className="mt-12 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-12 py-6 rounded-full text-2xl font-bold w-full transition shadow-2xl transform hover:scale-105 disabled:cursor-not-allowed"
          >
            Submit Market Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketErrands;