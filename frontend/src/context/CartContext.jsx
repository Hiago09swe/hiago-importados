import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.items.find(i => i.productId === product.id);
      let items;
      if (existing) {
        items = prev.items.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        items = [...prev.items, { productId: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }];
      }
      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { items, total };
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => {
      const items = prev.items.filter(i => i.productId !== productId);
      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { items, total };
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart(prev => {
      const items = prev.items.map(i => i.productId === productId ? { ...i, quantity } : i);
      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { items, total };
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart({ items: [], total: 0 }), []);

  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isOpen, setIsOpen, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
