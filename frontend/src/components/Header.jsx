import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const WHATSAPP = '5562984769468';

export default function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const categories = ['Celulares', 'Informática', 'Tablets', 'Áudio', 'Wearables'];

  return (
    <>
      {/* Top Bar */}
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1e1e1e', padding: '8px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#888' }}>
          <span>📦 Frete grátis para compras acima de R$ 299</span>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontWeight: 600 }}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            (62) 98476-9468
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(10,10,10,0.97)' : '#111111',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1e1e1e',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.6)' : 'none',
      }}>
        <div className="container" style={{ padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Logo */}
            <Link to="/" style={{ flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '28px',
                  letterSpacing: '0.06em',
                  background: 'linear-gradient(135deg, #c9a84c, #e2c47e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>HIAGO</span>
                <span style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  color: '#666',
                  textTransform: 'uppercase',
                  marginTop: '-2px',
                }}>IMPORTADOS</span>
              </div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '600px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Buscar produtos importados..."
                  style={{
                    width: '100%',
                    padding: '11px 48px 11px 18px',
                    background: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '4px',
                    color: '#f0f0f0',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#c9a84c'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                />
                <button type="submit" style={{
                  position: 'absolute',
                  right: '2px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(135deg, #c9a84c, #e2c47e)',
                  border: 'none',
                  borderRadius: '3px',
                  width: '38px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}>
                  <svg width="16" height="16" fill="#000" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>
                </button>
              </div>
            </form>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
              <a
                href={`https://wa.me/${WHATSAPP}?text=Olá! Tenho interesse em um produto da Hiago Importados.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: '10px 16px', fontSize: '13px', whiteSpace: 'nowrap' }}
              >
                <svg width="14" height="14" fill="#4ade80" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Fale Conosco
              </a>

              {/* Cart */}
              <button
                onClick={() => setIsOpen(true)}
                style={{
                  position: 'relative',
                  background: 'transparent',
                  border: '1px solid #2a2a2a',
                  borderRadius: '4px',
                  padding: '10px 14px',
                  color: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#f0f0f0'; }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                Sacola
                {totalItems > 0 && (
                  <span style={{
                    background: 'linear-gradient(135deg, #c9a84c, #e2c47e)',
                    color: '#000',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '20px',
                    minWidth: '18px',
                    textAlign: 'center',
                  }}>
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: '4px', marginTop: '12px', borderTop: '1px solid #1e1e1e', paddingTop: '12px' }}>
            {categories.map(cat => (
              <Link
                key={cat}
                to={`/produtos?category=${encodeURIComponent(cat)}`}
                style={{
                  padding: '6px 16px',
                  borderRadius: '3px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#a0a0a0',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#c9a84c'; e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#a0a0a0'; e.currentTarget.style.background = 'transparent'; }}
              >
                {cat}
              </Link>
            ))}
            <Link
              to="/produtos"
              style={{ padding: '6px 16px', borderRadius: '3px', fontSize: '13px', fontWeight: 600, color: '#c9a84c', marginLeft: 'auto', letterSpacing: '0.04em' }}
            >
              Ver Todos →
            </Link>
          </nav>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
