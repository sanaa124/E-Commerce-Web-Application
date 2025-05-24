


let products = JSON.parse(localStorage.getItem('products')) || [
    { name: 'Dress', price: 2000, description: 'Wonderful design', category: 'Clothes', image: 'dress2.webp' },
    { name: 'Shoes', price: 500, description: 'Comfortable shoes', category: 'Footwear', image: 'shoes.jpeg' },
    { name: 'Hand Bag', price: 1000, description: 'Latest model', category: 'Bags', image: 'bag.jpeg' },
    { name: 'Bracelet', price: 3000, description: 'Beautiful design', category: 'Accessories', image: 'accessory.jpeg' }
];

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

if (!localStorage.getItem('products')) {
    saveProducts();
}

function renderProducts() {
    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');

    const categories = [...new Set(products.map(p => p.category))];
    categoryFilter.innerHTML = '<option value="all">ALL Categories</option>' +
        categories.map(c => `<option value="${c}">${c}</option>`).join('');

    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    productList.innerHTML = '';

    products.forEach((product, index) => {
        if (
            (selectedCategory === 'all' || product.category === selectedCategory) &&
            product.name.toLowerCase().includes(searchQuery)
        ) {
            productList.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price}</p>
                    <button onclick="addToCart(${index})">Add to Cart</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </div>
            `;
        }
    });
}

function addToCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products[index];

    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const countElem = document.getElementById('cart-count');
    if (countElem) {
        countElem.textContent = totalItems;
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
}

function saveNewProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value;
    const category = document.getElementById('product-category').value;
    const image = document.getElementById('product-image').value;

    if (!name || !price || !description || !category || !image) {
        alert("Please fill out all fields");
        return;
    }

    products.push({ name, price, description, category, image });
    saveProducts();
    renderProducts();
}

function openProductForm() {
    document.querySelector("h2").style.display = 'block';
}

function closeProductForm() {
    document.querySelector("h2").style.display = 'none';
}

document.getElementById("category-filter").addEventListener("change", renderProducts);
document.getElementById("search-input").addEventListener("input", renderProducts);

document.addEventListener('DOMContentLoaded', () => { 
    
    renderProducts();
    updateCartCount();
});




