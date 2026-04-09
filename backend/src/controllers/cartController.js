// In-memory cart store (use Redis/DB in production)
const carts = {};

const getCart = (req, res) => {
  const sessionId = req.headers['x-session-id'] || 'default';
  const cart = carts[sessionId] || { items: [], total: 0 };
  res.json({ success: true, data: cart });
};

const addToCart = (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'default';
    const { productId, quantity = 1, name, price, image } = req.body;

    if (!productId) return res.status(400).json({ success: false, message: 'productId obrigatório' });

    if (!carts[sessionId]) carts[sessionId] = { items: [], total: 0 };

    const existing = carts[sessionId].items.find(i => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      carts[sessionId].items.push({ productId, quantity, name, price, image });
    }

    carts[sessionId].total = carts[sessionId].items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    res.json({ success: true, data: carts[sessionId] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao adicionar ao carrinho' });
  }
};

const removeFromCart = (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'default';
    const { productId } = req.params;

    if (!carts[sessionId]) return res.status(404).json({ success: false, message: 'Carrinho não encontrado' });

    carts[sessionId].items = carts[sessionId].items.filter(i => i.productId !== productId);
    carts[sessionId].total = carts[sessionId].items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    res.json({ success: true, data: carts[sessionId] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao remover do carrinho' });
  }
};

const clearCart = (req, res) => {
  const sessionId = req.headers['x-session-id'] || 'default';
  carts[sessionId] = { items: [], total: 0 };
  res.json({ success: true, message: 'Carrinho limpo', data: carts[sessionId] });
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
