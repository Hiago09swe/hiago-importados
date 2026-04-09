import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ALL_PRODUCTS = [
  { id: '1', name: 'Apple iPhone 16e 128GB Preto', description: 'O iPhone 16e é feito com Apple Intelligence — seu assistente de IA pessoal. Chip A16 Bionic, tela Super Retina XDR de 6,1", câmera traseira de 48MP com modo Fotográfico, câmera frontal de 12MP, bateria com até 26 horas de reprodução de vídeo e compatível com 5G.', price: 3499.00, originalPrice: 5799.00, discount: 10, rating: 4.9, reviewCount: 2333, category: 'Celulares', brand: 'Apple', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop', badge: 'Full', inStock: true, specs: ['128GB de armazenamento interno', 'Tela Super Retina XDR de 6,1"', 'Câmera traseira de 48MP', 'Câmera frontal de 12MP', 'Chip A16 Bionic', 'Compatível com 5G', 'Resistência à água IP68', 'Face ID'] },
  { id: '2', name: 'Samsung Galaxy S25 Ultra 256GB', description: 'O Galaxy S25 Ultra redefine o que um smartphone pode fazer. Com câmera de 200MP, S Pen integrada e chip Snapdragon 8 Elite for Galaxy.', price: 7299.00, originalPrice: 9499.00, discount: 15, rating: 4.8, reviewCount: 1204, category: 'Celulares', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop', badge: 'Full', inStock: true, specs: ['256GB armazenamento', 'Câmera principal 200MP', 'S Pen integrada', 'Snapdragon 8 Elite', '5G', 'IP68', 'Tela 6,9" AMOLED 120Hz'] },
  { id: '3', name: 'MacBook Pro M4 14" 16GB 512GB', description: 'MacBook Pro com chip M4 Pro é incrivelmente rápido, com até 24 horas de bateria e tela Liquid Retina XDR brilhante. Perfeito para profissionais criativos.', price: 14999.00, originalPrice: 18999.00, discount: 12, rating: 4.9, reviewCount: 876, category: 'Informática', brand: 'Apple', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop', badge: 'Importado', inStock: true, specs: ['Chip Apple M4 Pro', '16GB de memória unificada', '512GB SSD', 'Tela Liquid Retina XDR 14"', 'Até 24 horas de bateria', 'Três portas Thunderbolt 4', 'HDMI', 'Leitor de cartão SDXC'] },
  { id: '4', name: 'AirPods Pro 2ª Geração USB-C', description: 'AirPods Pro com cancelamento ativo de ruído até 2x mais eficaz, modo de transparência adaptativo e áudio personalizado com Áudio Espacial Personalizado.', price: 1699.00, originalPrice: 2299.00, discount: 18, rating: 4.7, reviewCount: 3201, category: 'Áudio', brand: 'Apple', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop', badge: 'Top', inStock: true, specs: ['Chip H2', 'ANC 2x mais eficaz', 'Modo de transparência adaptativo', 'Áudio Espacial Personalizado', 'Até 6h de uso (ANC ativo)', 'Até 30h com estojo', 'Resistente ao suor e à água (IPX4)', 'USB-C'] },
  { id: '5', name: 'iPad Pro M4 11" 256GB WiFi', description: 'O iPad Pro mais fino já feito. Com chip M4, tela Ultra Retina XDR OLED e Apple Pencil Pro, é uma máquina poderosa para criar.', price: 8999.00, originalPrice: 11999.00, discount: 20, rating: 4.8, reviewCount: 541, category: 'Tablets', brand: 'Apple', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop', badge: 'Full', inStock: true, specs: ['Chip Apple M4', 'Tela OLED Ultra Retina XDR 11"', '256GB armazenamento', 'WiFi 6E', 'USB-C Thunderbolt 4', 'Apple Pencil Pro compatível', 'Magic Keyboard Folio compatível'] },
  { id: '6', name: 'Sony WH-1000XM5 Sem Fio', description: 'O melhor cancelamento de ruído da indústria com qualidade de som premium e 30 horas de bateria. Oito microfones e dois processadores de som.', price: 1599.00, originalPrice: 2199.00, discount: 20, rating: 4.9, reviewCount: 2108, category: 'Áudio', brand: 'Sony', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', badge: 'Top', inStock: true, specs: ['8 microfones para ANC', 'Processador V1 + HD Noise Canceling', 'LDAC Hi-Res Audio', 'Até 30 horas de bateria', 'Recarga rápida (3min = 3h)', 'USB-C', 'Bluetooth 5.2', 'Dobrável'] },
  { id: '7', name: 'Apple Watch Series 10 45mm GPS', description: 'O Apple Watch mais fino já feito, com tela maior, carregamento mais rápido e sensor de temperatura da pele.', price: 3199.00, originalPrice: 4499.00, discount: 22, rating: 4.8, reviewCount: 987, category: 'Wearables', brand: 'Apple', image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&h=600&fit=crop', badge: 'Importado', inStock: true, specs: ['Caixa 45mm', 'GPS', 'ECG', 'Sensor de oxigênio no sangue', 'Sensor de temperatura', 'Detecção de acidente', 'watchOS 11', 'Resistência à água 50m'] },
  { id: '8', name: 'Samsung Galaxy Watch 7 44mm', description: 'Galaxy Watch7 com chip Exynos W1000, monitoramento avançado de saúde incluindo análise de composição corporal.', price: 1899.00, originalPrice: 2599.00, discount: 14, rating: 4.6, reviewCount: 654, category: 'Wearables', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop', badge: 'Full', inStock: true, specs: ['44mm', 'Wear OS 5', 'BioActive Sensor', 'Análise de composição corporal', 'ECG', 'Resistente à água 5ATM', 'Carregamento sem fio'] },
];

const formatPrice = (price) => price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const WHATSAPP = '5562984769468';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, setIsOpen } = useCart();
  const [added, setAdded] = useState(false);
  const product = ALL_PRODUCTS.find(p => p.id === id);

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '100px 24px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>😔</div>
      <h2 style={{ color: '#888', marginBottom: '16px' }}>Produto não encontrado</h2>
      <Link to="/produtos" className="btn btn-primary" style={{ padding: '12px 28px' }}>Ver Produtos</Link>
    </div>
  );

  const pixPrice = product.price * 0.9;
  const installment = (product.price / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => { setAdded(false); setIsOpen(true); }, 600);
  };

  const handleWhatsapp = () => {
    const text = `Olá! Tenho interesse no produto:\n*${product.name}*\nPreço: ${formatPrice(product.price)}\n\nPode me ajudar?`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '13px', color: '#555' }}>
        <Link to="/" style={{ color: '#555' }}>Home</Link>
        <span>›</span>
        <Link to={`/produtos?category=${product.category}`} style={{ color: '#555' }}>{product.category}</Link>
        <span>›</span>
        <span style={{ color: '#c9a84c' }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
        {/* IMAGE */}
        <div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '440px', position: 'relative' }}>
            {product.badge && (
              <span className="badge badge-gold" style={{ position: 'absolute', top: '16px', left: '16px' }}>{product.badge}</span>
            )}
            {product.discount > 0 && (
              <span style={{ position: 'absolute', top: '16px', right: '16px', background: '#e63946', color: '#fff', fontSize: '13px', fontWeight: 800, padding: '4px 12px', borderRadius: '3px' }}>-{product.discount}%</span>
            )}
            <img src={product.image} alt={product.name} style={{ maxHeight: '320px', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.6))' }} />
          </div>

          {/* Trust badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginTop: '16px' }}>
            {[{ icon: '🚚', text: 'Entrega Garantida' }, { icon: '🔒', text: 'Compra Segura' }, { icon: '↩️', text: 'Devolução Fácil' }].map(item => (
              <div key={item.text} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '6px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{item.icon}</div>
                <div style={{ fontSize: '11px', color: '#666', fontWeight: 600 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="fade-in">
          <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            {product.brand} · {product.category}
          </div>
          <h1 style={{ fontSize: '28px', color: '#f0f0f0', lineHeight: 1.3, marginBottom: '16px', fontFamily: "'Rajdhani',sans-serif" }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= Math.round(product.rating) ? '#c9a84c' : '#333', fontSize: '16px' }}>★</span>)}
            </div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#c9a84c' }}>{product.rating}</span>
            <span style={{ fontSize: '13px', color: '#555' }}>({product.reviewCount} avaliações)</span>
          </div>

          {/* Pricing */}
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
            {product.originalPrice > product.price && (
              <div style={{ fontSize: '14px', color: '#555', textDecoration: 'line-through', marginBottom: '4px' }}>
                De: {formatPrice(product.originalPrice)}
              </div>
            )}
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: '36px', fontWeight: 700, color: '#f0f0f0', lineHeight: 1, marginBottom: '8px' }}>
              {formatPrice(product.price)}
            </div>
            <div style={{ fontSize: '15px', color: '#4ade80', fontWeight: 700, marginBottom: '8px' }}>
              {formatPrice(pixPrice)} <span style={{ color: '#4ade80', fontSize: '13px' }}>no PIX (10% off)</span>
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              ou 12x de <strong style={{ color: '#d0d0d0' }}>{installment}</strong> sem juros no cartão
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <button onClick={handleAdd} className="btn btn-primary" style={{ padding: '16px', fontSize: '15px', background: added ? 'linear-gradient(135deg,#4ade80,#22c55e)' : undefined }}>
              {added ? '✓ Adicionado à Sacola!' : (
                <>
                  <svg width="18" height="18" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  Adicionar à Sacola
                </>
              )}
            </button>
            <button onClick={handleWhatsapp} className="btn btn-outline" style={{ padding: '16px', fontSize: '15px', borderColor: '#2a2a2a', color: '#4ade80' }}>
              <svg width="18" height="18" fill="#4ade80" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Comprar pelo WhatsApp
            </button>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', color: '#d0d0d0', marginBottom: '12px', letterSpacing: '0.04em' }}>DESCRIÇÃO</h3>
            <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.7 }}>{product.description}</p>
          </div>

          {/* Specs */}
          <div>
            <h3 style={{ fontSize: '16px', color: '#d0d0d0', marginBottom: '12px', letterSpacing: '0.04em' }}>ESPECIFICAÇÕES</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {product.specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '4px', fontSize: '13px', color: '#888' }}>
                  <span style={{ color: '#c9a84c', fontSize: '10px' }}>◆</span>
                  {spec}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
