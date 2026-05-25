/* =================================================================
   STRAIN / OPTION PICKER
   - Listens for clicks on any .pcard (anywhere on the site)
   - Opens a popup with image + strain dropdown + qty + add-to-cart
   - When user picks a different strain, image + description update
   - Strain lineage / description data lives in the STRAINS object below
     (placeholder copy — replace with real strain info as it's confirmed)
   ================================================================= */
(function () {
  'use strict';

  // ---------------------------------------------------------------
  // STRAIN DATA — placeholder lineages and descriptions.
  // Replace these with real info as Kent confirms each one.
  // ---------------------------------------------------------------
  const STRAINS = {
    // Reserve
    "Dante's Inferno": { lineage: "Cookies × Cherry Pie", type: "Indica-leaning", desc: "Loud gas on the nose, sweet candy on the exhale. Heavy structure, dense buds. Small-batch reserve drop." },
    "Chimax":          { lineage: "Chimera × Animal Mintz", type: "Hybrid", desc: "Sharp citrus and gas, smooth finish. Top-shelf trichome density." },

    // Indoor Exotic
    "Nightmare OG":      { lineage: "OG Kush × Cherry Pie", type: "Indica", desc: "Heavy OG nose with a sweet finish. Dense, sleepy structure." },
    "Blue Zushi":        { lineage: "Zkittlez × Kush Mints", type: "Hybrid", desc: "Sweet berry and cream on the inhale, smooth pull, balanced effects." },
    "Watermelon MimosaZ": { lineage: "Watermelon Zkittlez × Mimosa", type: "Sativa-leaning", desc: "Bright citrus melon, uplifting flavor profile." },
    "Piña Colada":       { lineage: "Pineapple Express × Tropicana Cookies", type: "Sativa", desc: "Tropical and creamy. Smooth daytime smoke." },
    "Blackout Cherry":   { lineage: "Black Cherry × OGKB", type: "Indica", desc: "Dark cherry candy on the inhale, gassy back-end." },
    "Swazzle OG":        { lineage: "Swazzle × OG Kush", type: "Hybrid", desc: "Classic OG nose with a sweet exotic finish." },
    "Gooseberries":      { lineage: "Gushers × Goosebumps", type: "Hybrid", desc: "Sweet berry candy, smooth structure." },
    "M.O.B":             { lineage: "Members Only × Black Mamba", type: "Indica", desc: "Loud gas, dense purple-tinged buds." },
    "Biggie Runtz":      { lineage: "Biggie Smalls × Runtz", type: "Hybrid", desc: "Candy sweet, smooth pull, premium structure." },

    // Vape Carts (On the Go)
    "ChopCheese 2.0 Live Resin Cart": { lineage: "Chop Cheese × in-house terps", type: "Hybrid", desc: "House-made live resin cart. Smooth, loud, consistent — built in-house." },
    "Wedding Cake":         { lineage: "Triangle Kush × Animal Mints", type: "Indica-leaning", desc: "Sweet vanilla cake with a kushy back-end." },
    "White Runtz":          { lineage: "Zkittlez × Gelato", type: "Hybrid", desc: "Fruity candy nose, balanced effects." },
    "Peanut Butter Breath": { lineage: "Do-Si-Dos × Mendo Breath", type: "Indica-leaning", desc: "Earthy, nutty profile with a smooth finish." },
    "Strawberry Guavaz":    { lineage: "Strawberry × Guava OG", type: "Sativa-leaning", desc: "Tropical strawberry, bright finish." },
    "Oreoz":                { lineage: "Cookies & Cream × Secret Weapon", type: "Indica-leaning", desc: "Sweet cookies-and-cream profile." },
    "Girl Scout Cookies":   { lineage: "OG Kush × Durban Poison", type: "Hybrid", desc: "Classic GSC — sweet, earthy, smooth." },

    // Pre Rolls
    "1.25g KingSize Pre Roll": { lineage: "House blend", type: "Hybrid", desc: "House-rolled, 1.25g, packed tight. Strain rotates." },

    // Tier 1 Hash Rosin
    "Sour Gushers Hash Rosin":      { lineage: "Sour Diesel × Gushers", type: "Hybrid", desc: "Tier 1 solventless. Bright, juicy, gas finish." },
    "Nam Wah Hash Rosin":           { lineage: "Nam Wah cultivar", type: "Sativa-leaning", desc: "Tier 1 solventless. Tropical, terp-forward." },
    "Apples & Bananas Hash Rosin":  { lineage: "Platinum Cookies × Granddaddy Purple × Blue Power", type: "Hybrid", desc: "Tier 1 solventless. Fruit-forward, balanced." },
    "StrawNana Hash Rosin":         { lineage: "Strawberry × Banana Kush", type: "Indica-leaning", desc: "Tier 1 solventless. Sweet banana, smooth pull." },

    // BHO Live Resin
    "SVG OG":                       { lineage: "SVG cut × OG Kush", type: "Indica-leaning", desc: "BHO live resin. Heavy OG profile." },
    "Lemon Zest":                   { lineage: "Lemon Skunk × Super Lemon Haze", type: "Sativa", desc: "BHO live resin. Bright lemon, clean pull." },
    "Girl Scout Cookie":            { lineage: "OG Kush × Durban Poison", type: "Hybrid", desc: "BHO live resin. Classic GSC profile." },
    "Lemon Dosi Live Resin Badder": { lineage: "Lemon × Do-Si-Dos", type: "Indica-leaning", desc: "BHO badder consistency. Smooth, sweet citrus." },

    // RosinTech
    "Garlic Cocktail": { lineage: "GMO × MAC", type: "Indica-leaning", desc: "RosinTech Labs solventless. Pungent gas, savory finish." },
    "Orange Malt":     { lineage: "Orange Push Pop × Malt Liquor", type: "Hybrid", desc: "RosinTech Labs solventless. Sweet citrus malt." },

    // Edibles / Merch
    "TropiChews":                { lineage: "—", type: "Edible", desc: "Tropical fruit gummies. Dosed per piece — see label." },
    "GreenGas Branded Tumbler":  { lineage: "—", type: "Merch", desc: "Insulated GreenGas tumbler. Keeps cold cold and hot hot." }
  };

  // ---------------------------------------------------------------
  // CATEGORY MAP — what strains appear in the dropdown for each category.
  // The category is read from data-category on the card, OR from the
  // closest parent section's id (so shop.html works automatically).
  // ---------------------------------------------------------------
  const CATEGORIES = {
    "reserve":      ["Dante's Inferno", "Chimax"],
    "exotic":       ["Nightmare OG", "Blue Zushi", "Watermelon MimosaZ", "Piña Colada", "Blackout Cherry", "Swazzle OG", "Gooseberries", "M.O.B", "Biggie Runtz"],
    "vapes":        ["ChopCheese 2.0 Live Resin Cart", "Wedding Cake", "White Runtz", "Peanut Butter Breath", "Strawberry Guavaz", "Oreoz", "Girl Scout Cookies"],
    "rosin":        ["Sour Gushers Hash Rosin", "Nam Wah Hash Rosin", "Apples & Bananas Hash Rosin", "StrawNana Hash Rosin"],
    "live-resin":   ["SVG OG", "Lemon Zest", "Girl Scout Cookie", "Lemon Dosi Live Resin Badder"],
    "prerolls":     ["1.25g KingSize Pre Roll"],
    "edibles":      ["TropiChews"],
    "merch":        ["GreenGas Branded Tumbler"],
    "flower-drops": ["Lemon Tree", "Sour Diesel", "OG Kush", "White Razz", "Cantaloupe Haze", "Stardawg Guava", "Lychee Breath"]
  };

  // ---------------------------------------------------------------
  // PRICE MAP (fallback when card has no data-price)
  // ---------------------------------------------------------------
  const PRICES = {
    "reserve": 80, "exotic": 30, "vapes": 30, "rosin": 40,
    "live-resin": 25, "prerolls": 10, "edibles": 12, "merch": 40,
    "flower-drops": 10
  };

  // ---------------------------------------------------------------
  // BUILD & INJECT MODAL MARKUP
  // ---------------------------------------------------------------
  const modalHTML = `
    <div class="picker-modal" id="pickerModal" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="picker-panel">
        <button class="picker-close" aria-label="Close picker" type="button">&times;</button>
        <div class="picker-img">
          <img id="pickerImg" src="" alt="" />
        </div>
        <div class="picker-body">
          <p class="picker-cat" id="pickerCat"></p>
          <h3 class="picker-name" id="pickerName"></h3>
          <p class="picker-desc">
            <span class="lineage" id="pickerLineage"></span>
            <span id="pickerDesc"></span>
          </p>
          <div class="picker-controls">
            <div class="picker-row">
              <label for="pickerStrain">Strain</label>
              <select id="pickerStrain"></select>
            </div>
            <div class="picker-row">
              <label for="pickerQty">Quantity</label>
              <div class="qty">
                <button type="button" id="pickerMinus" aria-label="Decrease quantity">&minus;</button>
                <input type="number" id="pickerQty" value="1" min="1" max="20" />
                <button type="button" id="pickerPlus" aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
          <div class="picker-foot">
            <span class="picker-price" id="pickerPrice">$0</span>
            <button class="picker-add" id="pickerAdd" type="button">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `;

  function init() {
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal      = document.getElementById('pickerModal');
    const img        = document.getElementById('pickerImg');
    const catEl      = document.getElementById('pickerCat');
    const nameEl     = document.getElementById('pickerName');
    const lineageEl  = document.getElementById('pickerLineage');
    const descEl     = document.getElementById('pickerDesc');
    const strainSel  = document.getElementById('pickerStrain');
    const qtyInput   = document.getElementById('pickerQty');
    const priceEl    = document.getElementById('pickerPrice');
    const addBtn     = document.getElementById('pickerAdd');

    let currentCategory = null;
    let currentPrice = 0;
    let currentImageMap = {};

    function resolveCategory(card) {
      if (card.dataset.category) return card.dataset.category;
      // Walk up the DOM looking for an ancestor whose id matches a known category
      let el = card.parentElement;
      while (el) {
        if (el.id && CATEGORIES[el.id]) return el.id;
        el = el.parentElement;
      }
      return null;
    }

    function openPicker(card) {
      const cat       = resolveCategory(card) || 'exotic';
      const startName = (card.dataset.name || card.querySelector('h4')?.textContent || '').trim();
      const catLabel  = (card.querySelector('.cat')?.textContent || cat).trim();
      const priceRaw  = card.dataset.price || (card.querySelector('.price')?.textContent || '').replace(/[^\d.]/g, '');
      const price     = parseFloat(priceRaw) || PRICES[cat] || 0;

      currentCategory = cat;
      currentPrice    = price;

      // Build image map from sibling cards in the same category on the page
      currentImageMap = {};
      document.querySelectorAll('.pcard').forEach(c => {
        if (resolveCategory(c) !== cat) return;
        const n = (c.dataset.name || c.querySelector('h4')?.textContent || '').trim();
        const i = c.querySelector('.ph img')?.src;
        if (n && i) currentImageMap[n] = i;
      });

      // Build dropdown options
      const strains = (CATEGORIES[cat] && CATEGORIES[cat].length) ? CATEGORIES[cat] : [startName];
      strainSel.innerHTML = strains.map(s =>
        `<option value="${s}"${s === startName ? ' selected' : ''}>${s}</option>`
      ).join('');

      catEl.textContent = catLabel;
      updateStrain(startName || strains[0]);

      qtyInput.value = 1;
      addBtn.textContent = 'Add to Cart';
      addBtn.classList.remove('added');

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function updateStrain(name) {
      const info = STRAINS[name] || { lineage: 'Lineage TBA', type: '', desc: 'Description coming soon.' };
      nameEl.textContent = name;
      lineageEl.textContent = info.lineage + (info.type ? '  ·  ' + info.type : '');
      descEl.textContent = info.desc;
      if (currentImageMap[name]) {
        img.src = currentImageMap[name];
        img.alt = name;
      }
      updatePrice();
    }

    function updatePrice() {
      const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      const total = currentPrice * qty;
      const formatted = total % 1 === 0 ? total.toFixed(0) : total.toFixed(2);
      priceEl.textContent = '$' + formatted;
    }

    function closePicker() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function bumpCart(amount) {
      document.querySelectorAll('.cart-count').forEach(el => {
        const n = parseInt(el.textContent, 10) || 0;
        el.textContent = String(n + amount);
      });
    }

    // EVENT WIRING
    strainSel.addEventListener('change', e => updateStrain(e.target.value));
    qtyInput.addEventListener('input', updatePrice);

    document.getElementById('pickerMinus').addEventListener('click', () => {
      qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
      updatePrice();
    });
    document.getElementById('pickerPlus').addEventListener('click', () => {
      qtyInput.value = Math.min(20, (parseInt(qtyInput.value, 10) || 1) + 1);
      updatePrice();
    });

    document.querySelector('.picker-close').addEventListener('click', closePicker);
    modal.addEventListener('click', e => { if (e.target === modal) closePicker(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closePicker();
    });

    addBtn.addEventListener('click', () => {
      bumpCart(parseInt(qtyInput.value, 10) || 1);
      addBtn.textContent = 'Added ✓';
      addBtn.classList.add('added');
      setTimeout(closePicker, 750);
    });

    // Hook every product card on the page.
    // Whole-card click opens the picker (since product.html doesn't exist yet).
    document.querySelectorAll('.pcard').forEach(card => {
      card.addEventListener('click', e => {
        // Skip if a sold-out card was clicked and we want default behavior — for now, open the picker anyway
        e.preventDefault();
        e.stopPropagation();
        openPicker(card);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
