// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3000;

// Database connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coffee_sales'
});

// API Endpoints
app.get('/api/menu', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM menu_items');
    res.json(rows);
});

app.post('/api/transactions', async (req, res) => {
    const { branch_id, user_id, items } = req.body;
    
    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create transaction
    const [txResult] = await pool.query(
        'INSERT INTO transactions SET ?', 
        { branch_id, user_id, total_amount: total }
    );
    
    // Add transaction details
    for (const item of items) {
        await pool.query(
            'INSERT INTO transaction_details SET ?',
            {
                transaction_id: txResult.insertId,
                item_id: item.id,
                quantity: item.quantity,
                unit_price: item.price
            }
        );
    }
    
    res.json({ success: true, transactionId: txResult.insertId });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));