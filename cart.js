

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsDiv = document.getElementById('cart-items');
  const totalPriceSpan = document.getElementById('total-price');

  cartItemsDiv.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceSpan.textContent = '0';
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: $${itemTotal}</p>
      </div>
    `;
  });

  totalPriceSpan.textContent = total;
}

function checkout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Cart is already empty.");
    return;
  }

  const orderId = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = { id: orderId, items: cart, total };

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  localStorage.removeItem('cart');
  alert("Order placed! ID: " + orderId);
  renderCart(); // refresh UI
}

document.addEventListener('DOMContentLoaded', renderCart);
