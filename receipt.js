const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails')) || { method: 'Unknown' };
const products = JSON.parse(localStorage.getItem('products')) || [];
const grandTotal = localStorage.getItem('grandTotal') || '₹0.00';
if (!sessionStorage.getItem('invoiceNumber')) {
      sessionStorage.setItem('invoiceNumber', `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
    }
const invoiceNumber = sessionStorage.getItem('invoiceNumber');
    
const date = new Date();
    document.getElementById('date').innerText = date.toLocaleDateString();
    document.getElementById('time').innerText = date.toLocaleTimeString();
    document.getElementById('invoiceNumber').innerText = invoiceNumber;
    document.getElementById('paymentMethod').innerText = paymentDetails.method;

    const tbody = document.getElementById('invoiceDetails');
    const totalBasePrice = document.getElementById('totalBasePrice');
    const totalDiscount = document.getElementById('totalDiscount');
    const totalTax = document.getElementById('totalTax');
    const grandTotalElement = document.getElementById('grandTotal');

let totalBase = 0, totalDisc = 0, totalTaxAmount = 0;

products.forEach((product, index) => {
      const discountAmount = (product.basePrice * product.discount) / 100;
      const taxableAmount = product.basePrice - discountAmount;
      const cgstAmount = (taxableAmount * (product.cgst || 0)) / 100;
      const sgstAmount = (taxableAmount * (product.sgst || 0)) / 100;
      const taxAmount = cgstAmount + sgstAmount;
      const finalPrice = (taxableAmount + taxAmount) * product.quantity;

      totalBase += product.basePrice * product.quantity;
      totalDisc += discountAmount * product.quantity;
      totalTaxAmount += taxAmount * product.quantity;

      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.quantity}</td>
          <td>${(product.basePrice * product.quantity).toFixed(2)}</td>
          <td>${(discountAmount * product.quantity).toFixed(2)}</td>
          <td>${(taxAmount * product.quantity).toFixed(2)}</td>
          <td>${finalPrice.toFixed(2)}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });

totalBasePrice.innerText = totalBase.toFixed(2);
totalDiscount.innerText = totalDisc.toFixed(2);
totalTax.innerText = totalTaxAmount.toFixed(2);
grandTotalElement.innerText = grandTotal.replace('₹', '');
  
