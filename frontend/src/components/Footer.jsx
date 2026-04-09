import React from 'react';
import { Link } from 'react-router-dom';

const WHATSAPP = '5562984769468';

export default function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid #1a1a1a', marginTop: '80px' }}>
      {/* CTA Strip */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1400, #2a1f00, #1a1400)',
        borderBottom: '1px solid #3a2d00',
        padding: '28px 0',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '20px', color: '#c9a84c', fontFamily: "'Rajdhani', sans-serif", marginBottom: '4px' }}>
              DÚVIDAS? FALE DIRETO CONOSCO
            </h3>
            <p style={{ fontSize: '14px', color: '#888' }}>Atendimento personalizado pelo WhatsApp</p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '14px 32px', fontSize: '15px' }}
          >
            <svg width="18" height="18" fill="#000" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            (62) 98476-9468
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', flexWrap: 'wrap' }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '32px',
                letterSpacing: '0.06em',
                background: 'linear-gradient(135deg, #c9a84c, #e2c47e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>HIAGO IMPORTADOS</span>
            </div>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, maxWidth: '280px' }}>
              Produtos importados de qualidade com os melhores preços. Atendimento personalizado e entrega garantida.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              {[
                { icon: '📱', text: 'Garantia de Entrega' },
                { icon: '🔒', text: 'Compra Segura' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#888' }}>
                  <span>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>Categorias</h4>
            {['Celulares', 'Informática', 'Tablets', 'Áudio', 'Wearables'].map(cat => (
              <Link key={cat} to={`/produtos?category=${cat}`} style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>Marcas</h4>
            {['Apple', 'Samsung', 'Sony', 'Motorola', 'Xiaomi'].map(brand => (
              <Link key={brand} to={`/produtos?brand=${brand}`} style={{ display: 'block', color: '#555', fontSize: '14px', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                {brand}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>Contato</h4>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '14px', marginBottom: '12px' }}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              (62) 98476-9468
            </a>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.6 }}>
              Seg - Sáb: 9h às 20h<br/>Dom: 10h às 18h
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: '#444' }}>© 2024 Hiago Importados. Todos os direitos reservados.</p>
          <p style={{ fontSize: '13px', color: '#333' }}>Preços e disponibilidade sujeitos a alterações</p>
        </div>
      </div>
    </footer>
  );
}
