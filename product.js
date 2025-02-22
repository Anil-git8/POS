const predefinedProducts = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  basePrice: Math.floor(Math.random() * 500) + 50,
  discount: Math.floor(Math.random() * 20),
  gst: Math.floor(Math.random() * 9) + 5,
}));

 let serialNumberCounter = 1;
 let activeInput = null;
 document.getElementById('addRowButton').addEventListener('click', addRow);
function addRow() {
  const tableBody = document.getElementById('productTable').querySelector('tbody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${serialNumberCounter++}</td>
    <td><input type="number" placeholder="Product ID" style="width: 100%;"></td>
    <td><input type="text" placeholder="Product Name" style="width: 100%;" disabled></td>
    <td><input type="number" value="1" placeholder="Quantity" style="width: 100%;" min="1"></td>
    <td><input type="number" placeholder="Base Price" style="width: 100%;"></td>
    <td><input type="number" placeholder="Discount (%)" style="width: 100%;"></td>
    <td><input type="number" placeholder="GST (%)" style="width: 100%;"></td>
    <td class="final-price">0.00</td>
    <td><button class="remove-btn">Remove</button></td>
  `;
  tableBody.appendChild(row);

  const productIdInput = row.children[1].querySelector('input');
  const gstInput = row.children[6].querySelector('input');
  const removeButton = row.querySelector('.remove-btn');

  productIdInput.addEventListener('input', () => populateProductDetails(row));
  row.querySelectorAll('input').forEach(input => input.addEventListener('input', () => updateRowTotal(row)));
  productIdInput.addEventListener('focus', () => activeInput = productIdInput);

  gstInput.addEventListener('input', () => updateRowTotal(row));

  removeButton.addEventListener('click', () => {
    row.remove();
    updateGrandTotal();
    updateSerialNumbers();
  });

  updateRowTotal(row);
}

function populateProductDetails(row) {
  const productId = parseInt(row.children[1].querySelector('input').value);
  const product = predefinedProducts.find(p => p.id === productId);

  if (product) {
    row.children[2].querySelector('input').value = product.name;
    row.children[4].querySelector('input').value = product.basePrice;
    row.children[5].querySelector('input').value = product.discount;
    row.children[6].querySelector('input').value = product.gst;
    updateRowTotal(row);
  }
}

function updateRowTotal(row) {
  const quantity = parseFloat(row.children[3].querySelector('input').value) || 0;
  const basePrice = parseFloat(row.children[4].querySelector('input').value) || 0;
  const discount = parseFloat(row.children[5].querySelector('input').value) || 0;
  const gst = parseFloat(row.children[6].querySelector('input').value) || 0;

  const discountAmount = (basePrice * discount) / 100;
  const taxableAmount = basePrice - discountAmount;
  const gstAmount = (taxableAmount * gst) / 100;
  const total = (taxableAmount + gstAmount) * quantity;

  row.querySelector('.final-price').innerText = total.toFixed(2);
  updateGrandTotal();
}

function updateGrandTotal() {
  const rows = document.querySelectorAll('#productTable tbody tr');
  let totalBasePrice = 0, totalDiscount = 0, totalGST = 0, grandTotal = 0;

  rows.forEach(row => {
    const quantity = parseFloat(row.children[3].querySelector('input').value) || 0;
    const basePrice = parseFloat(row.children[4].querySelector('input').value) || 0;
    const discount = parseFloat(row.children[5].querySelector('input').value) || 0;
    const gst = parseFloat(row.children[6].querySelector('input').value) || 0;

    const discountAmount = (basePrice * discount) / 100;
    const taxableAmount = basePrice - discountAmount;
    const gstAmount = (taxableAmount * gst) / 100;
    const rowTotal = (taxableAmount + gstAmount) * quantity;

    totalBasePrice += basePrice * quantity;
    totalDiscount += discountAmount * quantity;
    totalGST += gstAmount * quantity;
    grandTotal += rowTotal;
  });

  const cgst = totalGST / 2;
  const sgst = totalGST / 2;

  document.getElementById('totalBasePrice').innerText = totalBasePrice.toFixed(2);
  document.getElementById('totalDiscount').innerText = totalDiscount.toFixed(2);
  document.getElementById('totalGST').innerText = totalGST.toFixed(2);
  document.getElementById('totalCGST').innerText = cgst.toFixed(2);
  document.getElementById('totalSGST').innerText = sgst.toFixed(2);
  document.getElementById('grandTotal').innerText = `₹${grandTotal.toFixed(2)}`;
}

function updateSerialNumbers() {
  const rows = document.querySelectorAll('#productTable tbody tr');
  rows.forEach((row, index) => {
    row.children[0].innerText = index + 1;
  });
}

document.addEventListener("keydown", (event) => {
if (event.key === "a" && event.ctrlKey) {
  event.preventDefault();
  addRow();
} else if (event.key === "p" && event.ctrlKey) {
  event.preventDefault();
  document.getElementById("proceedPaymentButton").click();
} else if (event.key === "r" && event.ctrlKey) {
  event.preventDefault();
  location.reload();
}
});

document.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
  const activeElement = document.activeElement;

  if (activeElement.tagName === "INPUT") {
    event.preventDefault();
    const inputs = Array.from(
      document.querySelectorAll("#productTable input")
    );
    const currentIndex = inputs.indexOf(activeElement);
    const nextInput = inputs[currentIndex + 1];

    if (nextInput) {
      nextInput.focus();
    } else {
      addRow();
    }
  }
}
});

document.getElementById('proceedPaymentButton').addEventListener('click', () => {
const rows = document.querySelectorAll('#productTable tbody tr');
const products = [];

rows.forEach(row => {
  const product = {
    id: row.children[1].querySelector('input').value || '',
    name: row.children[2].querySelector('input').value || '',
    quantity: parseFloat(row.children[3].querySelector('input').value) || 0,
    basePrice: parseFloat(row.children[4].querySelector('input').value) || 0,
    discount: parseFloat(row.children[5].querySelector('input').value) || 0,
    cgst: parseFloat(row.children[6].querySelector('input').value) || 0,
    // sgst: parseFloat(row.children[7].querySelector('input').value) || 0,
    finalPrice: parseFloat(row.querySelector('.final-price').innerText) || 0
  };
  products.push(product);
});

localStorage.setItem('products', JSON.stringify(products));
localStorage.setItem('grandTotal', document.getElementById('grandTotal').innerText);

window.location.href = 'payment.html';
});
// Virtual Keyboard
const floatingButton = document.getElementById('floatingButton');
const virtualKeyboard = document.getElementById('virtualKeyboard');

floatingButton.addEventListener('click', () => {
virtualKeyboard.style.display = virtualKeyboard.style.display === 'none' ? 'flex' : 'none';
});

const keys = '1234567890'.split('');
keys.push('Backspace');
keys.forEach((key) => {
const button = document.createElement('button');
button.textContent = key === 'Backspace' ? '⌫' : key;
button.addEventListener('click', () => handleKeyPress(key));
virtualKeyboard.appendChild(button);
});

function handleKeyPress(key) {
if (activeInput) {
  if (key === 'Backspace') {
    activeInput.value = activeInput.value.slice(0, -1);
  } else {
    activeInput.value += key;
  }

  // Trigger input event to update fields dynamically
  activeInput.dispatchEvent(new Event('input', { bubbles: true }));
  activeInput.focus();
}
}

// Retrieve the username from localStorage
const username = localStorage.getItem("username");

// If a username is found, update the span element with the username
if (username) {
document.getElementById("usernameDisplay").textContent = username;
} else {
// If no username is found, display "Guest"
document.getElementById("usernameDisplay").textContent = "Guest";
}
document.getElementById("refreshButton").addEventListener("click", () => {
  location.reload();
});
const helpMessages = [
      "You can check the user guide for detailed instructions.",
    ];
const supportMessages = [
      "Our support team is available 24/7.",
    ];

function getRandomMessage(messages) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
  }

  document.getElementById('helpButton').addEventListener('click', function() {
      alert(getRandomMessage(helpMessages));
  });

  document.getElementById('supportButton').addEventListener('click', function() {
      alert(getRandomMessage(supportMessages));
  });

document.getElementById("logoutButton").addEventListener("click", () => {
  window.location.href = "index.html";
});
function showPopup(message) {
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popupContent");

  popupContent.innerText = message;
  overlay.style.display = "block";
  popup.style.display = "block";

  document
    .getElementById("closePopupButton")
    .addEventListener("click", () => {
      overlay.style.display = "none";
      popup.style.display = "none";
    });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    popup.style.display = "none";
  });
}
document.getElementById('searchBar').addEventListener('input', function() {
const query = this.value.toLowerCase();
const rows = document.querySelectorAll('#productTable tbody tr');

rows.forEach(row => {
  const productId = row.children[1].querySelector('input').value.toLowerCase();
  const productName = row.children[2].querySelector('input').value.toLowerCase();
  const basePrice = row.children[4].querySelector('input').value.toLowerCase();

  if (productId.includes(query) || productName.includes(query) || basePrice.includes(query)) {
    row.style.display = '';
  } else {
    row.style.display = 'none';
  }
});
});

