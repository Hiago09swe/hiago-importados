const products = require('../../data/products');

// GET /api/products
const getAllProducts = (req, res) => {
  try {
    const { category, brand, search, featured, sort, minPrice, maxPrice, limit = 20, page = 1 } = req.query;

    let filtered = [...products];

    if (category) filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (brand) filtered = filtered.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    if (featured === 'true') filtered = filtered.filter(p => p.featured);
    if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sort === 'discount') filtered.sort((a, b) => b.discount - a.discount);

    const total = filtered.length;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      data: paginated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
};

// GET /api/products/:id
const getProductById = (req, res) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Produto não encontrado' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
};

// GET /api/products/categories
const getCategories = (req, res) => {
  try {
    const categories = [...new Set(products.map(p => p.category))];
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
};

// GET /api/products/brands
const getBrands = (req, res) => {
  try {
    const brands = [...new Set(products.map(p => p.brand))];
    res.json({ success: true, data: brands });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
};

module.exports = { getAllProducts, getProductById, getCategories, getBrands };
