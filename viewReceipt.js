function fetchReceipt() {
  const invoiceNumber = document.getElementById("invoiceInput").value;
  const storedInvoiceNumber = sessionStorage.getItem("invoiceNumber");
  const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails")) || {
    method: "Unknown",
  };
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const grandTotal = localStorage.getItem("grandTotal") || "₹0.00";

  if (invoiceNumber === storedInvoiceNumber) {
    // Generate the invoice dynamically
    let receiptHTML = `
               
                      <h1>Invoice</h1>
                      <div class="store-info">
                          <h2>Example Store</h2>
                          <p>123 Main Street, City, Country</p>
                          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                          <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
                          <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
                          <p><strong>Payment Method:</strong> ${
                            paymentDetails.method
                          }</p>
                      </div>
                  </div>
                  <table class="details">
                      <thead>
                          <tr>
                              <th>SL.No</th>
                              <th>Product ID</th>
                              <th>Product Name</th>
                              <th>Quantity</th>
                              <th>Base Price (₹)</th>
                              <th>Discount (₹)</th>
                              <th>GST (₹)</th>
                              <th>Final Price (₹)</th>
                          </tr>
                      </thead>
                      <tbody>
          `;

    let totalBase = 0,
      totalDisc = 0,
      totalTaxAmount = 0;

    products.forEach((product, index) => {
      const discountAmount = (product.basePrice * product.discount) / 100;
      const taxableAmount = product.basePrice - discountAmount;

      // const taxAmount =
      //   (taxableAmount * product.cgst) / 100 +
      //   (taxableAmount * product.sgst) / 100;
      // const finalPrice = product.finalPrice;
      const cgstAmount = (taxableAmount * (product.cgst || 0)) / 100;
      const sgstAmount = (taxableAmount * (product.sgst || 0)) / 100;
      const taxAmount = cgstAmount + sgstAmount;
      const finalPrice = (taxableAmount + taxAmount) * product.quantity;

      totalBase += product.basePrice * product.quantity;
      totalDisc += discountAmount * product.quantity;
      totalTaxAmount += taxAmount * product.quantity;

      receiptHTML += `
                  <tr>
                      <td>${index + 1}</td>
                      <td>${product.id}</td>
                      <td>${product.name}</td>
                      <td>${product.quantity}</td>
                      <td>${(product.basePrice * product.quantity).toFixed(
                        2
                      )}</td>
                      <td>${(discountAmount * product.quantity).toFixed(2)}</td>
                      <td>${(taxAmount * product.quantity).toFixed(2)}</td>
                      <td>${finalPrice.toFixed(2)}</td>
                  </tr>
              `;
    });

    receiptHTML += `
                      </tbody>
                  </table>
                  <div class="summary">
                      <p><strong>Total Base Price:</strong> ₹${totalBase.toFixed(
                        2
                      )}</p>
                      <p><strong>Total Discount:</strong> ₹${totalDisc.toFixed(
                        2
                      )}</p>
                      <p><strong>Total(CGST + SGST):</strong> ₹${totalTaxAmount.toFixed(
                        2
                      )}</p>
                      <p><strong>Grand Total:</strong> ₹${grandTotal.replace(
                        "₹",
                        ""
                      )}</p>
                  </div>
                  <button onclick="window.print()">Print Invoice</button>
              </div>
          `;

    document.getElementById("receiptContainer").innerHTML = receiptHTML;
    document.getElementById("receiptContainer").style.display = "block";
  } else {
    document.getElementById("receiptContainer").innerHTML =
      "<p class='not-found'>Not Available</p>";
    document.getElementById("receiptContainer").style.display = "block";
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission
      fetchReceipt(); // Call the login function
  }
  });