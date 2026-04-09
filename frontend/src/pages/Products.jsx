import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ALL_PRODUCTS = [
  { id: '1', name: 'Apple iPhone 16e 128GB Preto', price: 3499.00, originalPrice: 5799.00, discount: 10, rating: 4.9, reviewCount: 2333, category: 'Celulares', brand: 'Apple', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop', badge: 'Full', inStock: true, featured: true },
  { id: '2', name: 'Samsung Galaxy S25 Ultra 256GB', price: 7299.00, originalPrice: 9499.00, discount: 15, rating: 4.8, reviewCount: 1204, category: 'Celulares', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop', badge: 'Full', inStock: true, featured: true },
  { id: '3', name: 'MacBook Pro M4 14" 16GB 512GB', price: 14999.00, originalPrice: 18999.00, discount: 12, rating: 4.9, reviewCount: 876, category: 'Informática', brand: 'Apple', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', badge: 'Importado', inStock: true, featured: true },
  { id: '4', name: 'AirPods Pro 2ª Geração USB-C', price: 1699.00, originalPrice: 2299.00, discount: 18, rating: 4.7, reviewCount: 3201, category: 'Áudio', brand: 'Apple', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', badge: 'Top', inStock: true, featured: true },
  { id: '5', name: 'iPad Pro M4 11" 256GB WiFi', price: 8999.00, originalPrice: 11999.00, discount: 20, rating: 4.8, reviewCount: 541, category: 'Tablets', brand: 'Apple', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', badge: 'Full', inStock: true, featured: false },
  { id: '6', name: 'Sony WH-1000XM5 Sem Fio', price: 1599.00, originalPrice: 2199.00, discount: 20, rating: 4.9, reviewCount: 2108, category: 'Áudio', brand: 'Sony', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', badge: 'Top', inStock: true, featured: true },
  { id: '7', name: 'Apple Watch Series 10 45mm GPS', price: 3199.00, originalPrice: 4499.00, discount: 22, rating: 4.8, reviewCount: 987, category: 'Wearables', brand: 'Apple', image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop', badge: 'Importado', inStock: true, featured: false },
  { id: '8', name: 'Samsung Galaxy Watch 7 44mm', price: 1899.00, originalPrice: 2599.00, discount: 14, rating: 4.6, reviewCount: 654, category: 'Wearables', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', badge: 'Full', inStock: true, featured: false },
  { id: '9', name: 'iPhone 15 Pro 256GB Titânio', price: 6799.00, originalPrice: 8999.00, discount: 17, rating: 4.8, reviewCount: 1876, category: 'Celulares', brand: 'Apple', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop', badge: 'Top', inStock: true, featured: false },
  { id: '10', name: 'Motorola Edge 60 Fusion 256GB', price: 1899.00, originalPrice: 2499.00, discount: 16, rating: 4.5, reviewCount: 432, category: 'Celulares', brand: 'Motorola', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop', badge: null, inStock: true, featured: false },
  { id: '11', name: 'Dell XPS 15 i7 16GB 512GB OLED', price: 11299.00, originalPrice: 13999.00, discount: 13, rating: 4.7, reviewCount: 321, category: 'Informática', brand: 'Dell', image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop', badge: 'Importado', inStock: true, featured: false },
  { id: '12', name: 'JBL Charge 5 Caixa Bluetooth', price: 899.00, originalPrice: 1299.00, discount: 25, rating: 4.6, reviewCount: 1543, category: 'Áudio', brand: 'JBL', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', badge: null, inStock: true, featured: false },
];

const BRANDS = ['Apple', 'Samsung', 'Sony', 'Motorola', 'Dell', 'JBL'];
const CATEGORIES = ['Celulares', 'Informática', 'Tablets', 'Áudio', 'Wearables'];
const SORTS = [{ value: 'relevance', label: 'Relevância' }, { value: 'price_asc', label: 'Menor Preço' }, { value: 'price_desc', label: 'Maior Preço' }, { value: 'rating', label: 'Melhor Avaliado' }, { value: 'discount', label: 'Maior Desconto' }];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('relevance');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(20000);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (category) list = list.filter(p => p.category === category);
    if (brand) list = list.filter(p => p.brand === brand);
    if (selectedBrands.length) list = list.filter(p => selectedBrands.includes(p.brand));
    list = list.filter(p => p.price <= maxPrice);
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'discount') list.sort((a, b) => b.discount - a.discount);
    return list;
  }, [search, category, brand, selectedBrands, maxPrice, sort]);

  const toggleBrand = (b) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  const clearFilters = () => { setSelectedBrands([]); setMaxPrice(20000); setSearchParams({}); };

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#555' }}>
        <Link to="/" style={{ color: '#555' }}>Home</Link>
        <span>›</span>
        <span style={{ color: '#c9a84c' }}>{search ? `Busca: "${search}"` : category || brand || 'Todos os Produtos'}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px', alignItems: 'start' }}>
        {/* SIDEBAR */}
        <aside>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '6px', overflow: 'hidden', position: 'sticky', top: '120px' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#d0d0d0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Filtros</span>
              {(selectedBrands.length > 0 || category || brand || search) && (
                <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#c9a84c', fontSize: '12px', cursor: 'pointer' }}>Limpar tudo</button>
              )}
            </div>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Categoria</p>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setSearchParams(category === cat ? {} : { category: cat })}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '13px', marginBottom: '2px', background: category === cat ? 'rgba(201,168,76,0.12)' : 'transparent', color: category === cat ? '#c9a84c' : '#777', fontWeight: category === cat ? 700 : 400, transition: 'all 0.15s' }}>
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a1a1a' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Marca</p>
              {BRANDS.map(b => (
                <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} style={{ accentColor: '#c9a84c' }} />
                  <span style={{ fontSize: '13px', color: selectedBrands.includes(b) ? '#c9a84c' : '#777' }}>{b}</span>
                </label>
              ))}
            </div>
            <div style={{ padding: '16px 20px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Preço máximo</p>
              <input type="range" min={500} max={20000} step={500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: '#c9a84c' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#555' }}>
                <span>R$ 500</span>
                <span style={{ color: '#c9a84c', fontWeight: 600 }}>R$ {maxPrice.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* GRID */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontSize: '24px', color: '#f0f0f0', marginBottom: '2px' }}>{search ? `Busca: "${search}"` : category || brand || 'Todos os Produtos'}</h1>
              <p style={{ fontSize: '13px', color: '#555' }}>{filtered.length} produto{filtered.length !== 1 ? 's' : ''}</p>
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: '#161616', border: '1px solid #2a2a2a', color: '#d0d0d0', padding: '9px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', outline: 'none' }}>
              {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#555' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontSize: '20px', color: '#777', marginBottom: '8px' }}>Nenhum produto encontrado</h3>
              <p style={{ fontSize: '14px', marginBottom: '24px' }}>Tente outros filtros ou termos de busca</p>
              <button onClick={clearFilters} className="btn btn-primary" style={{ padding: '12px 28px' }}>Limpar Filtros</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
              {filtered.map((product, i) => <ProductCard key={product.id} product={product} delay={i * 60} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
