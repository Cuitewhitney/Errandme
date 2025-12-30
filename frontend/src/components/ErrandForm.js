import React, { useState } from 'react';
import axios from 'axios'; 
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebase';

const ErrandForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [items, setItems] = useState([]); 
  const [newItem, setNewItem] = useState({ item: '', qty: '', price: '' });

  const addItem = () => {
    setItems([...items, newItem]);
    setNewItem({ item: '', qty: '', price: '' });
  };

  // const submit = async () => {
  //   await axios.post('http://localhost:5000/submit', { name, address, phone, whatsapp, items });
  //   alert('Submitted! We\'ll contact you soon.');
  // };
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
      type: 'Errand',
      items: items,
      name,
      address,
      phone,
      whatsapp,
      status: 'pending',
      createdAt: serverTimestamp()
    });

    // backend notification
    await axios.post('/submit', { name, address, phone, whatsapp, items, type: 'Errand' });

    navigate('/success');
  } catch (error) {
    console.error(error);
    alert('Error placing order. Please try again.');
  }
};

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold">Market Errand</h1>
     
      <button onClick={() => setNewItem({item: 'Tomato', qty: '', price: ''})}>Add Tomato</button>
      <input className="border p-2 m-1" placeholder="Item" value={newItem.item} onChange={e => setNewItem({...newItem, item: e.target.value})} />
      <input className="border p-2 m-1" placeholder="Qty" value={newItem.qty} onChange={e => setNewItem({...newItem, qty: e.target.value})} />
      <input className="border p-2 m-1" placeholder="Price" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
      <button className="bg-blue-500 text-white p-2" onClick={addItem}>Add Item</button>
      <ul>{items.map((it, idx) => <li key={idx}>{it.item} - {it.qty} @ {it.price}</li>)}</ul>
      <input className="border p-2 m-1" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-2 m-1" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
      <input className="border p-2 m-1" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input className="border p-2 m-1" placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
      <button className="bg-green-500 text-white p-2" onClick={submit}>Submit</button>
    </div>
  );
};
export default ErrandForm;