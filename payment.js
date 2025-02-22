function toggleFields() {
    const method = document.getElementById('paymentMethod').value;
    document.getElementById('cardDetails').style.display = 'none';
    document.getElementById('upiDetails').style.display = 'none';
    document.getElementById('cashDetails').style.display = 'none';
    document.getElementById('qrCode').style.display = 'none';

    if (method === 'creditCard' || method === 'debitCard') {
      document.getElementById('cardDetails').style.display = 'block';
    } else if (method === 'upi') {
      document.getElementById('upiDetails').style.display = 'block';
      document.getElementById('qrCode').style.display = 'block';
    } else if (method === 'cash') {
      document.getElementById('cashDetails').style.display = 'block';
    }
  }

  function selectMethod(method) {
    document.getElementById('paymentMethod').value = method;
    toggleFields();
  }
  function completePayment() {
  const method = document.getElementById('paymentMethod').value;
  let details;

  if (method === 'upi') {
    details = { method, upiId: document.getElementById('upiId').value };
  } else if (method === 'cash') {
    details = { method, amount: '100' }; // Example cash amount
  } else {
    details = {
      method,
      holderName: document.getElementById('holderName').value,
      accountNumber: document.getElementById('accountNumber').value,
      cvv: document.getElementById('cvv').value,
      expiryDate: document.getElementById('expiryDate').value,
    };
  }

//     document.getElementID('paymentMethod').addEventListener("keydown", function(event) {
// if (event.key === "Enter") {
//     event.preventDefault(); // Prevent default form submission
//     completePayment();
// }
// });

  // Store the payment method in localStorage
  localStorage.setItem('paymentMethod', method);
  localStorage.setItem('paymentDetails', JSON.stringify(details));

  localStorage.setItem('paymentMethod', 'Credit Card');
  window.location.href = 'receipt.html';


  }