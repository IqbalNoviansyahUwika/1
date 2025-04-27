// TransactionScreen.jsx
import React, { useState, useEffect } from 'react';

function TransactionScreen() {
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        fetch('/api/menu')
            .then(res => res.json())
            .then(data => setMenu(data));
    }, []);

    const addToCart = (item) => {
        setCart([...cart, { ...item, quantity: 1 }]);
    };

    const checkout = () => {
        fetch('/api/transactions', {
            method: 'POST',
            body: JSON.stringify({
                branch_id: 1, // Get from login
                user_id: 1,   // Get from login
                items: cart
            })
        }).then(() => {
            alert('Transaction saved!');
            setCart([]);
        });
    };

    return (
        <div className="transaction-container">
            <div className="menu-list">
                {menu.map(item => (
                    <div key={item.item_id} className="menu-item">
                        <h3>{item.item_name}</h3>
                        <p>Rp{item.price.toLocaleString()}</p>
                        <button onClick={() => addToCart(item)}>+</button>
                    </div>
                ))}
            </div>
            
            <div className="order-summary">
                <h2>Current Order</h2>
                {cart.map((item, idx) => (
                    <div key={idx} className="order-item">
                        <span>{item.item_name} x{item.quantity}</span>
                        <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                ))}
                <button onClick={checkout}>Process Payment</button>
            </div>
        </div>
    );
}