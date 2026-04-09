import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Apple iPhone 16e 128GB Preto', description: 'Chip A16 Bionic, tela 6,1", câmera 48MP, iOS 5G', price: 3499.00, originalPrice: 5799.00, discount: 10, rating: 4.9, reviewCount: 2333, category: 'Celulares', brand: 'Apple', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop', badge: 'Full', inStock: true, featured: true, specs: ['128GB', 'Tela 6,1"', '48MP', '5G'] },
  { id: '2', name: 'Samsung Galaxy S25 Ultra 256GB', description: 'Câmera 200MP, S Pen integrada, Snapdragon 8 Elite', price: 7299.00, originalPrice: 9499.00, discount: 15, rating: 4.8, reviewCount: 1204, category: 'Celulares', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop', badge: 'Full', inStock: true, featured: true, specs: ['256GB', '200MP', 'S Pen', '5G'] },
  { id: '3', name: 'MacBook Pro M4 14" 16GB 512GB', description: 'Chip M4 Pro, tela Liquid Retina XDR, 24h bateria', price: 14999.00, originalPrice: 18999.00, discount: 12, rating: 4.9, reviewCount: 876, category: 'Informática', brand: 'Apple', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', badge: 'Importado', inStock: true, featured: true, specs: ['M4 Pro', '16GB RAM', '512GB SSD'] },
  { id: '4', name: 'AirPods Pro 2ª Geração USB-C', description: 'ANC 2x melhor, transparência adaptativa, H2 chip', price: 1699.00, originalPrice: 2299.00, discount: 18, rating: 4.7, reviewCount: 3201, category: 'Áudio', brand: 'Apple', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', badge: 'Top', inStock: true, featured: true, specs: ['ANC', 'USB-C', '30h'] },
  { id: '5', name: 'iPad Pro M4 11" 256GB WiFi', description: 'O mais fino iPad Pro com OLED Ultra Retina XDR', price: 8999.00, originalPrice: 11999.00, discount: 20, rating: 4.8, reviewCount: 541, category: 'Tablets', brand: 'Apple', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', badge: 'Full', inStock: true, featured: false, specs: ['M4', 'OLED', '256GB'] },
  { id: '6', name: 'Sony WH-1000XM5 Sem Fio', description: 'O melhor ANC da indústria, 30h de bateria, LDAC', price: 1599.00, originalPrice: 2199.00, discount: 20, rating: 4.9, reviewCount: 2108, category: 'Áudio', brand: 'Sony', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', badge: 'Top', inStock: true, featured: true, specs: ['ANC', '30h', 'LDAC'] },
  { id: '7', name: 'Apple Watch Series 10 45mm GPS', description: 'O mais fino Apple Watch, nova tela, mais recursos', price: 3199.00, originalPrice: 4499.00, discount: 22, rating: 4.8, reviewCount: 987, category: 'Wearables', brand: 'Apple', image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop', badge: 'Importado', inStock: true, featured: false, specs: ['45mm', 'GPS', 'ECG'] },
  { id: '8', name: 'Samsung Galaxy Watch 7 44mm', description: 'Wear OS, BioActive sensor avançado, design premium', price: 1899.00, originalPrice: 2599.00, discount: 14, rating: 4.6, reviewCount: 654, category: 'Wearables', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', badge: 'Full', inStock: true, featured: false, specs: ['44mm', 'Wear OS'] },
];

const CATEGORIES = [
  { name: 'Celulares', icon: '📱', count: 48 },
  { name: 'Informática', icon: '💻', count: 32 },
  { name: 'Tablets', icon: '⬛', count: 18 },
  { name: 'Áudio', icon: '🎧', count: 27 },
  { name: 'Wearables', icon: '⌚', count: 22 },
];

const slides = [
  { title: 'iPhone 16e', subtitle: 'Apple Intelligence. Para todos.', desc: 'O iPhone mais acessível com chip A16 Bionic e câmera de 48MP.', price: 'A partir de R$ 3.499', bg: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #1a1000 100%)', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop', tag: 'NOVO', link: '/produto/1' },
  { title: 'MacBook Pro M4', subtitle: 'Poder absurdo. Todo dia.', desc: 'O laptop mais avançado da Apple com chip M4 Pro e 24h de bateria.', price: 'A partir de R$ 14.999', bg: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #001a10 100%)', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop', tag: 'IMPORTADO', link: '/produto/3' },
  { title: 'Galaxy S25 Ultra', subtitle: 'Redefinindo possibilidades.', desc: 'Câmera de 200MP, S Pen integrada e IA de última geração.', price: 'A partir de R$ 7.299', bg: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #00101a 100%)', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop', tag: 'DESTAQUE', link: '/produto/2' },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section style={{ background: slide.bg, minHeight: '520px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #1e1e1e', transition: 'background 0.8s ease' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div key={activeSlide} className="slide-in-left">
            <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #c9a84c, #e2c47e)', color: '#000', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', padding: '4px 14px', borderRadius: '2px', marginBottom: '20px' }}>{slide.tag}</span>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,7vw,80px)', letterSpacing: '0.04em', color: '#f0f0f0', lineHeight: 0.95, marginBottom: '12px' }}>{slide.title}</h1>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '20px', fontWeight: 600, color: '#c9a84c', marginBottom: '12px', letterSpacing: '0.04em' }}>{slide.subtitle}</p>
            <p style={{ fontSize: '15px', color: '#888', marginBottom: '24px', lineHeight: 1.6, maxWidth: '380px' }}>{slide.desc}</p>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '24px', fontWeight: 700, color: '#f0f0f0', marginBottom: '28px' }}>{slide.price}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to={slide.link} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '14px' }}>Ver Produto</Link>
              <Link to="/produtos" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '14px' }}>Ver Catálogo</Link>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img key={activeSlide} src={slide.image} alt={slide.title} className="fade-in" style={{ width: '280px', height: '280px', objectFit: 'contain', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.8))' }} />
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setActiveSlide(i)} style={{ width: i === activeSlide ? '28px' : '8px', height: '8px', borderRadius: '4px', background: i === activeSlide ? '#c9a84c' : '#333', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ background: '#111', borderBottom: '1px solid #1e1e1e' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '20px 0' }}>
            {[{ icon: '🚚', label: 'Entrega Rápida', desc: 'Garantida' }, { icon: '🔒', label: 'Compra Segura', desc: '100% protegida' }, { icon: '✅', label: 'Produto Original', desc: 'Garantia de autenticidade' }, { icon: '💬', label: 'Suporte WhatsApp', desc: '(62) 98476-9468' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 24px', borderRight: i < 3 ? '1px solid #1e1e1e' : 'none' }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#d0d0d0', fontFamily: "'Rajdhani',sans-serif", letterSpacing: '0.04em' }}>{item.label}</div>
                  <div style={{ fontSize: '12px', color: '#555' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600 }}>Explore</p>
              <h2 style={{ fontSize: '32px', color: '#f0f0f0' }}>CATEGORIAS</h2>
            </div>
            <Link to="/produtos" style={{ fontSize: '14px', color: '#666' }}>Ver todos →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '12px' }}>
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.name} to={`/produtos?category=${encodeURIComponent(cat.name)}`} className="fade-in"
                style={{ animationDelay: `${i * 80}ms`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 16px', background: '#161616', border: '1px solid #222', borderRadius: '6px', gap: '10px', transition: 'all 0.25s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.background = '#1a1400'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.background = '#161616'; e.currentTarget.style.transform = 'none'; }}
              >
                <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#d0d0d0', fontFamily: "'Rajdhani',sans-serif", letterSpacing: '0.04em' }}>{cat.name}</span>
                <span style={{ fontSize: '11px', color: '#555' }}>{cat.count} produtos</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600 }}>Seleção</p>
              <h2 style={{ fontSize: '32px', color: '#f0f0f0' }}>DESTAQUES</h2>
            </div>
            <Link to="/produtos" style={{ fontSize: '14px', color: '#666' }}>Ver todos →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
            {MOCK_PRODUCTS.filter(p => p.featured).slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg,#111 0%,#1a1400 50%,#111 100%)', border: '1px solid #2a2000', borderRadius: '8px', padding: '48px 60px', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-block', background: '#c9a84c', color: '#000', fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', padding: '4px 12px', borderRadius: '2px', marginBottom: '16px' }}>OFERTA EXCLUSIVA</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '42px', color: '#f0f0f0', marginBottom: '8px', letterSpacing: '0.04em' }}>ATÉ 22% OFF NO PIX</h2>
              <p style={{ fontSize: '16px', color: '#888', maxWidth: '480px' }}>Parcele em até 12x sem juros no cartão ou aproveite o desconto exclusivo pagando no PIX.</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Link to="/produtos" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '15px', whiteSpace: 'nowrap' }}>Ver Ofertas</Link>
            </div>
          </div>
        </div>
      </section>

      {/* MORE PRODUCTS */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#c9a84c', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600 }}>Catálogo</p>
              <h2 style={{ fontSize: '32px', color: '#f0f0f0' }}>MAIS PRODUTOS</h2>
            </div>
            <Link to="/produtos" style={{ fontSize: '14px', color: '#666' }}>Ver catálogo completo →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
            {MOCK_PRODUCTS.slice(4).map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
