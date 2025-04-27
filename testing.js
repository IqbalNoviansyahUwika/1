test('should calculate transaction total correctly', () => {
    const items = [
        { price: 18000, quantity: 2 },
        { price: 22000, quantity: 1 }
    ];
    const total = calculateTotal(items);
    expect(total).toBe(58000);
});