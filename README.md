# 🛍️ Hiago Importados — E-commerce Completo

Plataforma de e-commerce profissional para produtos importados. Tema escuro luxuoso com tons de preto, cinza e dourado.

---

## 📁 Estrutura do Projeto

```
hiago-importados/
├── frontend/          # React + Vite
└── backend/           # Node.js + Express API
```

---

## 🚀 Como Rodar

### 1. Backend (API)

```bash
cd backend
npm install
npm run dev
```

API disponível em: `http://localhost:3001`

**Endpoints:**
- `GET /api/health` — Status da API
- `GET /api/products` — Lista produtos (filtros: category, brand, search, sort, featured, minPrice, maxPrice, page, limit)
- `GET /api/products/:id` — Produto por ID
- `GET /api/products/categories` — Categorias disponíveis
- `GET /api/products/brands` — Marcas disponíveis
- `GET /api/cart` — Visualizar carrinho (header: x-session-id)
- `POST /api/cart/add` — Adicionar ao carrinho
- `DELETE /api/cart/item/:productId` — Remover do carrinho
- `DELETE /api/cart/clear` — Limpar carrinho

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

App disponível em: `http://localhost:5173`

---

## ✨ Funcionalidades

- **Home** com hero animado com slideshow automático
- **Catálogo** com filtros por categoria, marca e preço
- **Busca** em tempo real
- **Página de produto** com detalhes completos
- **Sacola** (drawer lateral) com gestão de itens
- **Finalização pelo WhatsApp** — envia lista de produtos automaticamente
- **Design dark luxury** — preto, cinza e dourado
- **100% responsivo**

---

## 📞 Contato

WhatsApp: **(62) 98476-9468**

---

## 🛠️ Tecnologias

| Frontend | Backend |
|----------|---------|
| React 18 | Node.js |
| React Router v6 | Express 4 |
| Vite 5 | CORS, Helmet |
| CSS Variables | Morgan (logs) |

---

## 🎨 Design System

| Variável | Valor |
|----------|-------|
| `--bg-primary` | `#0a0a0a` |
| `--bg-card` | `#161616` |
| `--accent-gold` | `#c9a84c` |
| `--text-primary` | `#f0f0f0` |

Fontes: **Bebas Neue** (logo/títulos) + **Rajdhani** (headings) + **Inter** (corpo)
