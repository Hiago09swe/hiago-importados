import React from 'react';
import { useCart } from '../context/CartContext';

const formatPrice = (price) =>
  price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const WHATSAPP = '5562984769468';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalItems } = useCart();

  const handleWhatsapp = () => {
    const itemsList = cart.items.map(i => `• ${i.name} (x${i.quantity}) - ${formatPrice(i.price * i.quantity)}`).join('\n');
    const text = `Olá! Gostaria de finalizar meu pedido:\n\n${itemsList}\n\n*Total: ${formatPrice(cart.total)}*\n\nPode me ajudar?`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          zIndex: 2000, backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100vh',
        width: '420px', maxWidth: '95vw',
        background: '#111',
        borderLeft: '1px solid #222',
        zIndex: 2001,
        display: 'flex', flexDirection: 'column',
        animation: 'slideInLeft 0.3s ease',
      }}>
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '20px', color: '#f0f0f0', fontFamily: "'Rajdhani', sans-serif" }}>
              MINHA SACOLA
            </h2>
            <span style={{ fontSize: '13px', color: '#666' }}>{totalItems} {totalItems === 1 ? 'item' : 'itens'}</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: '#1e1e1e', border: 'none', color: '#888', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {cart.items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 24px', color: '#555' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
              <p style={{ fontSize: '16px', fontWeight: 600, color: '#777', marginBottom: '8px' }}>Sua sacola está vazia</p>
              <p style={{ fontSize: '13px' }}>Adicione produtos incríveis!</p>
            </div>
          ) : (
            cart.items.map(item => (
              <div key={item.productId} style={{
                display: 'flex', gap: '12px', padding: '16px 0',
                borderBottom: '1px solid #1a1a1a',
              }}>
                <div style={{ width: '70px', height: '70px', background: '#1a1a1a', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', color: '#d0d0d0', lineHeight: 1.4, marginBottom: '8px' }}>{item.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid #2a2a2a', borderRadius: '4px', overflow: 'hidden' }}>
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} style={{ background: '#1a1a1a', border: 'none', color: '#aaa', width: '28px', height: '28px', cursor: 'pointer', fontSize: '14px' }}>−</button>
                      <span style={{ padding: '0 12px', fontSize: '13px', color: '#f0f0f0', background: '#111' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} style={{ background: '#1a1a1a', border: 'none', color: '#aaa', width: '28px', height: '28px', cursor: 'pointer', fontSize: '14px' }}>+</button>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#c9a84c', fontFamily: "'Rajdhani', sans-serif" }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.productId)} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: '14px', alignSelf: 'flex-start', padding: '4px' }}>✕</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid #1e1e1e', background: '#0d0d0d' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', color: '#888' }}>
              <span>Subtotal</span>
              <span>{formatPrice(cart.total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '22px', fontWeight: 700, fontFamily: "'Rajdhani', sans-serif" }}>
              <span>Total</span>
              <span style={{ color: '#c9a84c' }}>{formatPrice(cart.total)}</span>
            </div>
            <button
              onClick={handleWhatsapp}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: '4px', gap: '10px' }}
            >
              <svg width="18" height="18" fill="#000" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Finalizar pelo WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
