# VigorX Pro - Page Reference Guide
**Reference Page:** `v2/short/go/index.html`

---

## 1. INGREDIENTS (Prostate Supplement Formula)

### Key Ingredients
| # | Ingredient | Image Path | Description |
|---|-----------|-----------|-------------|
| 1 | Saw Palmetto Extract | `v2/lib/img/ingredient_1.jpg` | Most well-known for prostate health. Supports healthy urinary function, reduces nighttime bathroom trips, maintains healthy prostate size. |
| 2 | Flower Pollen Extract | `v2/lib/img/ingredient_2.jpg` | Rich in vitamins, minerals, amino acids. Boosts energy, supports healthy prostate function, enhances vitality. |
| 3 | Muira Puama Extract | `v2/lib/img/ingredient_3.jpg` | "Potency wood" — Brazilian herb for male vitality and intimate wellness. Promotes healthy desire and performance. |

### Supporting Ingredients
| # | Ingredient | Image Path | Description |
|---|-----------|-----------|-------------|
| 4 | Oregano Leaf Extract (Origanum vulgare) | `v2/lib/img/ingredient_4.jpg` | Rich in antioxidants. Supports prostate health, healthy urinary flow, and overall male wellness. |
| 5 | Grape Seed Extract (95% proanthocyanidins) | `v2/lib/img/ingredient_5.jpg` | Potent antioxidant. Supports healthy circulation and prostate wellness. |
| 6 | Peppermint Leaf Extract | `v2/lib/img/ingredient_6.jpg` | Enhances healthy digestion and urinary comfort. Promotes overall wellness. |

### FAQ-Only Ingredients (no images)
| # | Ingredient | Description |
|---|-----------|-------------|
| 7 | Perilla Leaf Extract (90% Luteolin) | Helps reduce inflammation and oxidative stress. |
| 8 | Apple (Malus pumila) Extracts | Promotes overall male wellness and vitality. |

### Product Label (v2/Images/label.jpg) — Actual Ingredients
> Note: The label ingredients differ from the page content. Page uses prostate-focused ingredients for sales copy.

- Horny Goat Weed Extract (Epimedium sagittatum) — 800mg
- Proprietary Blend (400mg): Maca Root Powder, L-Arginine, Muira Puama Powder, Panax Ginseng Powder, Tongkat Ali Powder, Tribulus Terrestris Extract

---

## 2. COLOR THEME SCHEME

### Primary Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| Golden Gradient | `linear-gradient(135deg, #c8922a, #e8b84a, #d4a032, #f0c85a, #c8922a)` | CTA buttons, featured card header, card borders |
| Black Gradient | `linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%)` | Non-featured card headers, footer, bg-dark sections, moneyback, icon circles |
| Matte Black Gradient | `linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #2a2a2a 100%)` | Moneyback section, menu-bar backgrounds |
| Light Gold BG | `linear-gradient(135deg, #fdf6e3 0%, #f5e6c4 100%)` | Product image area background |

### Text Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| Black | `#1a1a1a` | Headings (`.text-blue`), accordion links, FAQ buttons, feature text |
| Black Gradient (text) | `linear-gradient(135deg, #1a1a1a 0%, #444444 50%, #1a1a1a 100%)` | Price text ($79, $49, $64, /Bottle) using `background-clip: text` |
| Red | `#dc3545` | Final price in TOTAL line |
| Gold | `#f0c85a` | "BEST VALUE" badge text |
| White | `#ffffff` | Text on dark/black gradient backgrounds |
| Black | `#000000` | Button text, mobile ::before subtitles |

### Button Theme (Golden Gradient)
```css
/* CTA Buttons */
background: linear-gradient(135deg, #c8922a, #e8b84a, #d4a032, #f0c85a, #c8922a);
color: #000000;
box-shadow: 0px 3px 0px #8a6518;

/* Hover */
background: linear-gradient(135deg, #d4a032, #f0c85a, #e0b040, #f5d76e, #d4a032);
```

### Card Borders & Accents
| Element | Value |
|---------|-------|
| Card border | `2px solid #c8922a` |
| Image area border | `2px solid #e8d5a8` |
| Hover shadow | `rgba(200, 146, 42, 0.25)` |
| Best badge shadow | `rgba(0, 0, 0, 0.4)` |

---

## 3. PRICING CARDS — COMPLETE CODE

### Pricing Data
| Package | Per Bottle | Badges | Shipping | Strikethrough | Final Price | Image |
|---------|-----------|--------|----------|--------------|-------------|-------|
| 2 Bottles (60 day) | $79 | save200, 60days | + $19.99 | $260 | $158 | `Images/2-bottles-vigor.webp` |
| 6+1 Bottles (210 day) BEST VALUE | $49 | 780, discount, 60days, ebooks | FREE | $1,074 | $294 | `Images/7-bottles-vigor.webp` |
| 3 Bottles (90 day) | $64 | 450, 60days | FREE | $642 | $192 | `Images/3-bottles-vigor.webp` |

### Badge Images (v2/pills/)
| File | Alt Text |
|------|----------|
| `pills/save200.png` | You Save $200 |
| `pills/780.png` | You Save $780 |
| `pills/450.webp` | You Save $450 |
| `pills/discount.png` | Biggest Discount |
| `pills/60days.webp` | 60 Days Guarantee |
| `pills/ebooks.png` | 2 Free Ebooks |

### Other Images Used
| File | Usage |
|------|-------|
| `lib/img/buy-now.webp` | Buy Now button (regular cards) |
| `lib/img/buy-now2.webp` | Buy Now button (featured/best value card) |
| `lib/img/cards.webp` | Payment method icons (Visa, PayPal, etc.) |

### HTML Structure
```html
<!-- NEW PRICING CARDS -->
<section id="bottomorder" style="padding: 20px 0;">
<div class="container">
<div class="row">
<div class="col-12">
<div id="buynow" class="mt-product-grid">
  <!-- 2 Bottles -->
  <div class="mt-product-card" data-card="2bottle">
    <div class="mt-product-header">
      <h3>2 BOTTLES</h3>
      <p>60 DAY SUPPLY</p>
    </div>
    <div class="mt-product-content">
      <div class="mt-product-image">
        <img src="../../Images/2-bottles-vigor.webp" alt="VigorX Pro 2 Bottles">
      </div>
      <div class="mt-product-details">
        <div class="mt-product-price">
          <h4 class="mt-display-price">$79</h4>
          <div class="mt-price-info"><p>/Bottle</p></div>
        </div>
        <div class="mt-badge-images">
          <img src="../../pills/save200.png" alt="You Save $200" class="badge-img">
          <img src="../../pills/60days.webp" alt="60 Days Guarantee" class="badge-img">
        </div>
        <a href="#" class="mt-buy-now-btn">
          <img src="../../lib/img/buy-now.webp" alt="Buy Now">
        </a>
        <p class="mt-shipping-text">+ $19.99 Shipping</p>
        <p class="mt-total-line">TOTAL: <span class="mt-strikethrough">$260</span> <span class="mt-final-price">$158</span></p>
        <div class="mt-payment-icons"><img src="../../lib/img/cards.webp" alt="Payment Methods"></div>
      </div>
    </div>
  </div>

  <!-- 6+1 Bottles - BEST VALUE -->
  <div class="mt-product-card mt-featured" data-card="6bottle">
    <div class="mt-product-header">
      <h3>6 + 1 BOTTLES</h3>
      <p>+ 1 FREE BOTTLE + 2 PREMIUM EBOOKS &bull; 210 DAY SUPPLY</p>
    </div>
    <div class="mt-product-content">
      <div class="mt-product-image">
        <img src="../../Images/7-bottles-vigor.webp" alt="VigorX Pro 7 Bottles - Best Value">
        <div class="mt-best-badge">BEST VALUE</div>
      </div>
      <div class="mt-product-details">
        <div class="mt-product-price">
          <h4 class="mt-display-price">$49</h4>
          <div class="mt-price-info"><p>/Bottle</p></div>
        </div>
        <div class="mt-badge-images">
          <img src="../../pills/780.png" alt="You Save $780" class="badge-img">
          <img src="../../pills/discount.png" alt="Biggest Discount" class="badge-img">
          <img src="../../pills/60days.webp" alt="60 Days Guarantee" class="badge-img">
          <img src="../../pills/ebooks.png" alt="2 Free Ebooks" class="badge-img">
        </div>
        <a href="#" class="mt-buy-now-btn">
          <img src="../../lib/img/buy-now2.webp" alt="Buy Now">
        </a>
        <p class="mt-shipping-text">FREE Shipping</p>
        <p class="mt-total-line">TOTAL: <span class="mt-strikethrough">$1,074</span> <span class="mt-final-price">$294</span></p>
        <div class="mt-payment-icons"><img src="../../lib/img/cards.webp" alt="Payment Methods"></div>
      </div>
    </div>
  </div>

  <!-- 3 Bottles -->
  <div class="mt-product-card" data-card="3bottle">
    <div class="mt-product-header">
      <h3>3 BOTTLES</h3>
      <p>FREE SHIPPING &bull; 90 DAY SUPPLY</p>
    </div>
    <div class="mt-product-content">
      <div class="mt-product-image">
        <img src="../../Images/3-bottles-vigor.webp" alt="VigorX Pro 3 Bottles">
      </div>
      <div class="mt-product-details">
        <div class="mt-product-price">
          <h4 class="mt-display-price">$64</h4>
          <div class="mt-price-info"><p>/Bottle</p></div>
        </div>
        <div class="mt-badge-images">
          <img src="../../pills/450.webp" alt="You Save $450" class="badge-img">
          <img src="../../pills/60days.webp" alt="60 Days Guarantee" class="badge-img">
        </div>
        <a href="#" class="mt-buy-now-btn">
          <img src="../../lib/img/buy-now.webp" alt="Buy Now">
        </a>
        <p class="mt-shipping-text">FREE Shipping</p>
        <p class="mt-total-line">TOTAL: <span class="mt-strikethrough">$642</span> <span class="mt-final-price">$192</span></p>
        <div class="mt-payment-icons"><img src="../../lib/img/cards.webp" alt="Payment Methods"></div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
</section>
<!-- END NEW PRICING CARDS -->
```

### Complete CSS (Desktop + Tablet + Mobile)
```css
/* NEW PRICING CARDS CSS */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap");

.mt-product-grid {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  justify-content: center;
  padding: 2rem 1rem;
  background-color: transparent;
  font-family: "Montserrat", sans-serif;
  max-width: 1100px;
  margin: 0 auto;
}

.mt-product-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 340px;
  width: calc(33.333% - 0.75rem);
  min-width: 280px;
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #c8922a;
}

.mt-product-card:hover {
  transform: scale(1.02);
  box-shadow: 0 15px 30px rgba(200, 146, 42, 0.25);
}

.mt-product-card.mt-featured {
  background: #fff;
  border: 2px solid #c8922a;
}

.mt-product-header {
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%);
  text-align: center;
  padding: 0.6rem 1rem;
  color: white;
  border-radius: 18px 18px 0 0;
}

.mt-product-card.mt-featured .mt-product-header {
  background: linear-gradient(135deg, #c8922a, #e8b84a, #d4a032, #f0c85a, #c8922a);
  color: #000;
}

.mt-product-header h3 {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
}

.mt-product-header p {
  font-size: 1.1rem;
  margin-top: 0.2rem;
  margin-bottom: 0;
  font-weight: 500;
}

.mt-product-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.mt-product-image {
  width: 100%;
  position: relative;
  text-align: center;
  padding: 0.6rem;
  border: 2px solid #e8d5a8;
  border-radius: 12px;
  background: linear-gradient(135deg, #fdf6e3 0%, #f5e6c4 100%);
  margin-bottom: 0.5rem;
}

.mt-product-image img {
  width: 100%;
  max-width: 252px;
  height: auto;
  object-fit: contain;
}

.mt-best-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: #f0c85a;
  font-weight: bold;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.mt-product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: 100%;
}

.mt-product-price {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
}

.mt-product-price h4, .mt-display-price {
  font-size: 4.5rem;
  font-weight: 800;
  margin: 0;
  line-height: 1;
  background: linear-gradient(135deg, #1a1a1a 0%, #444444 50%, #1a1a1a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mt-price-info p {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #444444 50%, #1a1a1a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Badge Images */
.mt-badge-images {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin: 12px 0;
  align-items: center;
}

.mt-badge-images .badge-img {
  max-width: 100%;
  width: auto;
  height: auto;
  max-height: 38px;
  object-fit: contain;
}

.mt-buy-now-btn {
  display: block;
  margin-top: 2px;
  width: 100%;
  max-width: 220px;
}

.mt-buy-now-btn img {
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.mt-buy-now-btn:hover img {
  transform: scale(1.05);
}

.mt-shipping-text {
  color: #000;
  font-size: 1rem;
  margin-top: 3px;
  font-weight: 500;
}

.mt-total-line {
  font-size: 1.25rem;
  margin-top: 8px;
  font-weight: 400;
  color: #000;
  text-align: center;
}

.mt-strikethrough {
  text-decoration: line-through;
  color: #000;
  margin-right: 0.5rem;
  font-weight: 400;
}

.mt-final-price {
  font-weight: 700;
  color: #dc3545;
  font-size: 1.3rem;
}

.mt-payment-icons {
  margin: 0.4rem 0;
  padding: 0;
}

.mt-payment-icons img {
  width: 100%;
  max-width: 200px;
  padding: 0;
}

/* ========== TABLET (max-width: 992px) ========== */
@media (max-width: 992px) {
  .mt-product-grid {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .mt-product-card {
    max-width: 400px;
    width: 100%;
  }

  .mt-product-card.mt-featured {
    order: -1;
  }

  .mt-product-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8rem;
  }

  .mt-product-image {
    width: 100%;
    max-width: 200px;
    padding: 0.5rem;
  }

  .mt-product-details {
    width: 100%;
    padding: 0 0.5rem;
  }

  .mt-product-price h4, .mt-display-price {
    font-size: 3rem;
  }

  .mt-product-header h3 {
    font-size: 1.5rem;
  }

  .mt-product-header p {
    font-size: 0.85rem;
  }
}

/* ========== MOBILE (max-width: 768px) ========== */
/* Cards switch to horizontal layout: image left, details right */
@media (max-width: 768px) {
  .mt-product-grid {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
  }

  .mt-product-card {
    width: 100%;
    max-width: 100%;
    min-width: unset;
    position: relative;
  }

  .mt-product-header {
    padding: 1rem 0.8rem;
    text-align: center;
  }

  .mt-product-header h3 {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0;
    line-height: 1.2;
  }

  .mt-product-header p {
    display: none;
  }

  /* Horizontal layout: left (image) + right (pricing) */
  .mt-product-content {
    flex-direction: row;
    padding: 0.5rem;
    gap: 0.5rem;
    align-items: center;
  }

  /* Left side: Product image column */
  .mt-product-image {
    flex: 0 0 35%;
    border: none;
    background: transparent;
    padding: 1rem 0 0.3rem 0;
    margin: 0;
    order: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
  }

  /* Add subtitle before image using ::before */
  .mt-product-card[data-card="2bottle"] .mt-product-image::before {
    content: "60 DAY SUPPLY";
    font-size: 0.95rem;
    color: #000000;
    font-weight: 700;
    text-align: center;
    display: block;
    line-height: 1.3;
    width: 100%;
  }

  .mt-product-card[data-card="6bottle"] .mt-product-image::before {
    content: "+ 1 FREE BOTTLE \2022  210 DAY SUPPLY";
    font-size: 0.8rem;
    color: #000000;
    font-weight: 700;
    text-align: center;
    display: block;
    line-height: 1.3;
    width: 100%;
  }

  .mt-product-card[data-card="3bottle"] .mt-product-image::before {
    content: "FREE SHIPPING \2022  90 DAY SUPPLY";
    font-size: 0.9rem;
    color: #000000;
    font-weight: 700;
    text-align: center;
    display: block;
    line-height: 1.3;
    width: 100%;
  }

  .mt-product-image img {
    max-width: 100%;
    max-height: 130px;
  }

  .mt-best-badge {
    display: none;
  }

  /* Right side: All pricing details */
  .mt-product-details {
    flex: 1;
    padding: 0;
    order: 2;
    display: flex;
    flex-direction: column;
  }

  .mt-product-price {
    margin-top: 10px;
    margin-bottom: 5px;
    order: 2;
  }

  .mt-product-price h4, .mt-display-price {
    font-size: 4.5rem;
    font-weight: 700;
    margin: 0;
  }

  .mt-price-info p {
    font-size: 1rem;
  }

  /* Badge images - show first */
  .mt-badge-images {
    gap: 4px;
    margin: 6px 0;
    align-items: flex-start;
    order: 1;
  }

  .mt-badge-images .badge-img {
    max-height: 26px;
  }

  /* Buy button */
  .mt-buy-now-btn {
    max-width: 90%;
    width: 100%;
    margin: 6px auto;
    order: 3;
  }

  .mt-shipping-text {
    font-size: 0.8rem;
    margin-top: 4px;
    order: 4;
  }

  .mt-total-line {
    font-size: 0.95rem;
    margin-top: 4px;
    order: 6;
  }

  .mt-final-price {
    font-size: 1.05rem;
  }

  .mt-payment-icons {
    margin: 5px 0;
    order: 5;
  }

  .mt-payment-icons img {
    max-width: 160px;
  }
}

/* ========== SMALL MOBILE (max-width: 480px) ========== */
@media (max-width: 480px) {
  .mt-product-header {
    padding: 0.9rem 0.8rem;
  }

  .mt-product-header h3 {
    font-size: 1.4rem;
    font-weight: 800;
  }

  .mt-product-card[data-card="2bottle"] .mt-product-image::before {
    font-size: 0.85rem;
  }

  .mt-product-card[data-card="3bottle"] .mt-product-image::before {
    font-size: 0.8rem;
  }

  .mt-product-card[data-card="6bottle"] .mt-product-image::before {
    font-size: 0.7rem;
  }

  .mt-product-image {
    flex: 0 0 38%;
  }

  .mt-product-price h4, .mt-display-price {
    font-size: 3.8rem;
    font-weight: 700;
  }
}
```

---

## 4. PRODUCT IMAGES

### Bottle Images (v2/Images/)
| File | Description |
|------|-------------|
| `Images/1-bottles-vigor.webp` | Single bottle (also used as favicon) |
| `Images/2-bottles-vigor.webp` | 2 bottles |
| `Images/3-bottles-vigor.webp` | 3 bottles |
| `Images/4-bottles-vigor.webp` | 4 bottles |
| `Images/6-bottles-vigor.webp` | 6 bottles |
| `Images/7-bottles-vigor.webp` | 7 bottles (6+1 best value) |
| `Images/label.jpg` | Product label |
| `Images/logo.png` | VigorX Pro logo |

### Review/Testimonial Images (v2/Images/)
| File | Usage |
|------|-------|
| `Images/istockphoto-1135381120-612x612.jpg` | Review photo 1 |
| `Images/istockphoto-1961053928-612x612.jpg` | Review photo 2 |
| `Images/woman-showing-ok-sign_23-2148990150.avif` | Review photo 3 |

---

## 5. PAGE STRUCTURE REFERENCE
**Reference page:** `v2/short/go/index.html`

| Section | Description |
|---------|-------------|
| Header | Logo (120px desktop, 100px mobile) + sticky "TRY NOW" button (golden gradient) |
| As Seen On | Media logos bar |
| Hero | Product intro + single bottle image |
| 5 Feature Icons | 2-per-row mobile (`col-6 col-md-2`) |
| Key Ingredients | 3 main + 3 supporting (collapsible) |
| Reviews/Testimonials | 3 customer reviews with photos |
| Money-Back Guarantee | 60-day guarantee (matte black gradient bg) |
| 4 Trust Icons | 2-per-row mobile (`col-6 col-md-3`) — icons use `filter: brightness(0) saturate(100%)` |
| Pricing Cards | 3 cards (2-bottle, 6+1 best value, 3-bottle) |
| Bonus Section | 3 bonuses (extra bottle, health guide ebook, wellness plan ebook) |
| FAQ Accordion | Common questions |
| Footer | Disclaimer, contact, legal links (black gradient bg) |

### Favicon
```html
<link rel="icon" type="image/webp" href="../../Images/1-bottles-vigor.webp">
```

### Key CSS Files
| File | Purpose |
|------|---------|
| `v2/short/css/main.css` | Layout, footer, accordion, bg-dark, text-blue, menu-bar |
| `v2/short/css/landerstyle.css` | Page-specific styles, moneyback, ATC sections, ingredients |
| `v2/short/go/index.html <style>` | Pricing cards CSS (embedded), bonus section CSS (embedded) |
