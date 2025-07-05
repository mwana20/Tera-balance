// Terra Balance E-commerce JavaScript
import { loginUser, registerUser } from './auth.js';
// Global Variables
let currentUser = null;
let cart = [];
let products = [];
let currentProduct = null;


document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    loadFeaturedProducts();
    loadAllProducts();
    updateCartUI();
    setupEventListeners();
    showPage('home');
});

// Product Data 
function initializeProducts() {
    products = [
        // Organic Food Category
        { id: 1, name: "Organic Quinoa", price: 12.99, category: "organic-food", image: "images/organic-quinoa.jpg", description: "Premium organic quinoa, rich in protein and fiber." },
        { id: 2, name: "Organic Almonds", price: 15.99, category: "organic-food", image: "images/organic-almonds.jpg", description: "Raw organic almonds, perfect for healthy snacking." },
        { id: 3, name: "Organic Honey", price: 18.99, category: "organic-food", image: "images/organic-honey.jpg", description: "Pure wildflower honey from sustainable beekeepers." },
        { id: 4, name: "Organic Coconut Oil", price: 14.99, category: "organic-food", image: "images/organic-coconut-oil.jpg", description: "Cold-pressed virgin coconut oil for cooking and beauty." },
        { id: 5, name: "Organic Chia Seeds", price: 11.99, category: "organic-food", image: "images/organic-chia-seeds.jpg", description: "Nutrient-dense chia seeds packed with omega-3s." },
        { id: 6, name: "Organic Brown Rice", price: 8.99, category: "organic-food", image: "images/organic-brown-rice.jpg", description: "Long-grain organic brown rice, perfect for healthy meals." },
        { id: 7, name: "Organic Avocado Oil", price: 19.99, category: "organic-food", image: "images/organic-avocado-oil.jpg", description: "Premium cold-pressed avocado oil for cooking." },
        { id: 8, name: "Organic Oats", price: 6.99, category: "organic-food", image: "images/organic-oats.jpg", description: "Steel-cut organic oats for a healthy breakfast." },
        { id: 9, name: "Organic Lentils", price: 7.99, category: "organic-food", image: "images/organic-lentils.jpg", description: "Protein-rich organic red lentils." },
        { id: 10, name: "Organic Black Beans", price: 5.99, category: "organic-food", image: "images/organic-black-beans.jpg", description: "Certified organic black beans, high in fiber." },
        { id: 11, name: "Organic Maple Syrup", price: 16.99, category: "organic-food", image: "images/organic-maple-syrup.jpg", description: "Pure Grade A maple syrup from sustainable farms." },
        { id: 12, name: "Organic Cashews", price: 17.99, category: "organic-food", image: "images/organic-cashews.jpg", description: "Raw organic cashews, perfect for snacking." },
        { id: 13, name: "Organic Green Tea", price: 12.99, category: "organic-food", image: "images/organic-green-tea.jpg", description: "Premium organic green tea leaves." },
        { id: 14, name: "Organic Turmeric Powder", price: 9.99, category: "organic-food", image: "images/organic-turmeric-powder.jpg", description: "Ground organic turmeric with anti-inflammatory properties." },
        { id: 15, name: "Organic Flax Seeds", price: 8.99, category: "organic-food", image: "images/organic-flax-seeds.jpg", description: "Organic flax seeds rich in omega-3 fatty acids." },
        { id: 16, name: "Organic Chickpeas", price: 6.99, category: "organic-food", image: "images/organic-chickpeas.jpg", description: "Dried organic chickpeas, perfect for hummus." },
        { id: 17, name: "Organic Sunflower Seeds", price: 7.99, category: "organic-food", image: "images/organic-sunflower-seeds.jpg", description: "Raw organic sunflower seeds for healthy snacking." },
        { id: 18, name: "Organic Pumpkin Seeds", price: 10.99, category: "organic-food", image: "images/organic-pumpkin-seeds.jpg", description: "Roasted organic pumpkin seeds with sea salt." },

        // Gardening Category
        { id: 19, name: "Organic Tomato Seeds", price: 4.99, category: "gardening", image: "images/organic-tomato-seeds.jpg", description: "Heirloom organic tomato seeds for your garden." },
        { id: 20, name: "Organic Herb Garden Kit", price: 29.99, category: "gardening", image: "images/organic-herb-garden-kit.jpg", description: "Complete kit with basil, parsley, and cilantro seeds." },
        { id: 21, name: "Bamboo Garden Stakes", price: 12.99, category: "gardening", image: "images/bamboo-garden-stakes.jpg", description: "Sustainable bamboo stakes for plant support." },
        { id: 22, name: "Organic Compost", price: 15.99, category: "gardening", image: "images/organic-compost.jpg", description: "Premium organic compost for healthy soil." },
        { id: 23, name: "Eco-Friendly Watering Can", price: 24.99, category: "gardening", image: "images/eco-friendly-watering-can.jpg", description: "Recycled plastic watering can with ergonomic design." },
        { id: 24, name: "Organic Lettuce Seeds", price: 3.99, category: "gardening", image: "images/organic-lettuce-seeds.jpg", description: "Crisp and nutritious organic lettuce seeds." },
        { id: 25, name: "Organic Carrot Seeds", price: 2.99, category: "gardening", image: "images/organic-carrot-seeds.jpg", description: "Heirloom organic carrot seeds for vibrant veggies." },
        { id: 26, name: "Organic Cucumber Seeds", price: 3.49, category: "gardening", image: "images/organic-cucumber-seeds.jpg", description: "Cool and refreshing organic cucumber seeds." },
        { id: 27, name: "Organic Bell Pepper Seeds", price: 3.99, category: "gardening", image: "images/organic-bell-pepper-seeds.jpg", description: "Sweet and crunchy organic bell pepper seeds." },
        { id: 28, name: "Organic Radish Seeds", price: 2.49, category: "gardening", image: "images/organic-radish-seeds.jpg", description: "Fast-growing organic radish seeds." },
        { id: 29, name: "Organic Spinach Seeds", price: 3.49, category: "gardening", image: "images/organic-spinach-seeds.jpg", description: "Nutritious organic spinach seeds." },
        { id: 30, name: "Organic Kale Seeds", price: 3.99, category: "gardening", image: "images/organic-kale-seeds.jpg", description: "Healthy organic kale seeds." },

        // Home Care Category
        { id: 31, name: "Organic All-Purpose Cleaner", price: 9.99, category: "home-care", image: "images/organic-all-purpose-cleaner.jpg", description: "Natural and effective all-purpose cleaner." },
        { id: 32, name: "Organic Glass Cleaner", price: 8.99, category: "home-care", image: "images/organic-glass-cleaner.jpg", description: "Streak-free organic glass cleaner." },
        { id: 33, name: "Organic Bathroom Cleaner", price: 10.99, category: "home-care", image: "images/organic-bathroom-cleaner.jpg", description: "Disinfecting organic bathroom cleaner." },
        { id: 34, name: "Organic Floor Cleaner", price: 11.99, category: "home-care", image: "images/organic-floor-cleaner.jpg", description: "Natural organic floor cleaner." },
        { id: 35, name: "Organic Furniture Polish", price: 9.49, category: "home-care", image: "images/organic-furniture-polish.jpg", description: "Organic furniture polish with beeswax." },
        { id: 36, name: "Organic Laundry Detergent", price: 14.99, category: "home-care", image: "images/organic-laundry-detergent.jpg", description: "Eco-friendly organic laundry detergent." },
        { id: 37, name: "Organic Dish Soap", price: 7.99, category: "home-care", image: "images/organic-dish-soap.jpg", description: "Concentrated organic dish soap." },
        { id: 38, name: "Organic Hand Soap", price: 6.99, category: "home-care", image: "images/organic-hand-soap.jpg", description: "Moisturizing organic hand soap." },
        { id: 39, name: "Organic Air Freshener", price: 11.99, category: "home-care", image: "images/organic-air-freshener.jpg", description: "Natural organic air freshener." },
        { id: 40, name: "Organic Carpet Cleaner", price: 13.99, category: "home-care", image: "images/organic-carpet-cleaner.jpg", description: "Deep cleaning organic carpet cleaner." },

        // Farming Category
        { id: 41, name: "Organic Corn Seeds", price: 4.99, category: "farming", image: "images/organic-corn-seeds.jpg", description: "Heirloom organic corn seeds for planting." },
        { id: 42, name: "Organic Wheat Seeds", price: 5.99, category: "farming", image: "images/organic-wheat-seeds.jpg", description: "High-quality organic wheat seeds." },
        { id: 43, name: "Organic Rice Seeds", price: 6.99, category: "farming", image: "images/organic-rice-seeds.jpg", description: "Premium organic rice seeds." },
        { id: 44, name: "Organic Soybean Seeds", price: 7.99, category: "farming", image: "images/organic-soybean-seeds.jpg", description: "Nutrient-rich organic soybean seeds." },
        { id: 45, name: "Organic Barley Seeds", price: 8.99, category: "farming", image: "images/organic-barley-seeds.jpg", description: "Organic barley seeds for malting and brewing." },
        { id: 46, name: "Organic Rye Seeds", price: 9.99, category: "farming", image: "images/organic-rye-seeds.jpg", description: "Organic rye seeds for bread and whiskey." },
        { id: 47, name: "Organic Millet Seeds", price: 10.99, category: "farming", image: "images/organic-millet-seeds.jpg", description: "Organic millet seeds for gluten-free baking." },
        { id: 48, name: "Organic Buckwheat Seeds", price: 11.99, category: "farming", image: "images/organic-buckwheat-seeds.jpg", description: "Organic buckwheat seeds for pancakes and porridge." },
        { id: 49, name: "Organic Peanut Seeds", price: 14.99, category: "farming", image: "images/organic-peanut-seeds.jpg", description: "Organic peanut seeds for planting." },
        { id: 62, name: "Organic Orchard Grass Seed (Bulk)", price: 24.99, category: "farming", image: "images/organic-orchard-grass-seed-bulk.jpg", description: "Bulk organic orchard grass seed for pastures." },
        { id: 63, name: "Organic Fescue Seed (Bulk)", price: 22.99, category: "farming", image: "images/organic-fescue-seed-bulk.jpg", description: "Bulk organic fescue seed for lawns and pastures." },
        { id: 64, name: "Organic Bluegrass Seed (Bulk)", price: 19.99, category: "farming", image: "images/organic-bluegrass-seed-bulk.jpg", description: "Bulk organic bluegrass seed for lawns." },
        { id: 65, name: "Organic Bermuda Grass Seed (Bulk)", price: 17.99, category: "farming", image: "images/organic-bermuda-grass-seed-bulk.jpg", description: "Bulk organic bermuda grass seed for lawns." },
        { id: 66, name: "Organic Zoysia Grass Seed (Bulk)", price: 15.99, category: "farming", image: "images/organic-zoysia-grass-seed-bulk.jpg", description: "Bulk organic zoysia grass seed for lawns." },
        { id: 67, name: "Organic Ryegrass Seed (Bulk)", price: 14.99, category: "farming", image: "images/organic-ryegrass-seed-bulk.jpg", description: "Bulk organic ryegrass seed for quick greening." },
        { id: 68, name: "Organic Clover Seed (Bulk)", price: 29.99, category: "farming", image: "images/organic-clover-seed-bulk.jpg", description: "Bulk organic clover seed for cover cropping." },
        { id: 69, name: "Organic Alfalfa Seed (Bulk)", price: 24.99, category: "farming", image: "images/organic-alfalfa-seed-bulk.jpg", description: "Bulk organic alfalfa seed for sprouting." },
        { id: 70, name: "Organic Timothy Hay (Bulk)", price: 19.99, category: "farming", image: "images/organic-timothy-hay-bulk.jpg", description: "Bulk organic timothy hay for livestock." }
    ];
}

// --- Page Navigation ---
function showPage(page) {
    const pages = [
        'home-page', 'shop-page', 'about-page', 'contact-page',
        'cart-page', 'login-page', 'signup-page', 'checkout-page', 'product-detail-page'
    ];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    // Remove .active from nav links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => link.classList.remove('active'));
    // Set .active on nav
    if (page === 'home') document.querySelectorAll('.nav-link')[0].classList.add('active');
    if (page === 'shop') document.querySelectorAll('.nav-link')[1].classList.add('active');
    if (page === 'about') document.querySelectorAll('.nav-link')[2].classList.add('active');
    if (page === 'contact') document.querySelectorAll('.nav-link')[3].classList.add('active');
    // Show requested page
    const showId = {
        home: 'home-page',
        shop: 'shop-page',
        about: 'about-page',
        contact: 'contact-page',
        cart: 'cart-page',
        login: 'login-page',
        signup: 'signup-page',
        checkout: 'checkout-page',
        product: 'product-detail-page'
    }[page] || 'home-page';
    const showEl = document.getElementById(showId);
    if (showEl) showEl.style.display = '';
    // Special: update cart/checkout UI if needed
    if (page === 'cart') updateCartUI();
    if (page === 'checkout') updateCheckoutUI();
}

// --- Featured Products ---
function loadFeaturedProducts() {
    const grid = document.getElementById('featured-products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    // Pick 4 random featured products
    const featured = products.slice(0, 4);
    featured.forEach(product => {
        grid.innerHTML += productCardHTML(product);
    });
}

// --- All Products (Shop Page) ---
function loadAllProducts() {
    renderProductsGrid(products);
    document.getElementById('products-count').textContent = `Showing ${products.length} products`;
}

// --- Render Products Grid ---
function renderProductsGrid(list) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    list.forEach(product => {
        grid.innerHTML += productCardHTML(product);
    });
}

// --- Product Card HTML ---
function productCardHTML(product) {
    return `
    <div class="col-md-4 mb-4">
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id}, 1)">Add to Cart</button>
            </div>
        </div>
    </div>
    `;
}

// --- Product Detail ---
function showProductDetail(id) {
    currentProduct = products.find(p => p.id === id);
    if (!currentProduct) return;
    document.getElementById('product-detail-image').src = currentProduct.image;
    document.getElementById('product-detail-name').textContent = currentProduct.name;
    document.getElementById('product-detail-price').textContent = `$${currentProduct.price.toFixed(2)}`;
    document.getElementById('product-detail-description').textContent = currentProduct.description;
    document.getElementById('quantity').value = 1;
    showPage('product');
}

// --- Quantity Change in Detail Page ---
function changeQuantity(delta) {
    const qtyInput = document.getElementById('quantity');
    let val = parseInt(qtyInput.value) || 1;
    val = Math.max(1, val + delta);
    qtyInput.value = val;
}

// --- Add to Cart from Detail Page ---
function addToCartFromDetail() {
    const qty = parseInt(document.getElementById('quantity').value) || 1;
    if (currentProduct) addToCart(currentProduct.id, qty);
}

// --- Add to Cart ---
function addToCart(productId, qty = 1) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += qty;
    } else {
        cart.push({ id: productId, qty });
    }
    updateCartUI();
}

// --- Remove from Cart ---
function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartUI();
}

// --- Update Cart UI ---
function updateCartUI() {
    // Cart count badge
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
    // Cart items
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItems.innerHTML = cart.map(item => {
                const prod = products.find(p => p.id === item.id);
                return `
                <div class="cart-item">
                    <div class="cart-item-image"><img src="${prod.image}" alt="${prod.name}"></div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${prod.name}</div>
                        <div class="cart-item-price">$${prod.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button onclick="updateCartQty(${item.id}, -1)">-</button>
                            <input type="number" value="${item.qty}" min="1" onchange="setCartQty(${item.id}, this.value)">
                            <button onclick="updateCartQty(${item.id}, 1)">+</button>
                        </div>
                        <span class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></span>
                    </div>
                </div>
                `;
            }).join('');
        }
    }
    // Cart summary
    updateCartSummary();
}

// --- Update Cart Quantity ---
function updateCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty = Math.max(1, item.qty + delta);
        updateCartUI();
    }
}
function setCartQty(productId, val) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty = Math.max(1, parseInt(val) || 1);
        updateCartUI();
    }
}

// --- Cart Summary Calculation ---
function updateCartSummary() {
    let subtotal = 0;
    cart.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (prod) subtotal += prod.price * item.qty;
    });
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
    const tax = +(subtotal * 0.07).toFixed(2); // 7% tax
    const total = subtotal + shipping + tax;
    // Update UI
    ['cart', 'checkout'].forEach(prefix => {
        if (document.getElementById(`${prefix}-subtotal`)) document.getElementById(`${prefix}-subtotal`).textContent = `$${subtotal.toFixed(2)}`;
        if (document.getElementById(`${prefix}-shipping`)) document.getElementById(`${prefix}-shipping`).textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        if (document.getElementById(`${prefix}-tax`)) document.getElementById(`${prefix}-tax`).textContent = `$${tax.toFixed(2)}`;
        if (document.getElementById(`${prefix}-total`)) document.getElementById(`${prefix}-total`).textContent = `$${total.toFixed(2)}`;
    });
}

// --- Checkout UI ---
function updateCheckoutUI() {
    // List items
    const checkoutItems = document.getElementById('checkout-items');
    if (checkoutItems) {
        checkoutItems.innerHTML = cart.map(item => {
            const prod = products.find(p => p.id === item.id);
            return `<div class="summary-row"><span>${prod.name} x${item.qty}</span><span>$${(prod.price * item.qty).toFixed(2)}</span></div>`;
        }).join('');
    }
    updateCartSummary();
}

// --- Filters and Sorting ---
function setupEventListeners() {
    // Category filters
    ['filter-organic', 'filter-gardening', 'filter-homecare', 'filter-farming'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', applyFilters);
    });
    // Price filter
    const priceFilter = document.getElementById('price-filter');
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);
    // Sort filter
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) sortFilter.addEventListener('change', applyFilters);

    // Signup Form Handler

const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.onsubmit = async e => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const name = document.getElementById('signup-name')?.value || email; // Add name field if needed

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const result = await registerUser({ email, password, name });
            if (result.success) {
                alert("Signup successful. Please log in.");
                showPage('login');
            } else {
                alert(result.error || "Registration failed");
            }
        } catch (error) {
            alert("Network error. Please try again.");
        }
    };
}

// Update your login form handler:
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.onsubmit = async e => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const result = await loginUser(email, password);
            if (result.success) {
                alert("Login successful!");
                currentUser = result.user;
                showPage('home');
            } else {
                alert(result.error || "Invalid credentials");
            }
        } catch (error) {
            alert("Network error. Please try again.");
        }
    };
}

    // Checkout Form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) checkoutForm.onsubmit = e => { e.preventDefault(); alert('Order placed!'); cart = []; updateCartUI(); showPage('home'); };
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) contactForm.onsubmit = e => { e.preventDefault(); alert('Message sent!'); contactForm.reset(); };
}

// --- Apply Filters and Sorting ---
function applyFilters() {
    let filtered = [...products];
    // Category
    const cats = [];
    if (document.getElementById('filter-organic').checked) cats.push('organic-food');
    if (document.getElementById('filter-gardening').checked) cats.push('gardening');
    if (document.getElementById('filter-homecare').checked) cats.push('home-care');
    if (document.getElementById('filter-farming').checked) cats.push('farming');
    if (cats.length) filtered = filtered.filter(p => cats.includes(p.category));
    // Price
    const priceVal = document.getElementById('price-filter').value;
    if (priceVal) {
        if (priceVal === '0-25') filtered = filtered.filter(p => p.price >= 0 && p.price <= 25);
        if (priceVal === '25-50') filtered = filtered.filter(p => p.price > 25 && p.price <= 50);
        if (priceVal === '50-100') filtered = filtered.filter(p => p.price > 50 && p.price <= 100);
        if (priceVal === '100+') filtered = filtered.filter(p => p.price > 100);
    }
    // Sort
    const sortVal = document.getElementById('sort-filter').value;
    if (sortVal === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sortVal === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortVal === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sortVal === 'newest') filtered.sort((a, b) => b.id - a.id);
    // Render
    renderProductsGrid(filtered);
    document.getElementById('products-count').textContent = `Showing ${filtered.length} products`;
}

function scrollToSupportSection(sectionId) {
    setTimeout(function() {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300); // Wait for showPage to display the section
}

// Configuration
const CONFIG = {
  WEB_APP_URL: "https://script.google.com/macros/s/AKfycby5J9quLmSpb1wXMJOJaOM8KZB4aD3DCYRmFybsYEr71lLzVGhDymSvCy6xIpdFpmjYlQ/exec",
};

// Make showPage and scrollToSupportSection available globally
window.showPage = showPage;
window.scrollToSupportSection = scrollToSupportSection;
function showCategory(category) {
    showPage('shop');
    // Wait for shop page to be visible, then check the filter
    setTimeout(() => {
        const checkbox = document.getElementById('filter-' + category.replace('-', ''));
        if (checkbox) {
            checkbox.checked = true;
            // Optionally, trigger your filtering logic here if you have one
            if (typeof applyFilters === 'function') applyFilters();
        }
    }, 100);
}
window.showCategory = showCategory;