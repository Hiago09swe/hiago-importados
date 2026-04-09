import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const formatPrice = (price) =>
  price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={{ color: i <= Math.round(rating) ? '#c9a84c' : '#333', fontSize: '12px' }}>★</span>
    );
  }
  return <span>{stars}</span>;
};

export default function ProductCard({ product, delay = 0 }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const pixPrice = product.price * 0.9;

  return (
    <div
      className="fade-in"
      style={{
        animationDelay: `${delay}ms`,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#333';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Badge */}
      {product.badge && (
        <span className="badge badge-gold" style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 2,
          fontSize: '10px',
        }}>
          {product.badge}
        </span>
      )}
      {product.discount > 0 && (
        <span style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'var(--accent-red)',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 800,
          padding: '3px 8px',
          borderRadius: '3px',
          zIndex: 2,
        }}>
          -{product.discount}%
        </span>
      )}

      <Link to={`/produto/${product.id}`} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Image */}
        <div style={{
          background: '#111',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '200px',
          overflow: 'hidden',
        }}>
          <img
            src={imgError ? 'https://via.placeholder.com/200x200/1a1a1a/666?text=Produto' : product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{
              maxHeight: '160px',
              maxWidth: '100%',
              objectFit: 'contain',
              transition: 'transform 0.3s ease',
            }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {product.brand} · {product.category}
          </div>

          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: 'Inter, sans-serif',
          }}>
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <StarRating rating={product.rating} />
            <span style={{ fontSize: '12px', color: '#666' }}>({product.reviewCount})</span>
          </div>

          <div style={{ marginTop: 'auto' }}>
            {product.originalPrice > product.price && (
              <div style={{ fontSize: '12px', color: '#555', textDecoration: 'line-through' }}>
                {formatPrice(product.originalPrice)}
              </div>
            )}
            <div style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#f0f0f0',
              fontFamily: "'Rajdhani', sans-serif",
            }}>
              {formatPrice(product.price)}
            </div>
            <div style={{ fontSize: '12px', color: '#4ade80', fontWeight: 600 }}>
              {formatPrice(pixPrice)} no PIX
            </div>
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      <div style={{ padding: '0 16px 16px' }}>
        <button
          onClick={handleAdd}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '13px',
            borderRadius: '4px',
            background: added ? 'linear-gradient(135deg, #4ade80, #22c55e)' : undefined,
          }}
        >
          {added ? (
            <>✓ Adicionado!</>
          ) : (
            <>
              <svg width="14" height="14" fill="none" stroke="#000" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Adicionar à Sacola
            </>
          )}
        </button>
      </div>
    </div>
  );
}
