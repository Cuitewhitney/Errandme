import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebase';

const CookedFood = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [orders, setOrders] = useState([]); 
  const [newOrder, setNewOrder] = useState({ dish: '', qty: '', notes: '' });

  const navigate = useNavigate();

  const addOrder = (preDish = '') => {
    if (preDish || newOrder.dish) {
      setOrders([...orders, { dish: preDish || newOrder.dish, qty: newOrder.qty || 1, notes: newOrder.notes || '' }]);
      setNewOrder({ dish: '', qty: '', notes: '' });
    }
  };

 
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
      type: 'food',
      items: orders,
      name,
      address,
      phone,
      whatsapp,
      status: 'pending',
      createdAt: serverTimestamp()
    });

    // await axios.post('/submit', { name, address, phone, whatsapp, items, type: 'cookfood' });
    await axios.post('/submit', { name, address, phone, whatsapp, items: orders, type: 'food' });

    navigate('/success');
  } catch (error) {
    console.error(error);
    alert('Error placing order. Please try again.');
  }
};

  // Food Categories
  const categories = [
    {
      title: 'Classic Nigerian Dishes',
      items: [
        { dish: 'Jollof Rice with Chicken', img: 'https://i.ytimg.com/vi/jDbUg4f9EFw/sddefault.jpg' },
        { dish: 'Egusi Soup with Pounded Yam', img: 'https://allnigerianfoods.com/wp-content/uploads/egusi_soup-1.jpg' },
        { dish: 'Afang Soup', img: 'https://i.ytimg.com/vi/u3FzRezSgBs/sddefault.jpg' },
        { dish: 'Okra Soup with Pounded Yam', img: 'https://i.ytimg.com/vi/ouNQA0U-hiM/maxresdefault.jpg' },
        { dish: 'Suya (Beef Skewers)', img: 'https://www.seriouseats.com/thmb/3UFS8-r5ayxHlEC7_DF2HzQ7D-Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__10__20201015-Suya-sho-spaeth-1-78c58be723c944068b3f85c8ff4f9d23.jpg' },
      ],
    },
    {
      title: 'Street Food Favorites',
      items: [
        { dish: 'Chicken Shawarma', img: 'https://miro.medium.com/1*zB3NS1z3MXPR77mBfYXAPg.jpeg' },
        { dish: 'Beef Suya Shawarma', img: 'https://i.ytimg.com/vi/9CtQKz2nTjs/maxresdefault.jpg' },
        { dish: 'Spicy Suya Wrap', img: 'https://www.certifiedangusbeef.com/_next/image?url=https%3A%2F%2Fappetizing-cactus-7139e93734.media.strapiapp.com%2FSuya_Satay_Skewer_Nigerian_Street_Food_C_24_16591_1200x800_6a45073_1_bd22702f7d.jpeg&w=1920&q=75' },
      ],
    },
    {
      title: 'Pizza & International',
      items: [
        { dish: 'Pepperoni Pizza', img: 'https://media.istockphoto.com/id/918199322/photo/top-view-of-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=9d-vj86QXY7iFiOyE4gb4uA0iqqphNPXhA7iavUk7BY=' },
        { dish: 'Margherita Pizza', img: 'https://media.gettyimages.com/id/1205458016/photo/closeup-of-pepperoni-pizza-as-a-background.jpg?s=1024x1024&w=gi&k=20&c=eyJmWdjPA3f9Bl6QZ-_V5HRQ-fnrPaNEjPwsAeY__rg=' },
      ],
    },
    {
      title: 'Cakes & Desserts',
      items: [
        { dish: 'Chocolate Birthday Cake', img: 'https://media.gettyimages.com/id/865935726/photo/happy-birthday-chocolate-cake-slice-with-berries.jpg?s=1024x1024&w=gi&k=20&c=0beIYuFFS4T8JTi0SgHRcFBH0Y3fCQ-ggUskD-df5Xk=' },
        { dish: 'Vanilla Celebration Cake', img: 'https://cdn.bakedbree.com/uploads/2024/07/Chocolate-Birthday-Cake-A_chocolate_birthday_cake_feature_4-500x375.jpg' },
      ],
    },
  ];

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Hot & Fresh Food Delivery</h1>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          Craving authentic Nigerian meals, street food, pizza, or cake? Browse below and tap any dish to add it to your order. We'll deliver it hot and fresh!
        </p>

        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-4 border-[#FF8C00] pb-2 inline-block">
              {cat.title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {cat.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => addOrder(item.dish)}
                >
                  <img src={item.img} alt={item.dish} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-sm mb-2">{item.dish}</h3>
                    <button className="bg-[#FF8C00] text-white px-4 py-2 rounded-full text-sm hover:bg-[#FFA500] transition">
                      Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Order Summary & Details */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Order ({orders.length} items)</h2>
          <ul className="space-y-3 mb-8">
            {orders.map((ord, idx) => (
              <li key={idx} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <span className="font-medium">{ord.dish}</span>
                <span>Qty: {ord.qty} {ord.notes && `– ${ord.notes}`}</span>
              </li>
            ))}
          </ul>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Add Custom Dish</h3>
              <input
                className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded mb-3 focus:ring-2 focus:ring-[#FF8C00]"
                placeholder="Dish name (e.g., Extra Spicy Jollof)"
                value={newOrder.dish}
                onChange={(e) => setNewOrder({ ...newOrder, dish: e.target.value })}
              />
              <input
                className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded mb-3 focus:ring-2 focus:ring-[#FF8C00]"
                placeholder="Quantity"
                value={newOrder.qty}
                onChange={(e) => setNewOrder({ ...newOrder, qty: e.target.value })}
              />
              <input
                className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded mb-4 focus:ring-2 focus:ring-[#FF8C00]"
                placeholder="Special notes (e.g., no onions)"
                value={newOrder.notes}
                onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
              />
              <button onClick={() => addOrder()} className="bg-[#FF8C00] hover:bg-[#FFA500] text-white px-6 py-3 rounded-full w-full transition">
                Add Custom Dish
              </button>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Delivery Details</h3>
              <input className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded mb-3 focus:ring-2 focus:ring-[#FF8C00]" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded mb-3 focus:ring-2 focus:ring-[#FF8C00]" placeholder="Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <input className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded mb-3 focus:ring-2 focus:ring-[#FF8C00]" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input className="border border-gray-300 dark:border-gray-600 p-3 w-full rounded mb-3 focus:ring-2 focus:ring-[#FF8C00]" placeholder="WhatsApp Number" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            </div>
          </div>

          <button
            onClick={submit}
            disabled={orders.length === 0}
            className="mt-10 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-12 py-5 rounded-full text-xl font-bold w-full transition shadow-lg"
          >
            Submit Food Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookedFood;