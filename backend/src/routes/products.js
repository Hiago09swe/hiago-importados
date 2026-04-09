const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, getCategories, getBrands } = require('../controllers/productsController');

router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/:id', getProductById);

module.exports = router;
